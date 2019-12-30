import { ApiBase } from './ApiBase';
import { PlusMinusState, PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import { PlusMinusApi } from '../PlusMinusApi';
import { IPlusMinusStrategy } from '../../Strategy/Interface/IPlusMinusStrategy';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { GridCell } from '../../Utilities/Interface/Selection/GridCell';

export class PlusMinusApiImpl extends ApiBase implements PlusMinusApi {
  public getPlusMinusState(): PlusMinusState {
    return this.getAdaptableState().PlusMinus;
  }

  public getAllPlusMinus(): PlusMinusRule[] {
    return this.getPlusMinusState().PlusMinusRules;
  }

  public applyPlusMinus(cellsToUpdate: GridCell[]): void {
    let plusMinusStrategy = <IPlusMinusStrategy>(
      this.adaptable.strategies.get(StrategyConstants.PlusMinusStrategyId)
    );
    //   plusMinusStrategy.applyPlusMinus(this.getAllPlusMinus(),);
  }

  public showPlusMinusPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.PlusMinusStrategyId,
      ScreenPopups.PlusMinusPopup
    );
  }
}
