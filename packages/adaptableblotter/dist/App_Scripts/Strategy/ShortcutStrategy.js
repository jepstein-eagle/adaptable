"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const ShortcutRedux = require("../Redux/ActionsReducers/ShortcutRedux");
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
const Helper_1 = require("../Core/Helpers/Helper");
const Enums_1 = require("../Core/Enums");
const Enums_2 = require("../Core/Enums");
const ObjectFactory_1 = require("../Core/ObjectFactory");
class ShortcutStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ShortcutStrategyId, blotter);
        blotter.onKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent));
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ShortcutStrategyName, ScreenPopups.ShortcutPopup, StrategyGlyphs.ShortcutGlyph);
    }
    InitState() {
        if (this.Shortcuts != this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.Shortcuts) {
            this.Shortcuts = this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut.Shortcuts;
        }
    }
    handleKeyDown(keyEvent) {
        if (this.Shortcuts && this.Shortcuts.length == 0) {
            return;
        }
        let activeCell = this.blotter.getActiveCell();
        if (!activeCell) {
            return;
        }
        let selectedColumn = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == activeCell.ColumnId);
        if (activeCell && !selectedColumn.ReadOnly) {
            let columnDataType = selectedColumn.DataType;
            let keyEventString = Helper_1.Helper.getStringRepresentionFromKey(keyEvent);
            let activeShortcut;
            let valueToReplace;
            switch (columnDataType) {
                case Enums_1.DataType.Number: {
                    activeShortcut = this.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Number).find(x => keyEventString == x.ShortcutKey.toLowerCase());
                    if (activeShortcut) {
                        let currentCellValue;
                        // Another complication is that the cell might have been edited or not, so we need to work out which method to use...
                        if (this.blotter.gridHasCurrentEditValue()) {
                            currentCellValue = this.blotter.getCurrentCellEditValue();
                            valueToReplace = this.CalculateShortcut(currentCellValue, activeShortcut.ShortcutResult, activeShortcut.ShortcutOperation);
                        }
                        else {
                            currentCellValue = activeCell.Value;
                            valueToReplace = this.CalculateShortcut(currentCellValue, activeShortcut.ShortcutResult, activeShortcut.ShortcutOperation);
                        }
                    }
                    break;
                }
                case Enums_1.DataType.Date: {
                    activeShortcut = this.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Date).find(x => keyEventString == x.ShortcutKey.toLowerCase());
                    if (activeShortcut) {
                        // Date we ONLY replace so dont need to worry about replacing values
                        if (activeShortcut.IsDynamic) {
                            valueToReplace = this.blotter.CalendarService.GetDynamicDate(activeShortcut.ShortcutResult);
                        }
                        else {
                            valueToReplace = new Date(activeShortcut.ShortcutResult);
                        }
                    }
                    break;
                }
            }
            if (activeShortcut) {
                let dataChangedEvent = {
                    OldValue: activeCell.Value,
                    NewValue: valueToReplace,
                    ColumnId: activeCell.ColumnId,
                    IdentifierValue: activeCell.Id,
                    Timestamp: Date.now(),
                    Record: null
                };
                let validationRules = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);
                let hasErrorPrevent = validationRules.length > 0 && validationRules[0].ActionMode == Enums_1.ActionMode.StopEdit;
                let hasErrorWarning = validationRules.length > 0 && validationRules[0].ActionMode == Enums_1.ActionMode.WarnUser;
                //   this.AuditFunctionAction("HandleKeyDown",                     "Key Pressed: " + keyEventString,                     { Shortcut: activeShortcut, PrimaryKey: activeCell.Id, ColumnId: activeCell.ColumnId })
                //We cancel the edit before doing anything so there is no issue when showing a popup or performing the shortcut
                this.blotter.cancelEdit();
                if (hasErrorPrevent) {
                    this.ShowErrorPreventMessage(validationRules[0]);
                }
                else {
                    if (hasErrorWarning) {
                        this.ShowWarningMessages(validationRules, activeShortcut, activeCell, keyEventString, valueToReplace, dataChangedEvent.OldValue);
                    }
                    else {
                        this.ApplyShortcut(activeCell, valueToReplace);
                    }
                }
                // useful feature - prevents the main thing happening you want to on the keypress.
                keyEvent.preventDefault();
            }
        }
    }
    CalculateShortcut(first, second, shortcutOperation) {
        let firstNumber = Number(first);
        let secondNumber = Number(second);
        switch (shortcutOperation) {
            case Enums_2.MathOperation.Add:
                return firstNumber + secondNumber;
            case Enums_2.MathOperation.Subtract:
                return (firstNumber - secondNumber);
            case Enums_2.MathOperation.Multiply:
                return (firstNumber * secondNumber);
            case Enums_2.MathOperation.Divide:
                return (firstNumber / secondNumber);
            case Enums_2.MathOperation.Replace:
                return secondNumber;
        }
    }
    ApplyShortcut(activeCell, newValue) {
        this.blotter.setValueBatch([{ Id: activeCell.Id, ColumnId: activeCell.ColumnId, Value: newValue }]);
    }
    ShowErrorPreventMessage(failedRule) {
        this.blotter.api.alertShowError("Shortcut Failed", ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(failedRule, this.blotter), true);
    }
    ShowWarningMessages(failedRules, shortcut, activeCell, keyEventString, newValue, oldValue) {
        let warningMessage = "";
        failedRules.forEach(f => {
            warningMessage = warningMessage + ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(f, this.blotter) + "\n";
        });
        let confirmation = {
            CancelText: "Cancel Edit",
            ConfirmationTitle: "Cell Validation Failed",
            ConfirmationMsg: warningMessage,
            ConfirmationText: "Bypass Rule",
            //We cancel the edit before applying the shortcut so if cancel then there is nothing to do
            CancelAction: null,
            ConfirmAction: ShortcutRedux.ShortcutApply(shortcut, activeCell, keyEventString, newValue),
            ShowCommentBox: true
        };
        this.blotter.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupShowConfirmation(confirmation));
    }
}
exports.ShortcutStrategy = ShortcutStrategy;
