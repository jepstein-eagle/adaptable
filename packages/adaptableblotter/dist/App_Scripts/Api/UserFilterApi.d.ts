import { ApiBase } from "./ApiBase";
import { IUserFilter } from "../Utilities/Interface/BlotterObjects/IUserFilter";
import { IUserFilterApi } from './Interface/IUserFilterApi';
import { UserFilterState } from '../Redux/ActionsReducers/Interface/IState';
export declare class UserFilterApi extends ApiBase implements IUserFilterApi {
    getUserFilterState(): UserFilterState;
    getAllUserFilter(): IUserFilter[];
}
