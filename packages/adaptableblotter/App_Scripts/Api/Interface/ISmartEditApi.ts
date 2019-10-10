import { SmartEditState } from '../../PredefinedConfig/RunTimeState/SmartEditState';

export interface ISmartEditApi {
  getSmartEditState(): SmartEditState;
  setSmartEditMathOperation(
    mathOperation: 'Add' | 'Subtract' | 'Multiply' | 'Divide' | 'Replace'
  ): void;
  getSmartEditMathOperation(): string;
  setSmartEditValue(smartEditValue: number): void;
  getSmartEditValue(): number;

  /**
   * Opens the Smart Edit popup screen
   */
  showSmartEditPopup(): void;
}
