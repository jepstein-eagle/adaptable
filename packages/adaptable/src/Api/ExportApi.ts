import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { ExportState, Report, ReportSchedule } from '../PredefinedConfig/ExportState';

/**
 * Provides full and comprehensive run-time access to the Export function and associated Report state (from Predefined Config).
 */
export interface ExportApi {
  /**
   * Retrieves the Export section from Adaptable State
   */
  getExportState(): ExportState;

  /**
   * Retrieves the currently selected Report
   */
  getCurrentReport(): Report;

  getReportByName(reportName: string): Report;

  /**
   * Retrieves the name of the currently selected Report
   */
  getCurrentReportName(): string;

  /**
   * Retrieves all Reports in the State - both System Reports (e.g. 'All Data') and User-created Reports
   */
  getAllReports(): Report[];

  getReportSchedules(): ReportSchedule[];

  /**
   * Sends a report to a given destination.
   *
   * @param reportName the name of the report to send
   *
   * @param destination the destination to which the report should be sent
   */
  sendReport(
    reportName: string,
    destination: ExportDestination,
    folder?: string,
    page?: string
  ): void;

  /**
   * Opens the Export popup screen
   */
  showExportPopup(): void;
}
