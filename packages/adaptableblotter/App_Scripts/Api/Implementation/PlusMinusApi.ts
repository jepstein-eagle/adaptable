import { ApiBase } from './ApiBase';
import { PlusMinusState, PlusMinusRule } from '../../PredefinedConfig/RunTimeState/PlusMinusState';
import { IPlusMinusApi } from '../Interface/IPlusMinusApi';
import { IPlusMinusStrategy } from '../../Strategy/Interface/IPlusMinusStrategy';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';

export class PlusMinusApi extends ApiBase implements IPlusMinusApi {
  public getPlusMinusState(): PlusMinusState {
    return this.getBlotterState().PlusMinus;
  }

  public getAllPlusMinus(): PlusMinusRule[] {
    return this.getPlusMinusState().PlusMinusRules;
  }

  public applyPlusMinus(cellsToUpdate: GridCell[]): void {
    let plusMinusStrategy = <IPlusMinusStrategy>(
      this.blotter.strategies.get(StrategyConstants.PlusMinusStrategyId)
    );
    //   plusMinusStrategy.applyPlusMinus(this.getAllPlusMinus(),);
  }

  public showPlusMinusPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.PlusMinusStrategyId,
      ScreenPopups.PlusMinusPopup
    );
  }
}
