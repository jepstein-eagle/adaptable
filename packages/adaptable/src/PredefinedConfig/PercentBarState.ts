import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';

/**
 * The Predefined Configuration for the Percent Bar Function
 *
 * Percent Bars allow you to colour and fill cells in a column based on the cell value as a proportion of the column's maximum values.
 *
 * They can also include a `PercentBarRange` collection, which allow for different colours in the Percent Bar based upon which range the cell value lies.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [Percent Bar Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/percent-bar-function.md)
 *
 * [Percent Bar Demo](https://demo.adaptabletools.com/style/aggridpercentbardemo)
 *
 * {@link PercentBarApi|Percent Bar Api}
 *
 * --------------
 *
 * **Percent Bar Example**
 *
 * ```ts
 *
 * export default {
 * PercentBar: {
 *    PercentBars: [
 *      {
 *        ColumnId: 'InvoicedCost',
 *        Ranges: [
 *          { Min: 0, Max: 500, Color: '#ff0000' },
 *          { Min: 500, Max: 1000, Color: '#ffa500' },
 *          { Min: 1000, Max: 3000, Color: '#008000' },
 *        ],
 *        ShowValue: false,
 *      },
 *      {
 *        BackColor: '#d3d3d3',
 *        ColumnId: 'ItemCost',
 *        DisplayPercentageValue: true,
 *        DisplayRawValue: true,
 *        Ranges: [{ Min: 0, Max: 200, Color: '#87cefa' }],
 *        ShowValue: true,
 *      },
 *      {
 *        BackColor: '#808080',
 *        ColumnId: 'ItemCount',
 *        DisplayRawValue: true,
 *        Ranges: [{ Min: 0, Max: 21, Color: '#006400' }],
 *        ShowToolTip: true,
 *        ShowValue: false,
 *      },
 *    ],
 *  },
 * } as PredefinedConfig;
 *
 * ```
 *
 * In this example we have created Percent Bars for 3 Columns:
 *
 * - 'InvoicedCost': has 3 Ranges (0-500 Red, 500-1000 Orange, 1000-3000 Green)
 *
 * - 'ItemCost': has 1 Range, shows both the Cell Value and the equivalent Percent Value and has a back colour.
 *
 * - 'ItemCount': has 1 Range and shows the Cell Value as a tooltip.
 *
 */
export interface PercentBarState extends ConfigState {
  PercentBars?: PercentBar[];
}

/**
 * The `PercentBar` object used in the PercentBar function.
 *
 *  See {@link PercentBarState|Percent Bar State} for full information on how to create Percent Bars and links to other relevant AdapTable help resources.
 *
 */
export interface PercentBar extends AdaptableObject {
  /**
   * The Column for which the Percent Bar should be applied
   */
  ColumnId: string;

  /**
   * Any Ranges in the Percent Bar (e.g. to allow a traffic light effect)
   *
   * Note: if no Ranges are supplied then AdapTable will create a default one when it first loads
   */
  Ranges?: PercentBarRange[];

  /**
   * Whether to display a value in the cell in addition to the Percent Bar
   *
   * Default Value: false
   */
  ShowValue?: boolean;

  /**
   * Whether to display a tooltip when the mouse hovers over a cell in the Percent Bar
   *
   *  Default Value: false
   */
  ShowToolTip?: boolean;

  /**
   * Whether to display the actual cell value
   *
   * Only used if either `ShowValue` or `ShowToolTip` are set to true
   */
  DisplayRawValue?: boolean;

  /**
   * Whether to display the cell value as a percentage of the Percent Bar's maximum value (calculated by getting the `Max` property value from the highest Range))
   *
   * Only used if either `ShowValue` or `ShowToolTip` are set to true
   */
  DisplayPercentageValue?: boolean;

  /**
   * The back colour to show for the Percent Bar - useful for setting off the value visually
   *
   * Leave unset if no back colour is required for the Percent Bar
   *
   * Default value: Gray
   */
  BackColor?: string;

  /**
   * @deprecated
   *
   * Has been replaced with a `PercentBarRamge`
   */
  NegativeValue?: number;

  /**
   * @deprecated
   *
   * Has been replaced with a `PercentBarRamge`
   */
  PositiveValue?: number;

  /**
   * @deprecated
   *
   * Has been replaced with a `PercentBarRamge`
   */
  NegativeColor?: string;

  /**
   * @deprecated
   *
   * Has been replaced with a `PercentBarRamge`
   */
  PositiveColor?: string;

  /**
   * @deprecated
   *
   * Has been replaced with a `PercentBarRamge`
   */
  PositiveValueColumnId?: string;

  /**
   * @deprecated
   *
   * Has been replaced with a `PercentBarRamge`
   */
  NegativeValueColumnId?: string;
}

/**
 * Defines a 'Range' used in the Percent Bar function
 *
 * Each range contains a start (min) and end (max) number togetther with a colour
 *
 * A Percent Bar can have an unlimited amount of ranges (but at least one).
 */
export interface PercentBarRange {
  /**
   * The start number of the `PercentBarRange`
   */
  Min: number;

  /**
   * The end number of the `PercentBarRange`
   */
  Max: number;

  /**
   * The cell colour to use for any values that fall inside the `PercentBarRange`
   */
  Color: string;
}
