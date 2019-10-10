import { ApiBase } from './ApiBase';
import { IChartApi } from './Interface/IChartApi';
import { ChartState } from '../PredefinedConfig/RunTimeState/ChartState';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';

export class ChartApi extends ApiBase implements IChartApi {
  public getChartState(): ChartState {
    return this.getBlotterState().Chart;
  }

  public showChartPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.ChartStrategyId,
      ScreenPopups.ChartPopup
    );
  }
}
