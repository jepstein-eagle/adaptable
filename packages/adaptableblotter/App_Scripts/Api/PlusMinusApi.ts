import { PlusMinusState, PlusMinusRule } from '../PredefinedConfig/RunTimeState/PlusMinusState';

export interface PlusMinusApi {
  getPlusMinusState(): PlusMinusState;
  getAllPlusMinus(): PlusMinusRule[];

  /**
   * Opens the Plus Minus popup screen
   */
  showPlusMinusPopup(): void;
}
