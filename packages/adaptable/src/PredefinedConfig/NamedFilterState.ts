import { AdaptableObject } from './Common/AdaptableObject';
import { Scope } from './Common/Scope';
import { ConfigState } from './ConfigState';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';

/**
 * Named Filters are filters provided at run-time together with a Predicate Function that will be evaluated each time the Filter runs.
 *
 * The Predicate Function will be given 3 params:
 *
 * a. *record* - the row where the Named Filter will be applied
 *
 * b. *columnId* - the column which contains the Named Filter
 *
 * c. *cellValue* - the value being tested
 *
 * **Named Filter Example**
 *
 * ```ts
 *
 * // Predefined Config
 * export default {
 * NamedFilter: {
 *   NamedFilters: [
 *     {
 *        Name: '$ Trades',
 *          Scope: {
 *            ColumnIds: ['currency'],
 *          },
 *       FilterPredicate: 'usdTrades',
 *     },
 *     {
 *        Name: 'High',
 *          Scope: {
 *            DataType: 'Number',
 *          },
 *        FilterPredicate: 'high',
 *      },
 *     {
 *         Name: 'Biz Year',
 *          Scope: {
 *            DataType: 'Date',
 *          },
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

export interface NamedFilterPredicate extends BaseUserFunction {
  type: 'NamedFilterPredicate';
  name: string;
  handler: (record: any, columnId: string, cellValue: any) => boolean;
}
