import * as ExportRedux from '../Redux/ActionsReducers/ExportRedux';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import { ApiBase } from './ApiBase';
import { IReport } from '../Utilities/Interface/BlotterObjects/IReport';
import { ILiveReport } from '../Utilities/Interface/Reports/ILiveReport';
import { ExportDestination } from '../Utilities/Enums';
import { IExportApi } from './Interface/IExportApi';
import { ExportState } from '../Redux/ActionsReducers/Interface/IState';

export class ExportApi extends ApiBase implements IExportApi {
  public getExportState(): ExportState {
    return this.getBlotterState().Export;
  }

  public getCurrentReportName(): string {
    return this.getExportState().CurrentReport;
  }
  public getCurrentReport(): IReport {
    let reportName: string = this.getCurrentReportName();
    return this.getReportByName(reportName);
  }

  public getReportByName(reportName: string): IReport {
    let report: IReport = this.getBlotterState().Export.Reports.find(l => l.Name == reportName);
    return report;
  }

  public getAllReports(): IReport[] {
    return this.blotter.api.internalApi
      .getSystemReports()
      .concat(this.getBlotterState().Export.Reports);
  }

  public sendReport(reportName: string, destination: ExportDestination): void {
    let report: IReport = this.getReportByName(reportName);
    if (this.checkItemExists(report, reportName, 'Report')) {
      this.dispatchAction(ExportRedux.ExportApply(report, destination));
    }
  }
}
