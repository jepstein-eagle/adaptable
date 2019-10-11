import { ApiBase } from './ApiBase';
import { IFlashingCellApi } from './Interface/IFlashingCellApi';
import {
  FlashingCellState,
  FlashingCell,
} from '../PredefinedConfig/RunTimeState/FlashingCellState';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';

export class FlashingCellApi extends ApiBase implements IFlashingCellApi {
  public getFlashingCellState(): FlashingCellState {
    return this.getBlotterState().FlashingCell;
  }

  public getAllFlashingCell(): FlashingCell[] {
    return this.getFlashingCellState().FlashingCells;
  }

  public showFlashingCellPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.FlashingCellsStrategyId,
      ScreenPopups.FlashingCellsPopup
    );
  }
}
