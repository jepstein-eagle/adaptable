"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const PopupRedux = require("../Redux/ActionsReducers/PopupRedux");
const SystemRedux = require("../Redux/ActionsReducers/SystemRedux");
const Enums_1 = require("../Core/Enums");
const Helper_1 = require("../Core/Helpers/Helper");
const ReportHelper_1 = require("../Core/Helpers/ReportHelper");
const OpenfinHelper_1 = require("../Core/Helpers/OpenfinHelper");
const _ = require("lodash");
const iPushPullHelper_1 = require("../Core/Helpers/iPushPullHelper");
const AdaptableBlotterLogger_1 = require("../Core/Helpers/AdaptableBlotterLogger");
const ArrayExtensions_1 = require("../Core/Extensions/ArrayExtensions");
class ExportStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.ExportStrategyId, blotter);
        this.isSendingData = false;
        this.workAroundOpenfinExcelDataDimension = new Map();
        this.throttledRecomputeAndSendLiveExcelEvent = _.throttle(() => this.sendNewDataToLiveExcel(), 2000);
        OpenfinHelper_1.OpenfinHelper.OnExcelDisconnected().Subscribe((sender, event) => {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogMessage("Excel closed stopping all Live Excel");
            this.CurrentLiveReports.forEach(cle => {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ReportStopLive(cle.Report, Enums_1.ExportDestination.OpenfinExcel));
            });
        });
        OpenfinHelper_1.OpenfinHelper.OnWorkbookDisconnected().Subscribe((sender, workbook) => {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogMessage("Workbook closed:" + workbook.name + ", Stopping Openfin Live Excel");
            let liveReport = this.CurrentLiveReports.find(x => x.WorkbookName == workbook.name);
            if (liveReport) {
                this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ReportStopLive(liveReport.Report, Enums_1.ExportDestination.OpenfinExcel));
            }
        });
        OpenfinHelper_1.OpenfinHelper.OnWorkbookSaved().Subscribe((sender, workbookSavedEvent) => {
            AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogMessage("Workbook Saved", workbookSavedEvent);
            let liveReport = this.CurrentLiveReports.find(x => x.WorkbookName == workbookSavedEvent.OldName);
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ReportStopLive(liveReport.Report, Enums_1.ExportDestination.OpenfinExcel));
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ReportStartLive(liveReport.Report, workbookSavedEvent.NewName, Enums_1.ExportDestination.OpenfinExcel));
        });
        this.blotter.AuditService.OnDataSourceChanged().Subscribe((sender, event) => {
            this.throttledRecomputeAndSendLiveExcelEvent();
        });
        this.blotter.onRefresh().Subscribe((sender, event) => {
            this.throttledRecomputeAndSendLiveExcelEvent();
        });
        this.blotter.onSelectedCellsChanged().Subscribe((sender, event) => {
            if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.CurrentLiveReports)) {
                let liveReport = this.CurrentLiveReports.find(x => x.Report == ReportHelper_1.ReportHelper.SELECTED_CELLS_REPORT);
                if (liveReport) {
                    this.throttledRecomputeAndSendLiveExcelEvent();
                }
            }
        });
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.ExportStrategyName, ScreenPopups.ExportPopup, StrategyIds.ExportGlyph);
    }
    sendNewDataToLiveExcel() {
        //we wait for the last sendNewDataToLiveExcel to finish
        if (this.isSendingData == true) {
            this.throttledRecomputeAndSendLiveExcelEvent();
            return;
        }
        if (ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(this.CurrentLiveReports)) {
            this.isSendingData = true;
            let ippStyle = this.blotter.getIPPStyle();
            let promises = [];
            this.CurrentLiveReports.forEach(cle => {
                if (cle.ExportDestination == Enums_1.ExportDestination.OpenfinExcel) {
                    promises.push(Promise.resolve().then(() => {
                        return new Promise((resolve, reject) => {
                            //we want to erase old cells in case we are sending less data
                            //we don't want to call clearCellContent as it makes the excel sheet to blink
                            //and also is incorrrect as until we call setcells again we've lost all values in excel which might upset
                            //some macros
                            let previousDimension = this.workAroundOpenfinExcelDataDimension.get(cle.Report);
                            let ReportAsArray = this.ConvertReporttoArray(cle.Report);
                            let newDimension = { x: ReportAsArray[0].length, y: ReportAsArray.length };
                            if (previousDimension) {
                                let missingNumberOfRows = previousDimension.y - newDimension.y;
                                let missingNumberOfColumns = previousDimension.x - newDimension.x;
                                if (missingNumberOfRows > 0) {
                                    for (let i = 0; i < missingNumberOfRows; i++) {
                                        let newRow = [];
                                        for (let j = 0; j < newDimension.x; j++) {
                                            newRow.push(null);
                                        }
                                        ReportAsArray.push(newRow);
                                    }
                                }
                                if (missingNumberOfColumns > 0) {
                                    //missing column
                                    ReportAsArray.forEach(row => {
                                        for (let j = 0; j < missingNumberOfColumns; j++) {
                                            row.push(null);
                                        }
                                    });
                                }
                            }
                            if (ReportAsArray) {
                                this.workAroundOpenfinExcelDataDimension.set(cle.Report, newDimension);
                                resolve(ReportAsArray);
                            }
                            else {
                                reject();
                            }
                        });
                    }).then((ReportAsArray) => {
                        return OpenfinHelper_1.OpenfinHelper.pushData(cle.WorkbookName, ReportAsArray);
                    })
                        .catch((reason) => {
                        AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning("Live Excel failed to send data for [" + cle.Report + "]", reason);
                        this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ReportStopLive(cle.Report, Enums_1.ExportDestination.OpenfinExcel));
                        this.blotter.api.alertShowError("Live Excel Error", "Failed to send data for [" + cle.Report + "]. This live export has been stopped", true);
                    }));
                }
                else if (cle.ExportDestination == Enums_1.ExportDestination.iPushPull) {
                    //we there is no logic related to the Report so we want to get it only one time
                    if (!ippStyle) {
                        ippStyle = this.blotter.getIPPStyle();
                    }
                    promises.push(Promise.resolve().then(() => {
                        return new Promise((resolve, reject) => {
                            let ReportAsArray = this.ConvertReporttoArray(cle.Report);
                            if (ReportAsArray) {
                                resolve(ReportAsArray);
                            }
                            else {
                                reject();
                            }
                        });
                    }).then((ReportAsArray) => {
                        return iPushPullHelper_1.iPushPullHelper.pushData(cle.WorkbookName, ReportAsArray, ippStyle);
                    })
                        .catch((reason) => {
                        AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning("Live Excel failed to send data for [" + cle.Report + "]", reason);
                        this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ReportStopLive(cle.Report, Enums_1.ExportDestination.iPushPull));
                        this.blotter.api.alertShowError("Live Excel Error", "Failed to send data for [" + cle.Report + "]. This live export has been stopped", true);
                    }));
                }
            });
            Promise.all(promises).then(() => {
                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogMessage("All Data Sent");
                this.isSendingData = false;
            }).catch(() => {
                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogWarning("One live Excel failed to send data");
                this.isSendingData = false;
            });
        }
    }
    Export(ReportName, exportDestination, folder, page) {
        switch (exportDestination) {
            case Enums_1.ExportDestination.Clipboard:
                this.copyToClipboard(ReportName);
                break;
            case Enums_1.ExportDestination.CSV:
                this.convertReporttoCsv(ReportName);
                break;
            case Enums_1.ExportDestination.OpenfinExcel:
                OpenfinHelper_1.OpenfinHelper.initOpenFinExcel() //.then((workbook) => OpenfinHelper.addReportWorkSheet(workbook, ReportName))
                    .then((workbookName) => {
                    this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ReportStartLive(ReportName, workbookName, Enums_1.ExportDestination.OpenfinExcel));
                    setTimeout(() => { this.throttledRecomputeAndSendLiveExcelEvent(); }, 500);
                });
                break;
            case Enums_1.ExportDestination.iPushPull:
                iPushPullHelper_1.iPushPullHelper.LoadPage(folder, page).then(() => {
                    this.blotter.AdaptableBlotterStore.TheStore.dispatch(SystemRedux.ReportStartLive(ReportName, page, Enums_1.ExportDestination.iPushPull));
                    setTimeout(() => { this.throttledRecomputeAndSendLiveExcelEvent(); }, 500);
                });
                break;
        }
    }
    convertReporttoCsv(ReportName) {
        let csvContent = this.createCSVContent(ReportName);
        if (csvContent) {
            let csvFileName = this.getReport(ReportName).Name + ".csv";
            Helper_1.Helper.createDownloadedFile(csvContent, csvFileName, 'text/csv;encoding:utf-8');
        }
    }
    copyToClipboard(ReportName) {
        let csvContent = this.createTabularContent(ReportName);
        if (csvContent) {
            Helper_1.Helper.copyToClipboard(csvContent);
        }
    }
    createCSVContent(ReportName) {
        let ReportAsArray = this.ConvertReporttoArray(ReportName);
        if (ReportAsArray) {
            return Helper_1.Helper.convertArrayToCsv(ReportAsArray, ",");
        }
        return null;
    }
    createTabularContent(ReportName) {
        let ReportAsArray = this.ConvertReporttoArray(ReportName);
        if (ReportAsArray) {
            return Helper_1.Helper.convertArrayToCsv(ReportAsArray, "\t");
        }
        return null;
    }
    // Converts a Report into an array of array - first array is the column names and subsequent arrays are the values
    ConvertReporttoArray(ReportName) {
        let ReportToConvert = this.getReport(ReportName);
        let actionReturnObj = ReportHelper_1.ReportHelper.ConvertReportToArray(this.blotter, ReportToConvert);
        if (actionReturnObj.Alert) { // assume that the MessageType is error - if not then refactor
            this.blotter.AdaptableBlotterStore.TheStore.dispatch(PopupRedux.PopupShowAlert(actionReturnObj.Alert));
            return null;
        }
        return actionReturnObj.ActionReturn;
    }
    /*
    private getColsForReport(Report: IReport): IColumn[] {
        let allCols: IColumn[] = this.blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns;
        return (Report.ReportColumnScope == ReportColumnScope.AllColumns) ?
            allCols :
            Report.Columns.map(c => allCols.find(col => col.ColumnId == c));
    }
*/
    getReport(ReportName) {
        return this.ExportState.Reports.find(r => r.Name == ReportName);
    }
    InitState() {
        if (this.ExportState != this.blotter.AdaptableBlotterStore.TheStore.getState().Export) {
            this.ExportState = this.blotter.AdaptableBlotterStore.TheStore.getState().Export;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Export, this.ExportState);
            }
        }
        if (this.CurrentLiveReports != this.blotter.AdaptableBlotterStore.TheStore.getState().System.CurrentLiveReports) {
            this.CurrentLiveReports = this.blotter.AdaptableBlotterStore.TheStore.getState().System.CurrentLiveReports;
        }
    }
}
exports.ExportStrategy = ExportStrategy;
