import { ApiBase } from "./ApiBase";
import { IUserFilter } from './Interface/IAdaptableBlotterObjects';
export interface ISystemFilterApi {
    userFilterSet(userFilters: IUserFilter[]): void;
    Set(systemFilters: string[]): void;
    Clear(): void;
    GetCurrent(): string[];
    GetAll(): string[];
}
export declare class SystemFilterApi extends ApiBase implements ISystemFilterApi {
    userFilterSet(userFilters: IUserFilter[]): void;
    Set(systemFilters: string[]): void;
    Clear(): void;
    GetCurrent(): string[];
    GetAll(): string[];
}
