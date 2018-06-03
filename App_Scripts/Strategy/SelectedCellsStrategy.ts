import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import * as MenuRedux from '../Redux/ActionsReducers/MenuRedux'
import * as GridRedux from '../Redux/ActionsReducers/GridRedux'
import { ISelectedCellsStrategy, ISelectedCellInfo, ISelectedCellSummmary, ISelectedCell } from "../Strategy/Interface/ISelectedCellsStrategy";
import { DataType } from '../Core/Enums';
import { ArrayExtensions } from '../Core/Extensions/ArrayExtensions';
import * as math from 'mathjs'


export class SelectedCellsStrategy extends AdaptableStrategyBase implements ISelectedCellsStrategy {

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.SelectedCellsStrategyId, blotter)
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.SelectedCellsStrategyName, ScreenPopups.SelectedCellsPopup, StrategyGlyphs.SelectedCellsGlyph);
    }

   public CreateSelectedCellSummary(selectedCellInfo: ISelectedCellInfo): ISelectedCellSummmary {
        let numericValues: number[] = []
        let allValues: any[] = []
        let numericColumns: number[] = []
    
        if (selectedCellInfo.Selection.size > 0) {
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
                        numericValues.push(value)
                    }
                }
            })
        }
        let hasNumericColumns: boolean = numericColumns.length > 0;
        let selectedCellSummary: ISelectedCellSummmary = {
            Sum: (hasNumericColumns) ? math.round(math.sum(numericValues), 4) : "N/A",
            Average: (hasNumericColumns) ? math.round(math.mean(numericValues), 4) : "N/A",
            Mode: (allValues.length > 0) ? math.mode(allValues).join(",") : "N/A",
            Median: (hasNumericColumns) ? math.round(math.median(numericValues), 4) : "N/A",
            Distinct: ArrayExtensions.RetrieveDistinct(allValues).length,
            Max: (hasNumericColumns) ? math.round(math.max(numericValues), 4) : "N/A",
            Min: (hasNumericColumns) ? math.round(math.min(numericValues), 4) : "N/A",
            Count: allValues.length,
        
        }
        return selectedCellSummary;
    }
}