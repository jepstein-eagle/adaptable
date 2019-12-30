import { SystemFilterState } from '../PredefinedConfig/SystemFilterState';

/**
 * Provides run-time access to the System Filter section of Adaptable State.
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/filters/aggridsystemfiltersdemo/) | [System Filter State](_predefinedconfig_systemfilterstate_.systemfilterstate.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360029895971-Advanced-Search-FAQ) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755137-Search-Functions)
 *
 */
export interface SystemFilterApi {
  /**
   * Retrieves the System Filter section from Adaptable State
   */
  getSystemFilterState(): SystemFilterState;

  /**
   * Sets the given SystemFilters to be used
   *
   * @param systemFilters SystemFilters to set
   */
  setSystemFilters(systemFilters: string[]): void;

  /**
   * Clears all System Filters - essentially removes them all
   */
  clearSystemFilters(): void;

  /**
   * Gets all the System Filters currently in the System Filter State
   */
  getAllSystemFilter(): string[];

  /**
   * Gets all the System Filters which could be created by Adaptable
   *
   * If no System Filters have been set by the users then these will be all in the state
   */
  getAllPotentialSystemFilters(): string[];
}
