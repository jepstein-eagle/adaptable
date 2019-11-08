import { ApiBase } from './ApiBase';
import { CellSummaryApi } from '../CellSummaryApi';
import { CellSummaryState } from '../../PredefinedConfig/RunTimeState/CellSummaryState';
import {
  CellSummaryOperation,
  CellSummaryOptionalOperation,
} from '../../PredefinedConfig/Common/Enums';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class CellSummaryApiImpl extends ApiBase implements CellSummaryApi {
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

  public showCellSummaryPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.CellSummaryStrategyId,
      ScreenPopups.CellSummaryPopup
    );
  }
}
