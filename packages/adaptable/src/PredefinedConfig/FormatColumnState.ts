import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { AdaptableStyle } from './Common/AdaptableStyle';
import { AdaptableFormat } from './Common/AdaptableFormat';

/**
 * The Predefined Configuration for the `FormatColumn` function.
 *
 * A Format Column is a column that is given specific Style and / or Display Format properties that are always rendered:
 *
 * - **`Style`** - a visual style that is **always** applied (unlike Conditional Styles where the style is dependent on a rule being met).
 *
 * - **`DisplayFormat`** - a format to set the display of numeric and date columns to match custom requirements.
 *
 * - **`CellAlignment`** - how the contents of each cell in the Format Column should align
 *
 * --------------
 *
 * ### Further Information
 *
 * - {@link FormatColumnApi|Format Column API}
 *
 * - [Format Column Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/format-column-function.md)
 *
 * - [Format Column Demo](https://demo.adaptableblotter.com/style/aggridformatcolumndemo/)
 *
 * - [Format Column Video](https://youtu.be/tYTGQ1ufhbc)
 *
 * --------------
 *
 * ### Format Column Predefined Config Example
 *
 * ```ts
 * const demoConfig: PredefinedConfig = {
 * FormatColumn: {
 *   FormatColumns: [
 *     // Set a Style and Cell Alignment for OrderId
 *     {
 *       ColumnId: 'OrderId',
 *       Style: {
 *         BackColor: '#d4fb79',
 *         ForeColor: '#8b0000',
 *       },
 *       CellAlignment: 'Center',
 *     },
 *     // Set a Time-based Display Format for LastUpdatedTime
 *     {
 *       ColumnId: 'LastUpdatedTime',
 *       DisplayFormat: {
 *         Formatter: 'DateFormatter',
 *         Options: {
 *           Pattern: 'HH:mm:ss',
 *         },
 *       },
 *     },
 *     // Set both a Style and a (Date-based) Display Format for OrderDate
 *     {
 *       ColumnId: 'OrderDate',
 *       Style: {
 *         FontWeight: 'Bold',
 *         FontSize: 'XSmall',
 *         FontStyle: 'Italic',
 *       },
 *       DisplayFormat: {
 *         Formatter: 'DateFormatter',
 *         Options: {
 *           Pattern: 'yyyyMMdd',
 *         },
 *       },
 *     },
 *     // Set a Display Format of negative parentheses for ChangeLastOrder
 *     {
 *       ColumnId: 'ChangeLastOrder',
 *       DisplayFormat: {
 *         Formatter: 'NumberFormatter',
 *         Options: {
 *           Parentheses: true,
 *         },
 *       },
 *     },
 *     // Set a Display Format of £ and 2 dp for InvoicedCost
 *     {
 *       ColumnId: 'InvoicedCost',
 *       DisplayFormat: {
 *         Formatter: 'NumberFormatter',
 *         Options: {
 *           FractionDigits: 2,
 *           Prefix: '£',
 *         },
 *       },
 *     },
 *     // Set a Display Format of $ with 'AUD' suffix and space for integer separator for OrderCost
 *     {
 *       ColumnId: 'OrderCost',
 *       DisplayFormat: {
 *         Formatter: 'NumberFormatter',
 *         Options: {
 *           FractionDigits: 2,
 *           IntegerSeparator: ' ',
 *           Prefix: '$',
 *           Suffix: '(AUD)',
 *         },
 *       },
 *     },
 *     // Set the Cell Aligment of the 'Bid' Column to the right
 *     {
 *        ColumnId: 'bid',
 *        CellAlignment: 'Right',
 *     },
 *   ],
 * },
 *} as PredefinedConfig;
 * ```
 * In this example we have created 7 Format Columns:
 *
 * - *Order Id* has Visual Style of lime green with a red fore colour and a CellAlignment of 'Center'
 * - *LastUpdatedTime* has a Display Format with pattern of 'HH:mm:ss' to show just time
 * - *Order Date* has a Visual Style of bold and italicised and with a smaller font and a Display Format with pattern of 'yyyyMMdd'
 * - *ChangeLastOrder* has a Display Format to show negative numbers in parantheses
 * - *InvoicedCost* has a Display Format to show '£' sign and 2 decimal places
 * - *OrderCost* has a Display Format to separate integer thousands with a space, a '$' prefix and '(AUD)' suffix
 * - *Bid* has a CellAlignment of 'Center'
 *
 */
export interface FormatColumnState extends ConfigState {
  FormatColumns?: FormatColumn[];
}

/**
 * The FormatColumn object used in the Format Column function.
 */
export interface FormatColumn extends AdaptableObject {
  /**
   * The column which has the style applied to it.
   */
  ColumnId: string;

  /**
   * The Style to apply to the Column.
   *
   * See [Style](_src_predefinedconfig_common_istyle_.istyle.html) for more details.
   */
  Style?: AdaptableStyle;

  /**
   * Any Display Format to apply to the Column.
   *
   * Only available for Numeric and Date columns.
   */
  DisplayFormat?: AdaptableFormat;

  /**
   * How the cell contents should align.
   *
   * Applies to all cells but 'right' align is widely used in numeric columns.
   */
  CellAlignment?: 'Left' | 'Right' | 'Center';
}
