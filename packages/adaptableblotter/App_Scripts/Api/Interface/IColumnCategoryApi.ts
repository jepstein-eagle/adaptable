import * as ColumnCategoryRedux from '../../Redux/ActionsReducers/ColumnCategoryRedux'
import { ApiBase } from "../ApiBase";
import { IColumnCategory } from "../../Utilities/Interface/BlotterObjects/IColumnCategory";

export interface IColumnCategoryApi {

  GetAll(): IColumnCategory[];
  Add(columnCategory: IColumnCategory): void;
  Create(columnCategoryId: string, columns: string[]): void;
  Edit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
  Delete(columnCategoryId: string): void;
  AddColumns(columnCategoryId: string, columns: string[]): void;
  RemoveColumns(columnCategoryId: string, columns: string[]): void;
}

