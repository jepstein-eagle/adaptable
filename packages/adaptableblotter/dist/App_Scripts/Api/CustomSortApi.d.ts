import { ICustomSort } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
export interface ICustomSortApi {
    GetAll(): ICustomSort[];
    GetByColumn(columnn: string): ICustomSort;
    Add(customSort: ICustomSort): void;
    Create(column: string, values: string[]): void;
    Edit(column: string, values: string[]): void;
    Delete(column: string): void;
}
export declare class CustomSortApi extends ApiBase implements ICustomSortApi {
    GetAll(): ICustomSort[];
    GetByColumn(columnn: string): ICustomSort;
    Add(customSort: ICustomSort): void;
    Create(column: string, values: string[]): void;
    Edit(column: string, values: string[]): void;
    Delete(column: string): void;
}
