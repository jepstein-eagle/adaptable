import { SystemFilterState } from '../PredefinedConfig/SystemFilterState';
import { UserFilter } from '../PredefinedConfig/UserFilterState';

/**
 * Provides run-time access to the System Filter section of Adaptable Blotter State.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/search/aggridadvancedsearchdemo/) | [State](_predefinedconfig_advancedsearchstate_.advancedsearchstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895971-Advanced-Search-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360028637652-Advanced-Search-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755137-Search-Functions)
 *
 */
export interface SystemFilterApi {
  /**
   * Retrieves the System Filter section from the Adaptable Blotter State
   */
  getSystemFilterState(): SystemFilterState;
  setSystemFilterByUserFilters(userFilters: UserFilter[]): void;
  setSystemFilter(systemFilters: string[]): void;
  clearSystemFilter(): void;
  getCurrentSystemFilter(): string[];
  getAllSystemFilter(): string[];
}
