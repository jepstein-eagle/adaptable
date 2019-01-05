import { ICustomSort } from "./Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { ICustomSortApi } from './Interface/ICustomSortApi';
export declare class CustomSortApi extends ApiBase implements ICustomSortApi {
    GetAll(): ICustomSort[];
    GetByColumn(column: string): ICustomSort;
    Add(customSort: ICustomSort): void;
    Create(column: string, values: string[]): void;
    Edit(column: string, values: string[]): void;
    Delete(column: string): void;
}
