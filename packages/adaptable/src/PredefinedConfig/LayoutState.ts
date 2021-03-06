import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { ColumnSort } from './Common/ColumnSort';

/**
 * The Predefined Configuration for the Layout function
 *
 * Layouts are collections of Column visiblity, order and sorting.
 *
 * You can also specify which Column grouping and pivoting information for the Layout.
 *
 *  **Further AdapTable Help Resources**
 *
 * [Demo Site](https://demo.adaptabletools.com/gridmanagement/aggridlayoutdemo/) | [Api](_src_api_layoutapi_.layoutapi.html) | [Options](_src_adaptableoptions_layoutoptions_.layoutoptions.html) | [Layout Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/layout-function.md)
 *
 * **Layout Predefined Config Example**
 *
 * ```ts
 * export default {
 *   Layout: {
 *    CurrentLayout: 'Pivoted Layout',
 *    Layouts: [
 *      {
 *        Name: 'Simple Layout',
 *        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty'],
 *      },
 *      {
 *        Name: 'Sorting Layout',
 *        ColumnWidthMap: {
 *          currency: 200,
 *          counterparty: 300,
 *        },
 *        ColumnSorts: [
 *          {
 *            Column: 'counterparty',
 *            SortOrder: 'Desc',
 *          },
 *          {
 *            Column: 'currency',
 *            SortOrder: 'Desc',
 *          },
 *        ],
 *        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty'],
 *      },
 *      {
 *        Name: 'Grouping Layout',
 *        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty', 'InvoicedCost', 'ItemCount'],
 *        AggregationColumns: { InvoicedCost: 'sum', ItemCount: 'avg' },
 *        GroupedColumns: ['currency', 'country'],
 *      },
 *      {
 *        Name: 'Pivoted Layout',
 *        Columns: ['bid', 'ask', 'price', 'counterparty', 'status', 'stars'],
 *        RowGroupedColumns: ['currency'],
 *        EnablePivot: true,
 *        PivotColumns: ['status', 'stars'],
 *        AggregationColumns: {'bid':'avg', 'ask':'avg'},
 *
 *      },
 *    ],
 *  }
 * } as PredefinedConfig;
 * ```
 * In this example we have created 4 Layouts:
 *
 * - *Simple Layout* - a basic Layout setting column visibility and order
 *
 * - *Sorting Layout* - a Layout that includes 2 sort orders (and 2 columns with widths set)
 *
 * - *Grouping Layout* - a Layout which includes 2 grouped columns and 2 columns with aggregation set,
 *
 * - *Pivoted Layout* - a Layout that includes Pivot details (so that the grid will be pivoted when the Layout is selected)
 */
export interface LayoutState extends ConfigState {
  /**
   * The name of the Layout which will be loaded AdapTable starts.
   *
   * This will be the selected value in the Layout Toolbar and AdapTable will apply it automatically.
   *
   * **Make sure that the value appears in the name property of one of the Layouts that you provide**
   *
   * **Default Value**:  Empty string
   */
  CurrentLayout?: string;

  /**
   * A collection of Layout objects - which will appear in the Layout toolbar dropdown.
   *
   * **Default Value**:  Empty array
   */
  Layouts?: Layout[];
}

/**
 * The Layout object used in the Layout function.
 *
 * Contains all that is required to create a Layout - including Columns, Sorts, Grouping and Pivoting details.
 */
export interface Layout extends AdaptableObject {
  /**
   * The Name of the Layout - this is what will appear in the Layout toolbar.
   */
  Name: string;

  /**
   * Which columns should be visible in the Layout.  The name provided should match that you provide when you create your Columns in your vendor grid (e.g. `field` in ag-Grid).
   *
   * When the Layout is first applied, only the Columns in this array will be visible - and in the order that they are listed here.
   */
  Columns: string[];

  /**
   * A set of widths for some (or all columns)
   *
   * Pass the name of the Column (without quotes) together with the widths required
   *
   *    ColumnWidthMap: {
   *        OrderId: 200,
   *        Comments: 300,
   *    },
   */
  ColumnWidthMap?: {
    [columnId: string]: number;
  };

  //  ColumnFlexMap?: {
  //    [columnId: string]: number;
  // };

  /**
   * What sorting wil be applied in the Layout.
   *
   * A `ColumnSort` takes a Column name and a Sort Order (e.g. 'Asc' or 'Desc')
   */
  ColumnSorts?: ColumnSort[];

  /**
   * Which columns should be row-grouped when the Layout is applied.
   *
   * Make sure that the column names supplied are groupable according to the vendor grid you are using (e.g. `enableRowGroup` in ag-Grid)
   */
  RowGroupedColumns?: string[];

  /**
   * The values of any row groups that have been opened.
   *
   * This is only used if `hh` in LayoutOptions is set to true
   *
   * Its typically set by AdapTable at run-time and persisted in State than provided in Predefined Config
   */
  ExpandedRowGroupValues?: any[];

  // you can only use true where the column in agGrid defs has an aggFunc applied

  /**
   * Which columns will show aggregated values in grouped rows
   *
   * This only applies when row grouping is enabled in the grid.
   *
   * The first value in a record is the column name
   *
   * The second is either the agg func you want (e.g. sum, avg, min etc.) or 'true' (to use the default aggfunc)
   *
   * You can only use 'true' if an aggFunc has been defined for the column
   *
   * AggregationColumns: { InvoicedCost: 'sum', ItemCount: 'avg' },
   */
  AggregationColumns?: Record<string, string | true>;

  /**
   * Whether pivoting should be enabled in the Grid when this Layout loads
   */
  EnablePivot?: boolean;

  /**
   * A list of columns which should be pivoted
   *
   * Only used when the grid is in pivot mode (or if Layout has `EnablePivot` set to true)
   */
  PivotColumns?: string[];

  /**
   * A set of pinned columns
   *
   * Pass the name of the Column (without quotes) together with the direction
   *
   *    PinnedColumnsMap: {
   *        OrderId: 'left',
   *        Comments: 'right',
   *    },
   */
  PinnedColumnsMap?: { [columnId: string]: 'left' | 'right' };

  /**
   * Whether the Layout should automatically save or not.
   *
   * Usually the Layout gets the autoSave instruction from `autoSaveLayouts` property in LayoutOptions (which defaults) to true, but it can be overriden here for a particular Layout.
   */
  AutoSave?: boolean;
}
