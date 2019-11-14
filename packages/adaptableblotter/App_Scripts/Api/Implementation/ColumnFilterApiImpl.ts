import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import { ApiBase } from './ApiBase';
import { ObjectFactory } from '../../Utilities/ObjectFactory';
import { ColumnFilterApi } from '../ColumnFilterApi';
import { ColumnFilterState, ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';

export class ColumnFilterApiImpl extends ApiBase implements ColumnFilterApi {
  public getColumnFilterState(): ColumnFilterState {
    return this.getBlotterState().ColumnFilter;
  }

  public setColumnFilter(columnFilters: ColumnFilter[]): void {
    columnFilters.forEach(columnFilter => {
      if (this.getAllColumnFilter().find(cf => cf.ColumnId == columnFilter.ColumnId)) {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterEdit(columnFilter));
      } else {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterAdd(columnFilter));
      }
    });
  }

  public clearColumnFilter(columnFilter: ColumnFilter): void {
    this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(columnFilter));
  }

  public clearColumnFilterByColumns(columns: string[]): void {
    columns.forEach(c => {
      this.clearColumnFilterByColumn(c);
    });
  }

  public clearColumnFilterByColumn(column: string): void {
    let columnFiltersForColumn: ColumnFilter[] = this.getAllColumnFilter().filter(
      cf => cf.ColumnId == column
    );
    columnFiltersForColumn.forEach(cf => {
      this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(cf));
    });
  }

  public clearAllColumnFilter(): void {
    this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
  }

  public getAllColumnFilter(): ColumnFilter[] {
    return this.getBlotterState().ColumnFilter.ColumnFilters;
  }
}