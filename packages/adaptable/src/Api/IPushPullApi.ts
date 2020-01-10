import {
  IPushPullState,
  IPushPullDomain,
  IPushPullReport,
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

  getCurrentIPushPullReportName(): string;

  getCurrentIPushPullReport(): IPushPullReport;

  getScheduledReports(): IPushPullReport[];

  exportToIPushPull(iPushPullReportName: string): void;

  /**
   * Retrieves an iPushPull instance (if one has been provided by the User at design time)
   */
  getIPushPullInstance(): any;

  isIPushPullAvailable(): boolean;

  getIPushPullDomainsPages(): IPushPullDomain[];

  getIPushPullThrottleTime(): number | undefined;

  setIPushPullThrottleTime(throttleTime: number): void;

  isIPushPullReportLive(report: IPushPullReport): boolean;

  setIPushPullDomains(IPushPullDomains: IPushPullDomain[]): void;

  showIPushPullPopup(): void;

  showIPushPullLogin(): void;

  loginToIPushPull(userName: string, password: string): void;
}
