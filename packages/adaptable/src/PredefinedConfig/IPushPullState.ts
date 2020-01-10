import { DesignTimeState } from './DesignTimeState';
import { Report } from './ExportState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The objects required to run the [iPushPull](https://ipushpull.com) integration from within Adaptable.
 *
 * This state is created by the user / developer at design time and injected into Adaptable as Predefined Config
 *
 * If iPushPull state is provided, then Adaptable will include an 'Export to iPushPull' option in the Export Toolbar.
 *
 * If this option is selected, Adaptable will show iPushPull login and domain-page retrieval screens.
 *
 * To use iPushPull you will need to have your own iPushPull username and login credentials.
 *
 * However you will automatically use Adaptable credentials (i.e. the `api_secret` and `api_key` properties), so please **always use the config as set in the example below**.
 *
 * **iPushPull Predefined Config Example**
 *
 *  ```ts
 *
 *  // 1. import ipushpull into your harness / application using the iPushPull dependency (which you will need to add your package.json)
 *  import ipushpull from 'ipushpull-js';
 *
 *  ------
 *
 * // 2. immediately thereafter set the config for the ipushpull object as follows:
 * // (note: we will  add the real values for the `api_secret` & `api_key` properties)
 *  ipushpull.config.set({
 *    api_secret: '',  // will be added by Adaptable
 *    api_key: '',     // will be added by Adaptable
 *    api_url: 'https://www.ipushpull.com/api/1.0',
 *    ws_url: 'https://www.ipushpull.com',
 *    web_url: 'https://www.ipushpull.com',
 *    docs_url: 'https://docs.ipushpull.com',
 *    storage_prefix: 'ipp_local',
 *    transport: 'polling',
 *    hsts: false, // strict cors policy
 * });
 *
 *  ------
 *
 * // 3. pass in this config as 'iPushPullInstance' property in iPushPull / Partner state
 * // You can add your iPushPull username & password to help pre-fill the login page
 * const adaptableOptions: AdaptableOptions = {
 *   .........
 *   predefinedConfig: {
 *      Partner: {
 *        iPushPull: {
 *          iPushPullInstance: ipushpull,  // object created above
 *          Username: [YOUR IPUSHPULL USERNAME], // optional, saves being keyed each time
 *          Password: [YOUR IPUSHPULL PASSWORD], // optional, save sbeing keyed each time
 *        },
 *      },
 *    }
 *  };
 * }
 *
 *  ```
 * You are also able to listen to iPushPull-related changes by subscribing to the `LiveReportUpdated` event (learn more [here](_api_events_livereportupdated_.livereportupdatedeventargs.html)  )
 *
 * This event contains a `ExportDestination` property which you can check whether it equals 'iPushPull'.
 *
 * The event also includes a `trigger` property which will tell you what caused the event to fire (e.g. connected, dataupdated etc.) as well as providing details of the current live reports.
 *
 *  **Example: Subscribing to the 'LiveReportUpdated' event**
 *
 * ```ts
 * adaptableApi.eventApi.on(
 *    'LiveReportUpdated',
 *      (eventArgs: LiveReportUpdatedEventArgs) => {
 *        let reportUpdatedInfo: LiveReportUpdatedInfo = eventArgs.data[0].id;
 *        if (eventData.ExportDestination === 'iPushPull') {
 *            // do something...
 *        }
 *    }
 *  );
 * ```
 *
 */
export interface IPushPullState extends DesignTimeState {
  /**
   *  The iPushPull object - this is injected by the user from 'ipushpull-js' and set with standard configuration.
   */
  iPushPullInstance?: any;
  /**
   * The user's iPushPull user name (usually an email address)
   *
   * If supplied then the iPushPull login screen's username textbox will be pre-populated
   */
  Username?: string;
  /**
   * The user's iPushPull password
   *
   * If supplied then the iPushPull login screen's password textbox will be pre-populated
   */
  Password?: string;
  /**
   * How long (in miliseconds) Adaptable should throttle when sending a data update to iPushPull.
   *
   * **Default Value: 2000**
   */
  ThrottleTime?: number;

  IPushPullReports?: IPushPullReport[];

  CurrentIPushPullReport?: string;
}

export interface IPushPullReport extends AdaptableObject {
  Report: Report;
  Folder: string;
  Page: string;
  ScheduleType?: 'Snapsot' | 'Live';
}

/**
 * Describes an IPushPull folder / page
 */
export interface IPushPullDomain {
  /**
   * the Name of the Domain (or Folder)
   */
  Name: string;

  FolderId: number;

  /**
   * The names of the pages within the Domain (Folder)
   */
  Pages: string[];
}
