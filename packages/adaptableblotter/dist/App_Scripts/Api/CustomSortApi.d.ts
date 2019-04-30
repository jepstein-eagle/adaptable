import { ICustomSort } from "../Utilities/Interface/BlotterObjects/ICustomSort";
import { ApiBase } from "./ApiBase";
import { ICustomSortApi } from './Interface/ICustomSortApi';
import { CustomSortState } from '../Redux/ActionsReducers/Interface/IState';
export declare class CustomSortApi extends ApiBase implements ICustomSortApi {
    getCustomSortState(): CustomSortState;
    getAllCustomSort(): ICustomSort[];
    getCustomSortByColumn(column: string): ICustomSort;
    addCustomSort(customSort: ICustomSort): void;
    createCustomSort(columnId: string, values: string[]): void;
    editCustomSort(columnId: string, values: string[]): void;
    deleteCustomSort(column: string): void;
}
