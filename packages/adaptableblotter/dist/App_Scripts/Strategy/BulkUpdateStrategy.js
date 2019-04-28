"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
const PreviewHelper_1 = require("../Utilities/Helpers/PreviewHelper");
class BulkUpdateStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.BulkUpdateStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.BulkUpdateStrategyName, ScreenPopups.BulkUpdatePopup, StrategyConstants.BulkUpdateGlyph);
    }
    InitState() {
        if (this.BulkUpdateState != this.GetBulkUpdateState()) {
            this.BulkUpdateState = this.GetBulkUpdateState();
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.BulkUpdate, this.BulkUpdateState);
            }
        }
    }
    ApplyBulkUpdate(newValues) {
        // this.AuditFunctionAction("ApplyBulkUpdate", "", { BulkUpdateValue: this.GetBulkUpdateState().BulkUpdateValue, NewValues: newValues })
        this.blotter.setValueBatch(newValues);
    }
    CheckCorrectCellSelection() {
        let selectedCellInfo = this.blotter.adaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
        if (selectedCellInfo == null || selectedCellInfo.Selection.size == 0) {
            return {
                Alert: {
                    Header: "Bulk Update Error",
                    Msg: "No cells are selected.\nPlease select some cells.",
                    MessageType: Enums_1.MessageType.Error,
                    ShowAsPopup: true
                }
            };
        }
        if (selectedCellInfo.Columns.length != 1) {
            return {
                Alert: {
                    Header: "Bulk Update Error",
                    Msg: "Bulk Update only supports single column edit.\nPlease adjust cell selection.",
                    MessageType: Enums_1.MessageType.Error,
                    ShowAsPopup: true
                }
            };
        }
        if (selectedCellInfo.Columns[0].ReadOnly) {
            return {
                Alert: {
                    Header: "Bulk Update Error",
                    Msg: "Bulk Update is not permitted on readonly columns.\nPlease adjust the cell selection.",
                    MessageType: Enums_1.MessageType.Error,
                    ShowAsPopup: true
                }
            };
        }
        return { ActionReturn: true };
    }
    BuildPreviewValues(bulkUpdateValue) {
        let selectedCells = this.blotter.adaptableBlotterStore.TheStore.getState().Grid.SelectedCellInfo;
        let previewResults = [];
        let columnId = "";
        if (selectedCells != null && selectedCells.Columns.length > 0) {
            columnId = selectedCells.Columns[0].ColumnId;
            let typedBulkUpdateValue;
            switch (selectedCells.Columns[0].DataType) {
                case Enums_1.DataType.Number:
                    typedBulkUpdateValue = Number(bulkUpdateValue);
                    break;
                case Enums_1.DataType.String:
                    typedBulkUpdateValue = bulkUpdateValue;
                    break;
                case Enums_1.DataType.Date:
                    typedBulkUpdateValue = new Date(bulkUpdateValue);
                    break;
            }
            for (let pair of selectedCells.Selection) {
                for (let selectedCell of pair[1]) {
                    let dataChangedEvent = {
                        OldValue: selectedCell.value,
                        NewValue: typedBulkUpdateValue,
                        ColumnId: selectedCell.columnId,
                        IdentifierValue: pair[0],
                        Record: null
                    };
                    let validationRules = this.blotter.ValidationService.ValidateCellChanging(dataChangedEvent);
                    let previewResult = { Id: pair[0], InitialValue: selectedCell.value, ComputedValue: typedBulkUpdateValue, ValidationRules: validationRules };
                    previewResults.push(previewResult);
                }
            }
        }
        return {
            ColumnId: columnId,
            PreviewResults: previewResults,
            PreviewValidationSummary: PreviewHelper_1.PreviewHelper.GetPreviewValidationSummary(previewResults)
        };
    }
    GetBulkUpdateState() {
        return this.blotter.adaptableBlotterStore.TheStore.getState().BulkUpdate;
    }
}
exports.BulkUpdateStrategy = BulkUpdateStrategy;
