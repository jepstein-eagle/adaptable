import * as SystemFilterRedux from '../../Redux/ActionsReducers/SystemFilterRedux';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import { ApiBase } from './ApiBase';
import { FilterHelper } from '../../Utilities/Helpers/FilterHelper';
import { SystemFilterApi } from '../SystemFilterApi';
import { SystemFilterState } from '../../PredefinedConfig/SystemFilterState';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';

export class SystemFilterApiImpl extends ApiBase implements SystemFilterApi {
  public getSystemFilterState(): SystemFilterState {
    return this.getBlotterState().SystemFilter;
  }

  public setSystemFilters(systemFilters: string[]): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
  }

  public clearSystemFilters(): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
  }

  public getAllSystemFilter(): string[] {
    return this.getBlotterState().SystemFilter.SystemFilters;
  }

  public getAllPotentialSystemFilters(): string[] {
    return FilterHelper.GetAllSystemFilters();
  }
}
