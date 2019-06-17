import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface CalculatedColumnState extends RunTimeState {
  CalculatedColumns?: CalculatedColumn[];
}

export interface CalculatedColumn extends AdaptableBlotterObject {
  ColumnId: string;
  ColumnExpression: string;
}
