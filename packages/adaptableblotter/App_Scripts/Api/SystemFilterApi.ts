import * as SystemFilterRedux from '../Redux/ActionsReducers/SystemFilterRedux';
import * as UserFilterRedux from '../Redux/ActionsReducers/UserFilterRedux';
import { ApiBase } from './ApiBase';
import { IUserFilter } from '../Utilities/Interface/BlotterObjects/IUserFilter';
import { FilterHelper } from '../Utilities/Helpers/FilterHelper';
import { ISystemFilterApi } from './Interface/ISystemFilterApi';
import { SystemFilterState } from '../Redux/ActionsReducers/Interface/IState';

export class SystemFilterApi extends ApiBase implements ISystemFilterApi {
  public getSystemFilterState(): SystemFilterState {
    return this.getBlotterState().SystemFilter;
  }

  public setSystemFilterByUserFilters(userFilters: IUserFilter[]): void {
    userFilters.forEach(uf => {
      this.dispatchAction(UserFilterRedux.UserFilterAddUpdate(-1, uf));
    });
  }

  public setSystemFilter(systemFilters: string[]): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
  }

  public clearSystemFilter(): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
  }

  public getCurrentSystemFilter(): string[] {
    return this.getBlotterState().SystemFilter.SystemFilters;
  }

  public getAllSystemFilter(): string[] {
    return FilterHelper.GetAllSystemFilters();
  }
}
