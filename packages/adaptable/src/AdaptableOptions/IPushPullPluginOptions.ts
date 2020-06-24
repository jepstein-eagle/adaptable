export interface IPushPullPluginOptions {
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
