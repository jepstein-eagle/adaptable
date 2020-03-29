import { SystemFilterState } from '../PredefinedConfig/SystemFilterState';

/**
 * Provides run-time access to the System Filter section of Adaptable State.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/filters/aggridsystemfiltersdemo/) | [System Filter State](_src_predefinedconfig_systemfilterstate_.systemfilterstate.html) | [AdapTable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
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
