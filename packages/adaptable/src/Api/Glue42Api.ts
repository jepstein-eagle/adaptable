import { Glue42State } from '../PredefinedConfig/Glue42State';

/**
 * Provides full and comprehensive run-time access to the Partner Config state.
 *
 * This is used for managing iPushPull, Glue42 and other partners.
 *
 * [Demo Site](https://demo.adaptableblotter.com/partners/) | [State](_predefinedconfig_partnerstate_.partnerstate.html) |  [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360028637652-Advanced-Search-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002754718-Partners)
 *
 */
export interface Glue42Api {
  /**
   * Retrieves the iPushPUll section from the  Partner Config section of Adaptable State
   */
  getGlue42State(): Glue42State | undefined;

  isGlue42Available(): boolean;

  isGlue42RunLiveData(): boolean;

  getGlue42ThrottleTime(): number | undefined;

  setGlue42ThrottleTime(throttleTime: number): void;
}
