import { ExpressionHelper } from './ExpressionHelper';
import { ColumnHelper } from './ColumnHelper';
import { StringExtensions } from '../Extensions/StringExtensions';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import { LeafExpressionOperator, DataType, MessageType } from '../../PredefinedConfig/Common/Enums';
import { IUIConfirmation } from '../Interface/IMessage';
import * as Redux from 'redux';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';

export function createCellValidationDescription(
  cellValidationRule: CellValidationRule,
  columns: AdaptableBlotterColumn[]
): string {
  if (cellValidationRule.Range.Operator == LeafExpressionOperator.PrimaryKeyDuplicate) {
    return 'Primary Key column cannot contain duplicate values';
  }

  let operator: LeafExpressionOperator = cellValidationRule.Range
    .Operator as LeafExpressionOperator;
  let valueDescription: string = ExpressionHelper.OperatorToLongFriendlyString(
    operator,
    ColumnHelper.getColumnDataTypeFromColumnId(cellValidationRule.ColumnId, columns)
  );

  if (!ExpressionHelper.OperatorRequiresValue(operator)) {
    return valueDescription;
  }
  let dataType: DataType = ColumnHelper.getColumnDataTypeFromColumnId(
    cellValidationRule.ColumnId,
    columns
  );
  let operand1Text: string =
    dataType == DataType.Boolean || dataType == DataType.Number
      ? cellValidationRule.Range.Operand1
      : "'" + cellValidationRule.Range.Operand1 + "'";

  valueDescription = valueDescription + operand1Text;

  if (cellValidationRule.Range.Operator == LeafExpressionOperator.PercentChange) {
    valueDescription = valueDescription + '%';
  }

  if (StringExtensions.IsNotNullOrEmpty(cellValidationRule.Range.Operand2)) {
    let operand2Text: string =
      dataType == DataType.Number
        ? ' and ' + cellValidationRule.Range.Operand2
        : " and '" + cellValidationRule.Range.Operand2 + "'";
    valueDescription = valueDescription + operand2Text;
  }
  return valueDescription;
}

export function createCellValidationUIConfirmation(
  confirmAction: Redux.Action,
  cancelAction: Redux.Action,
  warningMessage: string = 'Do you want to continue?'
): IUIConfirmation {
  return {
    CancelButtonText: 'Cancel Edit',
    Header: 'Cell Validation Failed',
    Msg: warningMessage,
    ConfirmButtonText: 'Bypass Rule',
    CancelAction: cancelAction,
    ConfirmAction: confirmAction,
    ShowInputBox: true,
    MessageType: MessageType.Warning,
  };
}

export const CellValidationHelper = {
  createCellValidationDescription,
  createCellValidationUIConfirmation,
};
export default CellValidationHelper;
