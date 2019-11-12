import { AdaptableBlotterObject } from './AdaptableBlotterObject';
import { Scope } from './Common/Scope';
import { DesignTimeState } from './DesignTimeState';

/**
 * Named Filters are filters provided at run-time together with a Predicate Function that will be evaluated each time the Filter runs.
 *
 * The Predicate Function will be given 3 params:
 *
 * a. *record* - the row where the Named Filter will be applied
 *
 * b. *columnId* - the column which contains the Named Filter
 *
 * c.  *cellValue* - the value being tested
 *
 * **Advanced Search Predefined Config Example**
 *
 * ```ts
 *
 * export default {
 *  NamedFilter: {
 *   NamedFilters: [
 *     {
 *       Name: '$ Trades',
 *       Scope: {
 *         DataType: 'Number',
 *         ColumnIds: ['currency'],
 *       },
 *       PredicateFunction: (_record, _columnId, cellValue) => {
 *         return cellValue === 'USD';
 *       },
 *     },
 *     {
 *       Name: 'Biz Year',
 *       Scope: {
 *         DataType: 'Date',
 *       },
 *       PredicateFunction: (_record, _columnId, cellValue) => {
 *         let dateToTest = cellValue as Date;
 *         let startBusinesssYear = new Date('2019-04-05');
 *         return dateToTest > startBusinesssYear;
 *       },
 *      },
 *   ],
 * },
 * } as PredefinedConfig;
 * ```
 */
export interface NamedFilterState extends DesignTimeState {
  /**
   * A collection of Named Filters
   */
  NamedFilters?: NamedFilter[];
}

//export interface NamedFilterPredicate {
//  (record: any, columnId: string, cellValue: any): boolean;
//}

/**
 * A Named Filter is a filter provided at design-time together with a Predicate Function that is evaluated each time the filter is run.
 */
export interface NamedFilter extends AdaptableBlotterObject {
  /**
   * The name of the Named Filter that will be applied.
   *
   * This value will be shown everywhere the filter appears (e.g. in Column menu or in the Query Builder screen).
   */
  Name: string;

  /**
   * Where the Named Filter will be applied
   *
   * You can choose to run the Named Filter for particular columns, for a given DataType (e.g. Date, Numeric), or for given Column Categories.
   */
  Scope: Scope;

  /**
   * **This property is deprecated; instead provide the full function using the *PredicateFunction* property below**
   */
  PredicateName?: string;

  /**
   * The name of the Predicate Function that will be run each time the Named Filter is applied.
   */
  PredicateFunction?: (record: any, columnId: string, cellValue: any) => boolean;
}
