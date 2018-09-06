"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const PlusMinusRedux = require("../Redux/ActionsReducers/PlusMinusRedux");
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
const ExpressionHelper_1 = require("../Core/Helpers/ExpressionHelper");
const Helper_1 = require("../Core/Helpers/Helper");
const ObjectFactory_1 = require("../Core/ObjectFactory");
const ColumnHelper_1 = require("../Core/Helpers/ColumnHelper");
class PlusMinusStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.PlusMinusStrategyId, blotter);
        blotter.onKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent));
    }
    InitState() {
        if (this.PlusMinusState != this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus) {
            this.PlusMinusState = this.blotter.AdaptableBlotterStore.TheStore.getState().PlusMinus;
        }
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.PlusMinusStrategyName, ScreenPopups.PlusMinusPopup, StrategyIds.PlusMinusGlyph);
    }
    addContextMenuItem(columnId) {
        if (this.canCreateContextMenuItem(columnId)) {
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(columnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            if (column && column.DataType == Enums_1.DataType.Number) {
                this.createContextMenuItemShowPopup("Create Plus/Minus Rule", ScreenPopups.PlusMinusPopup, StrategyIds.PlusMinusGlyph, "New|" + columnId);
            }
        }
    }
    handleKeyDown(keyEvent) {
        //it's a speacial key so we handle the string representation of the key '
        let keyEventString = Helper_1.Helper.getStringRepresentionFromKey(keyEvent);
        if (keyEventString == "-" || keyEventString == "+") {
            let successfulValues = [];
            let side = 1;
            if (Helper_1.Helper.getStringRepresentionFromKey(keyEvent) == "-") {
                side = -1;
            }
            let columns = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
            let selectedCellInfo = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
            let failedPreventEdits = [];
            let failedWarningEdits = [];
            let warningValues = [];
            for (var keyValuePair of selectedCellInfo.Selection) {
                for (var selectedCell of keyValuePair[1]) {
                    let selectedColumn = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == selectedCell.columnId);
                    if (selectedColumn.DataType == Enums_1.DataType.Number && !selectedColumn.ReadOnly) {
                        //for aggrid as we are getting strings sometimes 
                        if (typeof selectedCell.value != "number") {
                            selectedCell.value = parseFloat(selectedCell.value);
                        }
                        let newValue;
                        //we try to find a condition with an expression for that column that matches the record
                        let columnNudgesWithExpression = this.PlusMinusState.PlusMinusRules.filter(x => x.ColumnId == selectedCell.columnId && !x.IsDefaultNudge);
                        for (let columnNudge of columnNudgesWithExpression) {
                            if (ExpressionHelper_1.ExpressionHelper.checkForExpression(columnNudge.Expression, keyValuePair[0], columns, this.blotter)) {
                                newValue = { Id: keyValuePair[0], ColumnId: selectedCell.columnId, Value: selectedCell.value + (columnNudge.NudgeValue * side) };
                            }
                        }
                        //we havent found any Condition with an Expression so we look for a general one for the column
                        if (!newValue) {
                            let columnNudge = this.PlusMinusState.PlusMinusRules.find(x => x.ColumnId == selectedCell.columnId && x.IsDefaultNudge);
                            if (columnNudge) {
                                newValue = ({ Id: keyValuePair[0], ColumnId: selectedCell.columnId, Value: selectedCell.value + (columnNudge.NudgeValue * side) });
                            }
                            //we havent found a condition so we return - this will allow a minus to be entered into the column
                            else {
                                return;
                            }
                        }
                        //avoid the 0.0000000000x  
                        newValue.Value = parseFloat(newValue.Value.toFixed(12));
                        let dataChangedEvent = {
                            OldValue: Number(selectedCell.value),
                            NewValue: newValue.Value,
                            ColumnId: selectedCell.columnId,
                            IdentifierValue: keyValuePair[0],
                            Timestamp: Date.now(),
                            Record: null
                        };
                        let validationRules = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);
                        if (validationRules.length > 0) {
                            if (validationRules[0].ActionMode == 'Stop Edit') {
                                failedPreventEdits.push(validationRules[0]);
                            }
                            else {
                                failedWarningEdits.push(validationRules[0]);
                                warningValues.push(newValue);
                            }
                        }
                        else {
                            successfulValues.push(newValue);
                        }
                    }
                }
            }
            //Jo : I've added this for agGrid. Shouldnt cause harm and I even think it should have been there since the beginning
            keyEvent.preventDefault();
            // first inform if any failed with prevent
            this.ShowErrorPreventMessage(failedPreventEdits);
            if (failedWarningEdits.length > 0) {
                this.ShowWarningMessages(failedWarningEdits, warningValues, successfulValues, keyEventString);
            }
            else {
                this.ApplyPlusMinus(keyEventString, successfulValues);
            }
        }
    }
    ShowErrorPreventMessage(failedRules) {
        if (failedRules.length > 0) {
            let failedMessages = [];
            failedRules.forEach(fr => {
                let failedMessage = ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(fr, this.blotter, false) + "\n";
                let existingMessage = failedMessages.find(f => f == failedMessage);
                if (existingMessage == null) {
                    failedMessages.push(failedMessage);
                }
            });
            this.blotter.api.alertShowError("Nudge(s) failed rule", failedMessages.toString(), true);
        }
    }
    ShowWarningMessages(failedRules, warningValues, successfulValues, keyEventString) {
        if (failedRules.length > 0) {
            let allValues = warningValues.concat(...successfulValues);
            let warningMessages = [];
            failedRules.forEach(fr => {
                let warningMessage = ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(fr, this.blotter, false) + "\n";
                let existingMessage = warningMessages.find(w => w == warningMessage);
                if (existingMessage == null) {
                    warningMessages.push(warningMessage);
                }
            });
            let warningMessage = failedRules.length + " Nudge(s) failed rule:\n" + warningMessages.toString();
            ;
            let confirmation = {
                CancelText: "Cancel Edit",
                ConfirmationTitle: "Cell Validation Failed",
                ConfirmationMsg: warningMessage,
                ConfirmationText: "Bypass Rule",
                CancelAction: PlusMinusRedux.PlusMinusApply(successfulValues, keyEventString),
                ConfirmAction: PlusMinusRedux.PlusMinusApply(allValues, keyEventString),
                ShowCommentBox: true
            };
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupShowConfirmation(confirmation));
        }
    }
    ApplyPlusMinus(keyEventString, successfulValues) {
        if (successfulValues.length > 0) {
            this.blotter.setValueBatch(successfulValues);
        }
    }
}
exports.PlusMinusStrategy = PlusMinusStrategy;
