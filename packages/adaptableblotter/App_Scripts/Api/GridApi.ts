import { ApiBase } from './ApiBase';
import { IGridApi } from './Interface/IGridApi';
import { IColumn } from '../Utilities/Interface/IColumn';
import { GridState } from '../PredefinedConfig/InternalState/GridState';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../Utilities/Interface/Selection/SelectedCellInfo';
import { ColumnSort } from '../PredefinedConfig/RunTimeState/LayoutState';
import { GridCell } from '../Utilities/Interface/Selection/GridCell';
import { SelectedRowInfo } from '../Utilities/Interface/Selection/SelectedRowInfo';
import * as GridRedux from '../Redux/ActionsReducers/GridRedux';

export class GridApi extends ApiBase implements IGridApi {
  public getGridState(): GridState {
    return this.getBlotterState().Grid;
  }

  public setGridData(dataSource: any): void {
    this.blotter.setGridData(dataSource);
  }

  public getColumns(): IColumn[] {
    return this.getGridState().Columns;
  }

  public getSelectedCellInfo(): SelectedCellInfo {
    return this.getGridState().SelectedCellInfo;
  }

  public getSelectedRowInfo(): SelectedRowInfo {
    return this.getGridState().SelectedRowInfo;
  }

  public getVisibleColumns(): IColumn[] {
    return this.getColumns().filter(c => c.Visible);
  }

  public getNumericColumns(): IColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Number);
  }

  public getDateColumns(): IColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Date);
  }

  public getColumnSorts(): ColumnSort[] {
    return this.getGridState().ColumnSorts;
  }

  public setValue(id: any, columnId: string, newValue: any): void {
    let gridCell: GridCell = {
      primaryKeyValue: id,
      columnId: columnId,
      value: newValue,
    };
    this.setGridCell(gridCell);
  }
  public setGridCell(gridCell: GridCell): void {
    this.blotter.setValue(gridCell);
  }

  public setGridCellBatch(gridCells: GridCell[]): void {
    this.blotter.setValueBatch(gridCells);
  }

  public setGlue42On(): void {
    this.dispatchAction(GridRedux.SetGlue42On());
  }
  public setGlue42Off(): void {
    this.dispatchAction(GridRedux.SetGlue42Off());
  }

  public setPivotModeOn(): void {
    this.dispatchAction(GridRedux.SetPivotModeOn());
  }

  public setPivotModeOff(): void {
    this.dispatchAction(GridRedux.SetPivotModeOff());
  }

  public IsGridInPivotMode(): boolean {
    return this.getGridState().IsGridInPivotMode;
  }
}
