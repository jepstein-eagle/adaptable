/**
 * The Options required for when using the ipushpull plugin
 *
 * ipushpull allows users to collborate and share data in powerful ways and it integrates very closely with AdapTable.
 *
 * --------------
 *
 *  ### Further AdapTable Help Resources
 *
 * - [ipushpull Demo](https://demo.adaptabletools.com/partners/ipushpulldemo)
 *
 * - [ipushpull Plugin](https://github.com/AdaptableTools/adaptable/blob/master/packages/plugins/ipushpull/README.md)
 *
 * - [ipushpull Integration Example](https://github.com/AdaptableTools/example-adaptable-ipushpull-integration)
 *
 * --------------
 *
 * ### ipushpull Options Example
 *
 * ```ts
 * const adaptableOptions: AdaptableOptions = {
 *    ******
 *     plugins: [
 *       ipp({
 *         username: process.env.IPUSHPULL_USERNAME,
 *         password: process.env.IPUSHPULL_PASSWORD,
 *         throttleTime: 5000,
 *         includeSystemReports: true,
 *         ippConfig: {
 *            api_url: 'https://www.ipushpull.com/api/1.0',
 *            ws_url: 'https://www.ipushpull.com',
 *            web_url: 'https://www.ipushpull.com',
 *            docs_url: 'https://docs.ipushpull.com',
 *            storage_prefix: 'ipp_local',
 *            transport: 'polling',
 *            hsts: false, // strict cors policy
 *        },
 *      }),
 *    ],
 *   ******
 *  };
 * ```
 */

export interface IPushPullPluginOptions {
  /**
   * The config required to run ipushpull
   *
   * Use the credentials you were given by ipushpull - see above for an example
   *
   * More info at [ipushpull repo](https://bitbucket.org/ipushpull/ipp-js/wiki/Home)
   */
  ippConfig?: any;

  /**
   * The user's ipushpull user name (usually an email address)
   *
   * If supplied then the ipushpull login screen's username textbox will be pre-populated
   */
  username?: string;
  /**
   * The user's ipushpull password
   *
   * If supplied then the ipushpull login screen's password textbox will be pre-populated
   */
  password?: string;
  /**
   * How long (in miliseconds) Adaptable should throttle when sending a data update to ipushpull.
   *
   * **Default Value: 2000**
   */
  throttleTime?: number;

  /**
   * Whether AdapTable will try log you in to ipushpull automatically at start-up
   *
   * **Default Value: false**
   */
  autoLogin?: boolean;

  /**
   * Whether AdapTable will include the System Reports (e.g. 'All Data', 'Selected Cells' etc) in the dropdown in the ipushpull toolbar
   *
   * **Default Value: true**
   */
  includeSystemReports?: boolean;
}
