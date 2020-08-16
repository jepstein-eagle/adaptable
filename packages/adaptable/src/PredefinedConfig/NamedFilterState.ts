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
 */
