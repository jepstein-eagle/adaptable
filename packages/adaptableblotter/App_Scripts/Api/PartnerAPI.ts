import { PartnerState, iPushPullState } from '../PredefinedConfig/PartnerState';

/**
 * Provides full and comprehensive run-time access to the Partner Config state.
 *
 * This is used for managing iPushPull, Glue42 and other partners.
 *
 * [Demo Site](https://demo.adaptableblotter.com/partners/) | [State](_predefinedconfig_partnerconfigstate_.partnerconfigstate.html) |  [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360028637652-Advanced-Search-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002754718-Partners)
 *
 */
export interface PartnerAPI {
  /**
   * Retrieves the Partner Config section from the Adaptable Blotter State
   */
  getPartnerState(): PartnerState;

  /**
   * Retrieves the iPushPUll section from the  Partner Config section of the Adaptable Blotter State
   */
  getPushPullState(): iPushPullState | undefined;

  /**
   * Retrieves an iPushPull instance (if one has been provided by the User at design time)
   */
  getPushPullInstance(): any;
}
