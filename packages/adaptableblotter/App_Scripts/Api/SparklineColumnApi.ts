import { ApiBase } from './ApiBase';
import { ISparklineColumnApi } from './Interface/ISparklineColumnApi';
import {
  SparklineColumnState,
  SparklineColumn,
} from '../PredefinedConfig/DesignTimeState/SparklineColumnState';

export class SparklineColumnApi extends ApiBase implements ISparklineColumnApi {
  public getSparklineColumnState(): SparklineColumnState {
    return this.getBlotterState().SparklineColumn;
  }

  public getAllSparklineColumn(): SparklineColumn[] {
    let sparklineColumns: SparklineColumn[] | undefined = this.getBlotterState().SparklineColumn
      .Columns;
    if (sparklineColumns == undefined) {
      sparklineColumns = [];
    }
    return sparklineColumns;
  }
}
