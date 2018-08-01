import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyIds from '../Core/Constants/StrategyIds'
import * as StrategyNames from '../Core/Constants/StrategyNames'
import * as StrategyGlyphs from '../Core/Constants/StrategyGlyphs'
import * as ScreenPopups from '../Core/Constants/ScreenPopups'
import * as PopupRedux from '../Redux/ActionsReducers/PopupRedux'
import * as ExportRedux from '../Redux/ActionsReducers/ExportRedux'
import { IExportStrategy } from './Interface/IExportStrategy'
import { ExportDestination, AlertType } from '../Core/Enums';
import { IAdaptableBlotter } from '../Core/Interface/IAdaptableBlotter';
import { Helper } from '../Core/Helpers/Helper';
import { ReportHelper } from '../Core/Helpers/ReportHelper';
import { OpenfinHelper } from '../Core/Helpers/OpenfinHelper';
import * as _ from 'lodash'
import { ExportState } from '../Redux/ActionsReducers/Interface/IState';
import { iPushPullHelper } from '../Core/Helpers/iPushPullHelper';
import { IReport } from '../Core/Api/Interface/AdaptableBlotterObjects';
import { AdaptableBlotterLogger } from '../Core/Helpers/AdaptableBlotterLogger';
export class ExportStrategy extends AdaptableStrategyBase implements IExportStrategy {

    private ExportState: ExportState
    private isSendingData = false
    private workAroundOpenfinExcelDataDimension: Map<string, { x: number, y: number }> = new Map()

    private throttledRecomputeAndSendLiveExcelEvent = _.throttle(() => this.sendNewDataToLiveExcel(), 2000);

    constructor(blotter: IAdaptableBlotter) {
        super(StrategyIds.ExportStrategyId, blotter)


        OpenfinHelper.OnExcelDisconnected().Subscribe((sender, event) => {
            AdaptableBlotterLogger.LogMessage("Excel closed stopping all Live Excel");
            this.ExportState.CurrentLiveReports.forEach(cle => {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                    ExportRedux.ReportStopLive(cle.Report, ExportDestination.OpenfinExcel));
            })
        })
        OpenfinHelper.OnWorkbookDisconnected().Subscribe((sender, workbook) => {
            AdaptableBlotterLogger.LogMessage("Workbook closed:" + workbook.name + ", Stopping Openfin Live Excel");
            let liveReport = this.ExportState.CurrentLiveReports.find(x => x.WorkbookName == workbook.name)
            if (liveReport) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                    ExportRedux.ReportStopLive(liveReport.Report, ExportDestination.OpenfinExcel));
            }
        })
        OpenfinHelper.OnWorkbookSaved().Subscribe((sender, workbookSavedEvent) => {
            AdaptableBlotterLogger.LogMessage("Workbook Saved", workbookSavedEvent);
            let liveReport = this.ExportState.CurrentLiveReports.find(x => x.WorkbookName == workbookSavedEvent.OldName)
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                ExportRedux.ReportStopLive(liveReport.Report, ExportDestination.OpenfinExcel));
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                ExportRedux.ReportStartLive(liveReport.Report, workbookSavedEvent.NewName, ExportDestination.OpenfinExcel));
        })
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, event) => {
            this.throttledRecomputeAndSendLiveExcelEvent()
        })
        this.blotter.onRefresh().Subscribe((sender, event) => {
            this.throttledRecomputeAndSendLiveExcelEvent()
        })
        this.blotter.onSelectedCellsChanged().Subscribe((sender, event) => {
            if (this.ExportState && this.ExportState.CurrentLiveReports.length > 0) {
                let liveReport = this.ExportState.CurrentLiveReports.find(x => x.Report == ReportHelper.SELECTED_CELLS_REPORT)
                if (liveReport) {
                    this.throttledRecomputeAndSendLiveExcelEvent()
                }
            }
        })
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.ExportStrategyName, ScreenPopups.ExportPopup, StrategyGlyphs.ExportGlyph);
    }

    private sendNewDataToLiveExcel() {
        //we wait for the last sendNewDataToLiveExcel to finish
        if (this.isSendingData == true) {
            this.throttledRecomputeAndSendLiveExcelEvent()
            return
        }
        if (this.ExportState && this.ExportState.CurrentLiveReports.length > 0) {
            this.isSendingData = true
            let ippStyle = this.blotter.getIPPStyle()
            let promises: Promise<any>[] = []
            this.ExportState.CurrentLiveReports.forEach(cle => {
                if (cle.ExportDestination == ExportDestination.OpenfinExcel) {
                    promises.push(
                        Promise.resolve().then(() => {
                            return new Promise<any>((resolve, reject) => {
                                //we want to erase old cells in case we are sending less data
                                //we don't want to call clearCellContent as it makes the excel sheet to blink
                                //and also is incorrrect as until we call setcells again we've lost all values in excel which might upset
                                //some macros
                                let previousDimension = this.workAroundOpenfinExcelDataDimension.get(cle.Report)
                                let ReportAsArray: any[] = this.ConvertReporttoArray(cle.Report);
                                let newDimension = { x: ReportAsArray[0].length, y: ReportAsArray.length }
                                if (previousDimension) {
                                    let missingNumberOfRows = previousDimension.y - newDimension.y
                                    let missingNumberOfColumns = previousDimension.x - newDimension.x
                                    if (missingNumberOfRows > 0) {
                                        for (let i = 0; i < missingNumberOfRows; i++) {
                                            let newRow = []
                                            for (let j = 0; j < newDimension.x; j++) {
                                                newRow.push(null)
                                            }
                                            ReportAsArray.push(newRow)
                                        }
                                    }
                                    if (missingNumberOfColumns > 0) {
                                        //missing column
                                        ReportAsArray.forEach(row => {
                                            for (let j = 0; j < missingNumberOfColumns; j++) {
                                                row.push(null)
                                            }
                                        })
                                    }
                                }
                                if (ReportAsArray) {
                                    this.workAroundOpenfinExcelDataDimension.set(cle.Report, newDimension)
                                    resolve(ReportAsArray);
                                } else {
                                    reject();
                                }
                            })
                        }).then((ReportAsArray) => {
                            return OpenfinHelper.pushData(cle.WorkbookName, ReportAsArray)
                        })
                            .catch((reason) => {
                                AdaptableBlotterLogger.LogWarning("Live Excel failed to send data for [" + cle.Report + "]", reason)
                                this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                                    ExportRedux.ReportStopLive(cle.Report, ExportDestination.OpenfinExcel));
                                this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                                    PopupRedux.PopupShowAlert({
                                        Header: "Live Excel Error",
                                        Msg: "Failed to send data for [" + cle.Report + "]. This live export has been stopped",
                                        AlertType: AlertType.Error
                                    })
                                )
                            })
                    )
                }
                else if (cle.ExportDestination == ExportDestination.iPushPull) {
                    //we there is no logic related to the Report so we want to get it only one time
                    if (!ippStyle) {
                        ippStyle = this.blotter.getIPPStyle()
                    }
                    promises.push(
                        Promise.resolve().then(() => {
                            return new Promise<any>((resolve, reject) => {
                                let ReportAsArray: any[] = this.ConvertReporttoArray(cle.Report);
                                if (ReportAsArray) {
                                    resolve(ReportAsArray);
                                } else {
                                    reject();
                                }
                            })
                        }).then((ReportAsArray) => {
                            return iPushPullHelper.pushData(cle.WorkbookName, ReportAsArray, ippStyle)
                        })
                            .catch((reason) => {
                                AdaptableBlotterLogger.LogWarning("Live Excel failed to send data for [" + cle.Report + "]", reason)
                                this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                                    ExportRedux.ReportStopLive(cle.Report, ExportDestination.iPushPull));
                                this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                                    PopupRedux.PopupShowAlert({
                                        Header: "Live Excel Error",
                                        Msg: "Failed to send data for [" + cle.Report + "]. This live export has been stopped",
                                        AlertType: AlertType.Error
                                    })
                                )
                            })
                    )
                }
            })
            Promise.all(promises).then(() => {
                AdaptableBlotterLogger.LogMessage("All Data Sent")
                this.isSendingData = false
            }).catch(() => {
                AdaptableBlotterLogger.LogWarning("One live Excel failed to send data")
                this.isSendingData = false
            })
        }
    }

    public Export(ReportName: string, exportDestination: ExportDestination, folder?: string, page?: string): void {
        switch (exportDestination) {
            case ExportDestination.Clipboard:
                this.copyToClipboard(ReportName);
                break;
            case ExportDestination.CSV:
                this.convertReporttoCsv(ReportName);
                break;
            case ExportDestination.OpenfinExcel:
                OpenfinHelper.initOpenFinExcel()//.then((workbook) => OpenfinHelper.addReportWorkSheet(workbook, ReportName))
                    .then((workbookName) => {
                        this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                            ExportRedux.ReportStartLive(ReportName, workbookName, ExportDestination.OpenfinExcel));
                        setTimeout(() => { this.throttledRecomputeAndSendLiveExcelEvent() }, 500)
                    });
                break;
            case ExportDestination.iPushPull:
                iPushPullHelper.LoadPage(folder, page).then(() => {
                    this.blotter.AdaptableBlotterStore.TheStore.dispatch(
                        ExportRedux.ReportStartLive(ReportName, page, ExportDestination.iPushPull));
                    setTimeout(() => { this.throttledRecomputeAndSendLiveExcelEvent() }, 500)

                })
                break;
        }
    }

    private convertReporttoCsv(ReportName: string): void {
        let csvContent: string = this.createCSVContent(ReportName);
        if (csvContent) {
            let csvFileName: string = this.getReport(ReportName).Name + ".csv"
            Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
        }
    }

    private copyToClipboard(ReportName: string) {
        let csvContent: string = this.createTabularContent(ReportName);
        if (csvContent) {
            Helper.copyToClipboard(csvContent)
        }
    }

    private createCSVContent(ReportName: string): string {
        let ReportAsArray: any[] = this.ConvertReporttoArray(ReportName);
        if (ReportAsArray) {
            return Helper.convertArrayToCsv(ReportAsArray, ",");
        }
        return null
    }

    private createTabularContent(ReportName: string): string {
        let ReportAsArray: any[] = this.ConvertReporttoArray(ReportName);
        if (ReportAsArray) {
            return Helper.convertArrayToCsv(ReportAsArray, "\t");
        }
        return null
    }

    // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
    private ConvertReporttoArray(ReportName: string): any[] {
        let ReportToConvert: IReport = this.getReport(ReportName);
        let actionReturnObj = ReportHelper.ConvertReportToArray(this.blotter, ReportToConvert);
        if (actionReturnObj.Alert) { // assume that the alerttype is error - if not then refactor
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupShowAlert(actionReturnObj.Alert))
            return null
        }
        return actionReturnObj.ActionReturn
    }

    /*
    private getColsForReport(Report: IReport): IColumn[] {
        let allCols: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        return (Report.ReportColumnScope == ReportColumnScope.AllColumns) ?
            allCols :
            Report.Columns.map(c => allCols.find(col => col.ColumnId == c));
    }
*/

    private getReport(ReportName: string): IReport {
        return this.ExportState.Reports.find(r => r.Name == ReportName);
    }


    protected InitState() {
        if (this.ExportState != this.blotter.AdaptableBlotterStore.TheStore.getState().Export) {
            this.ExportState = this.blotter.AdaptableBlotterStore.TheStore.getState().Export;
        }
    }

}