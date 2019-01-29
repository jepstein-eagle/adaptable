import * as ExportRedux from '../Redux/ActionsReducers/ExportRedux'
import { ApiBase } from "./ApiBase";
import { IReport } from "../Utilities/Interface/BlotterObjects/IReport";
import { ILiveReport } from "../Utilities/Interface/Reports/ILiveReport";
import { ExportDestination } from "../Utilities/Enums";
import { IExportApi } from './Interface/IExportApi';

export class ExportApi extends ApiBase implements IExportApi {

  public GetCurrent(): string {
    return this.getState().Export.CurrentReport;
  }

  public GetAllReports(): IReport[] {
    return this.getState().Export.Reports;
  }

  public GetAllLiveReports(): ILiveReport[] {
    return this.getState().System.CurrentLiveReports;
  }

  public SendReport(reportName: string, destination: ExportDestination): void {
    let report: IReport = this.GetAllReports().find(r => r.Name == reportName);
    if (this.checkItemExists(report, reportName, "Report")) {
      this.dispatchAction(ExportRedux.ExportApply(reportName, destination))
    }
  }

}