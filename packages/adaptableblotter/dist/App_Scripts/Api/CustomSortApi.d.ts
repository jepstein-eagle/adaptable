import { ICustomSort } from "../Utilities/Interface/BlotterObjects/ICustomSort";
import { ApiBase } from "./ApiBase";
import { ICustomSortApi } from './Interface/ICustomSortApi';
import { CustomSortState } from '../Redux/ActionsReducers/Interface/IState';
export declare class CustomSortApi extends ApiBase implements ICustomSortApi {
    GetState(): CustomSortState;
    GetAll(): ICustomSort[];
    GetByColumn(column: string): ICustomSort;
    Add(customSort: ICustomSort): void;
    Create(columnId: string, values: string[]): void;
    Edit(columnId: string, values: string[]): void;
    Delete(column: string): void;
}
