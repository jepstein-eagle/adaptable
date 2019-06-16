import { IUserState } from './IUserState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface CalculatedColumnState extends IUserState {
  CalculatedColumns?: ICalculatedColumn[];
}

export interface ICalculatedColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  ColumnExpression: string;
}
