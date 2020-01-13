import { ApiBase } from './ApiBase';
import { FlashingCellApi } from '../FlashingCellApi';
import { FlashingCellState, FlashingCell } from '../../PredefinedConfig/FlashingCellState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class FlashingCellApiImpl extends ApiBase implements FlashingCellApi {
  public getFlashingCellState(): FlashingCellState {
    return this.getAdaptableState().FlashingCell;
  }

  public getAllFlashingCell(): FlashingCell[] {
    return this.getFlashingCellState().FlashingCells;
  }

  public showFlashingCellPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.FlashingCellsStrategyId,
      ScreenPopups.FlashingCellsPopup
    );
  }
}
