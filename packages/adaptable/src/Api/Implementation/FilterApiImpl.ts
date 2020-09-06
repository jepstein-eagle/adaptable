import * as SystemFilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import * as FilterRedux from '../../Redux/ActionsReducers/FilterRedux';
import { ApiBase } from './ApiBase';
import { FilterApi } from '../FilterApi';
import {
  FilterState,
  ColumnFilter,
  SystemFilterPredicateIds,
} from '../../PredefinedConfig/FilterState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import { CellValueType } from '../../PredefinedConfig/Common/Enums';
import { PredicateDef } from '../../PredefinedConfig/Common/Predicate';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';

export class FilterApiImpl extends ApiBase implements FilterApi {
  public getSystemFilterState(): FilterState {
    return this.getAdaptableState().Filter;
  }

  public getAllSystemFilterIds(): SystemFilterPredicateIds {
    return this.getSystemFilterState().SystemFilters;
  }

  public getAllUserFilterIds(): string[] {
    return this.getSystemFilterState().FilterPredicates;
  }

  public setSystemFilters(systemFilters: string[]): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
  }

  public clearSystemFilters(): void {
    this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
  }

  public findPredicateDefByShortcut(shortcut: string, column: AdaptableColumn): PredicateDef {
    return this.getFilterPredicateDefsForColumn(column).find(i => i.shortcuts?.includes(shortcut));
  }

  // public getUserFilterPredicateById(predicateId: string): PredicateDef {
  //   return this.adaptable.adaptableOptions.userFunctions.find(
  //     uf => uf.type === 'FilterPredicate' && uf.id === predicateId
  //   ) as FilterPredicate;
  // }

  public getFilterPredicateDefsForColumn(column: AdaptableColumn): PredicateDef[] {
    return this.getAllFilterPredicates().filter(predicate =>
      this.adaptable.api.scopeApi.isColumnInScope(column, predicate.columnScope)
    );
  }

  public getFilterPredicateDefsForColumnId(columnId: string): PredicateDef[] {
    const column = this.adaptable.api.columnApi.getColumnFromId(columnId);
    return this.getFilterPredicateDefsForColumn(column);
  }

  private getAllFilterPredicates(): PredicateDef[] {
    return [
      ...this.getAllSystemFilterIds().map(predicateId =>
        this.adaptable.api.predicateApi.getPredicateDefById(predicateId)
      ),
      ...this.adaptable.api.predicateApi.getCustomPredicateDefs(),
    ].filter(predicateDef => predicateDef.functionScope.includes('filter'));
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
      displayValues.push(
        this.adaptable.getValueFromRowNode(rowNode, column, CellValueType.DisplayValue)
      );
    });

    let filter: ColumnFilter = {
      ColumnId: column,
      Predicate: {
        PredicateId: 'Values',
        Inputs: displayValues,
      },
    };
    this.setColumnFilter([filter]);
  }

  public columnFilterToString(columnFilter: ColumnFilter): string {
    return (
      '[' +
      this.adaptable.api.columnApi.getColumnFromId(columnFilter.ColumnId).FriendlyName +
      '] ' +
      this.adaptable.api.predicateApi.predicateToString(columnFilter.Predicate)
    );
  }

  public columnFiltersToString(columnFilters: ColumnFilter[]): string {
    return columnFilters.map(cf => this.columnFilterToString(cf)).join(', ');
  }

  public evaluateColumnFilter(columnFilter: ColumnFilter, node: any): boolean {
    const value = this.adaptable.getRawValueFromRowNode(node, columnFilter.ColumnId);

    if (!columnFilter.Predicate) {
      return true;
    }

    if (columnFilter.Predicate.Inputs?.some(input => StringExtensions.IsNullOrEmpty(input))) {
      return true;
    }

    const displayValue = this.adaptable.getValueFromRowNode(
      node,
      columnFilter.ColumnId,
      CellValueType.DisplayValue
    );
    const column = this.adaptable.api.columnApi.getColumnFromId(columnFilter.ColumnId);

    return this.adaptable.api.predicateApi.handlePredicate(
      columnFilter.Predicate,
      {
        value,
        oldValue: null,
        displayValue,
        node,
        column,
      },
      true
    );
  }
}
