import { PlusMinusState } from '../Redux/ActionsReducers/Interface/IState';
import { IPlusMinusStrategy } from '../Core/Interface/IPlusMinusStrategy';
import { MenuItemShowPopup } from '../Core/MenuItem';
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase';
import * as PlusMinusRedux from '../Redux/ActionsReducers/PlusMinusRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem, ICellInfo, IUIError, IUIConfirmation } from '../Core/Interface/IStrategy';
import { DataType, MenuType, CellValidationMode } from '../Core/Enums'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper'
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { Helper } from '../Core/Helper';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { ICellValidationRule } from '../Core/Interface/ICellValidationStrategy';
import { ObjectFactory } from '../Core/ObjectFactory';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'

export class PlusMinusStrategy extends AdaptableStrategyBase implements IPlusMinusStrategy {
    private PlusMinusState: PlusMinusState
    constructor(blotter: IAdaptableBlotter, private reSelectCells: boolean) {
        super(StrategyIds.PlusMinusStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Plus/Minus", 'PlusMinusConfig', MenuType.ConfigurationPopup, "plus-sign")
        blotter.AdaptableBlotterStore.TheStore.subscribe(() => this.InitState())
        blotter.onKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent))
    }

    private InitState() {
        if (this.PlusMinusState != this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus) {
            this.PlusMinusState = this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus;
        }
    }

    protected addColumnMenuItems(columnId: string): void {
        if (this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId).DataType == DataType.Number) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                MenuRedux.AddItemColumnContextMenu(this.createMenuItemShowPopup(
                    "Create Plus/Minus Nudge Rule",
                    "PlusMinusConfig",
                    MenuType.ConfigurationPopup,
                    "plus-sign",
                    "New|" + columnId)))
        }
    }

    //we know for Kendo we receive a JQueryKeyEventObject
    private handleKeyDown(keyEvent: JQueryKeyEventObject | KeyboardEvent) {
        //it's a speacial key so we handle the string representation of the key '
        let keyEventString: string = Helper.getStringRepresentionFromKey(keyEvent);
        if (keyEventString == "-" || keyEventString == "+") {
            let successfulValues: ICellInfo[] = [];
            let side = 1
            if (Helper.getStringRepresentionFromKey(keyEvent) == "-") {
                side = -1
            }
            let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            let selectedCell = this.blotter.getSelectedCells()

            let failedPreventEdits: ICellValidationRule[] = []
            let failedWarningEdits: ICellValidationRule[] = []
            let warningValues: ICellInfo[] = [];

            for (var keyValuePair of selectedCell.Selection) {
                for (var columnValuePair of keyValuePair[1]) {
                    let selectedColumn: IColumn = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == columnValuePair.columnID);
                    if (selectedColumn.DataType == DataType.Number && !this.blotter.isColumnReadonly(columnValuePair.columnID)) {
                        let newValue: ICellInfo;
                        //we try to find a condition with an expression for that column that matches the record
                        let columnNudgesWithExpression = this.PlusMinusState.PlusMinusConditions.filter(x => x.ColumnId == columnValuePair.columnID && x.Expression != null)
                        for (let columnNudge of columnNudgesWithExpression) {
                            if (ExpressionHelper.checkForExpression(columnNudge.Expression, keyValuePair[0], columns, this.blotter)) {
                                newValue = { Id: keyValuePair[0], ColumnId: columnValuePair.columnID, Value: columnValuePair.value + (columnNudge.DefaultNudge * side) }
                            }
                        }
                        //we havent found any Condition with an Expression so we look for a general one for the column
                        if (!newValue) {
                            let columnNudge = this.PlusMinusState.PlusMinusConditions.find(x => x.ColumnId == columnValuePair.columnID && x.Expression == null)
                            if (columnNudge) {
                                newValue = ({ Id: keyValuePair[0], ColumnId: columnValuePair.columnID, Value: columnValuePair.value + (columnNudge.DefaultNudge * side) })
                            }
                            //we havent found a condition so we use the general nudge
                            else {
                                newValue = ({ Id: keyValuePair[0], ColumnId: columnValuePair.columnID, Value: columnValuePair.value + (this.PlusMinusState.DefaultNudge * side) })
                            }
                        }
                        //avoid the 0.0000000000x  
                        newValue.Value = parseFloat(newValue.Value.toFixed(12))
                        
                        let dataChangedEvent: IDataChangedEvent = {
                            OldValue: Number(columnValuePair.value),
                            NewValue: newValue.Value,
                            ColumnId: columnValuePair.columnID,
                            IdentifierValue: keyValuePair[0],
                            Timestamp: Date.now(),
                        }

                        let validationRules: ICellValidationRule[] = this.blotter.AuditService.CheckCellChanging(dataChangedEvent);

                        if (validationRules.length > 0) {
                            if (validationRules[0].CellValidationMode == CellValidationMode.Prevent) {
                                failedPreventEdits.push(validationRules[0]);
                            } else {
                                failedWarningEdits.push(validationRules[0]);
                                warningValues.push(newValue);
                            }
                        } else {
                            successfulValues.push(newValue)
                        }
                    }
                }
            }

            //Jo : I've added this for agGrid. Shouldnt cause harm and I even think it should have been there since the beginning
            keyEvent.preventDefault()
            // first inform if any failed with prevent
            this.ShowErrorPreventMessage(failedPreventEdits);
            if (failedWarningEdits.length > 0) {
                this.ShowWarningMessages(failedWarningEdits, warningValues, successfulValues, keyEventString);
            } else {
                this.ApplyPlusMinus(keyEventString, successfulValues);
            }
        }
    }


    private ShowErrorPreventMessage(failedRules: ICellValidationRule[]): void {
        if (failedRules.length > 0) {
            let failedMessages: string[] = []
            failedRules.forEach(fr => {
                let failedMessage: string = ObjectFactory.CreateCellValidationMessage(fr, this.blotter, false) + "\n";
                let existingMessage = failedMessages.find(f => f == failedMessage);
                if (existingMessage == null) {
                    failedMessages.push(failedMessage)
                }
            })
            let errorMessage: string = failedRules.length + " Nudge(s) failed Cell Validation:\n" + failedMessages.toString();;
            let error: IUIError = {
                ErrorMsg: errorMessage
            }
            this.blotter.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowErrorAction>(PopupRedux.PopupShowError(error));
        }
    }

    private ShowWarningMessages(failedRules: ICellValidationRule[], warningValues: ICellInfo[], successfulValues: ICellInfo[], keyEventString: string): void {
        if (failedRules.length > 0) {
            let allValues = warningValues.concat(...successfulValues);

            let warningMessages: string[] = []
            failedRules.forEach(fr => {
                let warningMessage: string = ObjectFactory.CreateCellValidationMessage(fr, this.blotter, false) + "\n";
                let existingMessage = warningMessages.find(w => w == warningMessage);
                if (existingMessage == null) {
                    warningMessages.push(warningMessage)
                }
            })
            let warningMessage: string = failedRules.length + " Nudge(s) failed Cell Validation:\n" + warningMessages.toString();;

            let confirmation: IUIConfirmation = {
                CancelText: "Cancel",
                ConfirmationTitle: "Do you want to continue?",
                ConfirmationMsg: warningMessage,
                ConfirmationText: "Perform Nudge Anyway",
                CancelAction: PlusMinusRedux.PlusMinusApply(successfulValues, keyEventString),
                ConfirmAction: PlusMinusRedux.PlusMinusApply(allValues, keyEventString)
            }
            this.blotter.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowConfirmationAction>(PopupRedux.PopupShowConfirmation(confirmation));
        }
    }

    public ApplyPlusMinus(keyEventString: string, successfulValues: ICellInfo[]): void {
        if (successfulValues.length > 0) {
            this.blotter.AuditLogService.AddAdaptableBlotterFunctionLog(this.Id,
                "ApplyPlusMinus",
                "KeyPressed:" + keyEventString,
                successfulValues)
            this.blotter.setValueBatch(successfulValues);

            if (this.reSelectCells) {  // not sure this is quite right as warning values are not included even if they pass and it doesnt work post-alert
                //I know interface is different but we leverage on the fact that we havent name the interface so they are "compatible" in that order...
                this.blotter.selectCells(successfulValues);
            }
        }
    }




}


