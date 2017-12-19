import { MenuItemShowPopup } from '../Core/MenuItem'
import { AdaptableStrategyBase } from '../Core/AdaptableStrategyBase'
import * as StrategyIds from '../Core/StrategyIds'
import { IMenuItem } from '../Core/Interface/IStrategy'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as RangeRedux from '../Redux/ActionsReducers/RangeRedux'
import { IExportStrategy, IRange } from '../Core/Interface/IExportStrategy'
import { MenuType, RangeScope, ExportDestination } from '../Core/Enums';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { Helper } from '../Core/Helper';
import { RangeHelper } from '../Core/Services/RangeHelper';
import { Expression } from '../Core/Expression/Expression'
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { OpenfinHelper } from '../Core/OpenfinHelper';
import * as _ from 'lodash'
import { RangeState } from '../Redux/ActionsReducers/Interface/IState';
import { iPushPullHelper } from '../Core/iPushPullHelper';
export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {

    private RangeState: RangeState
    private isSendingData = false
    private workAroundOpenfinExcelDataDimension: Map<string, { x: number, y: number }> = new Map()

    private throttledRecomputeAndSendLiveExcelEvent = _.throttle(() => this.sendNewDataToLiveExcel(), 2000);

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ExportStrategyId, blotter)
        this.menuItemConfig = this.createMenuItemShowPopup("Export", 'ExportAction', MenuType.ActionPopup, "export");
        OpenfinHelper.OnExcelDisconnected().Subscribe((sender, event) => {
            console.log("Excel closed stopping all Live Excel");
        })
        OpenfinHelper.OnWorkbookDisconnected().Subscribe((sender, workbook) => {
            console.log("Workbook closed:" + workbook.name + ", Stopping Openfin Live Excel");
            let liveRange = this.RangeState.CurrentLiveRanges.find(x => x.WorkbookName == workbook.name)
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                RangeRedux.RangeStopLive(liveRange.Range, ExportDestination.OpenfinExcel));
        })
        OpenfinHelper.OnWorkbookSaved().Subscribe((sender, workbookSavedEvent) => {
            console.log("Workbook Saved", workbookSavedEvent);
            let liveRange = this.RangeState.CurrentLiveRanges.find(x => x.WorkbookName == workbookSavedEvent.OldName)
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                RangeRedux.RangeStopLive(liveRange.Range, ExportDestination.OpenfinExcel));
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                RangeRedux.RangeStartLive(liveRange.Range, workbookSavedEvent.NewName, ExportDestination.OpenfinExcel));
        })
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, event) => {
            this.throttledRecomputeAndSendLiveExcelEvent()
        })
        this.blotter.onRefresh().Subscribe((sender, event) => {
            this.throttledRecomputeAndSendLiveExcelEvent()
        })
        this.blotter.onSelectedCellsChanged().Subscribe((sender, event) => {
            if (this.RangeState) {
                let liveRange = this.RangeState.CurrentLiveRanges.find(x => x.Range == RangeHelper.SELECTED_CELLS_RANGE)
                if (liveRange) {
                    this.throttledRecomputeAndSendLiveExcelEvent()
                }
            }
        })
    }

    private sendNewDataToLiveExcel() {
        //we wait for the last sendNewDataToLiveExcel to finish
        if (this.isSendingData == true) {
            this.throttledRecomputeAndSendLiveExcelEvent()
            return
        }
        if (this.RangeState && this.RangeState.CurrentLiveRanges.length > 0) {
            this.isSendingData = true
            let ippStyle = this.blotter.getIPPStyle()
            let promises: Promise<any>[] = []
            this.RangeState.CurrentLiveRanges.forEach(cle => {
                if (cle.ExportDestination == ExportDestination.OpenfinExcel) {
                    promises.push(
                        Promise.resolve().then(() => {
                            return new Promise<any>((resolve, reject) => {
                                //we want to erase old cells in case we are sending less data
                                //we don't want to call clearCellContent as it makes the excel sheet to blink
                                //and also is incorrrect as until we call setcells again we've lost all values in excel which might upset
                                //some macros
                                let previousDimension = this.workAroundOpenfinExcelDataDimension.get(cle.Range)
                                let rangeAsArray: any[] = this.ConvertRangetoArray(cle.Range);
                                let newDimension = { x: rangeAsArray[0].length, y: rangeAsArray.length }
                                if (previousDimension) {
                                    let missingNumberOfRows = previousDimension.y - newDimension.y
                                    let missingNumberOfColumns = previousDimension.x - newDimension.x
                                    if (missingNumberOfRows > 0) {
                                        for (let i = 0; i < missingNumberOfRows; i++) {
                                            let newRow = []
                                            for (let j = 0; j < newDimension.x; j++) {
                                                newRow.push(null)
                                            }
                                            rangeAsArray.push(newRow)
                                        }
                                    }
                                    if (missingNumberOfColumns > 0) {
                                        //missing column
                                        rangeAsArray.forEach(row => {
                                            for (let j = 0; j < missingNumberOfColumns; j++) {
                                                row.push(null)
                                            }
                                        })
                                    }
                                }
                                if (rangeAsArray) {
                                    this.workAroundOpenfinExcelDataDimension.set(cle.Range, newDimension)
                                    resolve(rangeAsArray);
                                } else {
                                    reject();
                                }
                            })
                        }).then((rangeAsArray) => {
                            return OpenfinHelper.pushData(cle.WorkbookName, rangeAsArray)
                        })
                        // .catch(() => {
                        //     console.log("Live Excel failed to send data:" + cle.Range)
                        // })
                    )
                }
                else if (cle.ExportDestination == ExportDestination.iPushPull) {
                    //we there is no logic related to the range so we want to get it only one time
                    if (!ippStyle) {
                        ippStyle = this.blotter.getIPPStyle()
                    }
                    promises.push(
                        Promise.resolve().then(() => {
                            return new Promise<any>((resolve, reject) => {
                                let rangeAsArray: any[] = this.ConvertRangetoArray(cle.Range);
                                if (rangeAsArray) {
                                    resolve(rangeAsArray);
                                } else {
                                    reject();
                                }
                            })
                        }).then((rangeAsArray) => {
                            return iPushPullHelper.pushData(cle.WorkbookName, rangeAsArray, ippStyle)
                        })
                        // .catch(() => {
                        //     console.log("Live Excel failed to send data:" + cle.Range)
                        // })
                    )
                }
            })
            Promise.all(promises).then(() => {
                console.log("All Data Sent")
                this.isSendingData = false
            }).catch(() => {
                console.log("One live Excel failed to send data")
                this.isSendingData = false
            })
        }
    }

    public Export(rangeName: string, exportDestination: ExportDestination, folder?: string, page?: string): void {
        switch (exportDestination) {
            case ExportDestination.Clipboard:
                this.copyToClipboard(rangeName);
                break;
            case ExportDestination.CSV:
                this.convertRangetoCsv(rangeName);
                break;
            case ExportDestination.OpenfinExcel:
                OpenfinHelper.initOpenFinExcel()//.then((workbook) => OpenfinHelper.addRangeWorkSheet(workbook, rangeName))
                    .then((workbookName) => {
                        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                            RangeRedux.RangeStartLive(rangeName, workbookName, ExportDestination.OpenfinExcel));
                        this.throttledRecomputeAndSendLiveExcelEvent()
                    });
                break;
            case ExportDestination.iPushPull:
                iPushPullHelper.LoadPage(folder, page).then(() => {
                    this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                        RangeRedux.RangeStartLive(rangeName, page, ExportDestination.iPushPull));
                    this.throttledRecomputeAndSendLiveExcelEvent()

                })
                break;
        }
    }

    private convertRangetoCsv(rangeName: string): void {
        let csvContent: string = this.createCSVContent(rangeName);
        if (csvContent) {
            let csvFileName: string = this.getRange(rangeName).Name + ".csv"
            Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
        }
    }

    private copyToClipboard(rangeName: string) {
        let csvContent: string = this.createTabularContent(rangeName);
        if (csvContent) {
            Helper.copyToClipboard(csvContent)
        }
    }

    private createCSVContent(rangeName: string): string {
        let rangeAsArray: any[] = this.ConvertRangetoArray(rangeName);
        if (rangeAsArray) {
            return Helper.convertArrayToCsv(rangeAsArray, ",");
        }
        return null
    }

    private createTabularContent(rangeName: string): string {
        let rangeAsArray: any[] = this.ConvertRangetoArray(rangeName);
        if (rangeAsArray) {
            return Helper.convertArrayToCsv(rangeAsArray, "\t");
        }
        return null
    }

    // Converts a range into an array of array - first array is the column names and subsequent arrays are the values
    private ConvertRangetoArray(rangeName: string): any[] {
        let rangeToConvert: IRange = this.getRange(rangeName);
        let rangeCols: IColumn[] = this.getColsForRange(rangeToConvert);
        let actionReturnObj = RangeHelper.ConvertRangeToArray(this.blotter, rangeToConvert, rangeCols);
        if (actionReturnObj.Error) {
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupShowError(actionReturnObj.Error))
            return null
        }
        return actionReturnObj.ActionReturn
    }

    private getColsForRange(range: IRange): IColumn[] {
        let allCols: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        return (range.RangeScope == RangeScope.AllColumns) ?
            allCols :
            range.Columns.map(c => allCols.find(col => col.ColumnId == c));
    }

    private getRange(rangeName: string): IRange {
        return this.RangeState.Ranges.find(r => r.Name == rangeName);
    }


    protected InitState() {
        if (this.RangeState != this.blotter.AdaptableBlotterStore.TheStore.getState().Range) {
            this.RangeState = this.blotter.AdaptableBlotterStore.TheStore.getState().Range;
        }
    }

}