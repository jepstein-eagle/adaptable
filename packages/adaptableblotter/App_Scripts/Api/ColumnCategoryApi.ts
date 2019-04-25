import * as ColumnCategoryRedux from '../Redux/ActionsReducers/ColumnCategoryRedux'
import { ApiBase } from "./ApiBase";
import { IColumnCategoryApi } from './Interface/IColumnCategoryApi';
import { IColumnCategory } from "../Utilities/Interface/BlotterObjects/IColumnCategory";
import { ColumnCategoryState } from '../Redux/ActionsReducers/Interface/IState';


export class ColumnCategoryApi extends ApiBase implements IColumnCategoryApi {

  
  public GetState(): ColumnCategoryState {
    return this.getBlotterState().ColumnCategory;
}

public GetAll(): IColumnCategory[] {
    return this.getBlotterState().ColumnCategory.ColumnCategories;
  }

  public Add(columnCategory: IColumnCategory): void {
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryAdd(columnCategory))
  }

  public Create(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = {
      ColumnCategoryId: columnCategoryId,
      ColumnIds: columns
    }
    this.Add(columnCategory);
  }

  public Edit(previousColumnCategoryId: string, columnCategory: IColumnCategory): void {
    let index: number = this.GetAll().findIndex(cc => cc.ColumnCategoryId == previousColumnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public AddColumns(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.GetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    let index: number = this.GetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      columnCategory.ColumnIds.push(c);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }

  public RemoveColumns(columnCategoryId: string, columns: string[]): void {
    let columnCategory: IColumnCategory = this.GetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    let index: number = this.GetAll().findIndex(cc => cc.ColumnCategoryId == columnCategoryId)
    columns.forEach(c => {
      let ccIndex = columnCategory.ColumnIds.findIndex(cc => cc == c)
      columnCategory.ColumnIds.splice(ccIndex, 1);
    })
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryEdit(index, columnCategory))
  }


  public Delete(columnCategoryId: string): void {
    let columnCategory: IColumnCategory = this.GetAll().find(cc => cc.ColumnCategoryId == columnCategoryId)
    this.dispatchAction(ColumnCategoryRedux.ColumnCategoryDelete(columnCategory))
  }

}