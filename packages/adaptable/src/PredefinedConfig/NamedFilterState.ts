import { AdaptableObject } from './Common/AdaptableObject';
import { Scope } from './Common/Scope';
import { ConfigState } from './ConfigState';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';

/**
 * The Predefined Configuration for Named Filters
 *
 * Named Filters are filters provided by users at run-time together with a Predicate Function that will be evaluated each time the Filter runs.
 *
 * The Predicate Function will be given 3 params:
 *
 * a. *record* - the row where the Named Filter will be applied
 *
 * b. *columnId* - the column which contains the Named Filter
 *
 * c. *cellValue* - the value being tested
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Named Filter Demo](https://demo.adaptabletools.com/filters/aggridnamedfiltersdemo)
 *
 * {@link NamedFilterApi|Named Filter API}
 *
 * [Named Filter Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/named-filter-function.md)
 *
 * {@link UserFunctions|User Functions}
 *
 * [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 * --------------
 *
 * **Named Filter Example**
 *
 * ```ts
 *
 * export default {
 * NamedFilter: {
 *   NamedFilters: [
 *     {
 *        Name: '$ Trades',
 *        Scope: { ColumnIds: ['currency'] },
 *        FilterPredicate: 'usdTrades',
 *     },
 *     {
 *        Name: 'High',
 *        Scope: { DataType: 'Number' }
 *        FilterPredicate: 'high',
 *      },
 *     {
 *        Name: 'Biz Year',
 *        Scope: { DataType: 'Date' },
 *        FilterPredicate: 'bizYear',
 *      },
 *   ],
 * },
 * } as PredefinedConfig;
 *
 * // Adaptable Options
 * const adaptableOptions: AdaptableOptions = {
 * ......
 *  userFunctions: [
 *     {
 *        name: 'usdTrades',
 *        type: 'NamedFilterPredicate',
 *        handler(_record, _columnId, cellValue) {
 *         return cellValue === 'USD';
 *        },
 *      },
 *     {
 *        name: 'high',
 *        type: 'NamedFilterPredicate',
 *        handler(_record, _columnId, cellValue) {
 *         let currency: string = _record.data.currency;
 *          if (currency === 'USD') {
 *            return cellValue > 1000;
 *          } else if (currency === 'EUR') {
 *            return cellValue > 30;
 *          } else {
 *            return cellValue > 10;
 *          }
 *        },
 *      },
 *     {
 *        name: 'bizYear',
 *        type: 'NamedFilterPredicate',
 *        handler(_record, _columnId, cellValue) {
 *         let dateToTest = cellValue as Date;
 *          let startBusinesssYear = new Date('2019-04-05');
 *          return dateToTest > startBusinesssYear;
 *        },
 *      },
 *    ],
 * ```
 *
 * --------------
 *
 *
 *  AdapTable offers 4 types of Filters:
 *
 *  | Filter Type                                   | Usage
 *  | -----------                                   | -----------
 *  | {@link ColumnFilterState|Column}      | Filter a single Column using either a list of Column Values or a Range
 *  | {@link UserFilterState|User}          | Columm Filters which are saved & named; can therefore be re-used in multiple Functions
 *  | {@link NamedFilterState|Named}        | Filters which are provided at design-time together with a predicate function that is called each time it needs to be evaluated
 *  | {@link SystemFilterState|System}      | A predefined list of Filters shipped with AdapTable (e.g. 'Yesterday', 'Positive')
 *
 * Read more at the [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 */
export interface NamedFilterState extends ConfigState {
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
export interface NamedFilter extends AdaptableObject {
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
   * The name of the Predicate Function that will be run each time the Named Filter is applied.
   */
  FilterPredicate?: string;
}

/**
 * The predicate function provided by the User at design-time which is called each time a Named Filter is evaluated
 */
export interface NamedFilterPredicate extends BaseUserFunction {
  type: 'NamedFilterPredicate';
  name: string;
  handler: (record: any, columnId: string, cellValue: any) => boolean;
}
