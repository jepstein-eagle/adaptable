import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
export interface ICalculatedColumn extends IAdaptableBlotterObject {
  ColumnId: string;
  ColumnExpression: string;
}
