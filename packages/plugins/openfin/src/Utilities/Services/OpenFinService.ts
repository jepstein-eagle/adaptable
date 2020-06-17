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

export function isRunningInOpenfin() {
  return 'fin' in window && 'desktop' in fin;
}

export function isExcelOpenfinLoaded() {
  return isRunningInOpenfin() && 'Excel' in fin.desktop;
}
export class OpenFinService implements IOpenFinService {
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

  private getCurrentWorkbook(): Promise<ExcelWorkbook> {
    if (!this.workbookName) {
      return this.waitForExcel().then(() => {
        return fin.desktop.Excel.addWorkbook().then((workbook: any) => {
          // since  getWorkbookByName only works after getWorkbooks was called
          return fin.desktop.Excel.getWorkbooks().then(() => {
            this.workbookName = workbook.name;

            return workbook;
          });
        });
      });
    } else {
      return Promise.resolve(fin.desktop.Excel.getWorkbookByName(this.workbookName));
    }
  }

  public pushData(data: any[]): Promise<any> {
    const OpenFinApi = this.getOpenFinApi();
    if (!OpenFinApi || !this.options || !isRunningInOpenfin()) {
      return Promise.resolve(null);
    }

    this.initOpenFinExcel().then(() => {
      this.getCurrentWorkbook().then((workbook: any) => {
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

    this.initialisingExcel = null;
    this.workbookName = undefined;

    fin.desktop.Excel.removeEventListener('workbookClosed', this.onWorkbookRemoved);
    fin.desktop.Excel.removeEventListener('workbookSaved', this.onWorkbookSaved);
    fin.desktop.Excel.removeEventListener('workbookAdded', this.onWorkbookAdded);

    LoggingHelper.LogAdaptableInfo('Excel closed stopping all Live Excel');
    this.getOpenFinApi().stopLiveData();
  };

  private initialisingExcel: Promise<string> | null = null;

  public initOpenFinExcel(): Promise<string> {
    if (this.initialisingExcel) {
      return this.initialisingExcel;
    }
    this.initialisingExcel = setup()
      .then(() => {
        fin.desktop.ExcelService.addEventListener('excelConnected', this.onExcelConnected);
        fin.desktop.ExcelService.addEventListener('excelDisconnected', this.onExcelDisconnected);

        return fin.desktop.ExcelService.init();
      })
      .then(() => {
        LoggingHelper.LogAdaptableSuccess('Excel initialized, now connecting');

        fin.desktop.Excel.run();

        return true;
      })
      .then(() => {
        return fin.desktop.Excel.getConnectionStatus().then((connected: boolean) => {
          LoggingHelper.LogAdaptableSuccess('Excel status', {
            initialized: fin.desktop.ExcelService.initialized,
            connected,
          });

          return true;
        });
      })
      .then(() => this.waitForExcel())
      .then(() => Promise.resolve(''));

    return this.initialisingExcel;
  }

  waitForExcel = () => {
    let startTime = Date.now();
    const poolForExcel = (callback: () => void) => {
      if (Date.now() - startTime > 20000) {
        console.error(`Could not find any Excel instance.`);
        return callback();
      }

      if (!fin.desktop.Excel || !fin.desktop.Excel.getWorkbooks) {
        requestAnimationFrame(() => {
          poolForExcel(callback);
        });
      } else {
        callback();
      }
    };

    return new Promise(resolve => {
      poolForExcel(() => resolve(''));
    });
  };

  constructor(private adaptable: IAdaptable, options: OpenFinPluginOptions) {
    this.adaptable = adaptable;
    this.options = options;
  }
}
