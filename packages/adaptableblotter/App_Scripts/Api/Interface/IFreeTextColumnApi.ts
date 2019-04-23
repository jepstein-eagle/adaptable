import { IFreeTextColumn } from "../../Utilities/Interface/BlotterObjects/IFreeTextColumn";
import { FormatColumnState, FreeTextColumnState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IFreeTextColumnApi {
  GetState(): FreeTextColumnState;
   GetAll(): IFreeTextColumn[];
  Add(freeTextColumn: IFreeTextColumn): void;
  Create(columnId: string, defaultValue: string): void;
  Delete(columnId: string): void;
}
