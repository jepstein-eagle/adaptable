import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { ColumnSort } from './Common/ColumnSort';

/**
 * The Predefined Configuration for the Layout function
 *
 * Layouts are collections of Column visiblity, order and sorting.
 *
 * You can also specify which Column grouping and pivoting information for the Layout.
 *
 *  **Further Adaptable Help Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/gridmanagement/aggridlayoutdemo/) | [API](_api_layoutapi_.layoutapi.html) | [Options](_adaptableOptions_layoutoptions_.layoutoptions.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360002170317-Layouts-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360029743312-Layout-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360002755197-Grid-Functions)
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
 * I n this example we have created 4 Layouts:
 *
 * - *Simple Layout* - a basic Layout setting column visibility and order
 *
 * - *Sorting Layout* - a Layout that includes 2 sort orders
 *
 * - *Grouping Layout* - a Layout which includes column grouping
 *
 * - *Pivoted Layout* - a Layout that includes Pivot details (so that the grid will be pivoted when the Layout is selected)
 */
export interface LayoutState extends RunTimeState {
  /**
   * The name of the Layout which will be in use when Adaptable starts / loads.
   *
   * This will be the selected value in the Layout Toolbar and Adaptable will apply it automatically.
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
   * What sorting wil be applied in the Layout.
   *
   * A `ColumnSort` takes a Column name and a Sort Order (e.g. 'Ascending' or 'Descending')
   */
  ColumnSorts?: ColumnSort[];

  /**
   * Which columns should be grouped when the Layout is applied.
   *
   * Make sure that the column names supplied are groupable according to the vendor grid you are using (e.g. `enableRowGroup` in ag-Grid)
   */
  GroupedColumns?: string[];

  /**
   * Whether pivoting should be applied to the Layout.
   *
   * The `PivotDetails` object contains 2 collections of Colummn Names:
   *
   * - `PivotColumns`: Which Columns will be **pivoted** (i.e. appear along the top)
   *
   * - `AggregationColumns`: Which Columns will be **aggregated** in the pivot
   *
   */
  PivotDetails?: PivotDetails;
  /**
   * **Do not set this when creating a layout**
   *
   *  This is state saved automatically by Adaptable for internal use to manage layouts
   *
   *  Note: This is only used if `includeVendorStateInLayouts` is set to true in [LayoutOptions](_adaptableOptions_layoutoptions_.layoutoptions.html#includevendorstateinlayouts)
   */
  VendorGridInfo?: VendorGridInfo;
  /**
   * **Do not set this when creating a layout**
   *
   *  This is state saved automatically by Adaptable for internal use to manage layouts
   */
  AdaptableGridInfo?: AdaptableGridInfo;
}

/**
 * **Do not set use this property**
 *
 *  This is state saved automatically by Adaptable for internal use to manage layouts
 */
export interface VendorGridInfo {
  GroupState?: any;
  ColumnState?: any;
  ColumnGroupState?: any;
  InPivotMode?: boolean;
}

/**
 * **Do not set use this property**
 *
 *  This is state saved automatically by Adaptable for internal use to manage layouts
 */
export interface AdaptableGridInfo {
  CurrentColumns?: string[];
  CurrentColumnSorts?: ColumnSort[];
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
