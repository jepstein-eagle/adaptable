import { ApiBase } from "./ApiBase";
import { IUserFilter } from "../Utilities/Interface/BlotterObjects/IUserFilter";
import { ISystemFilterApi } from './Interface/ISystemFilterApi';
import { SystemFilterState } from '../Redux/ActionsReducers/Interface/IState';
export declare class SystemFilterApi extends ApiBase implements ISystemFilterApi {
    GetState(): SystemFilterState;
    userFilterSet(userFilters: IUserFilter[]): void;
    Set(systemFilters: string[]): void;
    Clear(): void;
    GetCurrent(): string[];
    GetAll(): string[];
}
