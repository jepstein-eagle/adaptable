import { ICustomSort } from "../../Utilities/Interface/BlotterObjects/ICustomSort";
import { CustomSortState } from "../../Redux/ActionsReducers/Interface/IState";

export interface ICustomSortApi {
  getCustomSortState(): CustomSortState;
  getAllCustomSort(): ICustomSort[]
  getCustomSortByColumn(column: string): ICustomSort
  addCustomSort(customSort: ICustomSort): void
  createCustomSort(column: string, values: string[]): void
  editCustomSort(column: string, values: string[]): void
  deleteCustomSort(column: string): void
}

