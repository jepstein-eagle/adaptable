import { KeyValuePair } from '../Interface/KeyValuePair';
import { LeafExpressionOperator, DataType } from '../../PredefinedConfig/Common/Enums';
import { StringExtensions } from '../Extensions/StringExtensions';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
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
export function GetBooleanOperatorPairs(): KeyValuePair[] {
  return [
    { Key: '1', Value: LeafExpressionOperator.IsTrue },
    { Key: '0', Value: LeafExpressionOperator.IsFalse },
    { Key: 'y', Value: LeafExpressionOperator.IsTrue },
    { Key: 'n', Value: LeafExpressionOperator.IsFalse },
    { Key: 'T', Value: LeafExpressionOperator.IsTrue },
    { Key: 'F', Value: LeafExpressionOperator.IsFalse },
    { Key: 'True', Value: LeafExpressionOperator.IsTrue },
    { Key: 'False', Value: LeafExpressionOperator.IsFalse },
  ];
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

function IsStandaloneOperator(
  operator:
    | 'None'
    | 'GreaterThan'
    | 'LessThan'
    | 'Equals'
    | 'NotEquals'
    | 'GreaterThanOrEqual'
    | 'LessThanOrEqual'
    | 'Between'
    | 'Contains'
    | 'NotContains'
    | 'StartsWith'
    | 'EndsWith'
    | 'Regex'
    | 'AnyChange'
    | 'ValueChange'
    | 'PercentChange'
    | 'NotBetween'
    | 'IsPositive'
    | 'IsNegative'
    | 'IsNotNumber'
    | 'IsTrue'
    | 'IsFalse'
    | 'NoDuplicateValues'
    | 'ExistingValuesOnly'
    | 'PrimaryKeyDuplicate'
): boolean {
  switch (operator) {
    case LeafExpressionOperator.AnyChange:
    case LeafExpressionOperator.ExistingValuesOnly:
    case LeafExpressionOperator.IsFalse:
    case LeafExpressionOperator.IsNegative:
    case LeafExpressionOperator.IsNotNumber:
    case LeafExpressionOperator.IsPositive:
    case LeafExpressionOperator.IsTrue:
    case LeafExpressionOperator.PrimaryKeyDuplicate:
      return true;
    default:
      return false;
  }
}

export function IsColumnAppropriateForRange(range: QueryRange, column: AdaptableColumn): boolean {
  if (!range) {
    return true;
  }
  if (column.DataType == DataType.Number) {
    if (range.Operand1 && isNaN(Number(range.Operand1))) {
      return false;
    }
    let tet: LeafExpressionOperator[] = GetNumberOperatorPairs().map(kvp => {
      return kvp.Value;
    });
    if (ArrayExtensions.ContainsItem(tet, range.Operator)) {
      return true;
    }
  } else if (column.DataType == DataType.Date) {
    let tet: LeafExpressionOperator[] = GetDateOperatorPairs().map(kvp => {
      return kvp.Value;
    });
    if (ArrayExtensions.ContainsItem(tet, range.Operator)) {
      return true;
    }
  } else if (column.DataType == DataType.String) {
    let tet: LeafExpressionOperator[] = GetStringOperatorPairs().map(kvp => {
      return kvp.Value;
    });
    if (ArrayExtensions.ContainsItem(tet, range.Operator)) {
      return true;
    }
  } else if (column.DataType == DataType.Boolean) {
    let tet: LeafExpressionOperator[] = GetBooleanOperatorPairs().map(kvp => {
      return kvp.Value;
    });
    if (ArrayExtensions.ContainsItem(tet, range.Operator)) {
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
  GetBooleanOperatorPairs,
  CreateValueRangeFromOperand,
  IsColumnAppropriateForRange,
  IsStandaloneOperator,
};
export default RangeHelper;
