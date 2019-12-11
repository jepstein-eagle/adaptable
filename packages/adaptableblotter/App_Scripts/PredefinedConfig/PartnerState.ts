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
  iPushPull?: iPushPullState;

  /**
   * Config required allow the Adaptable Blotter to interract with Glue42.
   */
  Glue42?: Glue42State;
}

/**
 * The information required to run iPushPull from within the Adaptable Blotter.
 *
 * This information is created by the user / developer at design time and injected into the Adaptable Blotter as Predefined Config
 *
 * If the information is provided then the Adaptable Blotter will include an iPushPull option to the Export Toolbar.
 *
 * It will also show associated iPushPull login and domain-page retrieval screens.
 *
 * To use iPushPull you will need to have your own iPushPull username and login
 *
 * However you will automatically use the Adaptable Blotter credentials (i.e. the `api_secret` and `api_key` properties), so please **always use the config as set in the example below**.
 *
 * **iPushPull Predefined Config Example**
 *
 *  ```ts
 *
 *  // 1. import ipushpull into your harness / application
 *  import ipushpull from 'ipushpull-js';
 *
 *  ------
 *
 *  // 2. immediately thereafter please set the config for the ipushpull object as follows
 * // (note: we will later late add the real values for the `api_secret` and `api_key` properties)
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
 * // 3. pass in this config as the `iPushPullInstance` property in iPushPull section of PartnerState
 * // Additionally you can add your iPushPull username and password to help to pre-fill the login page
 * const adaptableBlotterOptions: AdaptableBlotterOptions = {
 *   primaryKey: 'tradeId',
 *   blotterId: 'iPushPull Demo',
 *    vendorGrid: gridOptions,
 *    predefinedConfig: {
 *       Partner: {
 *         iPushPull: {
 *           iPushPullInstance: ipushpull,  // object created above
 *           Username: [YOUR IPUSHPULL USERNAME (EMAIL)],  // this is optional but will save you adding it each time
 *           Password: [YOUR IPUSHPULL PASSWORD],  // this is optional but will save you adding it each time
 *         },
 *       },
 *     }
 *  };
 * }
 *
 *  ```
 *
 */
export interface iPushPullState {
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
}

export interface Glue42State {
  /**
   *  A Glue42 object - pre-populated with the user's Glue42 credentials
   */
  Glue42Config?: any;

  Glue?: any; // this is the glue object

  Glue4Office?: any; // this is the Glue4Office object
}
