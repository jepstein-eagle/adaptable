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
 * [Demo Site](https://demo.adaptabletools.com/gridmanagement/aggridlayoutdemo/) | [API](_src_api_layoutapi_.layoutapi.html) | [Options](_src_adaptableoptions_layoutoptions_.layoutoptions.html) | [Layout Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/layout-function.md)
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
 *        ColumnSorts: [
 *          {
 *            Column: 'counterparty',
 *            SortOrder: 'Descending',
 *          },
 *          {
 *            Column: 'currency',
 *            SortOrder: 'Descending',
 *          },
 *        ],
 *        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty'],
 *      },
 *      {
 *        Name: 'Grouping Layout',
 *        Columns: ['country', 'currency', 'tradeId', 'notional', 'counterparty'],
 *        GroupedColumns: ['currency', 'country'],
 *      },
 *      {
 *        Name: 'Pivoted Layout',
 *        Columns: ['bid', 'ask', 'price', 'counterparty', 'status', 'stars'],
 *        GroupedColumns: ['currency'],
 *        PivotDetails: {
 *          PivotColumns: ['status', 'stars'],
 *          AggregationColumns: ['bid', 'ask'],
 *        },
 *      },
 *    ],
 *  }
 * } as PredefinedConfig;
 * ```
 * In this example we have created 4 Layouts:
 *
 * - *Simple Layout* - a basic Layout setting column visibility and order
 *
 * - *Sorting Layout* - a Layout that includes 2 sort orders
 *
 * - *Grouping Layout* - a Layout which includes column grouping
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

  CreateDefaultLayout?:
    | boolean
    | (Omit<Layout, 'Name' | 'Columns'> & {
        Columns?: string[];
        Name?: string;
      });
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

  ColumnWidthMap?: {
    [key: string]: number;
  };

  ColumnFlexMap?: {
    [key: string]: number;
  };

  /**
   * What sorting wil be applied in the Layout.
   *
   * A `ColumnSort` takes a Column name and a Sort Order (e.g. 'Ascending' or 'Descending')
   */
  ColumnSorts?: ColumnSort[];

  /**
   * Which columns should be row-grouped when the Layout is applied.
   *
   * Make sure that the column names supplied are groupable according to the vendor grid you are using (e.g. `enableRowGroup` in ag-Grid)
   */
  GroupedColumns?: string[];

  PinnedColumnsMap?: { [colId: string]: 'left' | 'right' };

  /**
   * Whether pivoting should be applied to the Layout.
   *
   * The `PivotDetails` object contains 2 collections of Colummn Names:
   *
   * - `PivotColumns`: Which Columns will be **pivoted** (i.e. appear along the top)
   *
   * - `AggregationColumns`: Which Columns will be **aggregated** in the pivot
   *
   * @deprecated
   *
   */
  PivotDetails?: PivotDetails;

  ExpandedRowGroupKeys?: any[];
}

/**
 * **Do not set use this property**
 *
 *  This is state saved automatically by AdapTable for internal use to manage layouts.
 *
 */
export interface VendorGridInfo {
  GroupState?: any;
  ColumnState?: any;
  ColumnGroupState?: any;
  InPivotMode?: boolean;
  ValueColumns?: string[];
}

/**
 * **Do not set use this property**
 *
 *  This is state saved automatically by AdapTable for internal use to manage layouts
 */
export interface AdaptableGridInfo {
  CurrentColumns?: string[];
  CurrentColumnSorts?: ColumnSort[];
  ExpandedRowGroupKeys?: any[];
}

/**
 * Defines how pivoting will be applied in a Layout.
 *
 *  Contains 2 collections of Column names:
 *
 * - `PivotColumns`: Which Columns will be pivoted (i.e. appear along the top when in pivot mode)
 *
 * - `AggregationColumns`: Which Columns will be aggregated inside the pivot
 *
 */
export interface PivotDetails {
  /**
   * Which Columns will be **pivoted** (i.e. appear along the top) when the Grid is in Pivot View
   */
  PivotColumns?: string[];

  /**
   * Which Columns will be **aggregated** when the Grid is in Pivot View
   */
  AggregationColumns?: string[];
}
