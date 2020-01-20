import {
  IPushPullState,
  IPushPullDomain,
  IPushPullReport,
  IPushPullSchedule,
} from '../PredefinedConfig/IPushPullState';

/**
 * Provides full and comprehensive run-time access to iPushPull state and associated methods.
 *
 * Use the API to find out if iPushPull is available or running and much else.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/partners/ipushpulldemo/) | [iPushPull State](_predefinedconfig_ipushpullstate_.ipushpullstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360004099278-iPushPull-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360004003298-iPushPull) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360004256778#UUID-bea0c942-9326-7490-30b2-9a75709ac7d6)
 *
 * Note: Some of these methods are intended for internal use only - and have been noted as such.
 */
export interface IPushPullApi {
  /**
   *
   * Retrieves the iPushPull section from Adaptable State
   */
  getIPushPullState(): IPushPullState | undefined;

  /**
   * Retrieves the iPushPull `Username` from the iPushPull state.
   */
  getIPushPullUsername(): string | undefined;

  /**
   * Retrieves the iPushPull `Password` from the iPushPull state.
   */
  getIPushPullPassword(): string | undefined;

  /**
   * Retrieves the iPushPull `AutoLogin` from the iPushPull state.
   *
   * If `true` then AdapTable will try to log in the user to iPushPull automatically at start-up
   */
  getAutoLogin(): boolean | undefined;

  /**
   * Retrieves the current iPushPull Report (if there is one) from the iPushPull state.
   *
   * An iPushPull Report contains 3 properties:
   *
   * -  **ReportName**: the name of the Report being exported to iPushPull
   *
   * -  **Folder**: the iPushPull folder containing the page where the exported data is shown
   *
   * -  **Page**: the iPushPull page which will show the exported data
   *
   */
  getCurrentLiveIPushPullReport(): IPushPullReport | undefined;

  /**
   * Publishes an iPushPull Report as a one-off export (i.e. with no live data)
   *
   * @param iPushPullReport the report to publish
   */
  sendSnapshot(iPushPullReport: IPushPullReport): void;

  /**
   * Publishes an iPushPull Report as Live Data, so that any changes to the underlying data in the report will be sent to iPushPull
   *
   * When this happens the 'play' button in the iPushPull toolbar changes to a red 'pause' button
   *
   * @param iPushPullReport the report to publish
   */
  startLiveData(iPushPullReport: IPushPullReport): void;

  /**
   * Pauses the current Live Data report.
   *
   * When this happens the 'pause' button in the iPushPull toolbar changes back to a 'play' button
   */
  stopLiveData(): void;

  /**
   * Retrieves the current iPushPull instance (if one has been provided by the User at design time in iPushPull state)
   */
  getIPushPullInstance(): any;

  /**
   * Retrieves all the iPushPull domain to which the current user has access
   *
   * An `IPushPullDomain' contains 3 properties:
   *
   * - **Name**: the name of the Domain / Folder
   *
   * - **FolderId**: the number of the Domain / Folder
   *
   * - **Pages**: a string array containing the names of all the Pages in the Folder
   */
  getIPushPullDomains(): IPushPullDomain[];

  /**
   * Retrieves all the pages in a given iPushPull folder
   * @param folderName the iPushPull folder which contains the pages
   */
  getPagesForIPushPullDomain(folderName: string): string[];

  /**
   * Gets the Id of the iPushPull folder / Domain with the given name
   *
   * @param folderName the iPushPull folder name
   */
  getFolderIdForName(folderName: string): number;

  /**
   * Adds a new page to iPushPull using given name in the supplied folder
   * @param folderName the name of the folder where the page will be added
   * @param pageName tbe name of the page to add
   */
  addNewIPushPullPage(folderName: string, pageName: string): void;

  /**
   * Retrieves the Throttle Time from the iPushPull State
   *
   * This is how often a Live Data report will update iPushPull (if the data has changed)
   */
  getIPushPullThrottleTime(): number | undefined;

  /**
   * Sets the Throttle time for iPushPull
   *
   * This is how often a Live Data report will update iPushPull (if the data has changed)
   *
   * @param throttleTime the new throttle time to use
   */
  setIPushPullThrottleTime(throttleTime: number): void;

  /**
   * Checks to see if a given report is currently 'live' (i.e. sending updates as the data changes)
   *
   * @param report the report to check
   */
  isIPushPullReportLive(report: IPushPullReport): boolean;

  /**
   * Sets the given Domains as those to be used by the current User
   *
   * @param IPushPullDomains the iPushPull Domains to set
   */
  setIPushPullDomains(IPushPullDomains: IPushPullDomain[]): void;

  /**
   * Opens the iPushPullPopup
   *
   * Note: this popup doesnt currently have any content!
   */
  showIPushPullPopup(): void;

  /**
   * Logins in the user to iPushPull with the given credentials
   *
   * If successful the iPushPull toolbar will change from showing a login button to a full set of controls
   *
   * @param userName the userName to send to iPushPull
   *
   * @param password the password to send to iPushPull
   */
  loginToIPushPull(userName: string, password: string): void;

  /**
   * Internal AdapTable method used to manage domains
   */
  retrieveIPushPullDomainsFromIPushPull(): void;

  /**
   * Logs out the current user from iPushPull
   *
   * This will change the iPushPull toolbar to show a Login button
   */
  logoutFromIPushPull(): void;

  /**
   * Displays the given message in the iPushPull login page
   *
   * This method is only intended to be used **internally** by AdapTable
   *
   * @param loginErrorMessage the login error message to show
   */
  setIPushPullLoginErrorMessage(loginErrorMessage: string): void;

  /**
   * Gets any iPushPull schedules ie. iPushPull reports that have been set to run at particular times
   */
  getIPushPullSchedules(): IPushPullSchedule[];

  /**
   * Sets that iPushPull is available to be **true**
   *
   * This method is only intended to be used **internally** by AdapTable
   */
  setIPushPullAvailableOn(): void;

  /**
   * Sets that iPushPull is available to be **false**
   *
   * This method is only intended to be used **internally** by AdapTable
   */
  setIPushPullAvailableOff(): void;

  /**
   * Checks to see if an iPushPull instance has been provided by the user
   *
   */
  isIPushPullAvailable(): boolean | undefined;

  /**
   * Sets that iPushPull is running to be **true**
   *
   * This method is only intended to be used **internally** by AdapTable
   */
  setIPushPullRunningOn(): void;

  /**
   * Sets that iPushPull is running to be **false**
   *
   * This method is only intended to be used **internally** by AdapTable
   */
  setIPushPullRunningOff(): void;

  /**
   * Checks to see if iPushPull is running (i.e. a user has successfully logged in)
   */
  isIPushPullRunning(): boolean | undefined;

  /**
   * Checks to see there is currently a report sending Live Data to iPushPull
   */
  isIPushPullLiveDataRunning(): boolean | undefined;

  /**
   * Clears out the **internal** state of iPushPull
   *
   * This method is only intended to be used **internally** by AdapTable
   */
  clearIPushPullInternalState(): void;
}
