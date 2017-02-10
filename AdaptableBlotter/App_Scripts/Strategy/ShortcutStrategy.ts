import { IShortcut, IShortcutStrategy } from '../Core/Interface/IShortcutStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as StrategyIds from '../Core/StrategyIds'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import { IMenuItem, IUIError, IUIConfirmation, ICellInfo } from '../Core/Interface/IStrategy';
import { Helper } from '../Core/Helper';
import { ColumnType } from '../Core/Enums'
import { ShortcutAction, CellValidationAction } from '../Core/Enums'
import { ICalendarService } from '../Core/Services/Interface/ICalendarService'
import { MenuType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { ICellValidationRule } from '../Core/Interface/ICellValidationStrategy';
import { ObjectFactory } from '../Core/ObjectFactory';


export class ShortcutStrategy extends AdaptableStrategyBase implements IShortcutStrategy {
    private NumericShortcuts: IShortcut[]
    private DateShortcuts: IShortcut[]
    private menuItemConfig: IMenuItem;


    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ShortcutStrategyId, blotter)
        this.menuItemConfig = new MenuItemShowPopup("Shortcut", this.Id, 'ShortcutConfig', MenuType.Configuration, "road");
        this.InitState();
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        blotter.OnKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent))
    }


    InitState() {
        if (this.NumericShortcuts != this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.NumericShortcuts) {
            this.NumericShortcuts = this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.NumericShortcuts;
        }
        if (this.DateShortcuts != this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.DateShortcuts) {
            this.DateShortcuts = this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.DateShortcuts;
        }
    }

    private handleKeyDown(keyEvent: JQueryKeyEventObject | KeyboardEvent) {
        let activeCell: ICellInfo = this.blotter.getActiveCell();
        let isReadOnly = this.blotter.isColumnReadonly(activeCell.ColumnId)
        if (activeCell && !isReadOnly) {
            let columnType: ColumnType = this.blotter.getColumnType(activeCell.ColumnId);
            let keyEventString: string = Helper.getStringRepresentionFromKey(keyEvent);
            let activeShortcut: IShortcut
            var valueToReplace: any;
            switch (columnType) {
                case ColumnType.Number: {
                    activeShortcut = this.NumericShortcuts.filter(s => s.IsLive).find(x => keyEventString == x.ShortcutKey.toLowerCase())
                    if (activeShortcut) {
                        let currentCellValue: any;
                        // Another complication is that the cell might have been edited or not, so we need to work out which method to use...
                        if (this.blotter.gridHasCurrentEditValue()) {
                            currentCellValue = this.blotter.getCurrentCellEditValue()
                            valueToReplace = this.CalculateShortcut(currentCellValue, activeShortcut.ShortcutResult, activeShortcut.ShortcutAction);
                        } else {
                            currentCellValue = activeCell.Value;
                            valueToReplace = this.CalculateShortcut(currentCellValue, activeShortcut.ShortcutResult, activeShortcut.ShortcutAction);
                        }
                    }
                    break;
                }
                case ColumnType.Date: {
                    activeShortcut = this.DateShortcuts.filter(s => s.IsLive).find(x => keyEventString == x.ShortcutKey.toLowerCase())
                    if (activeShortcut) {
                        // Date we ONLY replace so dont need to worry about replacing values
                        if (activeShortcut.IsDynamic) {
                            valueToReplace = this.blotter.CalendarService.GetDynamicDate(activeShortcut.ShortcutResult);
                        } else {
                            valueToReplace = activeShortcut.ShortcutResult;
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
                }

                let validationRules: ICellValidationRule[] = this.blotter.AuditService.CheckCellChanging(dataChangedEvent);
                let hasErrorPrevent: boolean = validationRules.length > 0 && validationRules[0].CellValidationAction == CellValidationAction.Prevent;
                let hasErrorWarning: boolean = validationRules.length > 0 && validationRules[0].CellValidationAction == CellValidationAction.Warning;

                this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                    "HandleKeyDown",
                    "Key Pressed: " + keyEventString,
                    { Shortcut: activeShortcut, PrimaryKey: activeCell.Id, ColumnId: activeCell.ColumnId })
                
                //We cancel the edit before doing anything so there is no issue when showing a popup or performing the shortcut
                this.blotter.cancelEdit()

                if (hasErrorPrevent) {
                    this.ShowErrorPreventMessage(validationRules[0]);
                } else {
                    if (hasErrorWarning) {
                        this.ShowWarningMessages(validationRules, activeShortcut, activeCell, keyEventString, valueToReplace, dataChangedEvent.OldValue);
                    } else {
                        this.ApplyShortcut(activeShortcut, activeCell, keyEventString, valueToReplace);
                    }
                }
                // useful feature - prevents the main thing happening you want to on the keypress.
                keyEvent.preventDefault();
            }
        }
    }

    private CalculateShortcut(first: number, second: number, shortcutAction: ShortcutAction): number {
        let firstNumber: number = Number(first);
        let secondNumber: number = Number(second);

        switch (shortcutAction) {
            case ShortcutAction.Add:
                return firstNumber + secondNumber;
            case ShortcutAction.Subtract:
                return (firstNumber - secondNumber);
            case ShortcutAction.Multiply:
                return (firstNumber * secondNumber);
            case ShortcutAction.Divide:
                return (firstNumber / secondNumber);
            case ShortcutAction.Replace:
                return secondNumber;
        }
    }

    public ApplyShortcut(shortcut: IShortcut, activeCell: ICellInfo, keyEventString: string, newValue: any): void {

        this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
            "ApplyShortcut",
            "",
            { Shortcut: shortcut, PrimaryKey: activeCell.Id, ColumnId: activeCell.ColumnId })

        this.blotter.setValueBatch([{ Id: activeCell.Id, ColumnId: activeCell.ColumnId, Value: newValue }]);
    }

    private ShowErrorPreventMessage(failedRule: ICellValidationRule): void {
        let error: IUIError = {
            ErrorMsg: ObjectFactory.CreateCellValidationMessage(failedRule, this.blotter)
        }
        this.blotter.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.ErrorPopupAction>(PopupRedux.ErrorPopup(error));
    }

    private ShowWarningMessages(failedRules: ICellValidationRule[], shortcut: IShortcut, activeCell: ICellInfo, keyEventString: string, newValue: any, oldValue: any): void {
        let warningMessage: string = "";
        failedRules.forEach(f => {
            warningMessage = warningMessage + ObjectFactory.CreateCellValidationMessage(f, this.blotter) + "\n";
        })
        let confirmation: IUIConfirmation = {
            CancelText: "Cancel",
            ConfirmationMsg: warningMessage,
            ConfirmationText: "Perform Shortcut Anyway",
            //We cancel the edit before applying the shortcut so if cancel then there is fuck all to do
            CancelAction: null, //ShortcutRedux.ApplyShortcut(shortcut, activeCell, keyEventString, oldValue),
            ConfirmAction: ShortcutRedux.ApplyShortcut(shortcut, activeCell, keyEventString, newValue)
        }
        this.blotter.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.ConfirmationPopupAction>(PopupRedux.ConfirmationPopup(confirmation));
    }

    getMenuItems(): IMenuItem[] {
        return [this.menuItemConfig];
    }
}


