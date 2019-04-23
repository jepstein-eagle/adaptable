import { ICustomSort } from "../../Utilities/Interface/BlotterObjects/ICustomSort";
import { CustomSortState } from "../../Redux/ActionsReducers/Interface/IState";
export interface ICustomSortApi {
    GetState(): CustomSortState;
    GetAll(): ICustomSort[];
    GetByColumn(column: string): ICustomSort;
    Add(customSort: ICustomSort): void;
    Create(column: string, values: string[]): void;
    Edit(column: string, values: string[]): void;
    Delete(column: string): void;
}
