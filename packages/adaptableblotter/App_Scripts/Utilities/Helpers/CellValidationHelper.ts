import { ExpressionHelper } from './ExpressionHelper'
import { ICellValidationRule } from "../Interface/BlotterObjects/ICellValidationRule";
import { ColumnHelper } from './ColumnHelper';
import { StringExtensions } from '../Extensions/StringExtensions';
import { IColumn } from '../Interface/IColumn';
import { LeafExpressionOperator, DataType, MessageType } from '../Enums';
import { IUIConfirmation } from '../Interface/IMessage';
import * as Redux from 'redux';



export function createCellValidationDescription(cellValidationRule: ICellValidationRule, columns: IColumn[]): string {
    if (cellValidationRule.Range.Operator == LeafExpressionOperator.PrimaryKeyDuplicate) {
        return "Primary Key column cannot contain duplicate values"
    }
    let valueDescription: string = ExpressionHelper.OperatorToLongFriendlyString(cellValidationRule.Range.Operator, ColumnHelper.getColumnDataTypeFromColumnId(cellValidationRule.ColumnId, columns));

    if (!ExpressionHelper.OperatorRequiresValue(cellValidationRule.Range.Operator)) {
        return valueDescription;
    }
    let dataType: DataType = ColumnHelper.getColumnDataTypeFromColumnId(cellValidationRule.ColumnId, columns);
    let operand1Text: string = (dataType == DataType.Boolean || dataType == DataType.Number) ?
        cellValidationRule.Range.Operand1 :
        "'" + cellValidationRule.Range.Operand1 + "'"

    valueDescription = valueDescription + operand1Text;

    if (cellValidationRule.Range.Operator == LeafExpressionOperator.PercentChange) {
        valueDescription = valueDescription + '%';
    }

    if (StringExtensions.IsNotNullOrEmpty(cellValidationRule.Range.Operand2)) {
        let operand2Text: string = (dataType == DataType.Number) ?
            " and " + cellValidationRule.Range.Operand2 :
            " and '" + cellValidationRule.Range.Operand2 + "'";
        valueDescription = valueDescription + operand2Text;
    }
    return valueDescription;
}


export function createCellValidationUIConfirmation(confirmAction: Redux.Action, cancelAction: Redux.Action, warningMessage: string = "Do you want to continue?"): IUIConfirmation {

    return {
        CancelButtonText: "Cancel Edit",
        Header: "Cell Validation Failed",
        Msg: warningMessage,
        ConfirmButtonText: "Bypass Rule",
        CancelAction: cancelAction,
        ConfirmAction: confirmAction,
        ShowInputBox: true,
        MessageType: MessageType.Warning
    }
}

export const CellValidationHelper = {
    createCellValidationDescription,
    createCellValidationUIConfirmation
}
export default CellValidationHelper