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
import ColumnHelper from '../Helpers/ColumnHelper';
import ExpressionHelper from '../Helpers/ExpressionHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';

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

// Boolean
export const TRUE_SYSTEM_FILTER = 'True';
export const FALSE_SYSTEM_FILTER = 'False';

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
              this.adaptable.CalendarService.GetNextWorkingDay().setHours(0, 0, 0, 0) ==
              new Date(dateToCheck.getTime()).setHours(0, 0, 0, 0)
            );
          },
        };
      }
      case PREVIOUS_WORKING_DAY_SYSTEM_FILTER: {
        return {
          IsExpressionSatisfied: (dateToCheck: Date): boolean => {
            return (
              this.adaptable.CalendarService.GetPreviousWorkingDay().setHours(0, 0, 0, 0) ==
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
      let column: AdaptableColumn = ColumnHelper.getColumnFromId(x.ColumnId, columns);
      if (column) {
        let expression: string = ExpressionHelper.ConvertExpressionToString(
          x.Filter,
          columns,
          false
        );
        infoBody.push({
          Key: ColumnHelper.getFriendlyNameFromColumnId(x.ColumnId, columns),
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
