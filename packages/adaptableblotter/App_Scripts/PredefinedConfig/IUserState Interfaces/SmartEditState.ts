import { IUserState } from '../Interfaces/IUserState';
export interface SmartEditState extends IUserState {
  SmartEditValue?: number;
  MathOperation?: 'Add' | 'Subtract' | 'Multiply' | 'Divide';
}
