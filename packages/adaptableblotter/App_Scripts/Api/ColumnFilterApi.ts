import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux'
import { ApiBase } from "./ApiBase";
import { IUserFilter, IColumnFilter } from './Interface/IAdaptableBlotterObjects';
import { ObjectFactory } from '../Utilities/ObjectFactory';

export interface IColumnFilterApi {


  // column filter api methods
  columnFilterSet(columnFilters: IColumnFilter[]): void
  columnFilterSetUserFilter(userFilter: string): void
  columnFilterClear(columnFilter: IColumnFilter): void
  columnFilterClearByColumn(column: string): void
  columnFilterClearByColumns(columns: string[]): void
  columnFilterClearAll(): void
  columnFiltersGetCurrent(): IColumnFilter[]
}


export class ColumnFilterApi extends ApiBase implements IColumnFilterApi {

    // filter api methods
    public columnFilterSet(columnFilters: IColumnFilter[]): void {
      columnFilters.forEach(cf => {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(cf))
      })
    }
  
    public columnFilterSetUserFilter(userFilter: string): void {
      let existingUserFilter: IUserFilter = this.getState().UserFilter.UserFilters.find(uf => uf.Name == userFilter);
      if (this.checkItemExists(existingUserFilter, userFilter, "User Filter")) {
        let columnFilter: IColumnFilter = ObjectFactory.CreateColumnFilterFromUserFilter(existingUserFilter)
        this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(columnFilter));
      }
    }
  
    public columnFilterClear(columnFilter: IColumnFilter): void {
      this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(columnFilter.ColumnId));
    }
  
    public columnFilterClearByColumns(columns: string[]): void {
      columns.forEach(c => {
        this.columnFilterClearByColumn(c);
      })
    }
  
    public columnFilterClearByColumn(column: string): void {
      this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(column));
    }
  
    public columnFilterClearAll(): void {
      this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
    }
  
    public columnFiltersGetCurrent(): IColumnFilter[] {
      return this.getState().ColumnFilter.ColumnFilters;
    }



}