import { DesignTimeState } from './DesignTimeState';

/**
 * The Predefined Configuration to help manage Partner-related functionality
 *
 * This currently includes Glue42, iPushPull, OpenFin and Finsemble
 *
 */
export interface PartnerState extends DesignTimeState {
  /**
   * State required to run iPushPull from the Adaptable Blotter
   *
   * Primarily consists of an iPushPull object injected in to the Blotter
   */
  iPushPull?: IPushPullState;

  /**
   * Config required allow the Adaptable Blotter to interract with Glue42.
   */
  Glue42?: Glue42State;
}

/**
 * The objects required to run the [iPushPull](https://ipushpull.com) integration from within the Adaptable Blotter.
 *
 * This state is created by the user / developer at design time and injected into the Adaptable Blotter as Predefined Config
 *
 * If iPushPull state is provided, then the Adaptable Blotter will include an 'Export to iPushPull' option in the Export Toolbar.
 *
 * If this option is selected, the Adaptable Blotter will show iPushPull login and domain-page retrieval screens.
 *
 * To use iPushPull you will need to have your own iPushPull username and login credentials.
 *
 * However you will automatically use the Adaptable Blotter credentials (i.e. the `api_secret` and `api_key` properties), so please **always use the config as set in the example below**.
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
 *    api_secret: '',   // this will be added by the Adaptable Blotter
 *    api_key: '',      // this will be added by the Adaptable Blotter
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
 * const adaptableBlotterOptions: AdaptableBlotterOptions = {
 *   .........
 *   predefinedConfig: {
 *      Partner: {
 *        iPushPull: {
 *          iPushPullInstance: ipushpull,  // object created above
 *          Username: [YOUR IPUSHPULL USERNAME], // optional, saves being added each time
 *          Password: [YOUR IPUSHPULL PASSWORD], // optional, save sbeing added each time
 *        },
 *      },
 *    }
 *  };
 * }
 *
 *  ```
 * You are also able to listen to iPushPull-related changes by subscribing to the `LiveReportUpdated` event (learn more [here](_api_events_livereportupdated_.livereportupdatedeventargs.html)  )
 *
 * This event contains a `ExportDestination` property which you can check to be 'iPushPull'
 *
 *  **Example: Subscribing to the 'LiveReportUpdated' event**
 *
 * ```ts
 * blotterAPI.eventApi.on(
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
export interface IPushPullState {
  /**
   *  The iPushPull object - this is injected by the user from 'ipushpull-js' and set with standard configuration.
   */
  iPushPullInstance: any;

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
   * How long (in miliseconds) the Adaptable Blotter should throttle when sending an update to iPushPull.
   *
   * **Default Value: 2000**
   */
  ThrottleTime?: number;
}

export interface Glue42State {
  /**
   *  A Glue42 object - pre-populated with the user's Glue42 credentials
   */
  Glue42Config?: any;

  Glue?: any; // this is the glue object

  Glue4Office?: any; // this is the Glue4Office object

  RunLiveReports?: boolean;

  /**
   * How long (in miliseconds) the Adaptable Blotter should throttle when sending an update to iPushPull.
   *
   * **Default Value: 2000**
   */
  ThrottleTime?: number;
}

/**
 * Describes an IPushPull folder / page
 */
export interface IPushPullDomain {
  /**
   * the Name of the Domain (or Folder)
   */
  Name: string;

  /**
   * The names of the pages within the Domain (Folder)
   */
  Pages: string[];
}
