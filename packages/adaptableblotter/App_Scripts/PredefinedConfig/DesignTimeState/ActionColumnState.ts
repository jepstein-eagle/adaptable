import { DesignTimeState } from './DesignTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';

/**
 * The Predefined Configuration for Action Columns
 *
 * An Action Column is one which shows a button that when clicked fires an onActionColumnClicked event (see [Event Api](https://api.adaptableblotter.com/interfaces/_api_eventapi_.eventapi.html))
 *
 * You can choose to render the cell contents yourself (via the *RenderFunctionName* property).
 *
 * ```ts
 * export default {
 * ActionColumn: {
 *  ActionColumns: [
 *   {
 *      ColumnId: 'Action',
 *      ButtonText: 'Click',
 *      RenderFunctionName: 'RenderActionFunc',
 *   },
 *   {
 *      ColumnId: 'Plus',
 *      ButtonText: '+',
 *   },
 *   {
 *      ColumnId: 'Minus',
 *      ButtonText: '-',
 *   },
 *  ],
 *  },
 * } as PredefinedConfig;
 * ```
 */
export interface ActionColumnState extends DesignTimeState {
  /**
   * The Action Columns you wish to provide.
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
   * Leave blank if you wish to render the Button separately (using the *RenderFunctionName* property).
   */
  ButtonText?: string;

  /**
   * A function - provided by you - that will render the Action Column according to your requirements.
   *
   * Provide here the name of the function, and supply the function itself in the *actionColumnFunctions* property of *userFunctions* in [Advanced Options](https://api.adaptableblotter.com/interfaces/_blotteroptions_advancedoptions_.advancedoptions.html)
   *
   * (This is done because we cannot save a function in JSON).
   *
   * If this property is left empty, then a button will appear in the column with the caption of the *ButtonText* property.
   */
  RenderFunctionName?: string;
}
