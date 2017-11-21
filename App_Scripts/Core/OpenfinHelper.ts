export module OpenfinHelper {
    declare var fin: any;
    declare var chrome: any;
    let excelStatus: ExcelServiceStatus
    let currentWorkbook: any
    export function isRunningInOpenfin() {
        return 'fin' in window && 'desktop' in fin;
    }
    export function isExcelOpenfinLoaded() {
        return isRunningInOpenfin() && 'Excel' in fin.desktop;
    }
    function addWorkbook() {
        return new Promise((resolve: any, reject: any) => {
            fin.desktop.Excel.addWorkbook(function (workbook: any) {
                currentWorkbook = workbook;
                currentWorkbook.activate();
                currentWorkbook.getWorksheets((ack: any) => resolve());

            });
        });
    }
    export function pushData(data: any[]) {
        var sheet = currentWorkbook.getWorksheetByName("Sheet1");
        sheet.setCells(data, "A1");
    }
    export function initOpenFinExcel(): Promise<any> {
        // fin.desktop.main(function () {
        fin.desktop.Excel.init();

        return Promise.resolve()
            .then(initExcelPluginService)
            .then(connectToExcel)
            .then(onExcelConnected)
            .then(addWorkbook)
            .catch(err => console.error(err));
        // });
    }
    function initExcelPluginService(): Promise<any> {
        var installFolder = '%localappdata%\\OpenFin\\shared\\assets\\excel-api-addin';
        var servicePath = 'OpenFin.ExcelService.exe';
        var addInPath = 'OpenFin.ExcelApi-AddIn.xll';

        if (excelStatus === ExcelServiceStatus.Connecting
            || excelStatus === ExcelServiceStatus.Connected) {
            return;
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
                console.log(ack);
                resolve();
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

    function onExcelConnected() {
        console.log("Excel Connected: " + fin.desktop.Excel.legacyApi.connectionUuid);

        excelStatus = ExcelServiceStatus.Connected

        fin.desktop.Excel.instance.removeEventListener("excelConnected", onExcelConnected);

        // Grab a snapshot of the current instance, it can change!
        var legacyApi = fin.desktop.Excel.legacyApi;

        var onExcelDisconnected = function () {
            console.log("Excel Disconnected: " + legacyApi.connectionUuid);

            fin.desktop.Excel.instance.removeEventListener("excelDisconnected", onExcelDisconnected);
            excelStatus = ExcelServiceStatus.Disconnected

            if (fin.desktop.Excel.legacyApi) {
                onExcelConnected();
            } else {
                excelStatus = ExcelServiceStatus.Disconnected

                fin.desktop.Excel.instance.addEventListener("excelConnected", onExcelConnected);
            }
        }

        fin.desktop.Excel.instance.addEventListener("excelDisconnected", onExcelDisconnected);
    }

    enum ExcelServiceStatus {
        Disconnected,
        Connecting,
        Connected,
        Error
    }
}