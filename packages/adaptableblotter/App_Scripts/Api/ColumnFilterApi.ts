import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux'
import { ApiBase } from "./ApiBase";
import { IUserFilter } from "../Utilities/Interface/BlotterObjects/IUserFilter";
import { IColumnFilter } from "../Utilities/Interface/BlotterObjects/IColumnFilter";
import { ObjectFactory } from '../Utilities/ObjectFactory';
import { IColumnFilterApi } from './Interface/IColumnFilterApi';
import { ColumnFilterState } from '../Redux/ActionsReducers/Interface/IState';



export class ColumnFilterApi extends ApiBase implements IColumnFilterApi {

     
  public GetState(): ColumnFilterState {
    return this.getBlotterState().ColumnFilter;
}


public Set(columnFilters: IColumnFilter[]): void {
      columnFilters.forEach(cf => {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterAddUpdate(cf))
      })
    }
  
    public SetFromUserFilter(userFilter: string): void {
      let existingUserFilter: IUserFilter = this.getBlotterState().UserFilter.UserFilters.find(uf => uf.Name == userFilter);
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
  
    public GetAll(): IColumnFilter[] {
      return this.getBlotterState().ColumnFilter.ColumnFilters;
    }



}