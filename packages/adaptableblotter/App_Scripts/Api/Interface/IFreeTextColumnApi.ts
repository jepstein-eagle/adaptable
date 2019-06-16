import {
  FreeTextColumnState,
  FreeTextColumn,
} from '../../PredefinedConfig/IUserState/FreeTextColumnState';
export interface IFreeTextColumnApi {
  getFreeTextColumnState(): FreeTextColumnState;
  getAllFreeTextColumn(): FreeTextColumn[];
  addFreeTextColumn(freeTextColumn: FreeTextColumn): void;
  createFreeTextColumn(columnId: string, defaultValue: string): void;
  deleteFreeTextColumn(columnId: string): void;
  addEditFreeTextColumnStoredValue(freeTextColumn: FreeTextColumn, storedValue: any): void;
}
