import { AdaptableEventArgs, AdaptableEventData } from './AdaptableEvents';
import { Report } from '../../PredefinedConfig/ExportState';

/**
 * The Event Args used as part of the **on('LiveDataChanged')** event.
 *
 * This event is fired whenever OpenFin, Glue42 or iPushPull is connected or disconnected.
 *
 * It is also fired whenever a `Live Report` is started, stopped or updated.
 *
 * The main property is the [`LiveDataChangedInfo`](_api_events_LiveDataChanged_.LiveDataChangedinfo.html)
 *
 * Adaptable uses [FDC3](https://fdc3.finos.org/) so you access the object using [FDC3 Context Data Specification](https://fdc3.finos.org/docs/1.0/context-spec) (e.g xxx.data[0].id;)
 *
 *  **Example: Subscribing to the 'LiveDataChanged' event**
 *
 * ```ts
 * adaptableApi.eventApi.on(
 *    'LiveDataChanged',
 *      (eventArgs: LiveDataChangedEventArgs) => {
 *        let liveDataChangedInfo: LiveDataChangedInfo = eventArgs.data[0].id;
 *        // do something...
 *   }
 *  );
 * ```
 *
 */
export interface LiveDataChangedEventArgs extends AdaptableEventArgs {
  data: LiveDataChangedEventData[];
}

export interface LiveDataChangedEventData extends AdaptableEventData {
  id: LiveDataChangedInfo;
}

/**
 * The main args object used in the **on('LiveDataChanged)** event.
 *
 * This event fires when any LiveData is being used (i.e. a report is being sent to Excel via Glue42 or OpenFin, or it is being sent to iPushPull)
 *
 * The event fires when a partner which uses Live Data is connected or disconnected, or a LiveReport is started, stopped or updated.
 *
 * The object contains 3 properties:
 *
 * -The `LiveDataTrigger` property defines **why** the event fired.
 *
 * -The `ReportDestination` property reflects which of Adaptable Partners is being used (i.e. OpenFin, iPushPull or Glue42).
 *
 * -The `LiveReport` property provides details of the Report that has just been stopped / started / updated.
 *
 */
export interface LiveDataChangedInfo {
  /**
   * Which of Adaptable partners is being used as the export destination to which to send live data.
   */
  ReportDestination: 'OpenfinExcel' | 'iPushPull' | 'Glue42';

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
  LiveDataTrigger:
    | 'Connected'
    | 'Disconnected'
    | 'LiveDataStarted'
    | 'LiveDataStopped'
    | 'LiveDataUpdated';

  LiveReport?: any;
}

/**
 * Defines which Adaptable are 'Live' (i.e. they will update the destination as the data in Adaptable ticks or changes)
 *
 * You can currently sent Live Reports to 3 Destinations:
 *
 * - iPushPull
 *
 * - OpenFin
 *
 * - Glue42
 *
 * When Adaptable creates a Live Report it will take care of updating the destination as the data in the Report changes (based on the throttle time you give it).
 *
 * Adaptable will fire the `LiveDataChanged` event each time a Live Report is stopped, started or updated.
 */
export interface LiveReport {
  PageName: string; // for Excel this will be the workbook name, for iPushpull the page name.  for Glue42 the Spreadsheet name.
  Report: Report;
  ReportDestination: 'OpenfinExcel' | 'iPushPull' | 'Glue42';
}
