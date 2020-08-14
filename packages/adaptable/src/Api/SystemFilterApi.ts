import { SystemFilterState } from '../PredefinedConfig/SystemFilterState';
import { FilterPredicate } from '../AdaptableOptions/FilterPredicates';
import { AdaptableColumn } from '../types';

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
  getAllSystemFilterPredicates(): FilterPredicate[];

  getSystemFilterPredicateById(predicateId: string): FilterPredicate;

  getSystemFilterPredicatesForColumn(column: AdaptableColumn): FilterPredicate[];

  getSystemFilterPredicatesForColumnId(columnId: string): FilterPredicate[];
}
