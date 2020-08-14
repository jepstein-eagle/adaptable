import {
  LeafExpressionOperator,
  DataType,
  DistinctCriteriaPairValue,
  RangeOperandType,
} from '../../PredefinedConfig/Common/Enums';

import {
  Expression,
  QueryRange,
  ColumnValueExpression,
  RangeExpression,
  FilterExpression,
} from '../../PredefinedConfig/Common/Expression';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { StringExtensions } from '../Extensions/StringExtensions';
import { IAdaptable } from '../../AdaptableInterfaces/IAdaptable';
import { LoggingHelper } from './LoggingHelper';
import { ArrayExtensions } from '../Extensions/ArrayExtensions';
import { ObjectFactory } from '../ObjectFactory';
import { IRawValueDisplayValuePair } from '../../View/UIInterfaces';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { NamedFilter } from '../../PredefinedConfig/NamedFilterState';
import Helper from './Helper';
import RangeHelper from './RangeHelper';
import Adaptable from '../../agGrid';
import { AdaptableApi } from '../../Api/AdaptableApi';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { FilterPredicate } from '../../AdaptableOptions/FilterPredicates';

export interface IRangeEvaluation {
  operand1: any;
  operand2: any;
  newValue: any;
  operator: LeafExpressionOperator;
  initialValue: any;
  columnId: string;
}

/**
 * This is the main Helper class dealing with Expressions (a.k.a. Queries)
 * This class allows you to create and evalute (i.e. see if they are satisfied) Expressions and represent them as strings
 */

// Creates a very basic expression containing just a single colum (Expressions can contain theoretically multiple columns)
export function CreateSingleColumnExpression(
  columnId: string,
  columnDisplayValues: Array<string>,
  columnRawValues: Array<string>,
  userFilters: Array<string>,
  ranges: Array<QueryRange>
) {
  return new Expression(
    (columnDisplayValues && columnDisplayValues.length > 0) ||
    (columnRawValues && columnRawValues.length > 0)
      ? [
          {
            ColumnId: columnId,
            ColumnDisplayValues: columnDisplayValues,
            ColumnRawValues: columnRawValues,
          },
        ]
      : [],
    userFilters && userFilters.length > 0 ? [{ ColumnId: columnId, Filters: userFilters }] : [],
    ranges && ranges.length > 0 ? [{ ColumnId: columnId, Ranges: ranges }] : []
  );
}

// Converts an Expression to a readable string - used in display boxes
export function ConvertExpressionToString(
  Expression: Expression,
  api: AdaptableApi,
  includeColumnName: boolean = true
): string {
  let returnValue = '';
  if (IsNullOrEmptyExpression(Expression)) {
    return 'Any';
  }

  let columnList = GetColumnListFromExpression(Expression);
  for (let columnId of columnList) {
    let columnFriendlyName: string = api.gridApi.getFriendlyNameFromColumnId(columnId);
    let columnToString = '';

    // Column Display Values
    if (ArrayExtensions.IsNotNullOrEmpty(Expression.ColumnValueExpressions)) {
      let columnValueExpression: ColumnValueExpression = Expression.ColumnValueExpressions.find(
        x => x.ColumnId == columnId
      );
      if (columnValueExpression) {
        columnToString = ColumnValueExpressionToString(
          columnValueExpression,
          columnFriendlyName,
          includeColumnName
        );
      }
    }

    // User Filters
    if (ArrayExtensions.IsNotNullOrEmpty(Expression.FilterExpressions)) {
      let columnUserFilters = Expression.FilterExpressions.find(x => x.ColumnId == columnId);
      if (columnUserFilters) {
        if (columnToString != '') {
          columnToString += ' OR ';
        }
        columnToString += UserFiltersToString(
          columnUserFilters.Filters,
          columnFriendlyName,
          includeColumnName
        );
      }
    }

    // Column Ranges
    if (ArrayExtensions.IsNotNullOrEmpty(Expression.RangeExpressions)) {
      let columnRange: RangeExpression = Expression.RangeExpressions.find(
        x => x.ColumnId == columnId
      );
      if (columnRange) {
        if (columnToString != '') {
          columnToString += ' OR ';
        }
        let columns = api.gridApi.getColumns();
        columnToString += RangesToString(
          columnRange,
          columnFriendlyName,
          columns,
          api,
          includeColumnName
        );
      }
    }
    if (returnValue != '') {
      returnValue += ' AND ';
    }
    if (includeColumnName) {
      returnValue += '(';
    }
    returnValue += columnToString;

    if (includeColumnName) {
      returnValue += ')';
    }
  }
  return returnValue;
}

// Converts a QueryRange to a readable string
export function ConvertRangeToString(range: QueryRange, columns: AdaptableColumn[]): string {
  if (RangeHelper.IsStandaloneOperator(range.Operator)) {
    return range.Operator;
  }
  let returnValue: string = range.Operator + ' ' + range.Operand1;
  if (StringExtensions.IsNotNullOrEmpty(range.Operand2)) {
    returnValue += range.Operand2;
  }
  return returnValue;
}

export function checkForExpression(
  Expression: Expression,
  identifierValue: any,
  columns: AdaptableColumn[],
  adaptable: IAdaptable
): boolean {
  return IsSatisfied(
    Expression,
    adaptable.getRowNodeIsSatisfiedFunction(identifierValue, DistinctCriteriaPairValue.RawValue), // this value raw
    adaptable.getRowNodeIsSatisfiedFunction(
      identifierValue,
      DistinctCriteriaPairValue.DisplayValue
    ), // this value display
    adaptable.getRowNodeIsSatisfiedFunction(identifierValue, DistinctCriteriaPairValue.RawValue), // other column value
    columns,
    adaptable.api.userFilterApi.getAllUserFilter(),
    adaptable.api.systemFilterApi.getAllSystemFilter(),
    adaptable.api.namedFilterApi.getAllNamedFilter(),
    adaptable
  );
}

export function checkForExpressionFromRowNode(
  Expression: Expression,
  rowNode: any,
  columns: AdaptableColumn[],
  adaptable: IAdaptable
): boolean {
  return IsSatisfied(
    Expression,
    adaptable.getRowNodeIsSatisfiedFunctionFromRowNode(rowNode, DistinctCriteriaPairValue.RawValue), // this value
    adaptable.getRowNodeIsSatisfiedFunctionFromRowNode(
      rowNode,
      DistinctCriteriaPairValue.DisplayValue
    ), // this value
    adaptable.getRowNodeIsSatisfiedFunctionFromRowNode(rowNode, DistinctCriteriaPairValue.RawValue), // other column value
    columns,
    adaptable.api.userFilterApi.getAllUserFilter(),
    adaptable.api.systemFilterApi.getAllSystemFilter(),
    adaptable.api.namedFilterApi.getAllNamedFilter(),
    adaptable,
    rowNode
  );
}

// The main function that evaluates whether a row meets an Expression
export function IsSatisfied(
  Expression: Expression,
  getColumnValue: (columnId: string) => any,
  getDisplayColumnValue: (columnId: string) => string,
  getOtherColumnValue: (columnId: string) => any,
  columnadaptableList: AdaptableColumn[],
  userFilters: UserFilter[],
  systemFilters: string[],
  namedFilters: NamedFilter[],
  adaptable: IAdaptable,
  rowNode?: any
): boolean {
  let expressionColumnList = GetColumnListFromExpression(Expression);
  for (let columnId of expressionColumnList) {
    let columnValue = getColumnValue(columnId);

    //we need either a column value or user filter expression or range to match the column
    let isColumnSatisfied = false;

    let column = columnadaptableList.find(x => x.ColumnId == columnId);
    if (!column) {
      LoggingHelper.LogAdaptableWarning('Could not find column id:' + columnId);
      isColumnSatisfied = true;
    }

    // check for display column values
    if (!isColumnSatisfied && ArrayExtensions.IsNotNullOrEmpty(Expression.ColumnValueExpressions)) {
      let columnValues = Expression.ColumnValueExpressions.find(x => x.ColumnId == columnId);
      if (columnValues) {
        let columnDisplayValue = getDisplayColumnValue(columnValues.ColumnId);
        isColumnSatisfied = ArrayExtensions.ContainsItem(
          columnValues.ColumnDisplayValues,
          columnDisplayValue
        );
      }
    }

    // Check for filter expressions if column fails
    if (!isColumnSatisfied && ArrayExtensions.IsNotNullOrEmpty(Expression.FilterExpressions)) {
      let filtersForColumn: FilterExpression = Expression.FilterExpressions.find(
        x => x.ColumnId == columnId
      );
      if (filtersForColumn) {
        // first evaluate any user filters
        let filteredUserFilters: UserFilter[] = adaptable.FilterService.GetUserFilters(
          userFilters,
          filtersForColumn.Filters
        );
        for (let userFilter of filteredUserFilters) {
          isColumnSatisfied = IsSatisfied(
            userFilter.Expression,
            getColumnValue,
            getDisplayColumnValue,
            getOtherColumnValue,
            columnadaptableList,
            userFilters,
            systemFilters,
            namedFilters,
            adaptable
          );
          if (isColumnSatisfied) {
            break;
          }
        }

        // then evaluate any system filters
        if (!isColumnSatisfied) {
          let filteredSystemFilters: string[] = systemFilters.filter(
            f => filtersForColumn.Filters.find(u => u == f) != null
          );
          for (let systemFilter of filteredSystemFilters) {
            let satisfyFunction: any = adaptable.FilterService.GetFunctionForSystemFilter(
              systemFilter
            );
            isColumnSatisfied = satisfyFunction.IsExpressionSatisfied(columnValue, adaptable);
            if (isColumnSatisfied) {
              break;
            }
          }
        }

        // then evaluate any named filters
        if (!isColumnSatisfied) {
          let filteredNamedFilters: NamedFilter[] = namedFilters.filter(f =>
            filtersForColumn.Filters.find(u => u == f.Name)
          );
          for (let namedFilter of filteredNamedFilters) {
            // see if there is a predicate function in the object itself - the new way
            let satisfyFunction = adaptable.getUserFunctionHandler(
              'NamedFilterPredicate',
              namedFilter.FilterPredicate
            );
            if (satisfyFunction) {
              isColumnSatisfied = satisfyFunction(rowNode, columnId, columnValue);
              if (isColumnSatisfied) {
                break;
              }
            }
          }
        }
      }
    }

    // Check for ranges if column and user filter expressions have failed
    if (!isColumnSatisfied && ArrayExtensions.IsNotNullOrEmpty(Expression.RangeExpressions)) {
      let columnRanges = Expression.RangeExpressions.find(x => x.ColumnId == columnId);
      if (columnRanges) {
        let column = columnadaptableList.find(x => x.ColumnId == columnRanges.ColumnId);
        let colValue = getColumnValue(columnRanges.ColumnId);
        for (let range of columnRanges.Ranges) {
          let rangeEvaluation: IRangeEvaluation = ExpressionHelper.GetRangeEvaluation(
            range,
            colValue,
            null,
            column,
            adaptable,
            getOtherColumnValue
          );

          isColumnSatisfied = ExpressionHelper.TestRangeEvaluation(rangeEvaluation, adaptable);
          if (isColumnSatisfied) {
            break;
          }
        }
      }
    }
    if (!isColumnSatisfied) {
      return false;
    }
  }
  return true;
}

function ColumnValueExpressionToString(
  columnValueExpression: ColumnValueExpression,
  columnFriendlyName: string,
  includeColumnName: boolean
): string {
  let returnValue = '';
  if (includeColumnName) {
    returnValue += '[' + columnFriendlyName + ']';
  }
  if (
    columnValueExpression !== undefined &&
    columnValueExpression.ColumnDisplayValues !== undefined &&
    columnValueExpression.ColumnDisplayValues.length > 0
  ) {
    returnValue += ' In (' + columnValueExpression.ColumnDisplayValues.join(', ') + ')';
  }
  return returnValue;
}

function UserFiltersToString(
  userFilters: string[],
  columnFriendlyName: string,
  includeColumnName: boolean
): string {
  let returnValue = '';
  for (let userFilter of userFilters) {
    if (returnValue != '') {
      returnValue += ' OR ';
    }
    if (includeColumnName) {
      returnValue += '[' + columnFriendlyName + '] ';
    }
    returnValue += userFilter;
  }
  return returnValue;
}

function RangesToString(
  rangeExpression: RangeExpression,
  columnFriendlyName: string,
  columns: AdaptableColumn[],
  api: AdaptableApi,
  includeColumnName: boolean
): string {
  let returnValue = '';
  for (let range of rangeExpression.Ranges) {
    if (returnValue != '') {
      returnValue += ' OR ';
    }
    let operator = range.Operator as LeafExpressionOperator;
    if (RangeHelper.IsStandaloneOperator(range.Operator)) {
      returnValue = OperatorToShortFriendlyString(operator);
    } else {
      if (operator == LeafExpressionOperator.Between) {
        if (includeColumnName) {
          returnValue += '[' + columnFriendlyName + '] ';
        }
        returnValue +=
          OperatorToShortFriendlyString(operator) +
          ' ' +
          getOperandValue(range.Operand1Type, range.Operand1, columns, api) +
          ' AND ' +
          getOperandValue(range.Operand2Type, range.Operand2, columns, api);
      } else {
        if (includeColumnName) {
          returnValue += '[' + columnFriendlyName + '] ';
        }
        returnValue +=
          OperatorToShortFriendlyString(operator) +
          ' ' +
          getOperandValue(range.Operand1Type, range.Operand1, columns, api);
      }
    }
  }
  return returnValue;
}

export function OperatorToOneCharacterString(operator: LeafExpressionOperator): string {
  switch (operator) {
    case LeafExpressionOperator.GreaterThan:
      return '>';
    case LeafExpressionOperator.LessThan:
      return '<';
    case LeafExpressionOperator.Equals:
      return '=';
    case LeafExpressionOperator.NotEquals:
      return '<>';
    case LeafExpressionOperator.GreaterThanOrEqual:
      return '>=';
    case LeafExpressionOperator.LessThanOrEqual:
      return '<=';
    case LeafExpressionOperator.Between:
      return 'In';
    case LeafExpressionOperator.Contains:
      return 'C';
    case LeafExpressionOperator.NotContains:
      return '!C';
    case LeafExpressionOperator.StartsWith:
      return 'S';
    case LeafExpressionOperator.EndsWith:
      return 'E';
    case LeafExpressionOperator.Regex:
      return 'R';
  }
}

export function OperatorToShortFriendlyString(operator: LeafExpressionOperator): string {
  switch (operator) {
    case LeafExpressionOperator.GreaterThan:
      return '>';
    case LeafExpressionOperator.LessThan:
      return '<';
    case LeafExpressionOperator.Equals:
      return '=';
    case LeafExpressionOperator.NotEquals:
      return '<>';
    case LeafExpressionOperator.GreaterThanOrEqual:
      return '>=';
    case LeafExpressionOperator.LessThanOrEqual:
      return '<=';
    case LeafExpressionOperator.Between:
      return 'Between';
    case LeafExpressionOperator.Contains:
      return 'Contains';
    case LeafExpressionOperator.NotContains:
      return 'Not Contains';
    case LeafExpressionOperator.StartsWith:
      return 'Starts With';
    case LeafExpressionOperator.EndsWith:
      return 'Ends With';
    case LeafExpressionOperator.Regex:
      return 'Regex';
    case LeafExpressionOperator.IsTrue:
      return 'True';
    case LeafExpressionOperator.IsFalse:
      return 'False';
  }
}

export function OperatorToLongFriendlyString(
  leafExpressionOperator: LeafExpressionOperator,
  dataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown'
): string {
  switch (leafExpressionOperator) {
    case LeafExpressionOperator.None:
      return 'None';
    case LeafExpressionOperator.AnyChange:
      return 'Any Edit';
    case LeafExpressionOperator.Equals:
      return 'Equals ';
    case LeafExpressionOperator.NotEquals:
      return 'Not Equals ';
    case LeafExpressionOperator.GreaterThan:
      if (dataType == DataType.Date) {
        return 'After ';
      } else {
        return 'Greater Than ';
      }
    case LeafExpressionOperator.LessThan:
      if (dataType == DataType.Date) {
        return 'Before ';
      } else {
        return 'Less Than ';
      }
    case LeafExpressionOperator.GreaterThanOrEqual:
      if (dataType == DataType.Date) {
        return 'After or On ';
      } else {
        return 'Greater Than or Equals ';
      }
    case LeafExpressionOperator.LessThanOrEqual:
      if (dataType == DataType.Date) {
        return 'Before or On ';
      } else {
        return 'Less Than or Equals ';
      }
    case LeafExpressionOperator.Between:
      return ' Between ';
    case LeafExpressionOperator.NotBetween:
      return 'Not Between ';
    case LeafExpressionOperator.IsPositive:
      return 'Is Positive ';
    case LeafExpressionOperator.IsNegative:
      return 'Is Negative ';
    case LeafExpressionOperator.ValueChange:
      return 'Change In Value > ';
    case LeafExpressionOperator.PercentChange:
      return '% Change > ';
    case LeafExpressionOperator.IsNotNumber:
      return 'Is Not Number ';
    case LeafExpressionOperator.IsTrue:
      return 'Is True ';
    case LeafExpressionOperator.IsFalse:
      return 'Is False ';
    case LeafExpressionOperator.Contains:
      return 'Contains ';
    case LeafExpressionOperator.NotContains:
      return 'Not Contains ';
    case LeafExpressionOperator.StartsWith:
      return 'Starts With ';
    case LeafExpressionOperator.EndsWith:
      return 'Ends With ';
    case LeafExpressionOperator.Regex:
      return 'Matches Expression ';
    case LeafExpressionOperator.NoDuplicateValues:
      return 'No Duplicate Values ';
    case LeafExpressionOperator.ExistingValuesOnly:
      return 'Existing Values Only ';
  }
}

export function GetOperatorsForDataType(
  dataType: 'String' | 'Number' | 'NumberArray' | 'Boolean' | 'Date' | 'Object' | 'Unknown'
): LeafExpressionOperator[] {
  switch (dataType) {
    case DataType.Boolean:
      return [LeafExpressionOperator.IsTrue, LeafExpressionOperator.IsFalse];
    case DataType.Number:
    case DataType.Date:
      return [
        LeafExpressionOperator.GreaterThan,
        LeafExpressionOperator.GreaterThanOrEqual,
        LeafExpressionOperator.LessThan,
        LeafExpressionOperator.LessThanOrEqual,
        LeafExpressionOperator.Equals,
        LeafExpressionOperator.NotEquals,
        LeafExpressionOperator.Between,
      ];
    case DataType.String:
      return [
        LeafExpressionOperator.Contains,
        LeafExpressionOperator.NotContains,
        LeafExpressionOperator.StartsWith,
        LeafExpressionOperator.EndsWith,
        LeafExpressionOperator.Equals,
        LeafExpressionOperator.NotEquals,
        LeafExpressionOperator.Regex,
      ];
    default:
      return [LeafExpressionOperator.GreaterThan, LeafExpressionOperator.Between];
  }
}

function getOperandValue(
  rangeOperandType: string,
  operand: string,
  columns: AdaptableColumn[],
  api: AdaptableApi
): string {
  if (rangeOperandType == 'Value') {
    return operand;
  } else {
    return '[' + api.gridApi.getFriendlyNameFromColumnId(operand) + ']';
  }
}

export function GetColumnListFromExpression(expression: Expression): Array<string> {
  let returnColumnList: string[] = [];
  if (ArrayExtensions.IsNotNullOrEmpty(expression.ColumnValueExpressions)) {
    returnColumnList.push(...expression.ColumnValueExpressions.map(x => x.ColumnId));
  }
  if (ArrayExtensions.IsNotNullOrEmpty(expression.FilterExpressions)) {
    returnColumnList.push(...expression.FilterExpressions.map(x => x.ColumnId));
  }
  if (ArrayExtensions.IsNotNullOrEmpty(expression.RangeExpressions)) {
    returnColumnList.push(...expression.RangeExpressions.map(x => x.ColumnId));
  }
  return [...new Set(returnColumnList)];
}

export function IsNullOrEmptyExpression(expression: Expression): boolean {
  return expression == null || expression == undefined || IsEmptyExpression(expression);
}

export function IsEmptyExpression(expression: Expression): boolean {
  return (
    ArrayExtensions.IsNullOrEmpty(expression.ColumnValueExpressions) &&
    ArrayExtensions.IsNullOrEmpty(expression.FilterExpressions) &&
    ArrayExtensions.IsNullOrEmpty(expression.RangeExpressions)
  );
}

export function IsNotNullOrEmptyExpression(expression: Expression): boolean {
  return !IsNullOrEmptyExpression(expression);
}

export function IsNotEmptyExpression(expression: Expression): boolean {
  return !IsEmptyExpression(expression);
}

export function IsNotEmptyOrInvalidExpression(expression: Expression): boolean {
  return IsNotEmptyExpression(expression) && IsExpressionValid(expression);
}

export function IsNullOrEmptyOrValidExpression(expression: Expression): boolean {
  if (expression == null) {
    return true;
  }

  if (IsEmptyExpression(expression)) {
    return true;
  }
  return IsExpressionValid(expression);
}

export function IsEmptyOrValidExpression(expression: Expression): boolean {
  if (IsEmptyExpression(expression)) {
    return true;
  }
  return IsExpressionValid(expression);
}

export function IsExpressionValid(expression: Expression): boolean {
  //nothing to check for ColumnValues or Filters
  //we check that all ranges are properly populated
  if (ArrayExtensions.IsNullOrEmpty(expression.RangeExpressions)) {
    return true;
  }
  return expression.RangeExpressions.every(x => {
    return x.Ranges.every(range => {
      if (range.Operator == null || range.Operator == undefined) {
        return false;
      } else if (range.Operator == LeafExpressionOperator.Between) {
        return range.Operand1 != '' && range.Operand2 != '';
      } else {
        return range.Operand1 != '';
      }
    });
  });
}

export function IsEmptyRange(range: QueryRange): boolean {
  return (
    StringExtensions.IsNullOrEmpty(range.Operand1) && StringExtensions.IsNullOrEmpty(range.Operand2)
  );
}

export function CreateEmptyExpression(): Expression {
  return new Expression([], [], []);
}

export function CreateEmptyRange(): QueryRange {
  return {
    Operator: LeafExpressionOperator.None, // or null?
    Operand1: '',
    Operand2: '',
    Operand1Type: RangeOperandType.Value,
    Operand2Type: RangeOperandType.Value,
  };
}

export function GetRangeEvaluation(
  rangeExpression: QueryRange,
  newValue: any,
  initialValue: any,
  column: AdaptableColumn,
  adaptable: IAdaptable,
  getOtherColumnValue: (columnId: string) => any
): IRangeEvaluation {
  let rangeEvaluation: IRangeEvaluation = ObjectFactory.CreateRangeEvaluation(
    rangeExpression.Operator as LeafExpressionOperator,
    rangeExpression.Operand1,
    rangeExpression.Operand2,
    newValue,
    initialValue,
    column.ColumnId
  );

  switch (column.DataType) {
    case DataType.Date:
      if (rangeExpression.Operand1Type == RangeOperandType.Column) {
        let columnValue: any = getOtherColumnValue(rangeExpression.Operand1);
        rangeEvaluation.operand2 = new Date(columnValue).setHours(0, 0, 0, 0);
      } else {
        rangeEvaluation.operand1 = new Date(rangeExpression.Operand1).setHours(0, 0, 0, 0);
      }
      if (StringExtensions.IsNotEmpty(rangeExpression.Operand2)) {
        // between
        if (rangeExpression.Operand2Type == RangeOperandType.Column) {
          let columnValue: any = getOtherColumnValue(rangeExpression.Operand2);
          rangeEvaluation.operand2 = new Date(columnValue).setHours(0, 0, 0, 0);
        } else {
          rangeEvaluation.operand2 = new Date(rangeExpression.Operand2).setHours(0, 0, 0, 0);
        }
      }
      rangeEvaluation.newValue = new Date(newValue).setHours(0, 0, 0, 0);
      break;
    case DataType.Number:
      if (rangeExpression.Operand1Type == RangeOperandType.Column) {
        let otherValue = getOtherColumnValue(rangeExpression.Operand1);
        rangeEvaluation.operand1 = Number(otherValue);
      } else {
        rangeEvaluation.operand1 = Number(rangeExpression.Operand1);
      }
      if (StringExtensions.IsNotEmpty(rangeExpression.Operand2)) {
        // between
        if (rangeExpression.Operand2Type == RangeOperandType.Column) {
          rangeEvaluation.operand2 = Number(getOtherColumnValue(rangeExpression.Operand2));
        } else {
          rangeEvaluation.operand2 = Number(rangeExpression.Operand2);
        }
      }
      rangeEvaluation.newValue = Number(newValue);
      break;
    case DataType.Boolean:
      rangeEvaluation.newValue = newValue;
      break;
    case DataType.Object:
    case DataType.String:
      // might not be a string so make sure
      if (rangeEvaluation.newValue !== undefined && rangeEvaluation.newValue !== null) {
        rangeEvaluation.newValue = String(rangeEvaluation.newValue);
      }
      rangeEvaluation.operand1 =
        rangeExpression.Operand1Type == RangeOperandType.Column
          ? getOtherColumnValue(rangeExpression.Operand1)
          : rangeExpression.Operand1 == null
          ? null
          : rangeExpression.Operand1;
      rangeEvaluation.operand2 =
        rangeExpression.Operand2Type == RangeOperandType.Column
          ? getOtherColumnValue(rangeExpression.Operand2)
          : rangeExpression.Operand2 == null
          ? null
          : rangeExpression.Operand2;

      if (adaptable.adaptableOptions.queryOptions.ignoreCaseInQueries) {
        rangeEvaluation.newValue = StringExtensions.ToLowerCase(rangeEvaluation.newValue);
        rangeEvaluation.operand1 = StringExtensions.ToLowerCase(rangeEvaluation.operand1);
        rangeEvaluation.operand2 = StringExtensions.ToLowerCase(rangeEvaluation.operand2);
      }
      break;
  }
  return rangeEvaluation;
}

export function TestRangeEvaluation(
  rangeEvaluation: IRangeEvaluation,
  adaptable: IAdaptable
): boolean {
  if (Helper.objectNotExists(rangeEvaluation.newValue)) {
    return false;
  }

  switch (rangeEvaluation.operator) {
    case LeafExpressionOperator.AnyChange:
      return true;
    case LeafExpressionOperator.Equals:
      return rangeEvaluation.newValue == rangeEvaluation.operand1;
    case LeafExpressionOperator.NotEquals:
      return rangeEvaluation.newValue != rangeEvaluation.operand1;
    case LeafExpressionOperator.GreaterThan:
      return rangeEvaluation.newValue > rangeEvaluation.operand1;
    case LeafExpressionOperator.LessThan:
      return rangeEvaluation.newValue < rangeEvaluation.operand1;
    case LeafExpressionOperator.GreaterThanOrEqual:
      return rangeEvaluation.newValue >= rangeEvaluation.operand1;
    case LeafExpressionOperator.LessThanOrEqual:
      return rangeEvaluation.newValue <= rangeEvaluation.operand1;
    case LeafExpressionOperator.PercentChange:
      let oldPercentValue: any = rangeEvaluation.initialValue;
      let percentChange: number = Math.abs(
        100 - Math.abs((rangeEvaluation.newValue * 100) / oldPercentValue)
      );
      return percentChange > Number(rangeEvaluation.operand1);
    case LeafExpressionOperator.ValueChange:
      let oldChangeValue: any = rangeEvaluation.initialValue;
      let changeInValue: number = Math.abs(rangeEvaluation.newValue - oldChangeValue);
      return changeInValue > Number(rangeEvaluation.operand1);
    case LeafExpressionOperator.Between:
      return (
        rangeEvaluation.newValue >= rangeEvaluation.operand1 &&
        rangeEvaluation.newValue <= rangeEvaluation.operand2
      );
    case LeafExpressionOperator.NotBetween:
      return !(
        rangeEvaluation.newValue >= rangeEvaluation.operand1 &&
        rangeEvaluation.newValue <= rangeEvaluation.operand2
      );
    case LeafExpressionOperator.IsNotNumber:
      return isNaN(Number(rangeEvaluation.newValue));
    case LeafExpressionOperator.IsPositive:
      return rangeEvaluation.newValue > 0;
    case LeafExpressionOperator.IsNegative:
      return rangeEvaluation.newValue < 0;
    case LeafExpressionOperator.IsTrue:
      return rangeEvaluation.newValue == true;
    case LeafExpressionOperator.IsFalse:
      return rangeEvaluation.newValue == false;
    case LeafExpressionOperator.Contains:
      if (rangeEvaluation.newValue == undefined) {
        return false;
      }
      return String(rangeEvaluation.newValue).indexOf(rangeEvaluation.operand1) >= 0;
    case LeafExpressionOperator.NotContains:
      if (rangeEvaluation.newValue == undefined) {
        return false;
      }
      return String(rangeEvaluation.newValue).indexOf(rangeEvaluation.operand1) < 0;
    case LeafExpressionOperator.StartsWith:
      if (rangeEvaluation.newValue == undefined) {
        return false;
      }
      return String(rangeEvaluation.newValue).startsWith(rangeEvaluation.operand1);
    case LeafExpressionOperator.EndsWith:
      return rangeEvaluation.newValue.endsWith(rangeEvaluation.operand1);
    case LeafExpressionOperator.Regex:
      let regex = new RegExp(rangeEvaluation.operand1);
      return regex.test(rangeEvaluation.newValue);
    case LeafExpressionOperator.NoDuplicateValues:
      return getExistingItem(adaptable, rangeEvaluation) != null;
    case LeafExpressionOperator.ExistingValuesOnly:
      return getExistingItem(adaptable, rangeEvaluation) == null;
  }
  return false;
}

export function ExpressionContainsFilter(expression: Expression, filter: UserFilter): boolean {
  let hasFilter: boolean = false;
  if (expression != null && expression.FilterExpressions.length > 0) {
    expression.FilterExpressions.forEach(fe => {
      if (!hasFilter) {
        hasFilter = fe.Filters.find(f => f == filter.Name) != null;
      }
    });
  }
  return hasFilter;
}

export function OperatorRequiresValue(operator: LeafExpressionOperator): boolean {
  return (
    operator != LeafExpressionOperator.None &&
    operator != LeafExpressionOperator.AnyChange &&
    operator != LeafExpressionOperator.IsPositive &&
    operator != LeafExpressionOperator.IsNegative &&
    operator != LeafExpressionOperator.IsNotNumber &&
    operator != LeafExpressionOperator.IsTrue &&
    operator != LeafExpressionOperator.IsFalse &&
    operator != LeafExpressionOperator.NoDuplicateValues &&
    operator != LeafExpressionOperator.ExistingValuesOnly
  );
}

export function AddMissingProperties(expression: Expression): void {
  if (ArrayExtensions.IsNullOrEmpty(expression.ColumnValueExpressions)) {
    expression.ColumnValueExpressions = [];
  }
  if (ArrayExtensions.IsNullOrEmpty(expression.FilterExpressions)) {
    expression.FilterExpressions = [];
  }
  if (ArrayExtensions.IsNullOrEmpty(expression.RangeExpressions)) {
    expression.RangeExpressions = [];
  }
}

function getExistingItem(adaptable: IAdaptable, rangeEvaluation: IRangeEvaluation): any {
  let displayValuePairs: IRawValueDisplayValuePair[] = adaptable.getColumnValueDisplayValuePairDistinctList(
    rangeEvaluation.columnId,
    DistinctCriteriaPairValue.DisplayValue,
    false
  );
  let existingItem = displayValuePairs.find(
    dv => dv.DisplayValue.toLowerCase() == rangeEvaluation.newValue
  );
  return existingItem;
}

export const ExpressionHelper = {
  CreateSingleColumnExpression,
  ConvertExpressionToString,
  ConvertRangeToString,
  checkForExpression,
  checkForExpressionFromRowNode,
  IsSatisfied,
  OperatorToOneCharacterString,
  OperatorToShortFriendlyString,
  OperatorToLongFriendlyString,
  GetOperatorsForDataType,
  GetColumnListFromExpression,
  IsNullOrEmptyExpression,
  IsEmptyExpression,
  IsNotNullOrEmptyExpression,
  IsNotEmptyExpression,
  IsNotEmptyOrInvalidExpression,
  IsNullOrEmptyOrValidExpression,
  IsEmptyOrValidExpression,
  IsExpressionValid,
  IsEmptyRange,
  CreateEmptyExpression,
  //CreateEmptyNewExpression,
  CreateEmptyRange,
  GetRangeEvaluation,
  TestRangeEvaluation,
  ExpressionContainsFilter,
  OperatorRequiresValue,
  AddMissingProperties,
  convertFilterToExpressionString,
  evaluateColumnFilter,
};
export default ExpressionHelper;

function convertFilterToExpressionString(filter: ColumnFilter) {
  const expr: string[] = [];
  filter.Filter.ColumnValueExpressions.forEach(x => {
    x.ColumnRawValues.forEach(v => {
      expr.push(`(COL("${filter.ColumnId}") = ${JSON.stringify(v)})`);
    });
  });
  filter.Filter.FilterExpressions.forEach(x => {
    x.Filters.forEach(f => {
      expr.push(`FILTER("${f}", COL("${filter.ColumnId}"))`);
    });
  });

  return expr.join(' OR ');
}

function evaluateColumnFilter(api: AdaptableApi, filter: ColumnFilter, data: any): boolean {
  const adaptableOptions = api.internalApi.getAdaptableOptions();
  const predicates = adaptableOptions.filterPredicates;
  const value = data[filter.ColumnId];

  if (
    ArrayExtensions.IsNullOrEmpty(filter.Values) &&
    ArrayExtensions.IsNullOrEmpty(filter.Predicates)
  ) {
    return true;
  }

  if (value === null || value === undefined) {
    return false;
  }

  if (filter.Values?.includes(value)) {
    return true;
  }

  if (
    filter.Predicates?.some(item => {
      const predicate = predicates.find(p => p.id === item.PredicateId);
      if (!predicate) throw `Predicate not found: ${item.PredicateId}`;
      try {
        return predicate.handler({
          api,
          value,
          inputs: item.Inputs,
        });
      } catch (error) {
        console.error(`Error in predicate ${item.PredicateId}`, error);
        return false;
      }
    })
  ) {
    return true;
  }

  return false;
}
