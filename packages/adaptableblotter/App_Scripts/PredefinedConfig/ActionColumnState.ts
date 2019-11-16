import { DesignTimeState } from './DesignTimeState';
import { AdaptableBlotterObject } from './AdaptableBlotterObject';

/**
 * The Predefined Configuration for Action Columns
 *
 * An Action Column is one which dynamically displays a button.
 *
 * When that button is clicked, the Adaptable Blotter fires an *ActionColumnClicked* event (see [Event Api](https://api.adaptableblotter.com/interfaces/_api_eventapi_.eventapi.html))
 *
 *  **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/column/aggridactioncolumnsdemo/) | [API](_api_actioncolumnapi_.actioncolumnapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360002209498-Action-Column-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360002204277-Action-Column-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360003213038-Special-Column-Functions)
 *
 * **Action Column Predefined Config Example**
 *
 * In this example we create a column called 'Delete' which we render only in rows where the value in the 'tradeDate' column is before today.
 *
 * We also provide a custom render function which will render the column differently for rows where the currency is 'USD'.
 *
 * ```ts
 * export default {
 * ActionColumn: {
 *  ActionColumns: [
 *   {
 *      ColumnId: 'Delete',
 *      ShouldRenderPredicate: (params: ActionColumnRenderParams) => {
 *          return params.rowData.tradeDate < Date.now();
 *        },
 *      RenderFunction: (params: ActionColumnRenderParams) => {
 *          return params.rowData.currency === 'USD'
 *            ? '<button style="color:blue; font-weight:bold">Delete Trade</button>'
 *            : '<button style="color:red; font-weight:bold">Delete Trade</button>';
 *        },
 *   },
 *  ],
 *  },
 * } as PredefinedConfig;
 *
 *  --------------
 *
 * // in our code we will use the eventAPI (in Blotter API) to listen to the ActionColumnClicked event
 * // and we will delete the row using the deleteGridData method in gridApi (also in Blotter API)
 *  adaptableblotter.api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
 *    adaptableblotter.api.gridApi.deleteGridData([args.data[0].id.rowData]);
 * });
 *
 *  --------------
 * ```
 */
export interface ActionColumnState extends DesignTimeState {
  /**
   * The Action Columns which the Adaptable Blotter should dynamically render.
   */
  ActionColumns?: ActionColumn[];
}

/**
 * The ActionColumn object used in the Advanced Search function.
 */
export interface ActionColumn extends AdaptableBlotterObject {
  /**
   * The id of the Column
   *
   * If no value is set for the *FriendlyName* property, then this will be the name of the Column also (e.g. what appears in the Column Header)
   */
  ColumnId: string;
  /**
   * The name of the Column ie. what appears in the Column Header and elswewhere that the Column is listed in the UI.
   *
   * If no value is set here then the *ColumnId* property is used.
   */
  FriendlyName?: string;
  /**
   * The text to put on the button.
   *
   * Leave blank if you wish to render the Button separately (using the *RenderFunction* property).
   */
  ButtonText?: string;

  /**
   * A function that returns a string giving the full render contents of the Button that should display in the cell.
   *
   * The Action Column Render Params provides details of the Row, the Row Node and the Column.
   *
   * If this property is left empty, then a regular button will appear in the column with the caption of the *ButtonText* property.
   */
  RenderFunction?: (params: ActionColumnRenderParams) => string;

  /**
   * A Predicate Function that will return a boolean value indicating whether the Action Column should display a button.
   *
   * The Action Column Render Params provides details of the Row, the Row Node and the Column.
   *
   * If the predicate function returns false, then nothing is displayed for that cell in the column.
   *
   * If this property is left empty, or if the function returns true, then the cell **will render** (using either the ButtonText or RenderFuntion values).
   */
  ShouldRenderPredicate?: (params: ActionColumnRenderParams) => boolean;

  /**
   * **This property is deprecated and should not be used; instead provide the full function using the *RenderFunction* property above**
   */
  RenderFunctionName?: string;
}

/**
 * The params used in the *RenderFunction* and *ShouldRenderPredicate* properties of Action Column.
 *
 * Provides details of the column itself and the row (and row node) that is being rendered.
 */
export interface ActionColumnRenderParams {
  /**
   * The Action Column being rendered
   */
  column: ActionColumn;

  /**
   * The data in the row being rendered
   */
  rowData: any;

  /**
   * The row node being rendered (this will be different depending on which underling DataGrid you are using).
   */
  rowNode: any;
}
