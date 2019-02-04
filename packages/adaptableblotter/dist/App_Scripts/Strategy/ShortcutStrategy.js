"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const ShortcutRedux = require("../Redux/ActionsReducers/ShortcutRedux");
const Enums_1 = require("../Utilities/Enums");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const ColumnHelper_1 = require("../Utilities/Helpers/ColumnHelper");
const Helper_1 = require("../Utilities/Helpers/Helper");
const ObjectFactory_1 = require("../Utilities/ObjectFactory");
const CellValidationHelper_1 = require("../Utilities/Helpers/CellValidationHelper");
class ShortcutStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ShortcutStrategyId, blotter);
        blotter.onKeyDown().Subscribe((sender, keyEvent) => this.handleKeyDown(keyEvent));
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ShortcutStrategyName, ScreenPopups.ShortcutPopup, StrategyConstants.ShortcutGlyph);
    }
    InitState() {
        if (this.ShortcutState != this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut) {
            this.ShortcutState = this.blotter.AdaptableBlotterStore.TheStore.getState().Shortcut;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Shortcut, this.ShortcutState);
            }
        }
    }
    handleKeyDown(keyEvent) {
        if (this.ShortcutState.Shortcuts && ArrayExtensions_1.ArrayExtensions.IsEmpty(this.ShortcutState.Shortcuts)) {
            return;
        }
        let activeCell = this.blotter.getActiveCell();
        if (!activeCell) {
            return;
        }
        let selectedColumn = ColumnHelper_1.ColumnHelper.getColumnFromId(activeCell.ColumnId, this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
        if (activeCell && !selectedColumn.ReadOnly) {
            let columnDataType = selectedColumn.DataType;
            let keyEventString = Helper_1.Helper.getStringRepresentionFromKey(keyEvent);
            let activeShortcut;
            let valueToReplace;
            switch (columnDataType) {
                case Enums_1.DataType.Number: {
                    activeShortcut = this.ShortcutState.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Number).find(x => keyEventString == x.ShortcutKey.toLowerCase());
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
                    activeShortcut = this.ShortcutState.Shortcuts.filter(s => s.ColumnType == Enums_1.DataType.Date).find(x => keyEventString == x.ShortcutKey.toLowerCase());
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
            case Enums_1.MathOperation.Add:
                return firstNumber + secondNumber;
            case Enums_1.MathOperation.Subtract:
                return (firstNumber - secondNumber);
            case Enums_1.MathOperation.Multiply:
                return (firstNumber * secondNumber);
            case Enums_1.MathOperation.Divide:
                return (firstNumber / secondNumber);
            case Enums_1.MathOperation.Replace:
                return secondNumber;
        }
    }
    ApplyShortcut(activeCell, newValue) {
        this.blotter.setValueBatch([{ Id: activeCell.Id, ColumnId: activeCell.ColumnId, Value: newValue }]);
    }
    ShowErrorPreventMessage(failedRule) {
        this.blotter.api.alertApi.ShowError("Shortcut Failed", ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(failedRule, this.blotter), true);
    }
    ShowWarningMessages(failedRules, shortcut, activeCell, keyEventString, newValue, oldValue) {
        let warningMessage = "";
        failedRules.forEach(f => {
            warningMessage = warningMessage + ObjectFactory_1.ObjectFactory.CreateCellValidationMessage(f, this.blotter) + "\n";
        });
        let confirmAction = ShortcutRedux.ShortcutApply(shortcut, activeCell, keyEventString, newValue);
        let cancelAction = null;
        let confirmation = CellValidationHelper_1.CellValidationHelper.createCellValidationUIConfirmation(confirmAction, cancelAction, warningMessage);
        this.blotter.api.internalApi.PopupShowConfirmation(confirmation);
    }
}
exports.ShortcutStrategy = ShortcutStrategy;
