import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { ISelectedCellsStrategy, ISelectedCellInfo, ISelectedCellSummmary, ISelectedCell } from "./Interface/ISelectedCellsStrategy";
import { DataType, StateChangedTrigger } from '../Utilities/Enums';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { SelectedCellsState } from '../Redux/ActionsReducers/Interface/IState';

export class SelectedCellsStrategy extends AdaptableStrategyBase implements ISelectedCellsStrategy {
    private SelectedCellsState: SelectedCellsState
   

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.SelectedCellsStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.SelectedCellsStrategyName, ScreenPopups.SelectedCellsPopup, StrategyConstants.SelectedCellsGlyph);
    }

    protected InitState() {
        if (this.SelectedCellsState != this.blotter.AdaptableBlotterStore.TheStore.getState().SelectedCells) {
            this.SelectedCellsState = this.blotter.AdaptableBlotterStore.TheStore.getState().SelectedCells;
       
            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.SelectedCells, this.SelectedCellsState)
            }
         }
    }

    public CreateSelectedCellSummary(selectedCellInfo: ISelectedCellInfo): ISelectedCellSummmary {
        let selectedCellSummary: ISelectedCellSummmary;

        if (selectedCellInfo && selectedCellInfo.Selection.size > 0) {
            let numericValues: number[] = []
            let allValues: any[] = []
            let numericColumns: number[] = []

            selectedCellInfo.Columns.map((c, index) => {
                if (c.DataType == DataType.Number) {
                    numericColumns.push(index)
                }
            })

            selectedCellInfo.Selection.forEach(selectedCells => {
                let i: number
                for (i = 0; i < selectedCells.length; i++) {
                    let selectedCell: ISelectedCell = selectedCells[i];
                    let value = selectedCell.value;
                    allValues.push(value);

                    if (numericColumns.indexOf(i) != -1) {
                        // possible that its not a number despite it being a numeric column
                        if (!isNaN(Number(value))) {
                            numericValues.push(value)
                        }
                    }
                }
            })

            let hasNumericColumns: boolean = numericValues.length > 0;
            let distinct = ArrayExtensions.RetrieveDistinct(allValues).length;
            selectedCellSummary = {
                Sum: (hasNumericColumns) ? this.roundNumberToFourPlaces(this.sumNumberArray(numericValues)) : "",
                Average: (hasNumericColumns) ? this.roundNumberToFourPlaces(this.meanNumberArray(numericValues)) : "",
                Median: (hasNumericColumns) ?this.roundNumberToFourPlaces(this.medianNumberArray(numericValues)) : "",
                Distinct: distinct,
                Max: (hasNumericColumns) ? this.roundNumberToFourPlaces(Math.max(...numericValues)) : "",
                Min: (hasNumericColumns) ? this.roundNumberToFourPlaces(Math.min(...numericValues)) : "",
                Count: allValues.length,
                Only: (distinct == 1) ? allValues[0] : "",
                VWAP: (numericColumns.length == 2) ? this.calculateVwap(numericValues) : ""
            }
        }
        return selectedCellSummary;
    }

    private sumNumberArray(numericValues: number[]): number {
        return numericValues.reduce(function (a, b) { return a + b; }, 0);
    }

    private meanNumberArray(numericValues: number[]): number {
        return this.sumNumberArray(numericValues) / numericValues.length;
    }
    
    private  medianNumberArray(numericValues: number[]): number {
        // median of [3, 5, 4, 4, 1, 1, 2, 3] = 3
        var median = 0, numsLen = numericValues.length;
        numericValues.sort();
     
        if (
            numsLen % 2 === 0 // is even
        ) {
            // average of two middle numbers
            median = (numericValues[numsLen / 2 - 1] + numericValues[numsLen / 2]) / 2;
        } else { // is odd
            // middle number only
            median = numericValues[(numsLen - 1) / 2];
        }
     
        return median;
    }
    
    private roundNumberToFourPlaces(numberToRound: any,):number{
        return Math.round(numberToRound * 10000) / 10000;
    }

    
    private calculateVwap(numericValues: number[]): any {
        let firstColValues: number[] = []
        let secondColComputedValues: number[] = []
        for (var i = 0; i < numericValues.length; i++) {
            if (i % 2 === 0) { // index is odd
                firstColValues.push(numericValues[i]);
            } else {
                let newValue: any = (numericValues[i] * numericValues[i - 1]);
                secondColComputedValues.push(newValue)
            }
        }
        let firstColTotal: number = this.sumNumberArray(firstColValues)
        let secondColTotal: number = this.sumNumberArray(secondColComputedValues)
        let result: any = this.roundNumberToFourPlaces((secondColTotal/firstColTotal))
        return result;
    }
}