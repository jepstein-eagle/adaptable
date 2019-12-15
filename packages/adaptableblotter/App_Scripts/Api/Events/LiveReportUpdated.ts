import { BlotterEventArgs, AdaptableBlotterEventData } from './BlotterEvents';
import { ExportDestination, LiveReportTrigger } from '../../PredefinedConfig/Common/Enums';
import { Report } from '../../PredefinedConfig/ExportState';

/**
 * The Event Args used as part of the **on('LiveReportUpdated')** event.
 *
 * This event is fired whenever OpenFin, Glue42 or iPushPull is connected or disconnected.
 *
 * It is also fired whenever a `Live Report` is started, stopped or updated.
 *
 * The main property is the [`LiveReportUpdatedInfo`](_api_events_livereportupdated_.livereportupdatedinfo.html)
 *
 * The Adaptable Blotter uses [FDC3](https://fdc3.finos.org/) so you access the object using [FDC3 Context Data Specification](https://fdc3.finos.org/docs/1.0/context-spec) (e.g xxx.data[0].id;)
 *
 *  **Subscribing to the 'LiveReportUpdated' Example**
 *
 * ```ts
 * blotterAPI.eventApi.on(
 *    'LiveReportUpdated',
 *      (pushPullUpdatedEventArgs: LiveReportUpdatedEventArgs) => {
 *        let eventData: LiveReportUpdatedInfo = pushPullUpdatedEventArgs.data[0].id;
 *        // do something...
 *   }
 *  );
 * ```
 *
 */
export interface LiveReportUpdatedEventArgs extends BlotterEventArgs {
  data: LiveReportUpdatedEventData[];
}

export interface LiveReportUpdatedEventData extends AdaptableBlotterEventData {
  id: LiveReportUpdatedInfo;
}

/**
 * The main args object used in the **on('LiveReportUpdated)** event.
 *
 * This event fires when any LiveData is being used (i.e. a report is being sent to Excel via Glue42 or OpenFin, or it is being sent to iPushPull)
 *
 * The event fires when a partner is connected or disconnected, or a LiveReport is started, stopped or updated.
 *
 * The object contains 3 properties:
 *
 * -The `LiveReportTrigger` property defines **why** the event fired.
 *
 * -The `ExportDestination` property reflects which of the Adaptable Blotter Partners is being used (OpenFin, iPushPull or Glue42).
 *
 * -The `CurrentLiveReports` property lists which are the 'LiveReports' (ie. reports which will update the destination as the data ticks.)
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
   * What triggered the event to be fired.
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
   * Which are the current 'Live Reports' in the State.
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
