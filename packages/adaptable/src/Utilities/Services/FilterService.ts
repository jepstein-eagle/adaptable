import { IAdaptable } from '../../types';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { NamedFilter } from '../../PredefinedConfig/NamedFilterState';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import Helper from '../Helpers/Helper';
import { IFilterService } from './Interface/IFilterService';
import { ColumnFilter } from '../../PredefinedConfig/ColumnFilterState';
import { KeyValuePair } from '../Interface/KeyValuePair';
import ExpressionHelper from '../Helpers/ExpressionHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';
import { FilterPredicate, FilterPredicateHandler } from '../../AdaptableOptions/FilterPredicates';
import isToday from 'date-fns/isToday';
import isYesterday from 'date-fns/isYesterday';
import isThisWeek from 'date-fns/isThisWeek';
import isTomorrow from 'date-fns/isTomorrow';
import isThisMonth from 'date-fns/isThisMonth';
import isThisQuarter from 'date-fns/isThisQuarter';
import isThisYear from 'date-fns/isThisYear';
import isPast from 'date-fns/isPast';
import isFuture from 'date-fns/isFuture';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import isSameDay from 'date-fns/isSameDay';
import { keyBy } from 'lodash';

// String, Numeric and Date
export const BLANKS_SYSTEM_FILTER = 'Blanks';
export const NON_BLANKS_SYSTEM_FILTER = 'Non Blanks';

// Date
export const TODAY_SYSTEM_FILTER = 'Today';
export const IN_PAST_SYSTEM_FILTER = 'In Past';
export const IN_FUTURE_SYSTEM_FILTER = 'In Future';
export const YESTERDAY_SYSTEM_FILTER = 'Yesterday';
export const TOMORROW_SYSTEM_FILTER = 'Tomorrow';
export const NEXT_WORKING_DAY_SYSTEM_FILTER = 'Next Working Day';
export const PREVIOUS_WORKING_DAY_SYSTEM_FILTER = 'Previous Working Day';
export const THIS_YEAR_SYSTEM_FILTER = 'This Year';
// Numeric
export const POSITIVE_SYSTEM_FILTER = 'Positive';
export const NEGATIVE_SYSTEM_FILTER = 'Negative';
export const ZERO_SYSTEM_FILTER = 'Zero';
export const GREATER_THAN = 'GreaterThan';
export const LESS_THAN = 'LessThan';

// Boolean
export const TRUE_SYSTEM_FILTER = 'True';
export const FALSE_SYSTEM_FILTER = 'False';

export const SystemFilterPredicates: FilterPredicate[] = [
  {
    id: 'Blanks',
    label: 'Blanks',
    handler: ({ value }) => Helper.IsInputNullOrEmpty(value),
  },
  {
    id: 'Non Blanks',
    label: 'Non Blanks',
    handler: ({ value }) => Helper.IsInputNotNullOrEmpty(value),
  },
  // Numeric Filters
  {
    id: NUMBER_BLANKS,
    label: 'Blanks',
    scope: { DataType: 'Number' },
    inputs: [{ type: 'number', default: 0 }],
    handler: ({ value, inputs }) => Number(value) > Number(inputs[0]),
  },
  {
    id: NUMBER_GREATER_THAN,
    label: 'Greater Than',
    scope: { DataType: 'Number' },
    inputs: [{ type: 'number', default: 0 }],
    handler: ({ value, inputs }) => Number(value) > Number(inputs[0]),
  },
  {
    id: 'Number.LessThan',
    label: 'Less Than',
    scope: { DataType: 'Number' },
    inputs: [{ type: 'number', default: 0 }],
    handler: ({ value, inputs }) => Number(value) < Number(inputs[0]),
  },
  {
    id: 'Equals',
    label: 'Equals',
    scope: { DataType: 'Number' },
    inputs: [{ type: 'number', default: 0 }],
    handler: ({ value, inputs }) => Number(value) === Number(inputs[0]),
  },
  {
    id: 'Not Equals',
    label: 'Not Equals',
    scope: { DataType: 'Number' },
    inputs: [{ type: 'number', default: 0 }],
    handler: ({ value, inputs }) => Number(value) !== Number(inputs[0]),
  },
  {
    id: 'Between',
    label: 'Between',
    scope: { DataType: 'Number' },
    inputs: [
      { type: 'number', default: 0 },
      { type: 'number', default: 0 },
    ],
    handler: ({ value, inputs }) =>
      Number(value) > Number(inputs[0]) && Number(value) < Number(inputs[1]),
  },
  {
    id: 'Not Between',
    label: 'Not Between',
    scope: { DataType: 'Number' },
    inputs: [
      { type: 'number', default: 0 },
      { type: 'number', default: 0 },
    ],
    handler: ({ value, inputs }) =>
      Number(value) < Number(inputs[0]) || Number(value) > Number(inputs[1]),
  },
  {
    id: 'Contains',
    label: 'Contains',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value) : String(value).toLocaleLowerCase();
      const i = ignoreCase ? String(inputs[0]) : String(inputs[0]).toLocaleLowerCase();
      return v.indexOf(i) !== -1;
    },
  },
  {
    id: 'Not Contains',
    label: 'Not Contains',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value) : String(value).toLocaleLowerCase();
      const i = ignoreCase ? String(inputs[0]) : String(inputs[0]).toLocaleLowerCase();
      return v.indexOf(i) === -1;
    },
  },
  {
    id: 'Starts With',
    label: 'Starts With',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value) : String(value).toLocaleLowerCase();
      const i = ignoreCase ? String(inputs[0]) : String(inputs[0]).toLocaleLowerCase();
      return v.startsWith(i);
    },
  },
  {
    id: 'Ends With',
    label: 'Ends With',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value) : String(value).toLocaleLowerCase();
      const i = ignoreCase ? String(inputs[0]) : String(inputs[0]).toLocaleLowerCase();
      return v.endsWith(i);
    },
  },
  {
    id: 'Regex',
    label: 'Regex',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs }) => new RegExp(inputs[0]).test(value),
  },
  {
    id: 'Positive',
    label: 'Positive',
    scope: { DataType: 'Number' },
    handler: ({ value }) => Number(value) > 0,
  },
  {
    id: 'Negative',
    label: 'Negative',
    scope: { DataType: 'Number' },
    handler: ({ value }) => Number(value) < 0,
  },
  {
    id: 'Zero',
    label: 'Zero',
    scope: { DataType: 'Number' },
    handler: ({ value }) => Number(value) == 0,
  },
  {
    id: 'True',
    label: 'True',
    scope: { DataType: 'Boolean' },
    handler: ({ value }) => Boolean(value) === true,
  },
  {
    id: 'False',
    label: 'False',
    scope: { DataType: 'Boolean' },
    handler: ({ value }) => Boolean(value) === false,
  },

  {
    id: 'Today',
    label: 'Today',
    scope: { DataType: 'Date' },
    handler: ({ value }) => isToday(value),
  },
  {
    id: 'Yesterday',
    label: 'Yesterday',
    scope: { DataType: 'Date' },
    handler: ({ value }) => isYesterday(value),
  },
  {
    id: 'Tomorrow',
    label: 'Tomorrow',
    scope: { DataType: 'Date' },
    handler: ({ value }) => isTomorrow(value),
  },
  {
    id: 'This Week',
    label: 'This Week',
    scope: { DataType: 'Date' },
    handler: ({ value }) => isThisWeek(value),
  },
  {
    id: 'This Month',
    label: 'This Month',
    scope: { DataType: 'Date' },
    handler: ({ value }) => isThisMonth(value),
  },
  {
    id: 'This Quarter',
    label: 'This Quarter',
    scope: { DataType: 'Date' },
    handler: ({ value }) => isThisQuarter(value),
  },
  {
    id: 'This Year',
    label: 'This Year',
    scope: { DataType: 'Date' },
    handler: ({ value }) => isThisYear(value),
  },
  {
    id: 'In Past',
    label: 'In Past',
    scope: { DataType: 'Date' },
    handler: ({ value }) => isPast(value),
  },
  {
    id: 'In Future',
    label: 'In Future',
    scope: { DataType: 'Date' },
    handler: ({ value }) => isFuture(value),
  },
  {
    id: 'After',
    label: 'After',
    scope: { DataType: 'Date' },
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isAfter(value, new Date(inputs[0])),
  },
  {
    id: 'Before',
    label: 'Before',
    scope: { DataType: 'Date' },
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isBefore(value, new Date(inputs[0])),
  },
  {
    id: 'Next Working Day',
    label: 'Next Working Day',
    scope: { DataType: 'Date' },
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getNextWorkingDay()),
  },
  {
    id: 'Previous Working Day',
    label: 'Previous Working Day',
    scope: { DataType: 'Date' },
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getPreviousWorkingDay()),
  },
];

export const SystemFilterPredicatesById = keyBy(SystemFilterPredicates, 'id');

export class FilterService implements IFilterService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  public GetAllSystemFilters(): string[] {
    return [
      BLANKS_SYSTEM_FILTER,
      NON_BLANKS_SYSTEM_FILTER,
      TODAY_SYSTEM_FILTER,
      IN_PAST_SYSTEM_FILTER,
      IN_FUTURE_SYSTEM_FILTER,
      YESTERDAY_SYSTEM_FILTER,
      TOMORROW_SYSTEM_FILTER,
      NEXT_WORKING_DAY_SYSTEM_FILTER,
      PREVIOUS_WORKING_DAY_SYSTEM_FILTER,
      THIS_YEAR_SYSTEM_FILTER,
      POSITIVE_SYSTEM_FILTER,
      NEGATIVE_SYSTEM_FILTER,
      ZERO_SYSTEM_FILTER,
      TRUE_SYSTEM_FILTER,
      FALSE_SYSTEM_FILTER,
    ];
  }

  public GetUserFilters(userFilters: UserFilter[], userFilterNames: string[]): UserFilter[] {
    return userFilters.filter(f => userFilterNames.find(u => u == f.Name) != null);
  }

  public GetSystemFiltersForColumn(column: AdaptableColumn, systemFilters: string[]): string[] {
    let appropriateSystemFilters: string[] = [];
    if (column != null) {
      systemFilters.forEach((systemFilter: string) => {
        let dataType: DataType = this.GetDatatypeForSystemFilter(systemFilter);
        if (
          (dataType == DataType.All && column.DataType != DataType.Boolean) ||
          dataType == column.DataType
        ) {
          appropriateSystemFilters.push(systemFilter);
        }
      });
    }
    return appropriateSystemFilters;
  }

  public GetUserFiltersForColumn(column: AdaptableColumn, userFilters: UserFilter[]): UserFilter[] {
    let appropriateUserFilters: UserFilter[] = [];
    if (column != null) {
      userFilters.forEach((userFilter: UserFilter) => {
        if (userFilter.ColumnId == column.ColumnId) {
          appropriateUserFilters.push(userFilter);
        }
      });
    }
    return appropriateUserFilters;
  }

  public GetNamedFiltersForColumn(
    column: AdaptableColumn,
    namedFilters: NamedFilter[],
    columnCategories: ColumnCategory[]
  ): NamedFilter[] {
    if (!column) {
      return [];
    }
    return namedFilters.filter(nf => {
      if (nf.Scope.DataType && nf.Scope.DataType === column.DataType) {
        return true;
      }

      if (nf.Scope.ColumnIds && nf.Scope.ColumnIds.includes(column.ColumnId)) {
        return true;
      }

      if (nf.Scope.ColumnCategoryIds) {
        const categoryPredicate = (cc: ColumnCategory) =>
          nf.Scope.ColumnCategoryIds.includes(cc.ColumnCategoryId) &&
          cc.ColumnIds.includes(column.ColumnId);

        if (columnCategories.some(categoryPredicate)) {
          return true;
        }
      }

      return false;
    });
  }

  public ShowUserFilterForColumn(
    UserFilters: UserFilter[],
    name: string,
    column: AdaptableColumn
  ): boolean {
    let userFilter: UserFilter = UserFilters.find(f => f.Name == name);
    return userFilter.ColumnId == column.ColumnId;
  }

  public GetColumnIdForUserFilter(userFilter: UserFilter): string {
    // see if there are any columnvalues and then get the first only
    if (
      userFilter.Expression.ColumnValueExpressions != null &&
      userFilter.Expression.ColumnValueExpressions.length > 0
    ) {
      return userFilter.Expression.ColumnValueExpressions[0].ColumnId;
    }

    // see if there are any user filter expressionss and then get the first only
    if (
      userFilter.Expression.FilterExpressions != null &&
      userFilter.Expression.FilterExpressions.length > 0
    ) {
      return userFilter.Expression.FilterExpressions[0].ColumnId;
    }

    // see if there are any ranges and then get the first only
    if (
      userFilter.Expression.RangeExpressions != null &&
      userFilter.Expression.RangeExpressions.length > 0
    ) {
      return userFilter.Expression.RangeExpressions[0].ColumnId;
    }
  }

  public GetFunctionForSystemFilter(systemFilterName: string): any {
    switch (systemFilterName) {
      case BLANKS_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (itemToCheck: any): boolean => {
            return Helper.IsInputNullOrEmpty(itemToCheck);
          },
        };
      }
      case NON_BLANKS_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (itemToCheck: any): boolean => {
            return Helper.IsInputNotNullOrEmpty(itemToCheck);
          },
        };
      }
      case TODAY_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date());
            return (
              today.setHours(0, 0, 0, 0) == new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0)
            );
          },
        };
      }
      case IN_PAST_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            return +dateToCheck < Date.now();
          },
        };
      }
      case IN_FUTURE_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            return +dateToCheck > Date.now();
          },
        };
      }
      case YESTERDAY_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            let yesterday = ((d: Date) => new Date(d.setDate(d.getDate() - 1)))(new Date());
            return (
              yesterday.setHours(0, 0, 0, 0) == new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0)
            );
          },
        };
      }
      case TOMORROW_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            let tomorrow = ((d: Date) => new Date(d.setDate(d.getDate() + 1)))(new Date());
            return (
              tomorrow.setHours(0, 0, 0, 0) == new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0)
            );
          },
        };
      }
      case NEXT_WORKING_DAY_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            return (
              this.adaptable.api.calendarApi.getNextWorkingDay().setHours(0, 0, 0, 0) ==
              new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0)
            );
          },
        };
      }
      case PREVIOUS_WORKING_DAY_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            return (
              this.adaptable.api.calendarApi.getPreviousWorkingDay().setHours(0, 0, 0, 0) ==
              new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0)
            );
          },
        };
      }
      case THIS_YEAR_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            let today = ((d: Date) => new Date(d.setDate(d.getDate())))(new Date());
            let todayyear: number = today.getFullYear();
            let datetocheckyear: number = dateToCheck.getFullYear();
            return todayyear == datetocheckyear;
          },
        };
      }
      case POSITIVE_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (numberToCheck: number): boolean => {
            return numberToCheck > 0;
          },
        };
      }
      case NEGATIVE_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (numberToCheck: number): boolean => {
            return numberToCheck < 0;
          },
        };
      }
      case ZERO_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (numberToCheck: number): boolean => {
            return numberToCheck == 0;
          },
        };
      }
      case TRUE_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (boolToCheck: boolean): boolean => {
            return boolToCheck;
          },
        };
      }
      case FALSE_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (boolToCheck: boolean): boolean => {
            return !boolToCheck;
          },
        };
      }
    }
  }

  public GetDatatypeForSystemFilter(systemFilterName: string): DataType {
    switch (systemFilterName) {
      case BLANKS_SYSTEM_FILTER:
      case NON_BLANKS_SYSTEM_FILTER: {
        return DataType.All;
      }
      case TODAY_SYSTEM_FILTER:
      case IN_PAST_SYSTEM_FILTER:
      case IN_FUTURE_SYSTEM_FILTER:
      case YESTERDAY_SYSTEM_FILTER:
      case TOMORROW_SYSTEM_FILTER:
      case NEXT_WORKING_DAY_SYSTEM_FILTER:
      case PREVIOUS_WORKING_DAY_SYSTEM_FILTER:
      case THIS_YEAR_SYSTEM_FILTER: {
        return DataType.Date;
      }
      case POSITIVE_SYSTEM_FILTER:
      case NEGATIVE_SYSTEM_FILTER:
      case ZERO_SYSTEM_FILTER: {
        return DataType.Number;
      }
      case TRUE_SYSTEM_FILTER:
      case FALSE_SYSTEM_FILTER: {
        return DataType.Boolean;
      }
    }
  }

  public ConvertColumnFiltersToKVPArray(
    columnFilters: ColumnFilter[],
    columns: AdaptableColumn[]
  ): KeyValuePair[] {
    let infoBody: KeyValuePair[] = [];
    columnFilters.forEach(x => {
      let column: AdaptableColumn = this.adaptable.api.gridApi.getColumnFromId(x.ColumnId);
      if (column) {
        let expression: string = ExpressionHelper.ConvertExpressionToString(
          x.Filter,
          this.adaptable.api,
          false
        );
        infoBody.push({
          Key: this.adaptable.api.gridApi.getFriendlyNameFromColumnId(x.ColumnId),
          Value: expression,
        });
      }
    });
    return infoBody;
  }

  public GetColumnFiltersDescription(
    columnFilters: ColumnFilter[],
    columns: AdaptableColumn[]
  ): string {
    if (ArrayExtensions.IsNullOrEmpty(columnFilters)) {
      return 'No Column Filter Active';
    }
    let stringarr: string[] = this.ConvertColumnFiltersToKVPArray(columnFilters, columns).map(
      kvp => {
        return kvp.Key + ': ' + kvp.Value;
      }
    );
    return stringarr.join('; ');
  }
}
