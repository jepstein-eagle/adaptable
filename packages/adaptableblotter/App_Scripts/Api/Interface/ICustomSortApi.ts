import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { ICustomSort } from "./IAdaptableBlotterObjects";
import * as CustomSortRedux from '../../Redux/ActionsReducers/CustomSortRedux'
import { ApiBase } from "../ApiBase";

export interface ICustomSortApi {
   
  GetAll(): ICustomSort[]
  GetByColumn(column: string): ICustomSort
  Add(customSort: ICustomSort): void
  Create(column: string, values: string[]): void
  Edit(column: string, values: string[]): void
  Delete(column: string): void
}

