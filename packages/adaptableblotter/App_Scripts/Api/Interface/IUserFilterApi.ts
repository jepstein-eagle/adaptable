import { IUserFilter } from "../../Utilities/Interface/BlotterObjects/IUserFilter";
import { UserFilterState } from "../../Redux/ActionsReducers/Interface/IState";
export interface IUserFilterApi {
  GetState(): UserFilterState;
  GetAll(): IUserFilter[];
 
}
