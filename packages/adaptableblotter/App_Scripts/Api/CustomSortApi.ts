import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { ICustomSort } from "../Utilities/Interface/BlotterObjects/ICustomSort";
import * as CustomSortRedux from '../Redux/ActionsReducers/CustomSortRedux'
import { ApiBase } from "./ApiBase";
import { ICustomSortApi } from './Interface/ICustomSortApi';

export class CustomSortApi extends ApiBase implements ICustomSortApi {

  public GetAll(): ICustomSort[] {
    return this.getState().CustomSort.CustomSorts;
  }

  public GetByColumn(column: string): ICustomSort {
    return this.getState().CustomSort.CustomSorts.find(cs => cs.ColumnId == column);
  }

  public Add(customSort: ICustomSort): void {
    this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort))
  }

  public Create(columnId: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: columnId, SortedValues: values }
    this.Add(customSort);
  }

  public Edit(columnId: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: columnId, SortedValues: values }
    if (this.checkItemExists(customSort, columnId, StrategyConstants.CustomSortStrategyId)) {
      this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort))
    }
  }

  public Delete(column: string): void {
    let customSort: ICustomSort = this.GetByColumn(column);
    this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort))
  }

}