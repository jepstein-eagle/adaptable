import { IFormatColumn, IStyle } from "../../Utilities/Interface/IAdaptableBlotterObjects";
export interface IFormatColumnApi {
  GetAll(): IFormatColumn[];
  Add(column: string, style: IStyle): void;
  Update(column: string, style: IStyle): void;
  Delete(formatColumn: IFormatColumn): void;
  DeleteAll(): void;
}
