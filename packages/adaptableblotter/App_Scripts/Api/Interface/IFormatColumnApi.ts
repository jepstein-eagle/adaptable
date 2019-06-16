import { IStyle } from '../../PredefinedConfig/Common Objects/IStyle';
import {
  FormatColumnState,
  IFormatColumn,
} from '../../PredefinedConfig/IUserState Interfaces/FormatColumnState';
export interface IFormatColumnApi {
  getFormatColumnState(): FormatColumnState;
  getAllFormatColumn(): IFormatColumn[];
  addFormatColumn(column: string, style: IStyle): void;
  updateFormatColumn(column: string, style: IStyle): void;
  deleteFormatColumn(formatColumn: IFormatColumn): void;
  deleteAllFormatColumn(): void;
}
