import { ApiBase } from './ApiBase';
import { ISparklineColumnApi } from '../Interface/ISparklineColumnApi';
import {
  SparklineColumnState,
  SparklineColumn,
} from '../../PredefinedConfig/DesignTimeState/SparklineColumnState';

export class SparklineColumnApi extends ApiBase implements ISparklineColumnApi {
  public getSparklineColumnState(): SparklineColumnState {
    return this.getBlotterState().SparklineColumn;
  }

  public getAllSparklineColumn(): SparklineColumn[] {
    let sparklineColumns: SparklineColumn[] | undefined = this.getBlotterState().SparklineColumn
      .SparklineColumns;
    if (sparklineColumns == undefined) {
      sparklineColumns = [];
    }
    return sparklineColumns;
  }

  public isSparklineColumn(colId: string): boolean {
    return this.getAllSparklineColumn().find(sc => sc.ColumnId === colId) != null;
  }
}
