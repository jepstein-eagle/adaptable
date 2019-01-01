import * as SystemFilterRedux from '../Redux/ActionsReducers/SystemFilterRedux'
import * as UserFilterRedux from '../Redux/ActionsReducers/UserFilterRedux'
import { ApiBase } from "./ApiBase";
import { IUserFilter } from './Interface/IAdaptableBlotterObjects';
import { FilterHelper } from '../Utilities/Helpers/FilterHelper';

export interface ISystemFilterApi {


  userFilterSet(userFilters: IUserFilter[]): void
  Set(systemFilters: string[]): void
  Clear(): void
  GetCurrent(): string[]
  GetAll(): string[]
}


export class SystemFilterApi extends ApiBase implements ISystemFilterApi {


  public userFilterSet(userFilters: IUserFilter[]): void {
    userFilters.forEach(uf => {
      this.dispatchAction(UserFilterRedux.UserFilterAddUpdate(-1, uf))
    })
  }

  public Set(systemFilters: string[]): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
  }

  public Clear(): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
  }

  public GetCurrent(): string[] {
    return this.getState().SystemFilter.SystemFilters;
  }

  public GetAll(): string[] {
    return FilterHelper.GetAllSystemFilters();
  }



}