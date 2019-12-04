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
  glue42Config?: Glue42Config;
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
 * -------------
 *
 * //  2. fill in the ipushpull config
 * // use the values below substituting your own `api_key` and `api_secret` values as provided by iPushPull
 * ipushpull.config.set({
 *  api_url: 'https://www.ipushpull.com/api/1.0',
 *  ws_url: 'https://www.ipushpull.com',
 *  web_url: 'https://www.ipushpull.com',
 *  docs_url: 'https://docs.ipushpull.com',
 *  storage_prefix: 'ipp_local',
 *  api_key: [PUT YOUR IPUSHPULL API KEY HERE],
 *  api_secret: [PUT YOUR IPUSHPULL API SECRET HERE],
 *  transport: 'polling',
 *  hsts: false, // strict cors policy so needs to be false
 * });
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
 *           iPushPullConfig: ipushpull,  // object created above
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
   *  An iPushPull object - pre-populated with the user's iPushPull credentials
   */
  iPushPullConfig?: any;

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

/**
 * Confiuration required to run Glue42
 */
export interface Glue42Config {
  initialization: {
    application: string;
    gateway: {
      protocolVersion: number;
      ws: string;
    };
    auth: {
      username: string;
      password: string;
    };
  };
  excelExport?: {
    timeoutMs?: number;
  };
}
