import * as ExportRedux from '../Redux/ActionsReducers/ExportRedux';
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

  public getCurrentReport(): string {
    return this.getExportState().CurrentReport;
  }

  public getAllReports(): IReport[] {
    return this.blotter.api.internalApi
      .getSystemReports()
      .concat(this.getBlotterState().Export.Reports);
  }

  public sendReport(reportName: string, destination: ExportDestination): void {
    let report: IReport = this.getAllReports().find(r => r.Name == reportName);
    if (this.checkItemExists(report, reportName, 'Report')) {
      this.dispatchAction(ExportRedux.ExportApply(reportName, destination));
    }
  }
}
