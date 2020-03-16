import * as GeneralConstants from '../Constants/GeneralConstants';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { ColumnHelper } from '../Helpers/ColumnHelper';
import {
  DataType,
  LeafExpressionOperator,
  DistinctCriteriaPairValue,
} from '../../PredefinedConfig/Common/Enums';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import ExpressionHelper from '../Helpers/ExpressionHelper';
import StringExtensions from '../Extensions/StringExtensions';
import { AdaptableFunctionName, AdaptableMenuItem } from '../../types';
import { IStrategyCollection, IStrategy } from '../../Strategy/Interface/IStrategy';
import Helper from '../Helpers/Helper';

export interface IStrategyService {
  createAlertDescription(alertDefinition: AlertDefinition, columns: AdaptableColumn[]): string;

  getDistinctColumnValues(columnId: string): number[];

  isStrategyAvailable(adaptableFunctionName: AdaptableFunctionName): boolean;

  setStrategiesEntitlements(): void;

  createStrategyFunctionMenu(): void;
}

export class StrategyService implements IStrategyService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  public getDistinctColumnValues(columnId: string): number[] {
    let distinctColumnsValues: number[] = this.adaptable
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
    columns: AdaptableColumn[]
  ): string {
    let dataType:
      | 'String'
      | 'Number'
      | 'NumberArray'
      | 'Boolean'
      | 'Date'
      | 'Object'
      | 'Unknown' = ColumnHelper.getColumnDataTypeFromColumnId(alertDefinition.ColumnId, columns);
    let valueDescription: string = ExpressionHelper.OperatorToLongFriendlyString(
      alertDefinition.Range.Operator as LeafExpressionOperator,
      dataType
    );

    if (
      !ExpressionHelper.OperatorRequiresValue(
        alertDefinition.Range.Operator as LeafExpressionOperator
      )
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

  public setStrategiesEntitlements(): void {
    this.adaptable.strategies.forEach((strat: IStrategy) => {
      strat.setStrategyEntitlement();
    });
  }

  public createStrategyFunctionMenu(): void {
    const menuItems: AdaptableMenuItem[] = [];
    this.adaptable.strategies.forEach((strat: IStrategy) => {
      const menuItem: AdaptableMenuItem | undefined = strat.addFunctionMenuItem();
      if (Helper.objectExists(menuItem)) {
        if (menuItems.findIndex(m => m.FunctionName == menuItem.FunctionName) == -1) {
          menuItems.push(menuItem);
        }
      }
    });
    // store the main menu as we will re-use (and it never changes)
    this.adaptable.api.internalApi.setMainMenuItems(menuItems);
  }

  public isStrategyAvailable(adaptableFunctionName: AdaptableFunctionName): boolean {
    let strategy: IStrategy | undefined = this.adaptable.strategies.get(adaptableFunctionName);
    if (!strategy) {
      return false;
    }
    return strategy.isStrategyAvailable();
  }
}
