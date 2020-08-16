import { IAdaptable, FilterPredicate, ColumnFilter } from '../../types';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { DataType } from '../../PredefinedConfig/Common/Enums';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import Helper from '../Helpers/Helper';
import { IFilterService } from './Interface/IFilterService';
import { KeyValuePair } from '../Interface/KeyValuePair';
import ExpressionHelper from '../Helpers/ExpressionHelper';
import ArrayExtensions from '../Extensions/ArrayExtensions';
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

export type SystemFilterIds = SystemFilterId[];

export type SystemFilterId =
  | 'Blanks'
  | 'NonBlanks'
  | 'Equals'
  | 'NotEquals'
  | 'GreaterThan'
  | 'LessThan'
  | 'Positive'
  | 'Negative'
  | 'Zero'
  | 'Between'
  | 'NotBetween'
  | 'Is'
  | 'IsNot'
  | 'Contains'
  | 'NotContains'
  | 'StartsWith'
  | 'EndsWith'
  | 'Regex'
  | 'Today'
  | 'Yesterday'
  | 'Tomorrow'
  | 'ThisWeek'
  | 'ThisMonth'
  | 'ThisQuarter'
  | 'ThisYear'
  | 'InPast'
  | 'InFuture'
  | 'Before'
  | 'After'
  | 'On'
  | 'NotOn'
  | 'NextWorkDay'
  | 'LastWorkDay'
  | 'True'
  | 'False';

export const SystemFilterIdList: SystemFilterId[] = [
  'Blanks',
  'NonBlanks',
  'Equals',
  'NotEquals',
  'GreaterThan',
  'LessThan',
  'Positive',
  'Negative',
  'Zero',
  'Between',
  'NotBetween',
  'Is',
  'IsNot',
  'Contains',
  'NotContains',
  'StartsWith',
  'EndsWith',
  'Regex',
  'Today',
  'Yesterday',
  'Tomorrow',
  'ThisWeek',
  'ThisMonth',
  'ThisQuarter',
  'ThisYear',
  'InPast',
  'InFuture',
  'Before',
  'After',
  'On',
  'NotOn',
  'NextWorkDay',
  'LastWorkDay',
  'True',
  'False',
];

export const SystemFilterPredicates: FilterPredicate[] = [
  // All Column System Filters
  {
    id: 'Blanks',
    name: 'Blanks',
    type: 'FilterPredicate',
    handler: ({ value }) => Helper.IsInputNullOrEmpty(value),
  },
  {
    id: 'NonBlanks',
    name: 'Non Blanks',
    type: 'FilterPredicate',
    handler: ({ value }) => Helper.IsInputNotNullOrEmpty(value),
  },

  // Numeric System Filters
  {
    id: 'GreaterThan',
    name: 'Greater Than',
    scope: { DataType: 'Number' },
    inputs: [{ type: 'number', default: 0 }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => Number(value) > Number(inputs[0]),
  },
  {
    id: 'LessThan',
    name: 'Less Than',
    scope: { DataType: 'Number' },
    inputs: [{ type: 'number', default: 0 }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => Number(value) < Number(inputs[0]),
  },
  {
    id: 'Positive',
    name: 'Positive',
    scope: { DataType: 'Number' },
    type: 'FilterPredicate',
    handler: ({ value }) => Number(value) > 0,
  },
  {
    id: 'Negative',
    name: 'Negative',
    scope: { DataType: 'Number' },
    type: 'FilterPredicate',
    handler: ({ value }) => Number(value) < 0,
  },
  {
    id: 'Zero',
    name: 'Zero',
    scope: { DataType: 'Number' },
    type: 'FilterPredicate',
    handler: ({ value }) => Number(value) == 0,
  },

  {
    id: 'Equals',
    name: 'Equals',
    scope: { DataType: 'Number' },
    inputs: [{ type: 'number', default: 0 }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => Number(value) === Number(inputs[0]),
  },
  {
    id: 'NotEquals',
    name: 'Not Equals',
    scope: { DataType: 'Number' },
    inputs: [{ type: 'number', default: 0 }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => Number(value) !== Number(inputs[0]),
  },
  {
    id: 'Between',
    name: 'Between',
    scope: { DataType: 'Number' },
    inputs: [
      { type: 'number', default: 0 },
      { type: 'number', default: 0 },
    ],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) =>
      Number(value) > Number(inputs[0]) && Number(value) < Number(inputs[1]),
  },
  {
    id: 'NotBetween',
    name: 'Not Between',
    scope: { DataType: 'Number' },
    inputs: [
      { type: 'number', default: 0 },
      { type: 'number', default: 0 },
    ],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) =>
      Number(value) < Number(inputs[0]) || Number(value) > Number(inputs[1]),
  },

  // String System Filters
  {
    id: 'Is',
    name: 'Equals',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v == i;
    },
  },
  {
    id: 'IsNot',
    name: 'Not Equals',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v != i;
    },
  },
  {
    id: 'Contains',
    name: 'Contains',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.indexOf(i) !== -1;
    },
  },
  {
    id: 'NotContains',
    name: 'Not Contains',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.indexOf(i) === -1;
    },
  },
  {
    id: 'StartsWith',
    name: 'Starts With',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.startsWith(i);
    },
  },
  {
    id: 'EndsWith',
    name: 'Ends With',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.endsWith(i);
    },
  },
  {
    id: 'Regex',
    name: 'Regex',
    scope: { DataType: 'String' },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => new RegExp(inputs[0]).test(value),
  },

  // Date System Filters
  {
    id: 'Today',
    name: 'Today',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value }) => isToday(value),
  },
  {
    id: 'Yesterday',
    name: 'Yesterday',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value }) => isYesterday(value),
  },
  {
    id: 'Tomorrow',
    name: 'Tomorrow',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value }) => isTomorrow(value),
  },
  {
    id: 'ThisWeek',
    name: 'This Week',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value }) => isThisWeek(value),
  },
  {
    id: 'ThisMonth',
    name: 'This Month',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value }) => isThisMonth(value),
  },
  {
    id: 'ThisQuarter',
    name: 'This Quarter',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value }) => isThisQuarter(value),
  },
  {
    id: 'ThisYear',
    name: 'This Year',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value }) => isThisYear(value),
  },
  {
    id: 'InPast',
    name: 'In Past',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value }) => isPast(value),
  },
  {
    id: 'InFuture',
    name: 'In Future',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value }) => isFuture(value),
  },
  {
    id: 'After',
    name: 'After',
    scope: { DataType: 'Date' },
    inputs: [{ type: 'date' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => isAfter(value, new Date(inputs[0])),
  },
  {
    id: 'Before',
    name: 'Before',
    scope: { DataType: 'Date' },
    inputs: [{ type: 'date' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => isBefore(value, new Date(inputs[0])),
  },
  {
    id: 'On',
    name: 'Equals',
    scope: { DataType: 'Date' },
    inputs: [{ type: 'date' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => isSameDay(value, new Date(inputs[0])),
  },
  {
    id: 'NotOn',
    name: 'NotEquals',
    scope: { DataType: 'Date' },
    inputs: [{ type: 'date' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => !isSameDay(value, new Date(inputs[0])),
  },
  {
    id: 'NextWorkDay',
    name: 'Next Work Day',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getNextWorkingDay()),
  },
  {
    id: 'LastWorkDay',
    name: 'Last Work Day',
    scope: { DataType: 'Date' },
    type: 'FilterPredicate',
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getPreviousWorkingDay()),
  },

  // Boolean System Filters
  {
    id: 'True',
    name: 'True',
    scope: { DataType: 'Boolean' },
    type: 'FilterPredicate',
    handler: ({ value }) => Boolean(value) === true,
  },
  {
    id: 'False',
    name: 'False',
    scope: { DataType: 'Boolean' },
    type: 'FilterPredicate',
    handler: ({ value }) => Boolean(value) === false,
  },
];

export const SystemFilterPredicatesById = keyBy(SystemFilterPredicates, 'id');

export class FilterService implements IFilterService {
  constructor(private adaptable: IAdaptable) {
    this.adaptable = adaptable;
  }

  public GetAllSystemFilters(): string[] {
    return [];
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
    return undefined;
  }

  public GetDatatypeForSystemFilter(systemFilterName: string): DataType {
    return DataType.Unknown;
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
