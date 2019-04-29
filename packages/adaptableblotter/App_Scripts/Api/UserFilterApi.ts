import * as UserFilterRedux from '../Redux/ActionsReducers/UserFilterRedux'
import { ApiBase } from "./ApiBase";
import { IUserFilter } from "../Utilities/Interface/BlotterObjects/IUserFilter";
import { IUserFilterApi } from './Interface/IUserFilterApi';
import { UserFilterState } from '../Redux/ActionsReducers/Interface/IState';

export class UserFilterApi extends ApiBase implements IUserFilterApi {

    
  public GetState(): UserFilterState {
    return this.getBlotterState().UserFilter;
}

public  GetAll(): IUserFilter[] {
      return this.GetState().UserFilters;
    }
  
  
}