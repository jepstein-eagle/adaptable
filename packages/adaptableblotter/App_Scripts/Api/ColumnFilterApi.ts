import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux';
import { ApiBase } from './ApiBase';
import { IUserFilter } from '../Utilities/Interface/BlotterObjects/IUserFilter';
import { IColumnFilter } from '../Utilities/Interface/BlotterObjects/IColumnFilter';
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IColumnFilterApi } from './Interface/IColumnFilterApi';
import { ColumnFilterState } from '../Redux/ActionsReducers/Interface/IState';

export class ColumnFilterApi extends ApiBase implements IColumnFilterApi {
  public getColumnFilterState(): ColumnFilterState {
    return this.getBlotterState().ColumnFilter;
  }

  public setColumnFilter(columnFilters: IColumnFilter[]): void {
    columnFilters.forEach(columnFilter => {
      if (this.getAllColumnFilter().find(cf => cf.ColumnId == columnFilter.ColumnId)) {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterEdit(columnFilter));
      } else {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterAdd(columnFilter));
      }
    });
  }

  public setColumnFilterFromUserFilter(userFilter: string): void {
    let existingUserFilter: IUserFilter = this.getBlotterState().UserFilter.UserFilters.find(
      uf => uf.Name == userFilter
    );
    if (this.checkItemExists(existingUserFilter, userFilter, 'User Filter')) {
      let columnFilter: IColumnFilter = ObjectFactory.CreateColumnFilterFromUserFilter(
        existingUserFilter
      );
      this.dispatchAction(ColumnFilterRedux.ColumnFilterAdd(columnFilter));
    }
  }

  public clearColumnFilter(columnFilter: IColumnFilter): void {
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

  public getAllColumnFilter(): IColumnFilter[] {
    return this.getBlotterState().ColumnFilter.ColumnFilters;
  }
}
