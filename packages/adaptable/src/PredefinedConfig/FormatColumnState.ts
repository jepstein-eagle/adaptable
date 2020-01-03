import { RunTimeState } from './RunTimeState';
import { AdaptableObject } from './Common/AdaptableObject';
import { AdaptableStyle } from './Common/AdaptableStyle';

export interface FormatColumnState extends RunTimeState {
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
   * The Style to apply to the Column.  See [Style](_predefinedconfig_common_istyle_.istyle.html) for more details.
   */
  Style: AdaptableStyle;
}
