import { KeyValuePair } from '../Interface/KeyValuePair';
import { LeafExpressionOperator, DataType } from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { AdaptableBlotterColumn } from '../Interface/AdaptableBlotterColumn';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { QueryRange } from '../../PredefinedConfig/Common/Expression';

export function CreateValueRange(
  operator: LeafExpressionOperator,
  operand1: any,
  operand2: any
): QueryRange {
  return {
    Operator: operator,
    Operand1: operand1 == null ? null : operand1.trim(),
    Operand2: operand2 == null ? null : operand2.trim(),
    Operand1Type: 'Value',
    Operand2Type: 'Value',
  };
}
export function GetNumberOperatorPairs(): KeyValuePair[] {
  return [
    { Key: '<>', Value: LeafExpressionOperator.NotEquals },
    { Key: '>=', Value: LeafExpressionOperator.GreaterThanOrEqual },
    { Key: '<=', Value: LeafExpressionOperator.LessThanOrEqual },
    { Key: '>', Value: LeafExpressionOperator.GreaterThan },
    { Key: '<', Value: LeafExpressionOperator.LessThan },
    { Key: '=', Value: LeafExpressionOperator.Equals },
    { Key: ':', Value: LeafExpressionOperator.Between },
    { Key: '%', Value: LeafExpressionOperator.Contains },
    { Key: '*', Value: LeafExpressionOperator.StartsWith },
    { Key: '!', Value: LeafExpressionOperator.NotContains },
  ];
}

export function GetStringOperatorPairs(): KeyValuePair[] {
  return [
    { Key: '*', Value: LeafExpressionOperator.StartsWith },
    { Key: '%', Value: LeafExpressionOperator.Contains },
    { Key: '!', Value: LeafExpressionOperator.NotContains },
    { Key: '=', Value: LeafExpressionOperator.Equals },
  ];
}
export function GetDateOperatorPairs(): KeyValuePair[] {
  return [];
}

export function CreateValueRangeFromOperand(rangeText: string): QueryRange {
  // if its empty then return null
  if (StringExtensions.IsNullOrEmpty(rangeText)) {
    return null;
  }

  // next check to see if there is an operator
  let operatorText: string = getSingleOperatorFromOperandText(rangeText);

  // if there is no operator then its a simple contains range
  if (StringExtensions.IsNullOrEmpty(operatorText)) {
    return CreateValueRange(LeafExpressionOperator.Contains, rangeText, null);
  }

  // we have an operator: so lets get the operand text
  let operandText: string = rangeText.replace(operatorText, '').trim();

  //first check that its not ONLY an operator - if so then return null
  if (StringExtensions.IsNullOrEmpty(operandText)) {
    return null;
  }

  // we have an operator AND text so create the appropriate range
  // NOTE:  This fails unless the text is > 5.  not working for 5:7 at the moment..

  let opKVP: KeyValuePair = GetNumberOperatorPairs().find(kvp => kvp.Key == operatorText);
  if (opKVP == null) {
    // no number so lets try a string -- not sure we need this now as all strings are in numbers (need to rethink that)
    opKVP = GetStringOperatorPairs().find(kvp => kvp.Key == operatorText);
  }
  return opKVP ? CreateValueRange(opKVP.Value, operandText, null) : null;
}

function getSingleOperatorFromOperandText(operandText: string): string {
  let trimmedOperand = operandText.trim();

  let returnOperand: string = '';

  GetNumberOperatorPairs().forEach(op => {
    if (StringExtensions.IsNullOrEmpty(returnOperand)) {
      if (trimmedOperand.includes(op.Key)) {
        returnOperand = op.Key;
      }
    }
  });

  GetStringOperatorPairs().forEach(op => {
    if (StringExtensions.IsNullOrEmpty(returnOperand)) {
      if (trimmedOperand.includes(op.Key)) {
        returnOperand = op.Key;
      }
    }
  });
  return returnOperand;
}

export function IsColumnAppropriateForRange(
  operator: LeafExpressionOperator,
  column: AdaptableBlotterColumn
): boolean {
  if (operator == LeafExpressionOperator.Contains) {
    return true;
  }

  // if its a number operator check if its a number column
  if (column.DataType == DataType.Number) {
    let tet: LeafExpressionOperator[] = GetNumberOperatorPairs().map(kvp => {
      return kvp.Value;
    });
    if (ArrayExtensions.ContainsItem(tet, operator)) {
      return true;
    }
  }

  // if its a string operator check if its a string column
  if (column.DataType == DataType.String) {
    let tet: LeafExpressionOperator[] = GetStringOperatorPairs().map(kvp => {
      return kvp.Value;
    });
    if (ArrayExtensions.ContainsItem(tet, operator)) {
      return true;
    }
  }
  return false;
}
export const RangeHelper = {
  CreateValueRange,
  GetNumberOperatorPairs,
  GetStringOperatorPairs,
  GetDateOperatorPairs,
  CreateValueRangeFromOperand,
  IsColumnAppropriateForRange,
};
export default RangeHelper;
