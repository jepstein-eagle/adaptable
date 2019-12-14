import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';
import { ExportDestination, LiveReportTrigger } from '../../PredefinedConfig/Common/Enums';
import { Report } from '../../PredefinedConfig/ExportState';

/**
 * Event Args used as part of the **on('LiveReportUpdated)** event.
 *
 */
export interface LiveReportUpdatedEventArgs extends BlotterEventArgs {
  data: LiveReportUpdatedEventData[];
}

export interface LiveReportUpdatedEventData extends AdaptableBlotterEventData {
  id: LiveReportUpdatedInfo;
}

/**
 * The main args used in the **on('LiveReportUpdated)** event.
 *
 * This event fires when any LiveData is being used (i.e. being sent to Excel via Glue42 or OpenFin or to iPushPull)
 *
 * It is fired whenever anything changes regarding this.
 *
 * The `trigger` property defines **why** the event fired.
 */
export interface LiveReportUpdatedInfo {
  /**
   * Which of the Adaptable Blotter partners is being used as the export destination to which to send live data.
   */
  exportDestination:
    | ExportDestination.OpenfinExcel
    | ExportDestination.iPushPull
    | ExportDestination.Glue42;

  /**
   * What triggered the event being fired.
   *
   * The available trigger values are:
   *
   * - 'Connected'
   *
   * - 'Disconnected'
   *
   * - 'ExportStarted'
   *
   * - 'ExportStopped'
   *
   * - 'LiveDataUpdated'
   *
   */
  liveReportTrigger: LiveReportTrigger;

  /**
   * What are the current 'Live Reports' in the State.
   *
   */
  currentLiveReports: LiveReport[];
}

export interface LiveReport {
  PageName: string; // for Excel this will be the workbook name, for iPushpull the page name.  for Glue42?
  Report: Report;
  ExportDestination: ExportDestination.OpenfinExcel | ExportDestination.iPushPull;
}
