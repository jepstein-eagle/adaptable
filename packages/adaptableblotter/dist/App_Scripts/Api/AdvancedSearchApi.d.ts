import { IAdvancedSearch } from "../Utilities/Interface/BlotterObjects/IAdvancedSearch";
import { ApiBase } from "./ApiBase";
import { IAdvancedSearchApi } from './Interface/IAdvancedSearchApi';
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState';
export declare class AdvancedSearchApi extends ApiBase implements IAdvancedSearchApi {
    GetState(): AdvancedSearchState;
    Set(advancedSearchName: string): void;
    Clear(): void;
    Add(advancedSearch: IAdvancedSearch): void;
    Edit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void;
    Delete(advancedSearchName: string): void;
    GetCurrent(): IAdvancedSearch;
    GetCurrentName(): string;
    GetByName(advancedSearchName: string): IAdvancedSearch;
    GetAll(): IAdvancedSearch[];
}
