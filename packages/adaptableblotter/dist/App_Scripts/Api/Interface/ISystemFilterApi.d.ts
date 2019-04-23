import { IUserFilter } from "../../Utilities/Interface/BlotterObjects/IUserFilter";
import { SystemFilterState } from "../../Redux/ActionsReducers/Interface/IState";
export interface ISystemFilterApi {
    GetState(): SystemFilterState;
    userFilterSet(userFilters: IUserFilter[]): void;
    Set(systemFilters: string[]): void;
    Clear(): void;
    GetCurrent(): string[];
    GetAll(): string[];
}
