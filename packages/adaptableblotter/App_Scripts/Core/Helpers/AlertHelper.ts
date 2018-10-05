import { IAlertDefinition } from '../Api/Interface/IAdaptableBlotterObjects';
import { ExpressionHelper } from './ExpressionHelper';
import { DataType, LeafExpressionOperator } from '../Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { IColumn } from '../Interface/IColumn';
import { ColumnHelper } from './ColumnHelper';

export module AlertHelper {

    export function  createAlertDescription(alertDefinition: IAlertDefinition, columns: IColumn[]): string {

        let dataType: DataType = ColumnHelper.getColumnDataTypeFromColumnId(alertDefinition.ColumnId, columns );
        let valueDescription: string = ExpressionHelper.OperatorToLongFriendlyString(alertDefinition.Range.Operator, dataType);

        if (!ExpressionHelper.OperatorRequiresValue(alertDefinition.Range.Operator)) {
            return valueDescription;
        }
      
        let operand1Text: string = (dataType == DataType.Boolean || dataType == DataType.Number) ?
        alertDefinition.Range.Operand1 :
            "'" + alertDefinition.Range.Operand1 + "'"

        valueDescription = valueDescription + operand1Text;

        if (alertDefinition.Range.Operator == LeafExpressionOperator.PercentChange) {
            valueDescription = valueDescription + '%';
        }

        if (StringExtensions.IsNotNullOrEmpty(alertDefinition.Range.Operand2)) {
            let operand2Text: string = (dataType == DataType.Number) ?
                " and " + alertDefinition.Range.Operand2 :
                " and '" + alertDefinition.Range.Operand2 + "'";
            valueDescription = valueDescription + operand2Text;
        }
        return valueDescription;
    }
}
