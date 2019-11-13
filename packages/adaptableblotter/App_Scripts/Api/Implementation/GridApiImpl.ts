import { ApiBase } from './ApiBase';
import { DataGridApi } from '../DataGridApi';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { GridState } from '../../PredefinedConfig/GridState';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { SelectedCellInfo } from '../../Utilities/Interface/Selection/SelectedCellInfo';
import { ColumnSort } from '../../PredefinedConfig/LayoutState';
import { SelectedRowInfo } from '../../Utilities/Interface/Selection/SelectedRowInfo';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';

export class GridApiImpl extends ApiBase implements DataGridApi {
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
    this.blotter.api.internalApi.setGridCell(gridCell);
  }
}
