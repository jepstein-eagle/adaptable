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
    return this.getExportState().ReportSchedules;
  }

  public sendReport(
    reportName: string,
    destination: ExportDestination,
    folder?: string,
    page?: string
  ): void {
    alert('sending report');
    let report: Report = this.getReportByName(reportName);
    let isLiveReport = this.adaptable.ReportService.IsReportLiveReport(report, destination);
    if (this.checkItemExists(report, reportName, 'Report')) {
      this.dispatchAction(ExportRedux.ExportApply(report, destination, isLiveReport, folder, page));
    }
  }

  public showExportPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ExportStrategyId,
      ScreenPopups.ExportPopup
    );
  }
}
