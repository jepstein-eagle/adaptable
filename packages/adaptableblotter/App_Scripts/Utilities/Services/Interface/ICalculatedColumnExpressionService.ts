import { DataType } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';

export interface ICalculatedColumnExpressionService {
  IsExpressionValid(expression: string): { IsValid: Boolean; ErrorMsg?: string };
  ComputeExpressionValue(expression: string, record: any): any;
  GetCalculatedColumnDataType(expression: string): DataType;
  GetColumnListFromExpression(expression: string): string[];
  CleanExpressionColumnNames(expression: string, columns: AdaptableColumn[]): string;
  GetExpressionString(expression: string, columns: AdaptableColumn[]): string;
}
