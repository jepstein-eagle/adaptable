import { DesignTimeState } from './DesignTimeState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for Action Columns
 *
 * An Action Column is a column which dynamically displays a button.
 *
 * You are able, optionally, to specify for each row, if and how the button will render.
 *
 * When the button is clicked, the Adaptable Blotter fires an `ActionColumnClicked` event (see [Event Api](https://api.adaptableblotter.com/interfaces/_api_eventapi_.eventapi.html) which contains full details of the column and the row.
 *
 * **Further Resources**
 *
 * [Demo Site](https://demo.adaptableblotter.com/column/aggridactioncolumnsdemo/) | [API](_api_actioncolumnapi_.actioncolumnapi.html) | [FAQ](https://adaptabletools.zendesk.com/hc/en-us/articles/360002209498-Action-Column-FAQ) | [Videos](https://adaptabletools.zendesk.com/hc/en-us/articles/360002204277-Action-Column-Videos) | [User Guide](https://adaptabletools.zendesk.com/hc/en-us/articles/360003213038-Special-Column-Functions)
 *
 * **Action Column Predefined Config Example**
 *
 * In this example we create a column called 'Delete Trade'.
 *
 * We provide an implementation for `ShouldRenderPredicate` to specify that we render only in rows where the value in the 'tradeDate' column is before today.
 *
 * We also provide our own `RenderFunction` which will render the column differently for rows where the currency is 'USD'.
 *
 * ```ts
 * export default {
 * ActionColumn: {
 *  ActionColumns: [
 *   {
 *      ColumnId: 'Delete Trade',
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
 * // we listen to the ActionColumnClicked event (via the eventAPI in Blotter API) and
 * // delete the row using *deleteGridData* method in gridAPI (also in Blotter API)
 *  api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
 *    api.gridApi.deleteGridData([args.data[0].id.rowData]);
 * });
 *
 *  --------------
 * ```
 */
export interface ActionColumnState extends DesignTimeState {
  /**
   * An array of Action Columns which the Adaptable Blotter should dynamically render.
   */
  ActionColumns?: ActionColumn[];
}

/**
 * The ActionColumn object used in the Advanced Search function.
 */
export interface ActionColumn extends AdaptableObject {
  /**
   * The id of the Action Column
   *
   * If no value is set for the *FriendlyName* property, then this will also be the name of the Column (e.g. what appears in the Column Header)
   */
  ColumnId: string;
  /**
   * The name of the Column, ie. what appears in the Column Header and elswewhere where the Column is referenced in the UI.
   *
   * If no value is set here then the *ColumnId* property is used.
   */
  FriendlyName?: string;
  /**
   * The text to display on the button (its caption).
   *
   * Don't set this property if you are rendering the Button yourself (using *RenderFunction*).
   */
  ButtonText?: string;

  /**
   * A function that returns a string giving the full render contents of the Button that should display in the cell.
   *
   * The *ActionColumnRenderParams* provides details of the Row, the Row Node and the Column.
   *
   * If this property is not set, then a regular button will appear in the column with the caption of the *ButtonText* property.
   */
  RenderFunction?: (params: ActionColumnRenderParams) => string;

  /**
   * A Predicate function returning a boolean value indicating whether the Action Column should display a button.
   *
   * The *ActionColumnRenderParams* provides details of the Row, the Row Node and the Column.
   *
   * If the predicate function returns false, then nothing is displayed for that cell in the column.
   *
   * If this property is not set, or if the function returns true, then the cell **will render** (using either the ButtonText or RenderFuntion values).
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
   * The row node being rendered (this object will vary depending on which underling DataGrid is being used).
   */
  rowNode: any;
}
