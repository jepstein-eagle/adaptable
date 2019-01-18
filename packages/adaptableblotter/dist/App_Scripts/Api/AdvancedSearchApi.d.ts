import { IAdvancedSearch } from "../Utilities/Interface/IAdaptableBlotterObjects";
import { ApiBase } from "./ApiBase";
import { IAdvancedSearchApi } from './Interface/IAdvancedSearchApi';
export declare class AdvancedSearchApi extends ApiBase implements IAdvancedSearchApi {
    Set(advancedSearchName: string): void;
    Clear(): void;
    Add(advancedSearch: IAdvancedSearch): void;
    Edit(advancedSearchName: string, advancedSearch: IAdvancedSearch): void;
    Delete(advancedSearchName: string): void;
    GetCurrent(): IAdvancedSearch;
    GetByName(advancedSearchName: string): IAdvancedSearch;
    GetAll(): IAdvancedSearch[];
}
