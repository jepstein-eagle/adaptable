import { FilterState, FilterPredicate } from '../PredefinedConfig/FilterState';
import { AdaptableColumn } from '../types';
import { SystemFilterIds } from '../Utilities/Services/FilterService';

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
  getSystemFilterState(): FilterState;

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

  getFilterPredicateById(predicateId: string): FilterPredicate;

  getFilterPredicatesForColumn(column: AdaptableColumn): FilterPredicate[];

  getFilterPredicatesForColumnId(columnId: string): FilterPredicate[];

  getAllSystemFilterIds(): SystemFilterIds;

  getAllUserFilterIds(): string[];
}
