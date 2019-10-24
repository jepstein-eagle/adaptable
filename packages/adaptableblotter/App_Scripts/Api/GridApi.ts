import { ApiBase } from './ApiBase';
import { IGridApi } from './Interface/IGridApi';
import { AdaptableBlotterColumn } from '../Utilities/Interface/AdaptableBlotterColumn';
import { GridState } from '../PredefinedConfig/InternalState/GridState';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { ColumnSort } from '../PredefinedConfig/RunTimeState/LayoutState';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';

export class GridApi extends ApiBase implements IGridApi {
  public getGridState(): GridState {
    return this.getBlotterState().Grid;
  }

  public setGridData(dataSource: any): void {
    this.blotter.setDataSource(dataSource);
  }

  public updateGridData(dataRows: any[]): void {
    this.blotter.updateRows(dataRows);
  }

  public addGridData(dataRows: any[]): void {
    this.blotter.addRows(dataRows);
  }

  public deleteGridData(dataRows: any[]): void {
    this.blotter.deleteRows(dataRows);
  }

  public getColumns(): AdaptableBlotterColumn[] {
    return this.getGridState().Columns;
  }

  public getSelectedCellInfo(): SelectedCellInfo {
    return this.getGridState().SelectedCellInfo;
  }

  public getSelectedRowInfo(): SelectedRowInfo {
    return this.getGridState().SelectedRowInfo;
  }

  public getVisibleColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.Visible);
  }

  public getNumericColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Number);
  }

  public getDateColumns(): AdaptableBlotterColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Date);
  }

  public getColumnSorts(): ColumnSort[] {
    return this.getGridState().ColumnSorts;
  }
}
