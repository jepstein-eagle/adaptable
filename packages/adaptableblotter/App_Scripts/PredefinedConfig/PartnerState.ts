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
 * **iPushPull Predefined Config Example**
 *
 *  ```ts
 *
 *  // 1. import ipushpull into your harness / application
 *  import ipushpull from 'ipushpull-js';
 *
 *  ------
 *
 * // 3. pass in this config as the `iPushPullConfig` property in iPushPull section of PartnerState
 * // Additionally you can add your iPushPull username and password to pre-fill the login page
 * const adaptableBlotterOptions: AdaptableBlotterOptions = {
 *   primaryKey: 'tradeId',
 *   blotterId: 'iPushPull Demo',
 *    vendorGrid: gridOptions,
 *    predefinedConfig: {
 *       Partner: {
 *         iPushPull: {
 *           iPushPullInstance: ipushpull,  // object created above
 *           Username: [YOUR IPUSHPULL USERNAME (EMAIL)],  // this is optional
 *           Password: [YOUR IPUSHPULL PASSWORD],  // this is optional
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
   *  The iPushPull object - this is injected by the user from 'ipushpull-js'
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
