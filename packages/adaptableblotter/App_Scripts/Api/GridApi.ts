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

  public setColumns(columns: AdaptableBlotterColumn[]): void {
    this.dispatchAction(GridRedux.GridSetColumns(columns));
  }

  public setGridCellBatch(gridCells: GridCell[]): void {
    this.blotter.setValueBatch(gridCells);
  }

  public setMainMenuItems(menuItems: AdaptableBlotterMenuItem[]): void {
    this.dispatchAction(GridRedux.SetMainMenuItems(menuItems));
  }

  public setSelectedCells(selectedCellInfo: SelectedCellInfo): void {
    this.dispatchAction(GridRedux.GridSetSelectedCells(selectedCellInfo));
  }

  public setSelectedRows(selectedRowInfo: SelectedRowInfo): void {
    this.dispatchAction(GridRedux.GridSetSelectedRows(selectedRowInfo));
  }

  public showQuickFilterBar(): void {
    this.dispatchAction(GridRedux.QuickFilterBarShow());
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

  public isGridInPivotMode(): boolean {
    return this.getGridState().IsGridInPivotMode;
  }

  public addAdaptableBlotterColumn(adaptableBlotterColumn: AdaptableBlotterColumn): void {
    this.dispatchAction(GridRedux.GridAddColumn(adaptableBlotterColumn));
  }

  public setColumnSorts(columnSorts: ColumnSort[]): void {
    this.dispatchAction(GridRedux.GridSetSort(columnSorts));
  }
}
