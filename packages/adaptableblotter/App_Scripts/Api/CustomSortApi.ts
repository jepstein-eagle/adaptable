import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import { ICustomSort } from "../Utilities/Interface/BlotterObjects/ICustomSort";
import * as CustomSortRedux from '../Redux/ActionsReducers/CustomSortRedux'
import { ApiBase } from "./ApiBase";
import { ICustomSortApi } from './Interface/ICustomSortApi';
import { CustomSortState } from '../Redux/ActionsReducers/Interface/IState';

export class CustomSortApi extends ApiBase implements ICustomSortApi {


  public getCustomSortState(): CustomSortState {
    return this.getBlotterState().CustomSort;
  }

  public getAllCustomSort(): ICustomSort[] {
    return this.getBlotterState().CustomSort.CustomSorts;
  }

  public getCustomSortByColumn(column: string): ICustomSort {
    return this.getBlotterState().CustomSort.CustomSorts.find(cs => cs.ColumnId == column);
  }

  public addCustomSort(customSort: ICustomSort): void {
    this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort))
  }

  public createCustomSort(columnId: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: columnId, SortedValues: values }
    this.addCustomSort(customSort);
  }

  public editCustomSort(columnId: string, values: string[]): void {
    let customSort: ICustomSort = { ColumnId: columnId, SortedValues: values }
    if (this.checkItemExists(customSort, columnId, StrategyConstants.CustomSortStrategyId)) {
      this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort))
    }
  }

  public deleteCustomSort(column: string): void {
    let customSort: ICustomSort = this.getCustomSortByColumn(column);
    this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort))
  }

}