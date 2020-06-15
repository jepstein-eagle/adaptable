import { IAdaptable } from '@adaptabletools/adaptable/src/AdaptableInterfaces/IAdaptable';
import LoggingHelper, {
  LogAdaptableError,
} from '@adaptabletools/adaptable/src/Utilities/Helpers/LoggingHelper';
import { IOpenFinService } from './Interface/IOpenFinService';
import { OpenFinApi } from '@adaptabletools/adaptable/src/Api/OpenFinApi';
import { OpenFinPluginOptions } from '../..';
import { setup } from './setup';
import { ExcelWorkbook } from '../../excel-service/ExcelWorkbook';
import { ExcelWorksheet } from '../../excel-service/ExcelWorksheet';

require('../../excel-service/index.js');

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

//   return new Promise((resolve: any, reject: any) => {
//     LoggingHelper.LogAdaptableInfo('Deploying Add-In');
//     try {
//       fin.desktop.System.launchExternalProcess({
//         alias: 'excel-api-addin',
//         target: servicePath,
//         arguments: '-d "' + installFolder + '"',
//         listener: function(args: any) {
//           LoggingHelper.LogAdaptableSuccess('Installer script completed! ' + args.exitCode);
//           resolve();
//         },
//       });
//     } catch (err) {
//       console.error(err);
//       reject(err);
//     }
//   });
// }

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

export class OpenFinService implements IOpenFinService {
  private excelSyncTimeout?: number;
  private sheet?: any; // think this is wrong but lets give it a go

  private options: OpenFinPluginOptions;
  private workbookName: string;

  public getOpenFinApi(): OpenFinApi {
    return this.adaptable.api.pluginsApi.getPluginApi('openfin');
  }

  private onWorkbookRemoved = (event: any) => {
    event.workbook.removeEventListener('workbookActivated', this.onWorkbookActivated);
    const { workbook } = event;
    LoggingHelper.LogAdaptableInfo(
      'Workbook closed:' + workbook.name + ', Stopping Openfin Live Excel'
    );

    this.getOpenFinApi().stopLiveData();
  };
  private onWorkbookSaved = (event: any) => {
    const NewName = event.workbook.name;

    this.getOpenFinApi().stopLiveData();
    this.getOpenFinApi().startLiveData({
      ReportName: NewName,
    });
  };
  private onWorkbookActivated = (event: any) => {
    LoggingHelper.LogAdaptableInfo('Workbook Activated: ' + event.target.name);
    event.target.getWorksheets((ack: any) => {
      LoggingHelper.LogAdaptableInfo('getWorksheets:', ack);
    });
  };
  private onWorkbookAdded = (event: any) => {
    LoggingHelper.LogAdaptableSuccess('Workbook Added: ' + event.workbook.name);
    let workbook = event.workbook;
    workbook.addEventListener('workbookActivated', this.onWorkbookActivated);
  };

  private async getCurrentWorkbook(): Promise<ExcelWorkbook> {
    let workbook;
    if (!this.workbookName) {
      workbook = await fin.desktop.Excel.addWorkbook();
      // since  getWorkbookByName only works after getWorkbooks was called
      await fin.desktop.Excel.getWorkbooks();
      this.workbookName = workbook.name;

      return workbook;
    } else {
      return Promise.resolve(fin.desktop.Excel.getWorkbookByName(this.workbookName));
    }
  }

  public pushData(data: any[]): Promise<any> {
    return this.getCurrentWorkbook().then((workbook: any) => {
      const workBookName: string = workbook.name;

      return new Promise<any>((resolve, reject) => {
        let workBook = fin.desktop.Excel.getWorkbookByName(workBookName);
        if (!workBook) {
          LoggingHelper.LogAdaptableError('Cannot find workbook:' + workBookName);
          reject('Cannot find workbook:' + workBookName);
        }
        workbook.getWorksheets().then((worksheets: ExcelWorksheet[]) => {
          var worksheet = worksheets[0];
          worksheet.setCells(data, 'A1');
          resolve();
        });
      });
    });
  }

  private onExcelConnected = () => {
    LoggingHelper.LogAdaptableSuccess('Excel Connected');

    fin.desktop.Excel.addEventListener('workbookClosed', this.onWorkbookRemoved);
    fin.desktop.Excel.addEventListener('workbookSaved', this.onWorkbookSaved);
    fin.desktop.Excel.addEventListener('workbookAdded', this.onWorkbookAdded);
  };

  private onExcelDisconnected = () => {
    LoggingHelper.LogAdaptableInfo('Excel Disconnected');

    fin.desktop.Excel.removeEventListener('workbookClosed', this.onWorkbookRemoved);
    fin.desktop.Excel.removeEventListener('workbookSaved', this.onWorkbookSaved);
    fin.desktop.Excel.removeEventListener('workbookAdded', this.onWorkbookAdded);

    LoggingHelper.LogAdaptableInfo('Excel closed stopping all Live Excel');
    this.getOpenFinApi().stopLiveData();
  };

  public async initOpenFinExcel(): Promise<string> {
    await setup();

    fin.desktop.ExcelService.addEventListener('excelConnected', this.onExcelConnected);
    fin.desktop.ExcelService.addEventListener('excelDisconnected', this.onExcelDisconnected);

    await fin.desktop.ExcelService.init();

    LoggingHelper.LogAdaptableSuccess('Excel initialized, now connecting');
    await fin.desktop.Excel.run();
    await fin.desktop.Excel.getConnectionStatus().then((connected: boolean) => {
      LoggingHelper.LogAdaptableSuccess('Excel status', {
        initialized: fin.desktop.ExcelService.initialized,
        connected,
      });
    });

    return Promise.resolve('');

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

      if (isRunningInOpenfin()) {
        this.initOpenFinExcel();
      }
    });
  }
}
