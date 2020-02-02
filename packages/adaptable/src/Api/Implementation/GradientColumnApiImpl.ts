import { ApiBase } from './ApiBase';
import { GradientColumnApi } from '../GradientColumnApi';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { GradientColumnState, GradientColumn } from '../../PredefinedConfig/GradientColumnState';

export class GradientColumnApiImpl extends ApiBase implements GradientColumnApi {
  public getGradientColumnState(): GradientColumnState {
    return this.getAdaptableState().GradientColumn;
  }

  public getAllGradientColumn(): GradientColumn[] {
    return this.getAdaptableState().GradientColumn.GradientColumns;
  }

  public showGradientColumnPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.GradientColumnStrategyId,
      ScreenPopups.GradientColumnPopup
    );
  }
}
