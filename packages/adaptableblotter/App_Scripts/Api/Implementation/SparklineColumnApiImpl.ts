import { ApiBase } from './ApiBase';
import { SparklineColumnApi } from '../SparklineColumnApi';
import { SparklineColumnState, SparklineColumn } from '../../PredefinedConfig/SparklineColumnState';

export class SparklineColumnApiImpl extends ApiBase implements SparklineColumnApi {
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
