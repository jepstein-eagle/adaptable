import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { ICustomSort } from "./Interface/IAdaptableBlotterObjects";
import * as CustomSortRedux from '../Redux/ActionsReducers/CustomSortRedux'
import { ApiBase } from "./ApiBase";

export interface ICustomSortApi {
   
  GetAll(): ICustomSort[]
  GetByColumn(columnn: string): ICustomSort
  Add(customSort: ICustomSort): void
  Create(column: string, values: string[]): void
  Edit(column: string, values: string[]): void
  Delete(column: string): void
}



export class CustomSortApi extends ApiBase implements ICustomSortApi {

   // Custom Sort Methods
   public GetAll(): ICustomSort[] {
    return this.getState().CustomSort.CustomSorts;
  }

  public GetByColumn(columnn: string): ICustomSort {
    return this.getState().CustomSort.CustomSorts.find(cs => cs.ColumnId == columnn);
  }

  public Add(customSort: ICustomSort): void {
    this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort))
  }

  public Create(column: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: column, SortedValues: values }
    this.Add(customSort);
  }

  public Edit(column: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: column, SortedValues: values }
    this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort))
  }

  public Delete(column: string): void {
    let customSort: ICustomSort = this.GetByColumn(column);
    this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort))
  }

}