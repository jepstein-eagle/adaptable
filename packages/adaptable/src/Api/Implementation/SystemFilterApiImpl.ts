import * as SystemFilterRedux from '../../Redux/ActionsReducers/SystemFilterRedux';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import { ApiBase } from './ApiBase';
import { SystemFilterApi } from '../SystemFilterApi';
import { SystemFilterState } from '../../PredefinedConfig/SystemFilterState';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { FilterPredicate } from '../../AdaptableOptions/FilterPredicates';
import { AdaptableColumn } from '../../types';
import { SystemFilterPredicatesById } from '../../Utilities/Services/FilterService';

export class SystemFilterApiImpl extends ApiBase implements SystemFilterApi {
  public getSystemFilterState(): SystemFilterState {
    return this.getAdaptableState().SystemFilter;
  }

  public setSystemFilters(systemFilters: string[]): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
  }

  public clearSystemFilters(): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
  }

  public getAllSystemFilterIds(): string[] {
    return this.getAdaptableState().SystemFilter.SystemFilters;
  }

  public getAllSystemFilterPredicates(): FilterPredicate[] {
    return this.getAdaptableState().SystemFilter.SystemFilters.map(
      this.getSystemFilterPredicateById
    );
  }

  public getSystemFilterPredicateById(predicateId: string): FilterPredicate {
    return SystemFilterPredicatesById[predicateId];
  }

  public getSystemFilterPredicatesForColumn(column: AdaptableColumn): FilterPredicate[] {
    return this.getAllSystemFilterPredicates().filter(predicate => {
      if (predicate.scope === undefined) {
        return true;
      }

      if (predicate.scope.DataType && predicate.scope.DataType === column.DataType) {
        return true;
      }

      if (predicate.scope.ColumnIds && predicate.scope.ColumnIds.includes(column.ColumnId)) {
        return true;
      }

      return false;
    });
  }

  public getSystemFilterPredicatesForColumnId(columnId: string): FilterPredicate[] {
    const column = this.adaptable.api.gridApi.getColumnFromId(columnId);
    return this.getSystemFilterPredicatesForColumn(column);
  }
}
