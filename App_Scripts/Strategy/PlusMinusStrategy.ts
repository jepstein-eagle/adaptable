import { PlusMinusState } from '../Redux/ActionsReducers/Interface/IState';
import { IPlusMinusStrategy } from '../Strategy/Interface/IPlusMinusStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as PlusMinusRedux from '../Redux/ActionsReducers/PlusMinusRedux'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IUIError, IUIConfirmation } from '../Core/Interface/IMessage';
import { DataType } from '../Core/Enums'
import { ExpressionHelper } from '../Core/Helpers/ExpressionHelper'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { Helper } from '../Core/Helpers/Helper';
import { IDataChangedEvent } from '../Core/Services/Interface/IAuditService'
import { ObjectFactory } from '../Core/ObjectFactory';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import { ICellInfo } from '../Core/Interface/Interfaces';
import { IColumn } from '../Core/Interface/IColumn';
import { ICellValidationRule } from '../Core/Api/Interface/AdaptableBlotterObjects';

export class PlusMinusStrategy extends AdaptableStrategyBase implements IPlusMinusStrategy {
    private PlusMinusState: PlusMinusState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.PlusMinusStrategyId, blotter)
        blotter.onKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent))
    }

    protected InitState() {
        if (this.PlusMinusState != this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus) {
            this.PlusMinusState = this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus;
        }
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.PlusMinusStrategyName, ScreenPopups.PlusMinusPopup, StrategyGlyphs.PlusMinusGlyph)
    }

    protected addColumnMenuItem(columnId: string): void {
        if (this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(x => x.ColumnId == columnId).DataType == DataType.Number) {
            this.createMenuItemColumnMenu(
                "Create Plus/Minus Nudge Rule",
                ScreenPopups.PlusMinusPopup,
                StrategyGlyphs.PlusMinusGlyph,
                "New|" + columnId)

        }
    }

    //we know for Kendo we receive a JQueryKeyEventObject
    // changing the logic here - you now have to explicity register the column as having plus minus
    private handleKeyDown(keyEvent: JQueryKeyEventObject | KeyboardEvent) {
        //it's a speacial key so we handle the string representation of the key '
        let keyEventString: string = Helper.getStringRepresentionFromKey(keyEvent);
        if (keyEventString == "-" || keyEventString == "+") {
            let successfulValues: ICellInfo[] = [];
            let side = 1
            if (Helper.getStringRepresentionFromKey(keyEvent) == "-") {
                side = -1
            }

            let popup = this.blotter.AdaptableBlotterStore.TheStore.getState().Popup.ScreenPopup


            let columns: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            let selectedCell = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCells

            let failedPreventEdits: ICellValidationRule[] = []
            let failedWarningEdits: ICellValidationRule[] = []
            let warningValues: ICellInfo[] = [];

            for (var keyValuePair of selectedCell.Selection) {
                for (var columnValuePair of keyValuePair[1]) {
                    let selectedColumn: IColumn = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == columnValuePair.columnId);
                    if (selectedColumn.DataType == DataType.Number && !this.blotter.isColumnReadonly(columnValuePair.columnId)) {
                        //for aggrid as we are getting strings sometimes 
                        if (typeof columnValuePair.value != "number") {
                            columnValuePair.value = parseFloat(columnValuePair.value)
                        }
                        let newValue: ICellInfo;

                        //we try to find a condition with an expression for that column that matches the record
                        let columnNudgesWithExpression = this.PlusMinusState.PlusMinusRules.filter(x => x.ColumnId == columnValuePair.columnId && !x.IsDefaultNudge)
                        for (let columnNudge of columnNudgesWithExpression) {
                            if (ExpressionHelper.checkForExpression(columnNudge.Expression, keyValuePair[0], columns, this.blotter)) {
                                newValue = { Id: keyValuePair[0], ColumnId: columnValuePair.columnId, Value: columnValuePair.value + (columnNudge.NudgeValue * side) }
                            }
                        }
                        //we havent found any Condition with an Expression so we look for a general one for the column
                        if (!newValue) {
                            let columnNudge = this.PlusMinusState.PlusMinusRules.find(x => x.ColumnId == columnValuePair.columnId && x.IsDefaultNudge)
                            if (columnNudge) {
                                newValue = ({ Id: keyValuePair[0], ColumnId: columnValuePair.columnId, Value: columnValuePair.value + (columnNudge.NudgeValue * side) })
                            }
                            //we havent found a condition so we return - this will allow a minus to be entered into the column
                            else {
                                return;
                            }
                        }

                        //avoid the 0.0000000000x  
                        newValue.Value = parseFloat(newValue.Value.toFixed(12))

                        let dataChangedEvent: IDataChangedEvent = {
                            OldValue: Number(columnValuePair.value),
                            NewValue: newValue.Value,
                            ColumnId: columnValuePair.columnId,
                            IdentifierValue: keyValuePair[0],
                            Timestamp: Date.now(),
                            Record: null
                        }

                        let validationRules: ICellValidationRule[] = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);

                        if (validationRules.length > 0) {
                            if (validationRules[0].CellValidationMode == 'Stop Edit') {
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
            let error: IUIError = {
                ErrorHeader: failedRules.length + "Nudge(s) failed rule",
                ErrorMsg: failedMessages.toString()
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
            let warningMessage: string = failedRules.length + " Nudge(s) failed rule:\n" + warningMessages.toString();;

            let confirmation: IUIConfirmation = {
                CancelText: "Cancel Edit",
                ConfirmationTitle: "Cell Validation Failed",
                ConfirmationMsg: warningMessage,
                ConfirmationText: "Bypass Rule",
                CancelAction: PlusMinusRedux.PlusMinusApply(successfulValues, keyEventString),
                ConfirmAction: PlusMinusRedux.PlusMinusApply(allValues, keyEventString),
                ShowCommentBox: true
            }
            this.blotter.AdaptableBlotterStore.TheStore.dispatch<PopupRedux.PopupShowConfirmationAction>(PopupRedux.PopupShowConfirmation(confirmation));
        }
    }

    public ApplyPlusMinus(keyEventString: string, successfulValues: ICellInfo[]): void {
        if (successfulValues.length > 0) {
             this.blotter.setValueBatch(successfulValues);

        }
    }



}


