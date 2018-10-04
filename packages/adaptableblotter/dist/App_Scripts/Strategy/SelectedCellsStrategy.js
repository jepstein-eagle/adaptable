"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
class SelectedCellsStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.SelectedCellsStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.SelectedCellsStrategyName, ScreenPopups.SelectedCellsPopup, StrategyIds.SelectedCellsGlyph);
    }
    InitState() {
        if (this.SelectedCellsState != this.blotter.AdaptableBlotterStore.TheStore.getState().SelectedCells) {
            this.SelectedCellsState = this.blotter.AdaptableBlotterStore.TheStore.getState().SelectedCells;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.SelectedCells, this.SelectedCellsState);
            }
        }
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
                Sum: (hasNumericColumns) ? this.roundNumberToFourPlaces(this.sumNumberArray(numericValues)) : "",
                Average: (hasNumericColumns) ? this.roundNumberToFourPlaces(this.meanNumberArray(numericValues)) : "",
                Median: (hasNumericColumns) ? this.roundNumberToFourPlaces(this.medianNumberArray(numericValues)) : "",
                Distinct: distinct,
                Max: (hasNumericColumns) ? this.roundNumberToFourPlaces(Math.max(...numericValues)) : "",
                Min: (hasNumericColumns) ? this.roundNumberToFourPlaces(Math.min(...numericValues)) : "",
                Count: allValues.length,
                Only: (distinct == 1) ? allValues[0] : "",
                VWAP: (numericColumns.length == 2) ? this.calculateVwap(numericValues) : ""
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
    roundNumberToFourPlaces(numberToRound) {
        return Math.round(numberToRound * 10000) / 10000;
    }
    calculateVwap(numericValues) {
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
        let result = this.roundNumberToFourPlaces((secondColTotal / firstColTotal));
        return result;
    }
}
exports.SelectedCellsStrategy = SelectedCellsStrategy;
