import { ApiBase } from './ApiBase';
import { ICellSummaryApi } from './Interface/ICellSummaryApi';
import { CellSummaryState } from '../PredefinedConfig/RunTimeState/CellSummaryState';

export class CellSummaryApi extends ApiBase implements ICellSummaryApi {
  public getCellSummaryState(): CellSummaryState {
    return this.getBlotterState().CellSummary;
  }
}
