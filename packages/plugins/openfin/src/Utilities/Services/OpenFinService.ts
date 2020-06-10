import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import { AdaptableColumn } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/AdaptableColumn';
import LoggingHelper, {
  LogAdaptableError,
} from '@adaptabletools/adaptable/src/Utilities/Helpers/LoggingHelper';
import { cloneDeep } from 'lodash';
import Helper from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import ColumnHelper from '@adaptabletools/adaptable/src/Utilities/Helpers/ColumnHelper';
import ArrayExtensions from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';
import {
  DataType,
  ActionMode,
  ExportDestination,
} from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Enums';
import { DataChangedInfo } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/DataChangedInfo';
import { CellValidationRule } from '@adaptabletools/adaptable/src/PredefinedConfig/CellValidationState';
import ExpressionHelper from '@adaptabletools/adaptable/src/Utilities/Helpers/ExpressionHelper';
import {
  OpenFinState,
  OpenFinReport,
} from '@adaptabletools/adaptable/src/PredefinedConfig/OpenFinState';
import { IOpenFinService } from './Interface/IOpenFinService';
import StringExtensions from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { OpenFinApi } from '@adaptabletools/adaptable/src/Api/OpenFinApi';
import { OpenFinPluginOptions } from '../..';

import '../../excel-service';

declare var fin: any;
declare var chrome: any;
enum ExcelServiceStatus {
  Unknown = 'Unknown',
  Disconnected = 'Disconnected',
  Connecting = 'Connecting',
  Connected = 'Connected',
  Error = 'Error',
}
let excelStatus: ExcelServiceStatus = ExcelServiceStatus.Unknown;

export function isRunningInOpenfin() {
  return 'fin' in window && 'desktop' in fin;
}

export function isExcelOpenfinLoaded() {
  return isRunningInOpenfin() && 'Excel' in fin.desktop;
}

function addWorkbook(): Promise<string> {
  return new Promise<string>((resolve: any, reject: any) => {
    LoggingHelper.LogAdaptableInfo('Creating new workbook');
    fin.desktop.Excel.addWorkbook().then(function(workbook: any /*ExcelWorkbook*/) {
      LoggingHelper.LogAdaptableSuccess('workbook created:' + workbook.name);
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
function initExcelPluginService(): Promise<any> {
  var installFolder = '%localappdata%\\OpenFin\\shared\\assets\\excel-api-addin';
  var servicePath = 'OpenFin.ExcelService.exe';
  var addInPath = 'OpenFin.ExcelApi-AddIn.xll';

  if (excelStatus != ExcelServiceStatus.Unknown) {
    LoggingHelper.LogAdaptableInfo('Skipping Add-in deployment as already deployed');
    return Promise.resolve();
  }

  excelStatus = ExcelServiceStatus.Connecting;

  return Promise.resolve()
    .then(() => deployAddIn(servicePath, installFolder))
    .then(() => startExcelService(servicePath, installFolder))
    .then(() => registerAddIn(servicePath, installFolder));
}

function deployAddIn(servicePath: string, installFolder: string): Promise<any> {
  return new Promise((resolve: any, reject: any) => {
    LoggingHelper.LogAdaptableInfo('Deploying Add-In');
    fin.desktop.System.launchExternalProcess({
      alias: 'excel-api-addin',
      target: servicePath,
      arguments: '-d "' + installFolder + '"',
      listener: function(args: any) {
        LoggingHelper.LogAdaptableSuccess('Installer script completed! ' + args.exitCode);
        resolve();
      },
    });
  });
}

function startExcelService(servicePath: string, installFolder: string) {
  var serviceUuid = '886834D1-4651-4872-996C-7B2578E953B9';

  return new Promise((resolve, reject) => {
    fin.desktop.System.getAllExternalApplications((extApps: any[]) => {
      var excelServiceIndex = extApps.findIndex(extApp => extApp.uuid === serviceUuid);

      if (excelServiceIndex >= 0) {
        LoggingHelper.LogAdaptableInfo('Service Already Running');
        resolve();
        return;
      }

      var onServiceStarted = () => {
        LoggingHelper.LogAdaptableSuccess('Service Started');
        fin.desktop.Excel.instance.removeEventListener('started', onServiceStarted);
        resolve();
      };

      chrome.desktop.getDetails(function(details: any) {
        fin.desktop.Excel.instance.addEventListener('started', onServiceStarted);

        fin.desktop.System.launchExternalProcess(
          {
            target: installFolder + '\\OpenFin.ExcelService.exe',
            arguments: '-p ' + details.port,
            uuid: serviceUuid,
          },
          (process: any) => {
            LoggingHelper.LogAdaptableSuccess('Service Launched: ' + process.uuid);
          },
          (error: any) => {
            reject('Error starting Excel service');
          }
        );
      });
    });
  });
}

function registerAddIn(servicePath: string, installFolder: string) {
  return new Promise((resolve, reject) => {
    LoggingHelper.LogAdaptableInfo('Registering Add-In');
    fin.desktop.Excel.install((ack: any) => {
      LoggingHelper.LogAdaptableInfo('Add-In Registration callback', ack);
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
        LoggingHelper.LogAdaptableInfo('Excel Already Running');
        resolve();
      } else {
        LoggingHelper.LogAdaptableInfo('Launching Excel');
        fin.desktop.Excel.run(resolve);
      }
    });
  });
}
function onWorkbookRemoved(event: any) {
  event.workbook.removeEventListener('workbookActivated', onWorkbookActivated);
  const { workbook } = event;
  LoggingHelper.LogAdaptableInfo(
    'Workbook closed:' + workbook.name + ', Stopping Openfin Live Excel'
  );

  this.getOpenFinApi().stopLiveData();
}
function onWorkbookSaved(event: any) {
  const NewName = event.workbook.name;

  this.getOpenFinApi().stopLiveData();
  this.getOpenFinApi().startLiveData({
    ReportName: NewName,
  });
}
function onWorkbookActivated(event: any) {
  LoggingHelper.LogAdaptableInfo('Workbook Activated: ' + event.target.name);
  event.target.getWorksheets((ack: any) => {
    LoggingHelper.LogAdaptableInfo('getWorksheets:', ack);
  });
}
function onWorkbookAdded(event: any) {
  LoggingHelper.LogAdaptableSuccess('Workbook Added: ' + event.workbook.name);
  let workbook = event.workbook;
  workbook.addEventListener('workbookActivated', onWorkbookActivated);
}

export class OpenFinService implements IOpenFinService {
  private glue4ExcelInstance!: any;
  private glueInstance!: any;
  private excelSyncTimeout?: number;
  private sheet?: any; // think this is wrong but lets give it a go

  private options: OpenFinPluginOptions;
  private workbookName: string;

  public getOpenFinApi(): OpenFinApi {
    return this.adaptable.api.pluginsApi.getPluginApi('openfin');
  }

  public pushData(data: any[]): Promise<any> {
    const workBookName: string = this.workbookName;
    return new Promise<any>((resolve, reject) => {
      let workBook = fin.desktop.Excel.getWorkbookByName(workBookName);
      if (!workBook) {
        LoggingHelper.LogAdaptableError('Cannot find workbook:' + workBookName);
        reject('Cannot find workbook:' + workBookName);
      }
      let worksheet = workBook.getWorksheetByName('Sheet1');
      worksheet.setCells(data, 'A1');
      resolve();
    });
  }

  private onExcelConnected = () => {
    if (excelStatus != ExcelServiceStatus.Connected) {
      LoggingHelper.LogAdaptableSuccess(
        'Excel Connected: ' + fin.desktop.Excel.legacyApi.connectionUuid
      );

      excelStatus = ExcelServiceStatus.Connected;

      // fin.desktop.Excel.instance.removeEventListener("excelConnected", onExcelConnected);
      fin.desktop.Excel.addEventListener('workbookClosed', onWorkbookRemoved);
      fin.desktop.Excel.addEventListener('workbookSaved', onWorkbookSaved);
      fin.desktop.Excel.addEventListener('workbookAdded', onWorkbookAdded);

      // Grab a snapshot of the current instance, it can change!
      var legacyApi = fin.desktop.Excel.legacyApi;

      const onExcelDisconnected = function() {
        LoggingHelper.LogAdaptableInfo('Excel Disconnected: ' + legacyApi.connectionUuid);

        fin.desktop.Excel.instance.removeEventListener('excelDisconnected', onExcelDisconnected);
        legacyApi.removeEventListener('workbookClosed', onWorkbookRemoved);
        legacyApi.removeEventListener('workbookSaved', onWorkbookSaved);
        legacyApi.removeEventListener('workbookAdded', onWorkbookAdded);
        excelStatus = ExcelServiceStatus.Disconnected;

        LoggingHelper.LogAdaptableInfo('Excel closed stopping all Live Excel');
        this.getOpenFinApi().stopLiveData();

        if (fin.desktop.Excel.legacyApi) {
          this.onExcelConnected();
        } else {
          excelStatus = ExcelServiceStatus.Disconnected;
        }
      };

      fin.desktop.Excel.instance.addEventListener('excelDisconnected', onExcelDisconnected);
    }
  };
  private setWorkbookName(workbookName: string) {
    this.workbookName = workbookName;
  }

  public initOpenFinExcel(): Promise<string> {
    // fin.desktop.main(function () {

    return fin.desktop.ExcelService.init().then(() => {
      //      fin.desktop.Excel.init();

      if (excelStatus == ExcelServiceStatus.Unknown) {
        return Promise.resolve()
          .then(initExcelPluginService)
          .then(connectToExcel)
          .then(this.onExcelConnected)
          .then(addWorkbook)
          .then((workbookName: string) => {
            this.setWorkbookName(workbookName);
            return Promise.resolve(workbookName);
          })
          .catch(err => {
            LoggingHelper.LogAdaptableError(err);
            return '';
          });
      } else {
        return Promise.resolve()
          .then(connectToExcel)
          .then(this.onExcelConnected)
          .then(addWorkbook)
          .then((workbookName: string) => {
            this.setWorkbookName(workbookName);
            return Promise.resolve(workbookName);
          })
          .catch(err => {
            LoggingHelper.LogAdaptableError(err);
            return '';
          });
      }
    });

    // });
  }

  constructor(private adaptable: IAdaptable, options: OpenFinPluginOptions) {
    this.adaptable = adaptable;
    this.options = options;

    this.adaptable.api.eventApi.on('AdaptableReady', () => {
      const OpenFinApi = this.getOpenFinApi();
      if (!OpenFinApi || !this.options) {
        return;
      }

      OpenFinApi.setOpenFinRunningOff();
      if (isRunningInOpenfin()) {
        OpenFinApi.setOpenFinAvailableOn();
        this.initOpenFinExcel();
      } else {
        OpenFinApi.setOpenFinAvailableOff();
      }
    });
  }
}
