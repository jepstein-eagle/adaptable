import * as SystemFilterRedux from '../Redux/ActionsReducers/SystemFilterRedux'
import * as UserFilterRedux from '../Redux/ActionsReducers/UserFilterRedux'
import { ApiBase } from "./ApiBase";
import { IUserFilter } from './Interface/IAdaptableBlotterObjects';
import { FilterHelper } from '../Utilities/Helpers/FilterHelper';

export interface ISystemFilterApi {


  userFilterSet(userFilters: IUserFilter[]): void
  systemFilterSet(systemFilters: string[]): void
  systemFilterClear(): void
  systemFilterGetCurrent(): string[]
  systemFilterGetAll(): string[]
}


export class SystemFilterApi extends ApiBase implements ISystemFilterApi {

    
  public userFilterSet(userFilters: IUserFilter[]): void {
    userFilters.forEach(uf => {
      this.dispatchAction(UserFilterRedux.UserFilterAddUpdate(-1, uf))
    })
  }

  public systemFilterSet(systemFilters: string[]): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
  }

  public systemFilterClear(): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
  }

  public systemFilterGetCurrent(): string[] {
    return this.getState().SystemFilter.SystemFilters;
  }

  public systemFilterGetAll(): string[] {
    return FilterHelper.GetAllSystemFilters();
  }



}