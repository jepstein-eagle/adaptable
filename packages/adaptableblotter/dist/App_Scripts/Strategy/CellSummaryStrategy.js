"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
const ArrayExtensions_1 = require("../Utilities/Extensions/ArrayExtensions");
const Helper_1 = require("../Utilities/Helpers/Helper");
class CellSummaryStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.CellSummaryStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.CellSummaryStrategyName, ScreenPopups.CellSummaryPopup, StrategyConstants.CellSummaryGlyph);
    }
    InitState() {
        if (this.CellSummaryState != this.blotter.api.cellSummaryApi.getCellSummaryState()) {
            this.CellSummaryState = this.blotter.api.cellSummaryApi.getCellSummaryState();
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.CellSummary, this.CellSummaryState);
            }
        }
    }
    CreateCellSummary(selectedCellInfo) {
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
                        let valueAsNumber = Number(value);
                        // possible that its not a number despite it being a numeric column
                        if (!isNaN(Number(valueAsNumber))) {
                            numericValues.push(valueAsNumber);
                        }
                    }
                }
            });
            let hasNumericColumns = numericValues.length > 0;
            let distinctCount = ArrayExtensions_1.ArrayExtensions.RetrieveDistinct(allValues).length;
            selectedCellSummary = {
                Sum: (hasNumericColumns) ? Helper_1.Helper.RoundNumberTo4dp(this.sumNumberArray(numericValues)) : "",
                Average: (hasNumericColumns) ? Helper_1.Helper.RoundNumberTo4dp(this.meanNumberArray(numericValues)) : "",
                Median: (hasNumericColumns) ? Helper_1.Helper.RoundNumberTo4dp(this.medianNumberArray(numericValues)) : "",
                Distinct: distinctCount,
                Max: (hasNumericColumns) ? Helper_1.Helper.RoundNumberTo4dp(Math.max(...numericValues)) : "",
                Min: (hasNumericColumns) ? Helper_1.Helper.RoundNumberTo4dp(Math.min(...numericValues)) : "",
                Count: allValues.length,
                Only: this.calculateOnly(distinctCount, allValues),
                VWAP: this.calculateVwap(numericValues, numericColumns)
            };
        }
        return selectedCellSummary;
    }
    sumNumberArray(numericValues) {
        return numericValues.reduce(function (a, b) { return a + b; }, 0);
    }
    meanNumberArray(numericValues) {
        return this.sumNumberArray(numericValues) / numericValues.length;
    }
    medianNumberArray(numericValues) {
        // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
        var median = 0, numsLen = numericValues.length;
        numericValues.sort();
        if (numsLen % 2 === 0 // is even
        ) {
            // average of two middle numbers
            median = (numericValues[numsLen / 2 - 1] + numericValues[numsLen / 2]) / 2;
        }
        else { // is odd
            // middle number only
            median = numericValues[(numsLen - 1) / 2];
        }
        return median;
    }
    calculateOnly(distinctCount, allValues) {
        if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(this.CellSummaryState.OptionalSummaryOperations, Enums_1.CellSummaryOptionalOperation.Only)) {
            return null;
        }
        return (distinctCount == 1) ? allValues[0] : "";
    }
    calculateVwap(numericValues, numericColumns) {
        if (ArrayExtensions_1.ArrayExtensions.NotContainsItem(this.CellSummaryState.OptionalSummaryOperations, Enums_1.CellSummaryOptionalOperation.VWAP)) {
            return null;
        }
        if (numericColumns.length == 2) {
            return "";
        }
        let firstColValues = [];
        let secondColComputedValues = [];
        for (var i = 0; i < numericValues.length; i++) {
            if (i % 2 === 0) { // index is odd
                firstColValues.push(numericValues[i]);
            }
            else {
                let newValue = (numericValues[i] * numericValues[i - 1]);
                secondColComputedValues.push(newValue);
            }
        }
        let firstColTotal = this.sumNumberArray(firstColValues);
        let secondColTotal = this.sumNumberArray(secondColComputedValues);
        let result = Helper_1.Helper.RoundNumberTo4dp((secondColTotal / firstColTotal));
        return result;
    }
}
exports.CellSummaryStrategy = CellSummaryStrategy;
