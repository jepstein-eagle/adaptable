import * as SystemFilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import { ApiBase } from './ApiBase';
import { FilterApi } from '../FilterApi';
import {
  FilterState,
  FilterPredicate,
  ColumnFilter,
  SystemFilterIds,
  SystemFilterPredicatesById,
} from '../../PredefinedConfig/FilterState';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { AdaptableColumn } from '../../types';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import { AdaptableApi } from '../AdaptableApi';

export class FilterApiImpl extends ApiBase implements FilterApi {
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

  public getAllColumnFilter(): ColumnFilter[] {
    return this.getSystemFilterState().ColumnFilters;
  }

  public setColumnFilter(columnFilters: ColumnFilter[]): void {
    columnFilters.forEach(columnFilter => {
      if (this.getAllColumnFilter().find(cf => cf.ColumnId == columnFilter.ColumnId)) {
        this.dispatchAction(FilterRedux.ColumnFilterEdit(columnFilter));
      } else {
        this.dispatchAction(FilterRedux.ColumnFilterAdd(columnFilter));
      }
    });
  }

  public clearAndSetColumnFilter(columnFilters: ColumnFilter[]): void {
    this.clearAllColumnFilter();
    columnFilters.forEach(columnFilter => {
      if (this.getAllColumnFilter().find(cf => cf.ColumnId == columnFilter.ColumnId)) {
        this.dispatchAction(FilterRedux.ColumnFilterEdit(columnFilter));
      } else {
        this.dispatchAction(FilterRedux.ColumnFilterAdd(columnFilter));
      }
    });
  }

  public clearColumnFilter(columnFilter: ColumnFilter): void {
    this.dispatchAction(FilterRedux.ColumnFilterClear(columnFilter));
  }

  public clearColumnFilterByColumns(columns: string[]): void {
    columns.forEach(c => {
      this.clearColumnFilterByColumn(c);
    });
  }

  public clearColumnFilterByColumn(column: string): void {
    let columnFiltersForColumn: ColumnFilter[] | undefined = this.getAllColumnFilterForColumn(
      column
    );
    if (columnFiltersForColumn) {
      columnFiltersForColumn.forEach(cf => {
        this.dispatchAction(FilterRedux.ColumnFilterClear(cf));
      });
      this.adaptable.clearColumnFiltering([column]);
    }
  }

  public clearAllColumnFilter(): void {
    this.dispatchAction(FilterRedux.ColumnFilterClearAll());
    this.adaptable.clearGridFiltering();
  }

  public getAllColumnFilterForColumn(column: string): ColumnFilter[] {
    let columnFilters: ColumnFilter[] | undefined = this.getAllColumnFilter();
    if (columnFilters) {
      return columnFilters.filter(cf => cf.ColumnId == column);
    } else {
      return [];
    }
  }

  public createColumnFilterForCell(column: string, primarykeyValues: any[]): void {
    let displayValues: any[] = [];

    primarykeyValues.forEach(pk => {
      let rowNode = this.adaptable.getRowNodeForPrimaryKey(pk);
      displayValues.push(this.adaptable.getDisplayValueFromRowNode(rowNode, column));
    });

    let filter: ColumnFilter = {
      ColumnId: column,
      Values: displayValues,
    };
    this.setColumnFilter([filter]);
  }

  public convertColumnFilterToString(columnFilter: ColumnFilter): string {
    return 'I need to do this !!!';
  }

  public convertColumnFiltersToString(columnFilters: ColumnFilter[]): string {
    return 'I need to do this for all !!!';
  }

  public evaluateColumnFilter(columnFilter: ColumnFilter, data: any): boolean {
    const value = data[columnFilter.ColumnId];

    if (
      ArrayExtensions.IsNullOrEmpty(columnFilter.Values) &&
      ArrayExtensions.IsNullOrEmpty(columnFilter.Predicates)
    ) {
      return true;
    }

    if (value === null || value === undefined) {
      return false;
    }

    if (columnFilter.Values?.includes(value)) {
      return true;
    }

    if (
      columnFilter.Predicates?.some(item => {
        const predicate = this.getFilterPredicateById(item.PredicateId);
        if (!predicate) {
          throw `Predicate not found: ${item.PredicateId}`;
        }
        try {
          const api: AdaptableApi = this.adaptable.api;
          return predicate.handler({
            api,
            value,
            inputs: item.Inputs,
          });
        } catch (error) {
          console.error(`Error in predicate ${item.PredicateId}`, error);
          return false;
        }
      })
    ) {
      return true;
    }

    return false;
  }
}
