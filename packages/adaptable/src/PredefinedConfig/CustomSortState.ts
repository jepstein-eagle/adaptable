import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for the Custom Sort function
 *
 * Use Custom Sort when you want to sort a column in non default ways (i.e. not alphabetically or not in natural ascending / descending order).
 *
 * Custom Sorts will be applied both when you sort the Column in table view and in pivot view.
 *
 * When creating a Custom Sort you can set the sort in one of 2 ways:
 *
 * - Through `SortedValues` - a sorted list of column values which will be evaluated according to the list order (any item not in the list is sorted 'naturally' after all the values in the list have been sorted)
 *
 * - Through the `CustomSortComparerFunction` - a standard 'Comparer' function provided by you.
 *
 * **Further AdapTable Help Resources**
 *
 * [Custom Sort Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360030078431-Custom-Sort-Videos)
 *
 * [Custom Sort Demo](https://demo.adaptabletools.com/gridmanagement/aggridcustomsortdemo/)
 *
 * [Custom Sort API](_src_api_customsortapi_.customsortapi.html)
 *
 * [Custom Sort FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360002170297-Custom-Sort-FAQ)
 *
 * [Custom Sort Help](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755197-Grid-Functions)
 *
 * **Custom Sort Example**
 *
 * ```ts
 *
 * // Predefined Config
 * export default {
 * CustomSort: {
 *   CustomSorts: [
 *     {
 *       ColumnId: 'Rating',
 *       SortedValues: ['AAA', 'AA+', 'AA', 'AA-'], // etc.
 *     },
 *     {
 *        ColumnId: 'Country',
 *        CustomSortComparerFunction: 'country',
 *      },
 *     {
 *        ColumnId: 'currency',
 *        CustomSortComparerFunction: 'currency',
 *      },
 *   ],
 * },
 * } as PredefinedConfig;
 *
 * const adaptableOptions: AdaptableOptions = {
 * ......
 *  userFunctions: [
 *     {
 *        name: 'country',
 *        type: 'CustomSort.ComparerFunction',
 *        handler(valueA: any, valueB: any, nodeA?: any, nodeB?: any) {
 *         if (valueA === 'United Kingdom') {
 *            return -1;
 *          }
 *          if (valueB === 'United Kingdom') {
 *            return 1;
 *          }
 *          return 0;
 *        },
 *      },
 *      {
 *        name: 'currency',
 *       type: 'CustomSort.ComparerFunction',
 *        handler(valueA: any, valueB: any, nodeA?: any, nodeB?: any) {
 *          if (valueA === 'USD') {
 *            return -1;
 *          }
 *          if (valueB === 'USD') {
 *            return 1;
 *          }
 *          return 0;
 *        },
 *      },
 *      ],
 * ```
 *
 * In this example we have created 3 Custom Sorts:
 *
 * - One on the Rating Column - which will use the list (and order) we have provided
 *
 * - One on the Country and Currency Columns - which will use functions that we name in Predefined Config and define in userOptions.
 *
 */

export interface CustomSortState extends RunTimeState {
  /**
   * A collection of Custom Sort objects.
   *
   * **Default Value**:  Empty array
   */
  CustomSorts?: CustomSort[];
}

/**
 * The CustomSort object used in the Custom Sort function.
 */
export interface CustomSort extends AdaptableObject {
  /**
   * The Id of the Column on which the Custom Sort will be applied (e.g. when the column header is clicked in order to sort the Column values)
   */
  ColumnId: string;

  /**
   * The values by the which the Column will be sorted.
   *
   * Note: If there are values in the Column that do not appear in this list then they will be sorted alphabetically AFTER all the values in the list have first been sorted.
   *
   */
  SortedValues?: string[];

  /**
   * A standard 'comparer' type function which will evaluate the items and return -1, 0, 1 to set the sort order.
   *
   * Each time it runs it is given 2 cell values to compare (as well as both rows to allow you to look up other values in the row if necessary)
   */
  CustomSortComparerFunction?: string;
}
