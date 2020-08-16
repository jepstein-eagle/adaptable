import * as SystemFilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import * as UserFilterRedux from '../../Redux/ActionsReducers/UserFilterRedux';
import { ApiBase } from './ApiBase';
import { SystemFilterApi } from '../SystemFilterApi';
import { FilterState, FilterPredicate } from '../../PredefinedConfig/FilterState';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { AdaptableColumn } from '../../types';
import {
  SystemFilterPredicatesById,
  SystemFilterIds,
} from '../../Utilities/Services/FilterService';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';

export class SystemFilterApiImpl extends ApiBase implements SystemFilterApi {
  public getSystemFilterState(): FilterState {
    return this.getAdaptableState().Filter;
  }

  public getAllSystemFilterIds(): SystemFilterIds {
    return this.getSystemFilterState().SystemFilters;
  }

  public getAllUserFilterIds(): string[] {
    return this.getSystemFilterState().UserFilters;
  }

  public setSystemFilters(systemFilters: string[]): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
  }

  public clearSystemFilters(): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
  }

  public getFilterPredicateById(predicateId: string): FilterPredicate {
    const filterPredicate: FilterPredicate = this.getSystemFilterPredicateById(predicateId);
    if (filterPredicate) {
      return filterPredicate;
    } else {
      return this.getUserFilterPredicateById(predicateId);
    }
  }

  private getSystemFilterPredicateById(predicateId: string): FilterPredicate {
    return SystemFilterPredicatesById[predicateId];
  }
  public getUserFilterPredicateById(predicateId: string): FilterPredicate {
    return this.adaptable.adaptableOptions.userFunctions.find(
      uf => uf.type === 'FilterPredicate' && uf.id === predicateId
    ) as FilterPredicate;
  }

  public getFilterPredicatesForColumn(column: AdaptableColumn): FilterPredicate[] {
    return this.getAllFilterPredicates().filter(predicate => {
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

  public getFilterPredicatesForColumnId(columnId: string): FilterPredicate[] {
    const column = this.adaptable.api.gridApi.getColumnFromId(columnId);
    return this.getFilterPredicatesForColumn(column);
  }

  private getAllFilterPredicates(): FilterPredicate[] {
    let filterPredicates: FilterPredicate[] = [];
    let systemFilters = this.getAllSystemFilterIds();
    if (ArrayExtensions.IsNotNullOrEmpty(systemFilters)) {
      filterPredicates.push(...systemFilters.map(sf => this.getFilterPredicateById(sf)));
    }
    let userFilters = this.getAllUserFilterIds();
    if (ArrayExtensions.IsNotNullOrEmpty(userFilters)) {
      filterPredicates.push(...userFilters.map(uf => this.getFilterPredicateById(uf)));
    }
    return filterPredicates;
  }
}
