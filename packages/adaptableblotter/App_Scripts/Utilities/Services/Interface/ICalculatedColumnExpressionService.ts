import { DataType } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableBlotterColumn } from '../../../PredefinedConfig/Common/AdaptableBlotterColumn';

export interface ICalculatedColumnExpressionService {
  IsExpressionValid(expression: string): { IsValid: Boolean; ErrorMsg?: string };
  ComputeExpressionValue(expression: string, record: any): any;
  GetCalculatedColumnDataType(expression: string): DataType;
  GetColumnListFromExpression(expression: string): string[];
  CleanExpressionColumnNames(expression: string, columns: AdaptableBlotterColumn[]): string;
  GetExpressionString(expression: string, columns: AdaptableBlotterColumn[]): string;
}
