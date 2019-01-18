import { ICustomSort } from "../Utilities/Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { ICustomSortApi } from './Interface/ICustomSortApi';
export declare class CustomSortApi extends ApiBase implements ICustomSortApi {
    GetAll(): ICustomSort[];
    GetByColumn(column: string): ICustomSort;
    Add(customSort: ICustomSort): void;
    Create(columnId: string, values: string[]): void;
    Edit(columnId: string, values: string[]): void;
    Delete(column: string): void;
}
