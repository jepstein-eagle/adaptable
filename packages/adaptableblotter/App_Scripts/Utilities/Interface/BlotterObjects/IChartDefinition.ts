import { Expression } from '../../Expression';
import { IAdaptableBlotterObject } from './IAdaptableBlotterObject';
import { IChartProperties } from "../IChartProperties";
export interface IChartDefinition extends IAdaptableBlotterObject {
  Title: string;
  SubTitle: string;
  YAxisColumnIds: string[];
  YAxisTotal: 'Sum' | 'Average';
  XAxisColumnId: string;
  XAxisExpression: Expression;
  AdditionalColumnId?: string;
  AdditionalColumnValues?: string[];
  ChartProperties: IChartProperties;
}
