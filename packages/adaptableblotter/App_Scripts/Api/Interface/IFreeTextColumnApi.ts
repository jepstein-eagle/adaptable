import {
  FreeTextColumnState,
  IFreeTextColumn,
} from '../../PredefinedConfig/IUserState Interfaces/FreeTextColumnState';
export interface IFreeTextColumnApi {
  getFreeTextColumnState(): FreeTextColumnState;
  getAllFreeTextColumn(): IFreeTextColumn[];
  addFreeTextColumn(freeTextColumn: IFreeTextColumn): void;
  createFreeTextColumn(columnId: string, defaultValue: string): void;
  deleteFreeTextColumn(columnId: string): void;
  addEditFreeTextColumnStoredValue(freeTextColumn: IFreeTextColumn, storedValue: any): void;
}
