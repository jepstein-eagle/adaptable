import { ApiBase } from './ApiBase';
import { ChartApi } from '../ChartApi';
import { ChartState } from '../../PredefinedConfig/RunTimeState/ChartState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class ChartApiImpl extends ApiBase implements ChartApi {
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
