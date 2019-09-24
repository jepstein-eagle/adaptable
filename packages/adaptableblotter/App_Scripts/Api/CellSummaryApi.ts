import { ApiBase } from './ApiBase';
import { ICellSummaryApi } from './Interface/ICellSummaryApi';
import { CellSummaryState } from '../PredefinedConfig/RunTimeState/CellSummaryState';
import {
  CellSummaryOperation,
  CellSummaryOptionalOperation,
} from '../PredefinedConfig/Common/Enums';
import ArrayExtensions from '../Utilities/Extensions/ArrayExtensions';

export class CellSummaryApi extends ApiBase implements ICellSummaryApi {
  public getCellSummaryState(): CellSummaryState {
    return this.getBlotterState().CellSummary;
  }

  public getCellSummaryOperation(): CellSummaryOperation | CellSummaryOptionalOperation {
    return this.getCellSummaryState().SummaryOperation;
  }
  public hasOnlySummary(): boolean {
    return ArrayExtensions.ContainsItem(
      this.getCellSummaryState().OptionalSummaryOperations,
      CellSummaryOptionalOperation.Only
    );
  }
  public hasVWAPSummary(): boolean {
    return ArrayExtensions.ContainsItem(
      this.getCellSummaryState().OptionalSummaryOperations,
      CellSummaryOptionalOperation.VWAP
    );
  }
}
