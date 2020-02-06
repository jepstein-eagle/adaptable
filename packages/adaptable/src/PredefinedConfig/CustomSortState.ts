import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for the Custom Sort function
 *
 * Use Custom Sort when you want to sort a column in non default ways (i.e. not alphabetically or not in natural ascending / descending order).
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
 * [Custom Sort Demo](hhttps://demo.adaptabletools.com/gridmanagement/aggridcustomsortdemo/)
 *
 * [Custom Sort API](_api_customsortapi_.customsortapi.html)
 *
 * [Custom Sort FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360002170297-Custom-Sort-FAQ)
 *
 * [Custom Sort Help](hhttps://adaptabletools.zendesk.com/hc/en-us/articles/360002755197-Grid-Functions)
 *
 * **Custom Sort Predefined Config Example**
 *
 * ```ts
 * export default {
 * CustomSort: {
 *   CustomSorts: [
 *     {
 *       ColumnId: 'Rating',
 *       SortedValues: ['AAA', 'AA+', 'AA', 'AA-'], // etc.
 *     },
 *     {
 *        ColumnId: 'Country',
 *        CustomSortComparerFunction: (valueA: any, valueB: any, nodeA: any, nodeB: any) => {
 *          if (valueA === 'United Kingdom') {
 *             return -1;
 *           }
 *           if (valueB === 'United Kingdom') {
 *             return 1;
 *           }
 *           return nodeA.data.notional > nodeB.data.notional ? 1 : -1;
 *        },
 *      },
 *   ],
 * },
 * } as PredefinedConfig;
 * ```
 * In this example we have created 2 Custom Sort:
 *
 * One on the Rating Column - which will sue a Rating order we have given it
 *
 * One on the Country Column - which will use a function that will sort as follows: first with 'United Kingdom' and then other values will sort according to the value in Notional column for that row.
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
  CustomSortComparerFunction?: CustomSortComparerFunction;
}

/**
 * A standard 'comparer' type function used to evaluate custom sorts at run-time.
 *
 * Like all comparer functions it will return -1, 0, 1 to set the sort order.
 *
 * Each time the function is run it is given 2 cell values to compare, and also both (equivalent) rows (to allow you to look up other values in the row if necessary)
 */
export type CustomSortComparerFunction = (
  valueA: any,
  valueB: any,
  nodeA: any,
  nodeB: any
) => number;
