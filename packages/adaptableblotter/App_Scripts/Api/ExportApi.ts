import * as ExportRedux from '../Redux/ActionsReducers/ExportRedux'
import { ApiBase } from "./ApiBase";
import { IReport } from './Interface/IAdaptableBlotterObjects';
import { ILiveReport } from '../Strategy/Interface/IExportStrategy';
import { ExportDestination } from "../Utilities/Enums";

export interface IExportApi {

  // Export api methods
  exportReportsGetAll(): IReport[];

  exportLiveReportsGetAll(): ILiveReport[];

   exportSendReport(reportName: string, destination: ExportDestination): void 
  
}


export class ExportApi extends ApiBase implements IExportApi {
  // Export api Methods
  public exportReportsGetAll(): IReport[] {
    return this.getState().Export.Reports;
  }

  public exportLiveReportsGetAll(): ILiveReport[] {
    return this.getState().System.CurrentLiveReports;
  }

  public exportSendReport(reportName: string, destination: ExportDestination): void {
    let report: IReport = this.exportReportsGetAll().find(r => r.Name == reportName);
    if (this.checkItemExists(report, reportName, "Report")) {
      this.dispatchAction(ExportRedux.ExportApply(reportName, destination))
    }
  }

}