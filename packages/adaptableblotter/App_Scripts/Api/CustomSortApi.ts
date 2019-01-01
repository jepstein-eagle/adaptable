import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { ICustomSort } from "./Interface/IAdaptableBlotterObjects";
import * as CustomSortRedux from '../Redux/ActionsReducers/CustomSortRedux'
import { ApiBase } from "./ApiBase";

export interface ICustomSortApi {
   
  // Custom Sort Methods
  customSortGetAll(): ICustomSort[]
  customSortGetByColumn(columnn: string): ICustomSort
  customSortAdd(column: string, values: string[]): void
  customSortEdit(column: string, values: string[]): void
  customSortDelete(column: string): void
}



export class CustomSortApi extends ApiBase implements ICustomSortApi {

   // Custom Sort Methods
   public customSortGetAll(): ICustomSort[] {
    return this.getState().CustomSort.CustomSorts;
  }

  public customSortGetByColumn(columnn: string): ICustomSort {
    return this.getState().CustomSort.CustomSorts.find(cs => cs.ColumnId == columnn);
  }

  public customSortAdd(column: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: column, SortedValues: values }
    this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort))
  }

  public customSortEdit(column: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: column, SortedValues: values }
    this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort))
  }

  public customSortDelete(column: string): void {
    let customSort: ICustomSort = this.customSortGetByColumn(column);
    this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort))
  }

}