import { ApiBase } from './ApiBase';
import { IGridApi } from './Interface/IGridApi';
import { IColumn } from '../Utilities/Interface/IColumn';
import { GridState } from '../PredefinedConfig/ISystemState/GridState';
import { DataType } from '../PredefinedConfig/Common/Enums';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { ColumnSort } from '../PredefinedConfig/IUserState/LayoutState';

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

  public getSelectedCellInfo(): ISelectedCellInfo {
    return this.getGridState().SelectedCellInfo;
  }

  public getVisibleColumns(): IColumn[] {
    return this.getColumns().filter(c => c.Visible);
  }

  public getNumericColumns(): IColumn[] {
    return this.getColumns().filter(c => c.DataType == DataType.Number);
  }

  public getColumnSorts(): ColumnSort[] {
    return this.getGridState().ColumnSorts;
  }
}
