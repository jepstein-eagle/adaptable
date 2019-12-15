import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';
import { ExportDestination, LiveReportTrigger } from '../../PredefinedConfig/Common/Enums';
import { Report } from '../../PredefinedConfig/ExportState';

/**
 * General comments on LiveReport Updated event here.
 *
 * Do I see them anywhere?
 */

/**
 * Event Args used as part of the **on('LiveReportUpdated)** event.
 *
 * This event is fired whenever OpenFin, Glue42 or iPushPull is connected or disconnected.
 *
 * It is also fired whenever a `Live Report` is started, stopped or updated.
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
 *
 * The `exportDestination` property reflects which of the Adaptable Partners is being used (OpenFin, iPushPull or Glue42).
 *
 */
export interface LiveReportUpdatedInfo {
  /**
   * Which of the Adaptable Blotter partners is being used as the export destination to which to send live data.
   */
  ExportDestination:
    | ExportDestination.OpenfinExcel
    | ExportDestination.iPushPull
    | ExportDestination.Glue42;

  /**
   * What triggered the event being fired.
   *
   * The available trigger values are:
   *
   * - Connected
   *
   * - Disconnected
   *
   * - ExportStarted
   *
   * - ExportStopped
   *
   * - LiveDataUpdated
   *
   */
  LiveReportTrigger: LiveReportTrigger;

  /**
   * What are the current 'Live Reports' in the State.
   *
   */
  CurrentLiveReports: LiveReport[];
}

/**
 * Defines which Adaptable Blotter are 'Live' (i.e. they will update the destination as the data in the Blotter ticks or changes)
 *
 * You can currently sent Live Reports to 3 Destinations:
 *
 * - iPushPull
 *
 * - OpenFin
 *
 * - Glue42
 *
 * When the Adaptable Blotter creates a Live Report it will take care of updating the destination as the data in the Report changes (based on the throttle time you give it).
 *
 * The Adaptable Blotter will fire the `LiveReportUpdated` event each time a Live Report is stopped, started or updated.
 */
export interface LiveReport {
  PageName: string; // for Excel this will be the workbook name, for iPushpull the page name.  for Glue42?
  Report: Report;
  ExportDestination:
    | ExportDestination.OpenfinExcel
    | ExportDestination.iPushPull
    | ExportDestination.Glue42;
}
