import { FlashingCellsStrategy } from '../../Strategy/FlashingCellsStrategy'
import { AdaptableBlotter } from '../AdaptableBlotter'
import { IFlashingCellsStrategy } from '../../Strategy/Interface/IFlashingCellsStrategy'
import * as StyleConstants from '../../Utilities/Constants/StyleConstants'
import { IFlashingCell } from '../../Utilities/Interface/IAdaptableBlotterObjects';
import { IDataChangedInfo } from '../../Api/Interface/IDataChangedInfo';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { ChangeDirection } from '../../Utilities/Services/Interface/IDataService';
import { RowNode, GridOptions } from 'ag-grid-community';

export class FlashingCellStrategyagGrid extends FlashingCellsStrategy implements IFlashingCellsStrategy {
    constructor(blotter: AdaptableBlotter) {
        super(blotter)
        this.currentFlashing = new Map()
    }
    private currentFlashing: Map<any, number>


    protected shouldHandleDataSourceChanged(): boolean {
        return false;
    }

    protected FlashCell(dataChangedInfo: IDataChangedInfo, flashingCell: IFlashingCell): void {
        // dont handle 
    }

    protected InitState() {
        if (this.FlashingCellState != this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell) {
            this.FlashingCellState = this.blotter.AdaptableBlotterStore.TheStore.getState().FlashingCell;

            let numericColumns = ColumnHelper.getNumericColumns(this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            let theBlotter = this.blotter as AdaptableBlotter
            let currentFlashing = this.currentFlashing

            numericColumns.forEach(col => {
                let fc = this.FlashingCellState.FlashingCells.find(x => x.ColumnId == col.ColumnId && x.IsLive)
                let index = this.FlashingCellState.FlashingCells.indexOf(fc)
                let cellClassRules: any = {};
                if (fc) {
                    cellClassRules[StyleConstants.FLASH_UP_STYLE + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let rowNode: RowNode = params.node;
                        let test: GridOptions = theBlotter.BlotterOptions.vendorGrid as GridOptions;
                     //   test.api.disp
                     // need to find way of seeing if row is visilbe
                 //    test.api.row
                        let key = primaryKey + col.ColumnId + "up";
                        let currentFlashTimer = currentFlashing.get(key)
                        if (currentFlashTimer) {
                            return true;
                        }

                        let oldValue = theBlotter.DataService.GetPreviousColumnValue(col.ColumnId, primaryKey, params.value, ChangeDirection.Up);
                        if (oldValue && params.value > oldValue) {
                    //        console.log("tick up for " + primaryKey)
                            if (currentFlashTimer) {
                                window.clearTimeout(currentFlashTimer)
                            }
                            let timer: number = window.setTimeout(() => {
                                currentFlashing.set(key, null)
                                theBlotter.refreshCells(params.node, [col.ColumnId])
                            }, fc.FlashingCellDuration)
                            currentFlashing.set(key, timer)
                            return true
                        } else {
                            return false;
                        }
                    }


                    cellClassRules[StyleConstants.FLASH_DOWN_STYLE + index] = function (params: any) {
                        let primaryKey = theBlotter.getPrimaryKeyValueFromRecord(params.node)
                        let key = primaryKey + col.ColumnId + "down";
                        let currentFlashTimer = currentFlashing.get(key)
                        if (currentFlashTimer) {
                            return true;
                        }
                        let oldValue = theBlotter.DataService.GetPreviousColumnValue(col.ColumnId, primaryKey, params.value, ChangeDirection.Down);
                        if (oldValue && params.value < oldValue) {
                      //      console.log("tick down for primarykey: " + primaryKey)
                            if (currentFlashTimer) {
                                window.clearTimeout(currentFlashTimer)
                            }
                            let timer: any = window.setTimeout(() => {
                                currentFlashing.set(key, null);
                                theBlotter.refreshCells(params.node, [col.ColumnId])
                            }, fc.FlashingCellDuration)
                            currentFlashing.set(key, timer)
                             return true
                        } else {
                            return false
                        }
                    }
                }
                theBlotter.setCellClassRules(cellClassRules, col.ColumnId, "FlashingCell");
            })
        }
    }
}
