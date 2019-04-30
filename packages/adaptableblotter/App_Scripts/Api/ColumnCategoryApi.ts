import * as ColumnCategoryRedux from '../Redux/ActionsReducers/ColumnCategoryRedux'
import { ApiBase } from "./ApiBase";
import { IColumnCategoryApi } from './Interface/IColumnCategoryApi';
import { IColumnCategory } from "../Utilities/Interface/BlotterObjects/IColumnCategory";
import { ColumnCategoryState } from '../Redux/ActionsReducers/Interface/IState';

export class ColumnCategoryApi extends ApiBase implements IColumnCategoryApi {

  public getColumnCategoryState(): ColumnCategoryState {
    return this.getBlotterState().ColumnCategory;
  }

  public getAllColumnCategory(): IColumnCategory[] {
    return this.getColumnCategoryState().ColumnCategories;
  }

  public getColumnCategoryById(columnCategoryId: string): IColumnCategory {
    return this.getAllColumnCategory().find(cc => cc.ColumnCategoryId == columnCategoryId);
  }

  public addColumnCategory(columnCategory: IColumnCategory): void {
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory))
  }

  public createColumnCategory(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = {
      ColumnCategoryId: columnCategoryId,
      ColumnIds: columns
    }
    this.addColumnCategory(columnCategory);
  }

  public editColumnCategory(previousColumnCategoryId: string, columnCategory: IColumnCategory): void {
    let index: number = this.getAllColumnCategory().findIndex(cc => cc.ColumnCategoryId == previousColumnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public addColumnsToColumnCategory(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.getColumnCategoryById(columnCategoryId);
    let index: number = this.getAllColumnCategory().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      columnCategory.ColumnIds.push(c);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public removeColumnsFromColumnCategory(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.getAllColumnCategory().find(cc => cc.ColumnCategoryId == columnCategoryId)
    let index: number = this.getAllColumnCategory().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      let ccIndex = columnCategory.ColumnIds.findIndex(cc => cc == c)
      columnCategory.ColumnIds.splice(ccIndex, 1);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }


  public deleteColumnCategory(columnCategoryId: string): void {
    let columnCategory: IColumnCategory = this.getAllColumnCategory().find(cc => cc.ColumnCategoryId == columnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory))
  }

}