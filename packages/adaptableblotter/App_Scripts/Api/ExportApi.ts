import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { ExportState, Report } from '../PredefinedConfig/ExportState';

/**
 * Provides full and comprehensive run-time access to the Export function and associated Report state (from Predefined Config).
 */
export interface ExportApi {
  /**
   * Retrieves the Export section from the Adaptable Blotter State
   */
  getExportState(): ExportState;

  /**
   * Retrieves the currently selected Report
   */
  getCurrentReport(): Report;

  /**
   * Retrieves the name of the currently selected Report
   */
  getCurrentReportName(): string;

  /**
   * Retrieves all Reports in the State - both System Reports (e.g. 'All Data') and User-created Reports
   */
  getAllReports(): Report[];

  /**
   * Retrieves all Reports in the State which have a schedule
   */
  getScheduledReports(): Report[];

  /**
   * Sends a report to a given destination.
   *
   * @param reportName the name of the report to send
   *
   * @param destination the destination to which the report should be sent
   */
  sendReport(reportName: string, destination: ExportDestination): void;

  /**
   * Opens the Export popup screen
   */
  showExportPopup(): void;
}
