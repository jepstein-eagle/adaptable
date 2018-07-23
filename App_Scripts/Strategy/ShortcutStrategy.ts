import { IShortcutStrategy } from './Interface/IShortcutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import { IUIError, IUIConfirmation } from '../Core/Interface/IMessage';
import { Helper } from '../Core/Helpers/Helper';
import { DataType, ActionMode } from '../Core/Enums'
import { MathOperation } from '../Core/Enums'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { ObjectFactory } from '../Core/ObjectFactory';
import { ICellInfo } from '../Core/Interface/Interfaces';
import { IColumn } from '../Core/Interface/IColumn';
import { IShortcut, ICellValidationRule } from '../Core/Api/Interface/AdaptableBlotterObjects';


export class ShortcutStrategy extends AdaptableStrategyBase implements IShortcutStrategy {

    private Shortcuts: IShortcut[]

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ShortcutStrategyId, blotter)
        blotter.onKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent))
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ShortcutStrategyName, ScreenPopups.ShortcutPopup, StrategyGlyphs.ShortcutGlyph);
    }

    protected InitState() {
        if (this.Shortcuts != this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.Shortcuts) {
            this.Shortcuts = this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.Shortcuts;
        }
    }

    private handleKeyDown(keyEvent: JQueryKeyEventObject | KeyboardEvent) {
        if (this.Shortcuts && this.Shortcuts.length==0) { return; }
        let activeCell: ICellInfo = this.blotter.getActiveCell();
        if (!activeCell) { return; }
        let selectedColumn: IColumn = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == activeCell.ColumnId);
        if (activeCell && !selectedColumn.ReadOnly) {
            let columnDataType: DataType = selectedColumn.DataType;
            let keyEventString: string = Helper.getStringRepresentionFromKey(keyEvent);
            let activeShortcut: IShortcut
            let valueToReplace: any;
            switch (columnDataType) {
                case DataType.Number: {
                    activeShortcut = this.Shortcuts.filter(s => s.ColumnType == DataType.Number).find(x => keyEventString == x.ShortcutKey.toLowerCase())
                    if (activeShortcut) {
                        let currentCellValue: any;
                        // Another complication is that the cell might have been edited or not, so we need to work out which method to use...
                        if (this.blotter.gridHasCurrentEditValue()) {
                            currentCellValue = this.blotter.getCurrentCellEditValue()
                            valueToReplace = this.CalculateShortcut(currentCellValue, activeShortcut.ShortcutResult, activeShortcut.ShortcutOperation as MathOperation);
                        } else {
                            currentCellValue = activeCell.Value;
                            valueToReplace = this.CalculateShortcut(currentCellValue, activeShortcut.ShortcutResult, activeShortcut.ShortcutOperation as MathOperation);
                        }
                    }
                    break;
                }
                case DataType.Date: {
                    activeShortcut = this.Shortcuts.filter(s => s.ColumnType == DataType.Date).find(x => keyEventString == x.ShortcutKey.toLowerCase())
                    if (activeShortcut) {
                        // Date we ONLY replace so dont need to worry about replacing values
                        if (activeShortcut.IsDynamic) {
                            valueToReplace = this.blotter.CalendarService.GetDynamicDate(activeShortcut.ShortcutResult);
                        } else {
                            valueToReplace = new Date(activeShortcut.ShortcutResult);
                        }
                    }
                    break;
                }
            }

            if (activeShortcut) {
                let dataChangedEvent: IDataChangedEvent = {
                    OldValue: activeCell.Value,
                    NewValue: valueToReplace,
                    ColumnId: activeCell.ColumnId,
                    IdentifierValue: activeCell.Id,
                    Timestamp: Date.now(),
                    Record: null
                }

                let validationRules: ICellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);
                let hasErrorPrevent: boolean = validationRules.length > 0 && validationRules[0].ActionMode == ActionMode.StopEdit;
                let hasErrorWarning: boolean = validationRules.length > 0 && validationRules[0].ActionMode == ActionMode.WarnUser;

                //   this.AuditFunctionAction("HandleKeyDown",                     "Key Pressed: " + keyEventString,                     { Shortcut: activeShortcut, PrimaryKey: activeCell.Id, ColumnId: activeCell.ColumnId })

                //We cancel the edit before doing anything so there is no issue when showing a popup or performing the shortcut
                this.blotter.cancelEdit()

                if (hasErrorPrevent) {
                    this.ShowErrorPreventMessage(validationRules[0]);
                } else {
                    if (hasErrorWarning) {
                        this.ShowWarningMessages(validationRules, activeShortcut, activeCell, keyEventString, valueToReplace, dataChangedEvent.OldValue);
                    } else {
                        this.ApplyShortcut(activeCell, valueToReplace);
                    }
                }
                // useful feature - prevents the main thing happening you want to on the keypress.
                keyEvent.preventDefault();
            }
        }
    }

    private CalculateShortcut(first: any, second: any, shortcutOperation: MathOperation): number {
        let firstNumber: number = Number(first);
        let secondNumber: number = Number(second);

        switch (shortcutOperation) {
            case MathOperation.Add:
                return firstNumber + secondNumber;
            case MathOperation.Subtract:
                return (firstNumber - secondNumber);
            case MathOperation.Multiply:
                return (firstNumber * secondNumber);
            case MathOperation.Divide:
                return (firstNumber / secondNumber);
            case MathOperation.Replace:
                return secondNumber;
        }
    }

    public ApplyShortcut(activeCell: ICellInfo, newValue: any): void {
        this.blotter.setValueBatch([{ Id: activeCell.Id, ColumnId: activeCell.ColumnId, Value: newValue }]);
    }

    private ShowErrorPreventMessage(failedRule: ICellValidationRule): void {
        let error: IUIError = {
            ErrorHeader: "Shortcut Failed",
            ErrorMsg: ObjectFactory.CreateCellValidationMessage(failedRule, this.blotter)
        }
        this.blotter.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowErrorAction>(PopupRedux.PopupShowError(error));
    }

    private ShowWarningMessages(failedRules: ICellValidationRule[], shortcut: IShortcut, activeCell: ICellInfo, keyEventString: string, newValue: any, oldValue: any): void {
        let warningMessage: string = "";
        failedRules.forEach(f => {
            warningMessage = warningMessage + ObjectFactory.CreateCellValidationMessage(f, this.blotter) + "\n";
        })
        let confirmation: IUIConfirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Cell Validation Failed",
            ConfirmationMsg: warningMessage,
            ConfirmationText: "Bypass Rule",
            //We cancel the edit before applying the shortcut so if cancel then there is nothing to do
            CancelAction: null, //ShortcutRedux.ApplyShortcut(shortcut, activeCell, keyEventString, oldValue),
            ConfirmAction: ShortcutRedux.ShortcutApply(shortcut, activeCell, keyEventString, newValue),
            ShowCommentBox: true
        }
        this.blotter.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowConfirmationAction>(PopupRedux.PopupShowConfirmation(confirmation));
    }

}


