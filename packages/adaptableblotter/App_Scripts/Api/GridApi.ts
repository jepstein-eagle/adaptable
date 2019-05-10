import { ApiBase } from './ApiBase';
import { IGridApi } from './Interface/IGridApi';
import { IColumn } from '../Utilities/Interface/IColumn';
import { GridState } from '../Redux/ActionsReducers/Interface/IState';
import { DataType } from '../Utilities/Enums';
import { IGridSort } from '../Utilities/Interface/IGridSort';
import { ISelectedCellInfo } from '../Utilities/Interface/SelectedCell/ISelectedCellInfo';

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

  public getGridSorts(): IGridSort[] {
    return this.getGridState().GridSorts;
  }
}
