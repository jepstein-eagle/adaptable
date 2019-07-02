import { DataType } from '../../../PredefinedConfig/Common/Enums';

export interface ICalculatedColumnExpressionService {
  IsExpressionValid(expression: string): { IsValid: Boolean; ErrorMsg?: string };
  ComputeExpressionValue(expression: string, record: any): any;
  GetCalculatedColumnDataType(expression: string): DataType;
}
