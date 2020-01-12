import {
  IPushPullState,
  IPushPullDomain,
  IPushPullReport,
  IPushPullSchedule,
} from '../PredefinedConfig/IPushPullState';

/**
 * Provides full and comprehensive run-time access to the Partner Config state.
 *
 * This is used for managing iPushPull,
 *
 * [Demo Site](https://demo.adaptableblotter.com/partners/) | [State](_predefinedconfig_partnerstate_.partnerstate.html) |  [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360028637652-Advanced-Search-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002754718-Partners)
 *
 */
export interface IPushPullApi {
  /**
   *
   * Retrieves the iPushPull section from the  Partner Config section of Adaptable State
   */
  getIPushPullState(): IPushPullState | undefined;
  getIPushPullUsername(): string | undefined;
  getIPushPullPassword(): string | undefined;

  getSelectedIPushPullReportName(): string | undefined;
  getCurrentLiveIPushPullReport(): IPushPullReport | undefined;

  sendSnapshot(iiPushPullReport: IPushPullReport): void;

  startLiveData(iPushPullReport: IPushPullReport): void;

  stopLiveData(): void;

  /**
   * Retrieves an iPushPull instance (if one has been provided by the User at design time)
   */
  getIPushPullInstance(): any;

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

  logoutFromIPushPull(): void;

  setIPushPullLoginErrorMessage(loginErrorMessage: string): void;

  getIPushPullSchedules(): IPushPullSchedule[];

  // set internally

  setIPushPullAvailableOn(): void;

  setIPushPullAvailableOff(): void;

  isIPushPullAvailable(): boolean;

  setIPushPullLiveDataRunningOn(): void;

  setIPushPullLiveDataRunningOff(): void;

  isIPushPullLiveDataRunning(): boolean;
}
