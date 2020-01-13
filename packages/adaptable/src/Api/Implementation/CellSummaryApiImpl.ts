import { ApiBase } from './ApiBase';
import { CellSummaryApi } from '../CellSummaryApi';
import { CellSummaryState } from '../../PredefinedConfig/CellSummaryState';
import { CellSummaryOperation } from '../../PredefinedConfig/Common/Enums';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class CellSummaryApiImpl extends ApiBase implements CellSummaryApi {
  public getCellSummaryState(): CellSummaryState {
    return this.getAdaptableState().CellSummary;
  }

  public getCellSummaryOperation(): CellSummaryOperation | string {
    return this.getCellSummaryState().SummaryOperation;
  }

  public showCellSummaryPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.CellSummaryStrategyId,
      ScreenPopups.CellSummaryPopup
    );
  }
}
