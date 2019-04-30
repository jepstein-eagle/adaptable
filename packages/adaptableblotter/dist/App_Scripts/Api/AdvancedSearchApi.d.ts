import { IAdvancedSearch } from "../Utilities/Interface/BlotterObjects/IAdvancedSearch";
import { ApiBase } from "./ApiBase";
import { IAdvancedSearchApi } from './Interface/IAdvancedSearchApi';
import { AdvancedSearchState } from '../Redux/ActionsReducers/Interface/IState';
export declare class AdvancedSearchApi extends ApiBase implements IAdvancedSearchApi {
    getAdvancedSearchState(): AdvancedSearchState;
    setAdvancedSearch(advancedSearchName: string): void;
    clearAdvancedSearch(): void;
    addAdvancedSearch(advancedSearch: IAdvancedSearch): void;
    editAdvancedSearch(advancedSearchName: string, advancedSearch: IAdvancedSearch): void;
    deleteAdvancedSearch(advancedSearchName: string): void;
    getCurrentAdvancedSearch(): IAdvancedSearch;
    getCurrentAdvancedSearchName(): string;
    getAdvancedSearchByName(advancedSearchName: string): IAdvancedSearch;
    getAllAdvancedSearch(): IAdvancedSearch[];
}
