"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
const math = require("mathjs");
class SelectedCellsStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.SelectedCellsStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.SelectedCellsStrategyName, ScreenPopups.SelectedCellsPopup, StrategyGlyphs.SelectedCellsGlyph);
    }
    CreateSelectedCellSummary(selectedCellInfo) {
        let selectedCellSummary;
        if (selectedCellInfo && selectedCellInfo.Selection.size > 0) {
            let numericValues = [];
            let allValues = [];
            let numericColumns = [];
            selectedCellInfo.Columns.map((c, index) => {
                if (c.DataType == Enums_1.DataType.Number) {
                    numericColumns.push(index);
                }
            });
            selectedCellInfo.Selection.forEach(selectedCells => {
                let i;
                for (i = 0; i < selectedCells.length; i++) {
                    let selectedCell = selectedCells[i];
                    let value = selectedCell.value;
                    allValues.push(value);
                    if (numericColumns.indexOf(i) != -1) {
                        // possible that its not a number despite it being a numeric column
                        if (!isNaN(Number(value))) {
                            numericValues.push(value);
                        }
                    }
                }
            });
            let hasNumericColumns = numericValues.length > 0;
            let distinct = ArrayExtensions_1.ArrayExtensions.RetrieveDistinct(allValues).length;
            selectedCellSummary = {
                Sum: (hasNumericColumns) ? math.round(math.sum(numericValues), 4) : "",
                Average: (hasNumericColumns) ? math.round(math.mean(numericValues), 4) : "",
                Median: (hasNumericColumns) ? math.round(math.median(numericValues), 4) : "",
                Distinct: distinct,
                Max: (hasNumericColumns) ? math.round(math.max(numericValues), 4) : "",
                Min: (hasNumericColumns) ? math.round(math.min(numericValues), 4) : "",
                Count: allValues.length,
                Only: (distinct == 1) ? allValues[0] : "",
                VWAP: (numericColumns.length == 2) ? this.calculateVwap(numericValues) : ""
            };
        }
        return selectedCellSummary;
    }
    calculateVwap(numericValues) {
        let firstColValues = [];
        let secondColComputedValues = [];
        for (var i = 0; i < numericValues.length; i++) {
            if (i % 2 === 0) { // index is odd
                firstColValues.push(numericValues[i]);
            }
            else {
                let newValue = math.multiply(numericValues[i], numericValues[i - 1]);
                secondColComputedValues.push(newValue);
            }
        }
        let firstColTotal = math.sum(firstColValues);
        let secondColTotal = math.sum(secondColComputedValues);
        let result = math.round(math.divide(secondColTotal, firstColTotal), 4);
        return result;
    }
}
exports.SelectedCellsStrategy = SelectedCellsStrategy;
