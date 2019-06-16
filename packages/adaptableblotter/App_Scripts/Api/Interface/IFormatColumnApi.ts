import { IStyle } from '../../PredefinedConfig/Common/IStyle';
import {
  FormatColumnState,
  IFormatColumn,
} from '../../PredefinedConfig/IUserState/FormatColumnState';
export interface IFormatColumnApi {
  getFormatColumnState(): FormatColumnState;
  getAllFormatColumn(): IFormatColumn[];
  addFormatColumn(column: string, style: IStyle): void;
  updateFormatColumn(column: string, style: IStyle): void;
  deleteFormatColumn(formatColumn: IFormatColumn): void;
  deleteAllFormatColumn(): void;
}
