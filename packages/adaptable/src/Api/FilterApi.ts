import {
  FilterState,
  ColumnFilter,
  SystemFilterPredicateIds,
  UserFilter,
} from '../PredefinedConfig/FilterState';
import { AdaptableColumn } from '../types';
import { PredicateDef } from '../PredefinedConfig/Common/Predicate';

/**
 * Provides run-time access to the System Filter section of Adaptable State.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/filters/aggridsystemfiltersdemo/) | [System Filter State](_src_predefinedconfig_systemfilterstate_.systemfilterstate.html) | [AdapTable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 */
export interface FilterApi {
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

  findPredicateDefByShortcut(shortcut: string, column: AdaptableColumn): PredicateDef;

  getFilterPredicateDefsForColumn(column: AdaptableColumn): PredicateDef[];

  getFilterPredicateDefsForColumnId(columnId: string): PredicateDef[];

  getAllSystemFilterIds(): SystemFilterPredicateIds;

  getAllUserFilterIds(): string[];

  // Column filters

  /**
   * Retrieves all the Column Filters in the Column Filter State (of Predefined Config)
   */
  getAllColumnFilter(): ColumnFilter[];

  /**
   * Sets Column Filters - will replace filters for existing column and leave other column filters in place
   *
   * @param columnFilters the Column Filters to set
   */
  setColumnFilter(columnFilters: ColumnFilter[]): void;

  /**
   * Clears the given Column Filter
   *
   * @param columnFilter the Column Filter to clear
   */
  clearColumnFilter(columnFilter: ColumnFilter): void;

  /**
   * Clears the Column Filter for a given Column
   *
   * @param column the Column for which the Column Filter should be cleared
   */
  clearColumnFilterByColumn(column: string): void;

  /**
   * Clears the Column Filters for a given set of Columns
   *
   * @param columns the Columns for which the Column Filter should be cleared
   */
  clearColumnFilterByColumns(columns: string[]): void;

  /**
   * Clears all Column Filters in the State
   */
  clearAllColumnFilter(): void;

  /**
   * Clears all existing Column Filters and then sets the new ones
   *
   * @param columnFilters the Column Filters to set
   */
  clearAndSetColumnFilter(columnFilters: ColumnFilter[]): void;

  /**
   * Retrieves all the Column Filters for a given Column
   *
   * @param column the column to retrieve the Column Filters for
   */
  getAllColumnFilterForColumn(column: string): ColumnFilter[];

  createColumnFilterForCell(column: string, primarykeyValues: any[]): void;

  convertColumnFilterToString(columnFilter: ColumnFilter): string;
  convertColumnFiltersToString(columnFilters: ColumnFilter[]): string;

  evaluateColumnFilter(columnFilter: ColumnFilter, node: any): boolean;

  getAllUserFilter(): UserFilter[];
}
