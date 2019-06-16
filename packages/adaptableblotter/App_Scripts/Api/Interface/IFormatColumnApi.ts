import { IStyle } from '../../PredefinedConfig/Common/IStyle';
import {
  FormatColumnState,
  FormatColumn,
} from '../../PredefinedConfig/RunTimeState/FormatColumnState';
export interface IFormatColumnApi {
  getFormatColumnState(): FormatColumnState;
  getAllFormatColumn(): FormatColumn[];
  addFormatColumn(column: string, style: IStyle): void;
  updateFormatColumn(column: string, style: IStyle): void;
  deleteFormatColumn(formatColumn: FormatColumn): void;
  deleteAllFormatColumn(): void;
}
