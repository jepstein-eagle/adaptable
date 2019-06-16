import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface CalculatedColumnState extends IUserState {
  CalculatedColumns?: CalculatedColumn[];
}

export interface CalculatedColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  ColumnExpression: string;
}
