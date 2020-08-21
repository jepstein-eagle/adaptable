import * as ExportRedux from '../../Redux/ActionsReducers/ExportRedux';
import { ExportDestination } from '../../PredefinedConfig/Common/Enums';
import { ExportApi } from '../ExportApi';
import { ExportState, Report, ReportSchedule } from '../../PredefinedConfig/ExportState';
import { ApiBase } from './ApiBase';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class ExportApiImpl extends ApiBase implements ExportApi {
  public getExportState(): ExportState {
    return this.getAdaptableState().Export;
  }

  public getCurrentReportName(): string {
    return this.getExportState().CurrentReport;
  }
  public getCurrentReport(): Report {
    let reportName: string = this.getCurrentReportName();
    return this.getReportByName(reportName);
  }

  public getReportByName(reportName: string): Report {
    let report: Report = this.getAllReports().find(r => r.Name == reportName);
    return report;
  }

  public getAllReports(): Report[] {
    return this.adaptable.api.internalApi.getSystemReports().concat(this.getExportState().Reports);
  }

  public getReportSchedules(): ReportSchedule[] {
    return this.getAdaptableState().Schedule.ReportSchedules;
  }

  public sendReport(reportName: string, destination: ExportDestination): void {
    let report: Report = this.getReportByName(reportName);
    if (this.checkItemExists(report, reportName, 'Report')) {
      this.dispatchAction(ExportRedux.ExportApply(report, destination));
    }
  }

  public canExportToExcel(): boolean {
    return this.adaptable.canExportToExcel();
  }

  public exportDataToExcel(columnIds: string[], data: any[], fileName: string): void {
    this.adaptable.exportToExcel(columnIds, data, fileName);
  }

  public showExportPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ExportStrategyId,
      ScreenPopups.ExportPopup
    );
  }
}
