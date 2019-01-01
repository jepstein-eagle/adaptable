import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux'
import { ApiBase } from "./ApiBase";
import { IUserFilter, IColumnFilter } from './Interface/IAdaptableBlotterObjects';
import { ObjectFactory } from '../Utilities/ObjectFactory';

export interface IColumnFilterApi {


  Set(columnFilters: IColumnFilter[]): void
  SetUserFilter(userFilter: string): void
  Clear(columnFilter: IColumnFilter): void
  ClearByColumn(column: string): void
  ClearByColumns(columns: string[]): void
  ClearAll(): void
  GetCurrent(): IColumnFilter[]
}


export class ColumnFilterApi extends ApiBase implements IColumnFilterApi {

     public Set(columnFilters: IColumnFilter[]): void {
      columnFilters.forEach(cf => {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(cf))
      })
    }
  
    public SetUserFilter(userFilter: string): void {
      let existingUserFilter: IUserFilter = this.getState().UserFilter.UserFilters.find(uf => uf.Name == userFilter);
      if (this.checkItemExists(existingUserFilter, userFilter, "User Filter")) {
        let columnFilter: IColumnFilter = ObjectFactory.CreateColumnFilterFromUserFilter(existingUserFilter)
        this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(columnFilter));
      }
    }
  
    public Clear(columnFilter: IColumnFilter): void {
      this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(columnFilter.ColumnId));
    }
  
    public ClearByColumns(columns: string[]): void {
      columns.forEach(c => {
        this.ClearByColumn(c);
      })
    }
  
    public ClearByColumn(column: string): void {
      this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(column));
    }
  
    public ClearAll(): void {
      this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
    }
  
    public GetCurrent(): IColumnFilter[] {
      return this.getState().ColumnFilter.ColumnFilters;
    }



}