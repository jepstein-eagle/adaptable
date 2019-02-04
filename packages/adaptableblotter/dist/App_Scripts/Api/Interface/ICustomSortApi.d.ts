import { ICustomSort } from "../../Utilities/Interface/BlotterObjects/ICustomSort";
export interface ICustomSortApi {
    GetAll(): ICustomSort[];
    GetByColumn(column: string): ICustomSort;
    Add(customSort: ICustomSort): void;
    Create(column: string, values: string[]): void;
    Edit(column: string, values: string[]): void;
    Delete(column: string): void;
}
