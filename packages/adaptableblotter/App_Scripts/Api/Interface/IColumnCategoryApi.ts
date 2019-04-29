import { IColumnCategory } from "../../Utilities/Interface/BlotterObjects/IColumnCategory";
import { ColumnCategoryState } from "../../Redux/ActionsReducers/Interface/IState";

export interface IColumnCategoryApi {
  GetState(): ColumnCategoryState;
  GetAll(): IColumnCategory[];
  GetById(columnCategoryId: string): IColumnCategory;
  Add(columnCategory: IColumnCategory): void;
  Create(columnCategoryId: string, columns: string[]): void;
  Edit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
  Delete(columnCategoryId: string): void;
  AddColumns(columnCategoryId: string, columns: string[]): void;
  RemoveColumns(columnCategoryId: string, columns: string[]): void;
}

