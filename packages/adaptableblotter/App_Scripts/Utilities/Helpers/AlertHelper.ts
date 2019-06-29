import { ExpressionHelper } from './ExpressionHelper';
import { ColumnHelper } from './ColumnHelper';
import { DataType, LeafExpressionOperator } from '../../PredefinedConfig/Common/Enums';
import { IColumn } from '../Interface/IColumn';
import { StringExtensions } from '../Extensions/StringExtensions';
import { AlertDefinition } from '../../PredefinedConfig/RunTimeState/AlertState';

export function createAlertDescription(
  alertDefinition: AlertDefinition,
  columns: IColumn[]
): string {
  let dataType: DataType = ColumnHelper.getColumnDataTypeFromColumnId(
    alertDefinition.ColumnId,
    columns
  );
  let valueDescription: string = ExpressionHelper.OperatorToLongFriendlyString(
    alertDefinition.Range.Operator as LeafExpressionOperator,
    dataType
  );

  if (
    !ExpressionHelper.OperatorRequiresValue(alertDefinition.Range
      .Operator as LeafExpressionOperator)
  ) {
    return valueDescription;
  }

  let operand1Text: string =
    dataType == DataType.Boolean || dataType == DataType.Number
      ? alertDefinition.Range.Operand1
      : "'" + alertDefinition.Range.Operand1 + "'";

  valueDescription = valueDescription + operand1Text;

  if (alertDefinition.Range.Operator == LeafExpressionOperator.PercentChange) {
    valueDescription = valueDescription + '%';
  }

  if (StringExtensions.IsNotNullOrEmpty(alertDefinition.Range.Operand2)) {
    let operand2Text: string =
      dataType == DataType.Number
        ? ' and ' + alertDefinition.Range.Operand2
        : " and '" + alertDefinition.Range.Operand2 + "'";
    valueDescription = valueDescription + operand2Text;
  }
  return valueDescription;
}

export const AlertHelper = {
  createAlertDescription,
};
export default AlertHelper;
