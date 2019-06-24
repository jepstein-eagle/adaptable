import { RunTimeState } from './RunTimeState';
import { AdaptableBlotterObject } from '../AdaptableBlotterObject';
export interface CalculatedColumnState extends RunTimeState {
  CalculatedColumns?: CalculatedColumn[];
}

export interface CalculatedColumn extends AdaptableBlotterObject {
  ColumnId: string;
  ColumnExpression: string;
}

/*
A collection of Calculated Columns.

An ICalculatedColumn consists of just 2 properties:

ColumnId: The name of the Calculated Column (how it will appear in the Column Header)

ColumnExpression: An expression which will retrieve the value - see Calculated Columns for more details.
*/
