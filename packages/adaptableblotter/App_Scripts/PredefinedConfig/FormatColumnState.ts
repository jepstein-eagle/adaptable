import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from './Common/AdaptableBlotterObject';
import { IStyle } from './Common/IStyle';

export interface FormatColumnState extends RunTimeState {
  FormatColumns?: FormatColumn[];
}

/**
 * The FormatColumn object used in the Format Column function.
 */
export interface FormatColumn extends AdaptableBlotterObject {
  /**
   * The column which has the style applied to it.
   */
  ColumnId: string;

  /**
   * The Style to apply to the Column.  See [Style](_predefinedconfig_common_istyle_.istyle.html) for more details.
   */
  Style: IStyle;
}
