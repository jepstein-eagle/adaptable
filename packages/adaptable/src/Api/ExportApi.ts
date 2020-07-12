import { ExportDestination } from '../PredefinedConfig/Common/Enums';
import { ExportState, Report, ReportSchedule } from '../PredefinedConfig/ExportState';

/**
 * Provides full and comprehensive run-time access to the Export function and associated Report state (from Predefined Config).
 *
 * Export enables you to create saveable Reports that you can run either manually or on a schedule.
 *
 * AdapTable will popuplate the Export dropdown with your reports (and the shipped System reports) and allows you to export the data to a number of destinations.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Export Demo](https://demo.adaptabletools.com/gridmanagement/aggridexportdemo)
 *
 * {@link ExportState|Export State}
 *
 * [Export Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/export-function.md)
 *
 * {@link ExportOptions|Export Options}
 *
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

  /**
   * Retrieves the Report with the given name
   * @param reportName report to retrieve
   */
  getReportByName(reportName: string): Report;

  /**
   * Retrieves the name of the currently selected Report
   */
  getCurrentReportName(): string;

  /**
   * Retrieves all Reports in the State - both System Reports (e.g. 'All Data') and User-created Reports
   */
  getAllReports(): Report[];

  /**
   * gets all Report Schedules
   */
  getReportSchedules(): ReportSchedule[];

  /**
   * Sends a report to a given destination.
   *
   * @param reportName the name of the report to send
   *
   * @param destination the destination to which the report should be sent
   */
  sendReport(reportName: string, destination: ExportDestination): void;

  /**
   * Indicates whether this AdapTable instance is able to export to Excel
   *
   * If false, then the Export to Excel will not be visible in the Export Toolbar or ToolPanel
   */
  canExportToExcel(): boolean;

  /**
   * Opens the Export popup screen
   */
  showExportPopup(): void;
}
