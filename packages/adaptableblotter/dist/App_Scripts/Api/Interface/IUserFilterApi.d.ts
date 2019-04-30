import { IUserFilter } from "../../Utilities/Interface/BlotterObjects/IUserFilter";
import { UserFilterState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IUserFilterApi {
    getUserFilterState(): UserFilterState;
    getAllUserFilter(): IUserFilter[];
}
