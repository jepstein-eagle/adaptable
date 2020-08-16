import { ConfigState } from './ConfigState';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';
import { Scope } from './Common/Scope';
import { AdaptableApi } from '../types';
import { AdaptableObject } from './Common/AdaptableObject';
import Helper from '../Utilities/Helpers/Helper';
import {
  isToday,
  isYesterday,
  isTomorrow,
  isThisWeek,
  isThisMonth,
  isThisQuarter,
  isThisYear,
  isPast,
  isFuture,
  isAfter,
  isBefore,
  isSameDay,
} from 'date-fns';
import { keyBy } from 'lodash';

/**
 * The Predefined Configuration for Filters
 *
 * This allows you to specify which of the filters shipped by Adaptable are available to the User.
 *
 * By default **all** the System Filters provided by Adaptable will be used, so only set this property if you dont want to use the full range.
 *
 * --------------
 *
 * **Further AdapTable Help Resources**
 *
 * [System Filter Demo](https://demo.adaptabletools.com/filters/aggridsystemfiltersdemo/)
 *
 * {@link FilterApi| Filter API}
 *
 * [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 * --------------
 *
 * **If this section is not set then all System Filters will be used**
 *
 * If you want **no System Filters** to be used then provide an empty array:
 *
 * ```ts
 * export default {
 *  SystemFilter: {
 *    SystemFilters: [],
 *  },
 * } as PredefinedConfig;
 * ```
 *
 *  If you want to set which System Filters should be used then provide an array with those values:
 *
 * ```ts
 * export default {
 *  SystemFilter: {
 *    SystemFilters: ['Positive', 'Today', 'Blanks'],
 *  },
 * } as PredefinedConfig;
 * ```
 *
 * The full list of available System Filters is:
 *
 *  | Filter                  | Columns
 *  | -----------             | -----------
 *  | Blanks                  | String, Date, Number
 *  | Non Blanks              | String, Date, Number
 *  | Positive                | Number
 *  | Negative                | Number
 *  | Zero                    | Number
 *  | True                    | Boolean
 *  | False                   | Boolean
 *  | Today                   | Date
 *  | In Past                 | Date
 *  | In Future               | Date
 *  | Yesterday               | Date
 *  | Tomorrow                | Date
 *  | Next Working Day        | Date
 *  | Previous Working Day    | Date
 *  | This Year               | Date
 *
 *  --------------
 *
 * Read more at the [Adaptable Filtering Guide](https://github.com/AdaptableTools/adaptable/blob/master/packages/adaptable/readme/guides/adaptable-filtering-guide.md)
 *
 */

export interface FilterState extends ConfigState {
  /**
   * Which of the system's SystemFilters you wish to make available.
   *
   * Provide an empty array if you want **no** system filters, or list just the system filters you want.
   *
   * If this property is not set then **all** the system filters are available.
   */
  SystemFilters?: SystemFilterIds;
  FilterPredicates?: string[];
  ColumnFilters?: ColumnFilter[];
  UserFilters?: UserFilter[];
}

export interface FilterPredicate extends BaseUserFunction {
  id: SystemFilterId | string;
  type: 'FilterPredicate';
  name: string;
  scope?: Scope;
  inputs?: FilterPredicateInput[];
  handler: FilterPredicateHandler;
}

export interface FilterPredicateInput {
  type: 'number' | 'text' | 'date';
  default?: any;
}

export interface FilterPredicateHandler {
  (params: FilterPredicateParams): boolean;
}

export interface FilterPredicateParams {
  value: any;
  inputs: any[];
  api: AdaptableApi;
}

export interface ColumnFilter extends AdaptableObject {
  ColumnId: string;
  Values?: any[];
  Predicates?: AdaptablePredicate[];
}

export interface UserFilter extends AdaptableObject {
  Name: string;
  Scope: Scope;
  Values?: any[];
  Predicates?: AdaptablePredicate[];
}

export interface AdaptablePredicate {
  PredicateId: SystemFilterId | string;
  Inputs?: any[];
}

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
