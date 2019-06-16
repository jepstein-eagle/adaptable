import { RunTimeState } from './RunTimeState';
import { IAdaptableBlotterObject } from '../IAdaptableBlotterObject';
export interface CalculatedColumnState extends RunTimeState {
  CalculatedColumns?: CalculatedColumn[];
}

export interface CalculatedColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  ColumnExpression: string;
}
