import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';

/**
 * The Predefined Configuration for Action Columns
 *
 * An [Action Column](_src_predefinedconfig_actioncolumnstate_.actioncolumn.html) is a special column which dynamically displays a button.
 *
 * In the Action Column Predefined Config 2 optional functions can be referenced (with the implementations provided in in the [User Functions](https://api.adaptabletools.com/modules/_src_adaptableoptions_userfunctions_.html) section of Adaptable Options).
 *
 * - *RenderFunction*: provides details of what the button will look like.  If not provided then a standard button is shown
 *
 *  - *ShouldRenderPredicate*: a function which will evaluate for each row if the button should be rendered
 *
 * When the button is clicked, Adaptable fires an `ActionColumnClicked` event (see [Event Api](https://api.adaptabletools.com/interfaces/_src_api_eventapi_.eventapi.html)) which contains full details of the column and the row.
 *
 *  --------------
 *
 *   ### Further AdapTable Help Resources
 *
 * - [Action Column Demo](https://demo.adaptabletools.com/column/aggridactioncolumnsdemo/)
 *
 * - {@link ActionColumnApi|Action Column API}
 *
 * - [Action Column Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/action-column-function.md)
 *
 * - [Action Column Video](https://youtu.be/y0cDvtdmSKM)
 *
 *  --------------
 *
 * ### Action Column Predefined Config Example
 *
 * In this example we create a column called 'Delete Trade'.
 *
 * We provide an implementation for `ShouldRenderPredicate` to specify that we render only in rows where the value in the 'tradeDate' column is before today.
 *
 * We also provide our own `RenderFunction` implementation which renders the column differently for rows where the currency is 'USD'.
 *
 *
 *  ```ts
 *
 * // Predefined Config
 * export default {
 * ActionColumn: {
 *  ActionColumns: [
 *   {
 *     {
 *        ColumnId: 'Action',
 *        ButtonText: 'Click',
 *        ShouldRenderPredicate: 'action',
 *        RenderFunction: 'action',
 *      },
 *   ]
 *  },
 * } as PredefinedConfig;
 *
 *  // Adaptable Options
 * const adaptableOptions: AdaptableOptions = {
 * ......
 *  userFunctions: [
 *     {
 *       type: 'ActionColumnRenderFunction',
 *        name: 'action',
 *        handler(params) {
 *          let data: number = params.rowData.notional;
 *          return data > 50
 *            ? '<button class="doublebutton">Double</button>'
 *            : '<button class="treblebutton">Treble</button>';
 *       },
 *     },
 *     {
 *        type: 'ActionColumnShouldRenderPredicate',
 *        name: 'action',
 *        handler(params) {
 *          return params.rowData.counterparty != 'BAML';
 *        },
 *      },
 *     ],
 *
 *  // we listen to the `ActionColumnClicked` event (via the eventAPI in Adaptable API) and then act accordingly
 *    api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
 *      // do stuff...
 *  });
 *
 * ```
 */
export interface ActionColumnState extends ConfigState {
  /**
   * An array of `ActionColumn` which Adaptable will dynamically render.
   */
  ActionColumns?: ActionColumn[];
}

/**
 * The `ActionColumn` object used in [Action Column State](_src_predefinedconfig_actioncolumnstate_.actioncolumnstate.html).
 *
 * An Action Column will be dynamically added to your Grid and automatically display a button.
 *
 * When this button is clicked, it will trigger the `ActionColumnClicked` event to which you can subscribe and perform any function.
 *
 * You are, optionally, able to provide 2 other functions:
 *
 * - **ShouldRenderPredicate** - which decides whether to display the button
 *
 * - **RenderFunction** - which stipulates how the button will look  own render function and specify for each row whether the button is displayed
 */
export interface ActionColumn extends AdaptableObject {
  /**
   * The (mandatory) id of the Action Column
   *
   * If no value is set for the `FriendlyName` property, then this will also be the name of the Column (e.g. what appears in the Column Header)
   */
  ColumnId: string;
  /**
   * The name of the Column, ie. what appears in the Column Header and elswewhere where the Column is referenced in the UI.
   *
   * If no value is set here then the `ColumnId` property is used.
   */
  FriendlyName?: string;
  /**
   * The text to display on the button (its caption) when rendered automatically by Adaptable.
   *
   * Don't set this property if you are rendering the Button yourself using `RenderFunction`.
   */
  ButtonText?: string;

  /**
   * A function that returns a string giving the full render contents of the Button that should display in the cell.
   *
   * The [`ActionColumnRenderParams`](_src_predefinedconfig_actioncolumnstate_.actioncolumnrenderparams.html) provides details of the Row, the Row Node and the Column.
   *
   * If this property is not set, then a regular button will appear in the column with the caption of the `ButtonText` property.
   */
  RenderFunction?: string;

  /**
   * A Predicate function returning a boolean value indicating whether the Action Column should display a button.
   *
   * The [`ActionColumnRenderParams`](_src_predefinedconfig_actioncolumnstate_.actioncolumnrenderparams.html) provides details of the Row, the Row Node and the Column.
   *
   * If the predicate function returns false, then nothing is displayed for that cell in the column.
   *
   * If this property is not set, or if the function returns true, then the cell **will render** (using either the `ButtonText` or `RenderFuntion` value).
   */
  ShouldRenderPredicate?: string;
}

/**
 * Function which stipulates how an Action Column button will be rendered.
 *
 * Used by an {@link ActionColumn|Action Column} and provided as part of {@link ActionColumnState|Action Column State}
 */
export interface ActionColumnRenderFunction extends BaseUserFunction {
  type: 'ActionColumnRenderFunction';
  name: string;
  handler: (params: ActionColumnRenderParams) => string;
}

/**
 * Function which stipulates whether an Action Column button should be displayed.
 *
 * Used by an {@link ActionColumn|Action Column} and provided as part of {@link ActionColumnState|Action Column State}
 */
export interface ActionColumnShouldRenderPredicate extends BaseUserFunction {
  type: 'ActionColumnShouldRenderPredicate';
  name: string;
  handler: (params: ActionColumnRenderParams) => boolean;
}

/**
 * The params used in the `RenderFunction` and `ShouldRenderPredicate` properties of {@link ActionColumn|Action Column}.
 *
 * The contents of the object provides details of the column itself and also the row (and row node) that is being rendered.
 */
export interface ActionColumnRenderParams {
  /**
   * The `ActionColumn` being rendered
   */
  column: ActionColumn;

  /**
   * The data in the current row being rendered
   */
  rowData: any;

  /**
   * The row node being currently rendered
   *
   * Note: this object will vary depending on which underling DataGrid is being used
   */
  rowNode: any;
}
