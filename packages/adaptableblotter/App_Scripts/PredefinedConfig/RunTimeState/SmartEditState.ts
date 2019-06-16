import { RunTimeState } from './RunTimeState';
export interface SmartEditState extends RunTimeState {
  SmartEditValue?: number;
  MathOperation?: 'Add' | 'Subtract' | 'Multiply' | 'Divide';
}
