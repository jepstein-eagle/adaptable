import * as ColumnCategoryRedux from '../Redux/ActionsReducers/ColumnCategoryRedux'
import { ApiBase } from "./ApiBase";
import { IColumnCategory } from './Interface/Interfaces';

export interface IColumnCategoryApi {


  //  Colummn Category
  columnCategoryGetAll(): IColumnCategory[];
  columnCategoryAdd(columnCategory: IColumnCategory): void;
  columnCategoryCreate(columnCategoryId: string, columns: string[]): void;
  columnCategoryEdit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void;
  columnCategoryDelete(columnCategoryId: string): void;
  columnCategoryAddColumns(columnCategoryId: string, columns: string[]): void;
  columnCategoryRemoveColumns(columnCategoryId: string, columns: string[]): void;
}


export class ColumnCategoryApi extends ApiBase implements IColumnCategoryApi {

   // column category api methods
  public columnCategoryGetAll(): IColumnCategory[] {
    return this.getState().ColumnCategory.ColumnCategories;
  }

  public columnCategoryAdd(columnCategory: IColumnCategory): void {
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory))
  }

  public columnCategoryCreate(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = {
      ColumnCategoryId: columnCategoryId,
      ColumnIds: columns
    }
    this.columnCategoryAdd(columnCategory);
  }

  public columnCategoryEdit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void {
    let index: number = this.columnCategoryGetAll().findIndex(cc => cc.ColumnCategoryId == previousColumnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public columnCategoryAddColumns(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.columnCategoryGetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    let index: number = this.columnCategoryGetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      columnCategory.ColumnIds.push(c);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public columnCategoryRemoveColumns(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.columnCategoryGetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    let index: number = this.columnCategoryGetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      let ccIndex = columnCategory.ColumnIds.findIndex(cc => cc == c)
      columnCategory.ColumnIds.splice(ccIndex, 1);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }


  public columnCategoryDelete(columnCategoryId: string): void {
    let columnCategory: IColumnCategory = this.columnCategoryGetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory))
  }



}