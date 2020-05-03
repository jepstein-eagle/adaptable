import { ConfigState } from './ConfigState';
import { AdaptableObject } from './Common/AdaptableObject';
import { AdaptableStyle } from './Common/AdaptableStyle';
import { AdaptableFormat } from './Common/AdaptableFormat';

/**
 *
 *
 *  [Format Column API](_src_api_formatcolumnapi_.formatcolumnapi.html) | [Format Column Read Me](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/functions/format-column-function.md) | [Format Column Demo](https://demo.adaptableblotter.com/style/aggridformatcolumndemo/) | [Format Column Video](https://youtu.be/tYTGQ1ufhbc)
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
}
