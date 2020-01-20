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
 * [Demo Site](https://demo.adaptableblotter.com/partners/ipushpulldemo/) | [iPushPull State](interfaces/_predefinedconfig_ipushpullstate_.ipushpullstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360004099278-iPushPull-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360004003298-iPushPull) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360004256778#UUID-bea0c942-9326-7490-30b2-9a75709ac7d6)
 *
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
   * - *Name*: the name of the Domain / Folder
   *
   * - *FolderId*: the number of the Domain / Folder
   *
   * - *Pages*: a string array containing the names of all the Pages in the Folder
   */
  getIPushPullDomains(): IPushPullDomain[];

  getPagesForIPushPullDomain(folderName: string): string[];

  getFolderIdForName(folderName: string): number;

  addNewIPushPullPage(folderName: string, pageName: string): void;

  getIPushPullThrottleTime(): number | undefined;

  setIPushPullThrottleTime(throttleTime: number): void;

  isIPushPullReportLive(report: IPushPullReport): boolean;

  setIPushPullDomains(IPushPullDomains: IPushPullDomain[]): void;

  showIPushPullPopup(): void;

  loginToIPushPull(userName: string, password: string): void;

  retrieveIPushPullDomainsFromIPushPull(): void;

  logoutFromIPushPull(): void;

  setIPushPullLoginErrorMessage(loginErrorMessage: string): void;

  getIPushPullSchedules(): IPushPullSchedule[];

  // set internally

  setIPushPullAvailableOn(): void;

  setIPushPullAvailableOff(): void;

  isIPushPullAvailable(): boolean | undefined;

  setIPushPullRunningOn(): void;

  setIPushPullRunningOff(): void;

  isIPushPullRunning(): boolean | undefined;

  isIPushPullLiveDataRunning(): boolean | undefined;

  clearIPushPullInternalState(): void;
}
