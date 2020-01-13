import { ApiBase } from './ApiBase';
import { ChartApi } from '../ChartApi';
import { ChartState, ChartDefinition } from '../../PredefinedConfig/ChartState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class ChartApiImpl extends ApiBase implements ChartApi {
  public getChartState(): ChartState {
    return this.getAdaptableState().Chart;
  }

  public getAllChartDefinitions(): ChartDefinition[] {
    return this.getChartState().ChartDefinitions;
  }

  public showChartPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ChartStrategyId,
      ScreenPopups.ChartPopup
    );
  }
}
