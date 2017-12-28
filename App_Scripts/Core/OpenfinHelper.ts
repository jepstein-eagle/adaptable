import { IEvent } from './Interface/IEvent';
import { EventDispatcher } from './EventDispatcher';
import { ExcelWorkbook } from './Interface/OpenfinLiveExcel/ExcelWorkbook';
import { ExcelWorksheet } from './Interface/OpenfinLiveExcel/ExcelWorksheet';
export module OpenfinHelper {
    declare var fin: any;
    declare var chrome: any;
    enum ExcelServiceStatus {
        Unknown,
        Disconnected,
        Connecting,
        Connected,
        Error
    }
    let excelStatus: ExcelServiceStatus = ExcelServiceStatus.Unknown
    let _onExcelDisconnected: EventDispatcher<any, any> = new EventDispatcher<any, any>();
    let _onWorkbookDisconnected: EventDispatcher<any, ExcelWorkbook> = new EventDispatcher<any, ExcelWorkbook>();
    let _onWorkbookSaved: EventDispatcher<any, { OldName: string, NewName: string }> = new EventDispatcher<any, { OldName: string, NewName: string }>();

    export function OnExcelDisconnected(): IEvent<any, any> {
        return _onExcelDisconnected;
    }

    export function OnWorkbookDisconnected(): IEvent<any, ExcelWorkbook> {
        return _onWorkbookDisconnected;
    }

    export function OnWorkbookSaved(): IEvent<any, { OldName: string, NewName: string }> {
        return _onWorkbookSaved;
    }


    export function isRunningInOpenfin() {
        return 'fin' in window && 'desktop' in fin;
    }
    export function isExcelOpenfinLoaded() {
        return isRunningInOpenfin() && 'Excel' in fin.desktop;
    }
    function addWorkbook(): Promise<string> {
        return new Promise<string>((resolve: any, reject: any) => {
            console.log('Creating new workbook');
            fin.desktop.Excel.addWorkbook(function (workbook: ExcelWorkbook) {
                console.log('workbook created:' + workbook.name);
                resolve(workbook.name)
                // workbook.addEventListener("workbookActivated", (event) => onWorkbookActivated(event, resolve));
                // workbook.activate();
                // setTimeout(() => {
                //     workbook.getWorksheets((ack: any) => {
                //         console.log('getWorksheets:', ack);
                //         resolve(workbook.name)
                //     })
                // }, 500);
            });
        });
    }

    // function onWorkbookActivated(event: any, resolve: any) {
    //     console.log('workbookActivated:', event);
    //     event.target.getWorksheets((ack: any) => {
    //         console.log('getWorksheets:', ack);
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
    export function pushData(workBookName: string, data: any[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            let workBook = fin.desktop.Excel.getWorkbookByName(workBookName);
            if (!workBook) {
                console.error("Cannot find workbook:" + workBookName);
                reject("Cannot find workbook:" + workBookName)
            }
            let worksheet = workBook.getWorksheetByName("Sheet1")
            worksheet.setCells(data, "A1");
            resolve();
        })
    }
    export function initOpenFinExcel(): Promise<string> {
        // fin.desktop.main(function () {
        fin.desktop.Excel.init();
        if (excelStatus == ExcelServiceStatus.Unknown) {
            return Promise.resolve()
                .then(initExcelPluginService)
                .then(connectToExcel)
                .then(onExcelConnected)
                .then(addWorkbook)
                .catch(err => {
                    console.error(err); return ""
                });
        }
        else {
            return Promise.resolve()
                .then(connectToExcel)
                .then(onExcelConnected)
                .then(addWorkbook)
                .catch(err => {
                    console.error(err); return ""
                });
        }

        // });
    }
    function initExcelPluginService(): Promise<any> {
        var installFolder = '%localappdata%\\OpenFin\\shared\\assets\\excel-api-addin';
        var servicePath = 'OpenFin.ExcelService.exe';
        var addInPath = 'OpenFin.ExcelApi-AddIn.xll';

        if (excelStatus != ExcelServiceStatus.Unknown) {
            console.log("Skipping Add-in deployment as already deployed")
            return Promise.resolve();
        }

        excelStatus = ExcelServiceStatus.Connecting

        return Promise.resolve()
            .then(() => deployAddIn(servicePath, installFolder))
            .then(() => startExcelService(servicePath, installFolder))
            .then(() => registerAddIn(servicePath, installFolder));
    }

    function deployAddIn(servicePath: string, installFolder: string): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            console.log('Deploying Add-In');
            fin.desktop.System.launchExternalProcess({
                alias: 'excel-api-addin',
                target: servicePath,
                arguments: '-d "' + installFolder + '"',
                listener: function (args: any) {
                    console.log('Installer script completed! ' + args.exitCode);
                    resolve();
                }
            });
        });
    }

    function startExcelService(servicePath: string, installFolder: string) {
        var serviceUuid = '886834D1-4651-4872-996C-7B2578E953B9';

        return new Promise((resolve, reject) => {
            fin.desktop.System.getAllExternalApplications((extApps: any[]) => {
                var excelServiceIndex = extApps.findIndex(extApp => extApp.uuid === serviceUuid);

                if (excelServiceIndex >= 0) {
                    console.log('Service Already Running');
                    resolve();
                    return;
                }

                var onServiceStarted = () => {
                    console.log('Service Started');
                    fin.desktop.Excel.instance.removeEventListener('started', onServiceStarted);
                    resolve();
                };

                chrome.desktop.getDetails(function (details: any) {
                    fin.desktop.Excel.instance.addEventListener('started', onServiceStarted);

                    fin.desktop.System.launchExternalProcess({
                        target: installFolder + '\\OpenFin.ExcelService.exe',
                        arguments: '-p ' + details.port,
                        uuid: serviceUuid,
                    }, (process: any) => {
                        console.log('Service Launched: ' + process.uuid);
                    }, (error: any) => {
                        reject('Error starting Excel service');
                    });
                });
            });
        });
    }

    function registerAddIn(servicePath: string, installFolder: string) {
        return new Promise((resolve, reject) => {
            console.log('Registering Add-In');
            fin.desktop.Excel.install((ack: any) => {
                console.log("Add-In Registration callback", ack);
                //if (ack.success) {
                resolve();
                //}
            });
        });
    }

    function connectToExcel() {
        return new Promise((resolve, reject) => {
            fin.desktop.Excel.instance.getExcelInstances((instances: any) => {
                if (instances.length > 0) {
                    console.log("Excel Already Running");
                    resolve();
                } else {
                    console.log("Launching Excel");
                    fin.desktop.Excel.run(resolve);
                }
            });
        });
    }
    function onWorkbookRemoved(event: any) {
        event.workbook.removeEventListener("workbookActivated", onWorkbookActivated);
        _onWorkbookDisconnected.Dispatch(this, event.workbook);
    }
    function onWorkbookSaved(event: any) {
        _onWorkbookSaved.Dispatch(this, { OldName: event.oldWorkbookName, NewName: event.workbook.name });
    }
    function onWorkbookActivated(event: any) {
        console.log("Workbook Activated: " + event.target.name)
        event.target.getWorksheets((ack: any) => {
            console.log('getWorksheets:', ack);
        })
    }
    function onWorkbookAdded(event: any) {
        console.log("Workbook Added: " + event.workbook.name)
        let workbook = event.workbook;
        workbook.addEventListener("workbookActivated", onWorkbookActivated);
    }
    function onExcelConnected() {
        if (excelStatus != ExcelServiceStatus.Connected) {
            console.log("Excel Connected: " + fin.desktop.Excel.legacyApi.connectionUuid);

            excelStatus = ExcelServiceStatus.Connected

            // fin.desktop.Excel.instance.removeEventListener("excelConnected", onExcelConnected);
            fin.desktop.Excel.addEventListener("workbookClosed", onWorkbookRemoved);
            fin.desktop.Excel.addEventListener("workbookSaved", onWorkbookSaved);
            fin.desktop.Excel.addEventListener("workbookAdded", onWorkbookAdded);

            // Grab a snapshot of the current instance, it can change!
            var legacyApi = fin.desktop.Excel.legacyApi;

            var onExcelDisconnected = function () {
                console.log("Excel Disconnected: " + legacyApi.connectionUuid);

                fin.desktop.Excel.instance.removeEventListener("excelDisconnected", onExcelDisconnected);
                legacyApi.removeEventListener("workbookClosed", onWorkbookRemoved);
                legacyApi.removeEventListener("workbookSaved", onWorkbookSaved);
                legacyApi.removeEventListener("workbookAdded", onWorkbookAdded);
                excelStatus = ExcelServiceStatus.Disconnected

                if (fin.desktop.Excel.legacyApi) {
                    onExcelConnected();
                } else {
                    excelStatus = ExcelServiceStatus.Disconnected
                    _onExcelDisconnected.Dispatch(this, null)
                    // fin.desktop.Excel.instance.addEventListener("excelConnected", onExcelConnected);
                }
            }

            fin.desktop.Excel.instance.addEventListener("excelDisconnected", onExcelDisconnected);
        }
    }
}