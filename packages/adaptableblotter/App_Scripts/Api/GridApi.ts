import { ApiBase } from './ApiBase';
import { IGridApi } from './Interface/IGridApi';
import { IColumn } from '../Utilities/Interface/IColumn';
import { GridState } from '../PredefinedConfig/ISystemState Interfaces/GridState';
import { DataType } from '../PredefinedConfig/Common Objects/Enums';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';
import { IColumnSort } from '../PredefinedConfig/IUserState Interfaces/LayoutState';

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

  public getColumnSorts(): IColumnSort[] {
    return this.getGridState().ColumnSorts;
  }
}
