import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableBlotterColumn } from '../../PredefinedConfig/Common/AdaptableBlotterColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import {
  SortOrder,
  DataType,
  LeafExpressionOperator,
  MessageType,
  DistinctCriteriaPairValue,
} from '../../PredefinedConfig/Common/Enums';
import { IAdaptableBlotter } from '../../BlotterInterfaces/IAdaptableBlotter';
import {
  LayoutState,
  Layout,
  ColumnSort,
  PivotDetails,
  VendorGridInfo,
} from '../../PredefinedConfig/LayoutState';
import { GridState } from '../../PredefinedConfig/GridState';
import {
  ColumnStateChangedEventArgs,
  ColumnStateChangedInfo,
} from '../../Api/Events/BlotterEvents';
import BlotterHelper from '../Helpers/BlotterHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';

import { ILayoutService } from './Interface/ILayoutService';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import ExpressionHelper from '../Helpers/ExpressionHelper';
import StringExtensions from '../Extensions/StringExtensions';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import { IUIConfirmation } from '../Interface/IMessage';

export interface IStrategyService {
  createAlertDescription(
    alertDefinition: AlertDefinition,
    columns: AdaptableBlotterColumn[]
  ): string;

  getDistinctColumnValues(columnId: string): number[];
}
export class StrategyService implements IStrategyService {
  constructor(private blotter: IAdaptableBlotter) {
    this.blotter = blotter;
  }

  public getDistinctColumnValues(columnId: string): number[] {
    let distinctColumnsValues: number[] = this.blotter
      .getColumnValueDisplayValuePairDistinctList(
        columnId,
        DistinctCriteriaPairValue.RawValue,
        false
      )
      .map(pair => {
        return pair.RawValue;
      });

    // filter out any undefined or nulls
    distinctColumnsValues = distinctColumnsValues.filter(i => i);
    return distinctColumnsValues;
  }

  public createAlertDescription(
    alertDefinition: AlertDefinition,
    columns: AdaptableBlotterColumn[]
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
}
