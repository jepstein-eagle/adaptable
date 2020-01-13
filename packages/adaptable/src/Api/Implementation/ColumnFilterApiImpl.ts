import * as ColumnFilterRedux from '../../Redux/ActionsReducers/ColumnFilterRedux';
import { ApiBase } from './ApiBase';
import { ColumnFilterApi } from '../ColumnFilterApi';
import { ColumnFilterState, ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import ExpressionHelper from '../../Utilities/Helpers/ExpressionHelper';

export class ColumnFilterApiImpl extends ApiBase implements ColumnFilterApi {
  public getColumnFilterState(): ColumnFilterState {
    return this.getAdaptableState().ColumnFilter;
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
    let columnFiltersForColumn: ColumnFilter[] | undefined = this.getAllColumnFilterForColumn(
      column
    );
    if (columnFiltersForColumn) {
      columnFiltersForColumn.forEach(cf => {
        this.dispatchAction(ColumnFilterRedux.ColumnFilterClear(cf));
      });
    }
  }

  public clearAllColumnFilter(): void {
    this.dispatchAction(ColumnFilterRedux.ColumnFilterClearAll());
  }

  public getAllColumnFilter(): ColumnFilter[] {
    return this.getAdaptableState().ColumnFilter.ColumnFilters;
  }

  public getAllColumnFilterForColumn(column: string): ColumnFilter[] {
    let columnFilters: ColumnFilter[] | undefined = this.getAdaptableState().ColumnFilter
      .ColumnFilters;
    if (columnFilters) {
      return columnFilters.filter(cf => cf.ColumnId == column);
    } else {
      return [];
    }
  }

  public createColumnFilterForCell(column: string, primarykeyValues: any[]): void {
    let displayValues: any[] = [];
    let rawValues: any[] = [];

    primarykeyValues.forEach(pk => {
      let rowNode = this.adaptable.getRowNodeForPrimaryKey(pk);
      displayValues.push(this.adaptable.getDisplayValueFromRowNode(rowNode, column));
      rawValues.push(this.adaptable.getRawValueFromRowNode(rowNode, column));
    });

    let filter: ColumnFilter = {
      ColumnId: column,
      Filter: ExpressionHelper.CreateSingleColumnExpression(
        column,
        [...new Set(displayValues)],
        [...new Set(rawValues)],
        [],
        []
      ),
    };
    this.setColumnFilter([filter]);
  }
}
