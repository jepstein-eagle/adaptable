"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggingHelper_1 = require("./LoggingHelper");
const EventDispatcher_1 = require("../EventDispatcher");
var OpenfinHelper;
(function (OpenfinHelper) {
    let ExcelServiceStatus;
    (function (ExcelServiceStatus) {
        ExcelServiceStatus["Unknown"] = "Unknown";
        ExcelServiceStatus["Disconnected"] = "Disconnected";
        ExcelServiceStatus["Connecting"] = "Connecting";
        ExcelServiceStatus["Connected"] = "Connected";
        ExcelServiceStatus["Error"] = "Error";
    })(ExcelServiceStatus || (ExcelServiceStatus = {}));
    let excelStatus = ExcelServiceStatus.Unknown;
    let _onExcelDisconnected = new EventDispatcher_1.EventDispatcher();
    let _onWorkbookDisconnected = new EventDispatcher_1.EventDispatcher();
    let _onWorkbookSaved = new EventDispatcher_1.EventDispatcher();
    function OnExcelDisconnected() {
        return _onExcelDisconnected;
    }
    OpenfinHelper.OnExcelDisconnected = OnExcelDisconnected;
    function OnWorkbookDisconnected() {
        return _onWorkbookDisconnected;
    }
    OpenfinHelper.OnWorkbookDisconnected = OnWorkbookDisconnected;
    function OnWorkbookSaved() {
        return _onWorkbookSaved;
    }
    OpenfinHelper.OnWorkbookSaved = OnWorkbookSaved;
    function isRunningInOpenfin() {
        return 'fin' in window && 'desktop' in fin;
    }
    OpenfinHelper.isRunningInOpenfin = isRunningInOpenfin;
    function isExcelOpenfinLoaded() {
        return isRunningInOpenfin() && 'Excel' in fin.desktop;
    }
    OpenfinHelper.isExcelOpenfinLoaded = isExcelOpenfinLoaded;
    function addWorkbook() {
        return new Promise((resolve, reject) => {
            LoggingHelper_1.LoggingHelper.LogMessage('Creating new workbook');
            fin.desktop.Excel.addWorkbook(function (workbook) {
                LoggingHelper_1.LoggingHelper.LogMessage('workbook created:' + workbook.name);
                resolve(workbook.name);
                // workbook.addEventListener("workbookActivated", (event) => onWorkbookActivated(event, resolve));
                // workbook.activate();
                // setTimeout(() => {
                //     workbook.getWorksheets((ack: any) => {
                //        LoggingHelper.LogMessage('getWorksheets:', ack);
                //         resolve(workbook.name)
                //     })
                // }, 500);
            });
        });
    }
    // function onWorkbookActivated(event: any, resolve: any) {
    //    LoggingHelper.LogMessage('workbookActivated:', event);
    //     event.target.getWorksheets((ack: any) => {
    //        LoggingHelper.LogMessage('getWorksheets:', ack);
    //         resolve();
    //     });
    // }
    // export function addRangeWorkSheet(workBook: ExcelWorkbook, range: string): Promise<ExcelWorksheet> {
    //     return new Promise<ExcelWorksheet>((resolve: any, reject: any) => {
    //         resolve(workBook.getWorksheetByName("Sheet1"))
    //         // workBook.addWorksheet(function (worksheet: ExcelWorksheet) {
    //         //     //worksheet.worksheetName = range
    //         //     resolve(worksheet);
    //         // });
    //     });
    // }
    function pushData(workBookName, data) {
        return new Promise((resolve, reject) => {
            let workBook = fin.desktop.Excel.getWorkbookByName(workBookName);
            if (!workBook) {
                LoggingHelper_1.LoggingHelper.LogError("Cannot find workbook:" + workBookName);
                reject("Cannot find workbook:" + workBookName);
            }
            let worksheet = workBook.getWorksheetByName("Sheet1");
            worksheet.setCells(data, "A1");
            resolve();
        });
    }
    OpenfinHelper.pushData = pushData;
    function initOpenFinExcel() {
        // fin.desktop.main(function () {
        fin.desktop.Excel.init();
        if (excelStatus == ExcelServiceStatus.Unknown) {
            return Promise.resolve()
                .then(initExcelPluginService)
                .then(connectToExcel)
                .then(onExcelConnected)
                .then(addWorkbook)
                .catch(err => {
                LoggingHelper_1.LoggingHelper.LogError(err);
                return "";
            });
        }
        else {
            return Promise.resolve()
                .then(connectToExcel)
                .then(onExcelConnected)
                .then(addWorkbook)
                .catch(err => {
                LoggingHelper_1.LoggingHelper.LogError(err);
                return "";
            });
        }
        // });
    }
    OpenfinHelper.initOpenFinExcel = initOpenFinExcel;
    function initExcelPluginService() {
        var installFolder = '%localappdata%\\OpenFin\\shared\\assets\\excel-api-addin';
        var servicePath = 'OpenFin.ExcelService.exe';
        var addInPath = 'OpenFin.ExcelApi-AddIn.xll';
        if (excelStatus != ExcelServiceStatus.Unknown) {
            LoggingHelper_1.LoggingHelper.LogMessage("Skipping Add-in deployment as already deployed");
            return Promise.resolve();
        }
        excelStatus = ExcelServiceStatus.Connecting;
        return Promise.resolve()
            .then(() => deployAddIn(servicePath, installFolder))
            .then(() => startExcelService(servicePath, installFolder))
            .then(() => registerAddIn(servicePath, installFolder));
    }
    function deployAddIn(servicePath, installFolder) {
        return new Promise((resolve, reject) => {
            LoggingHelper_1.LoggingHelper.LogMessage('Deploying Add-In');
            fin.desktop.System.launchExternalProcess({
                alias: 'excel-api-addin',
                target: servicePath,
                arguments: '-d "' + installFolder + '"',
                listener: function (args) {
                    LoggingHelper_1.LoggingHelper.LogMessage('Installer script completed! ' + args.exitCode);
                    resolve();
                }
            });
        });
    }
    function startExcelService(servicePath, installFolder) {
        var serviceUuid = '886834D1-4651-4872-996C-7B2578E953B9';
        return new Promise((resolve, reject) => {
            fin.desktop.System.getAllExternalApplications((extApps) => {
                var excelServiceIndex = extApps.findIndex(extApp => extApp.uuid === serviceUuid);
                if (excelServiceIndex >= 0) {
                    LoggingHelper_1.LoggingHelper.LogMessage('Service Already Running');
                    resolve();
                    return;
                }
                var onServiceStarted = () => {
                    LoggingHelper_1.LoggingHelper.LogMessage('Service Started');
                    fin.desktop.Excel.instance.removeEventListener('started', onServiceStarted);
                    resolve();
                };
                chrome.desktop.getDetails(function (details) {
                    fin.desktop.Excel.instance.addEventListener('started', onServiceStarted);
                    fin.desktop.System.launchExternalProcess({
                        target: installFolder + '\\OpenFin.ExcelService.exe',
                        arguments: '-p ' + details.port,
                        uuid: serviceUuid,
                    }, (process) => {
                        LoggingHelper_1.LoggingHelper.LogMessage('Service Launched: ' + process.uuid);
                    }, (error) => {
                        reject('Error starting Excel service');
                    });
                });
            });
        });
    }
    function registerAddIn(servicePath, installFolder) {
        return new Promise((resolve, reject) => {
            LoggingHelper_1.LoggingHelper.LogMessage('Registering Add-In');
            fin.desktop.Excel.install((ack) => {
                LoggingHelper_1.LoggingHelper.LogMessage("Add-In Registration callback", ack);
                //if (ack.success) {
                resolve();
                //}
            });
        });
    }
    function connectToExcel() {
        return new Promise((resolve, reject) => {
            fin.desktop.Excel.instance.getExcelInstances((instances) => {
                if (instances.length > 0) {
                    LoggingHelper_1.LoggingHelper.LogMessage("Excel Already Running");
                    resolve();
                }
                else {
                    LoggingHelper_1.LoggingHelper.LogMessage("Launching Excel");
                    fin.desktop.Excel.run(resolve);
                }
            });
        });
    }
    function onWorkbookRemoved(event) {
        event.workbook.removeEventListener("workbookActivated", onWorkbookActivated);
        _onWorkbookDisconnected.Dispatch(this, event.workbook);
    }
    function onWorkbookSaved(event) {
        _onWorkbookSaved.Dispatch(this, { OldName: event.oldWorkbookName, NewName: event.workbook.name });
    }
    function onWorkbookActivated(event) {
        LoggingHelper_1.LoggingHelper.LogMessage("Workbook Activated: " + event.target.name);
        event.target.getWorksheets((ack) => {
            LoggingHelper_1.LoggingHelper.LogMessage('getWorksheets:', ack);
        });
    }
    function onWorkbookAdded(event) {
        LoggingHelper_1.LoggingHelper.LogMessage("Workbook Added: " + event.workbook.name);
        let workbook = event.workbook;
        workbook.addEventListener("workbookActivated", onWorkbookActivated);
    }
    function onExcelConnected() {
        if (excelStatus != ExcelServiceStatus.Connected) {
            LoggingHelper_1.LoggingHelper.LogMessage("Excel Connected: " + fin.desktop.Excel.legacyApi.connectionUuid);
            excelStatus = ExcelServiceStatus.Connected;
            // fin.desktop.Excel.instance.removeEventListener("excelConnected", onExcelConnected);
            fin.desktop.Excel.addEventListener("workbookClosed", onWorkbookRemoved);
            fin.desktop.Excel.addEventListener("workbookSaved", onWorkbookSaved);
            fin.desktop.Excel.addEventListener("workbookAdded", onWorkbookAdded);
            // Grab a snapshot of the current instance, it can change!
            var legacyApi = fin.desktop.Excel.legacyApi;
            var onExcelDisconnected = function () {
                LoggingHelper_1.LoggingHelper.LogMessage("Excel Disconnected: " + legacyApi.connectionUuid);
                fin.desktop.Excel.instance.removeEventListener("excelDisconnected", onExcelDisconnected);
                legacyApi.removeEventListener("workbookClosed", onWorkbookRemoved);
                legacyApi.removeEventListener("workbookSaved", onWorkbookSaved);
                legacyApi.removeEventListener("workbookAdded", onWorkbookAdded);
                excelStatus = ExcelServiceStatus.Disconnected;
                if (fin.desktop.Excel.legacyApi) {
                    onExcelConnected();
                }
                else {
                    excelStatus = ExcelServiceStatus.Disconnected;
                    _onExcelDisconnected.Dispatch(this, null);
                    // fin.desktop.Excel.instance.addEventListener("excelConnected", onExcelConnected);
                }
            };
            fin.desktop.Excel.instance.addEventListener("excelDisconnected", onExcelDisconnected);
        }
    }
})(OpenfinHelper = exports.OpenfinHelper || (exports.OpenfinHelper = {}));
