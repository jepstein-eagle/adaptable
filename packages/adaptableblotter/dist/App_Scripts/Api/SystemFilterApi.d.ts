import { ApiBase } from "./ApiBase";
import { IUserFilter } from "../Utilities/Interface/BlotterObjects/IUserFilter";
import { ISystemFilterApi } from './Interface/ISystemFilterApi';
import { SystemFilterState } from '../Redux/ActionsReducers/Interface/IState';
export declare class SystemFilterApi extends ApiBase implements ISystemFilterApi {
    getSystemFilterState(): SystemFilterState;
    setSystemFilterByUserFilters(userFilters: IUserFilter[]): void;
    setSystemFilter(systemFilters: string[]): void;
    clearSystemFilter(): void;
    getCurrentSystemFilter(): string[];
    getAllSystemFilter(): string[];
}
