import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux';
import { ApiBase } from './ApiBase';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IColumnFilterApi } from './Interface/IColumnFilterApi';
import { ColumnFilterState, ColumnFilter } from '../PredefinedConfig/IUserState/ColumnFilterState';

export class ColumnFilterApi extends ApiBase implements IColumnFilterApi {
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
    this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(columnFilter.ColumnId));
  }

  public clearColumnFilterByColumns(columns: string[]): void {
    columns.forEach(c => {
      this.clearColumnFilterByColumn(c);
    });
  }

  public clearColumnFilterByColumn(column: string): void {
    this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(column));
  }

  public clearAllColumnFilter(): void {
    this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
  }

  public getAllColumnFilter(): ColumnFilter[] {
    return this.getBlotterState().ColumnFilter.ColumnFilters;
  }
}
