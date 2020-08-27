import { ConfigState } from './ConfigState';
import { BaseUserFunction } from '../AdaptableOptions/UserFunctions';
import { Scope } from './Common/Scope';
import { AdaptableApi, AdaptableColumn } from '../types';
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
import {
  mdiGreaterThan,
  mdiLessThan,
  mdiEqual,
  mdiNotEqual,
  mdiFormatTitle,
  mdiFormatStrikethrough,
  mdiFormatLetterStartsWith,
  mdiFormatLetterEndsWith,
  mdiRegex,
  mdiCalendar,
  mdiCheckboxBlankCircleOutline,
  mdiCheckboxBlankCircle,
} from '@mdi/js';
import { StyleScope } from './ConditionalStyleState';

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

  // not sure about this?  Seems like a good idea but perhaps not
  UserFilters?: UserFilter[];
}

export interface FilterPredicate extends BaseUserFunction {
  id: SystemFilterId | string;
  type: 'FilterPredicate';
  name: string;
  scope?: Scope;
  inputs?: FilterPredicateInput[];
  handler: FilterPredicateHandler;
  iconPath?: string;
  iconText?: string;
  shortcuts?: string[];
}

export interface FilterPredicateInput {
  type: 'number' | 'text' | 'date';
  defaultValue?: any;
}

export interface FilterPredicateHandler {
  (params: FilterPredicateParams): boolean;
}

export interface FilterPredicateParams {
  value: any;
  displayValue: string;
  inputs: any[];
  column: AdaptableColumn;
  api: AdaptableApi;
}

export interface ColumnFilter extends AdaptableObject {
  ColumnId: string;
  PredicateId?: SystemFilterId | string;
  Inputs?: any[];
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
  | 'Values'
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

export const SystemFilterPredicates: FilterPredicate[] = [
  // All Column System Filters
  {
    id: 'Values',
    name: 'Values',
    type: 'FilterPredicate',
    handler: ({ displayValue, inputs }) => inputs.length === 0 || inputs.includes(displayValue),
    iconText: 'IN',
    shortcuts: ['#', '['],
  },
  {
    id: 'Blanks',
    name: 'Blanks',
    type: 'FilterPredicate',
    handler: ({ value }) => Helper.IsInputNullOrEmpty(value),
    iconPath: mdiCheckboxBlankCircleOutline,
  },
  {
    id: 'NonBlanks',
    name: 'Non Blanks',
    type: 'FilterPredicate',
    handler: ({ value }) => Helper.IsInputNotNullOrEmpty(value),
    iconPath: mdiCheckboxBlankCircle,
  },

  // Numeric System Filters
  {
    id: 'GreaterThan',
    name: 'Greater Than',
    scope: { DataTypes: ['Number'] },
    inputs: [{ type: 'number' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => Number(value) > Number(inputs[0]),
    iconPath: mdiGreaterThan,
    shortcuts: ['>'],
  },
  {
    id: 'LessThan',
    name: 'Less Than',
    scope: { DataTypes: ['Number'] },
    inputs: [{ type: 'number' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => Number(value) < Number(inputs[0]),
    iconPath: mdiLessThan,
    shortcuts: ['<'],
  },
  {
    id: 'Positive',
    name: 'Positive',
    scope: { DataTypes: ['Number'] },
    type: 'FilterPredicate',
    handler: ({ value }) => Number(value) > 0,
    iconText: '>0',
  },
  {
    id: 'Negative',
    name: 'Negative',
    scope: { DataTypes: ['Number'] },
    type: 'FilterPredicate',
    handler: ({ value }) => Number(value) < 0,
    iconText: '<0',
  },
  {
    id: 'Zero',
    name: 'Zero',
    scope: { DataTypes: ['Number'] },
    type: 'FilterPredicate',
    handler: ({ value }) => Number(value) == 0,
    iconText: '=0',
  },
  {
    id: 'Equals',
    name: 'Equals',
    scope: { DataTypes: ['Number'] },
    inputs: [{ type: 'number' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => Number(value) === Number(inputs[0]),
    iconPath: mdiEqual,
    shortcuts: ['='],
  },
  {
    id: 'NotEquals',
    name: 'Not Equals',
    scope: { DataTypes: ['Number'] },
    inputs: [{ type: 'number' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => Number(value) !== Number(inputs[0]),
    iconPath: mdiNotEqual,
    shortcuts: ['!='],
  },
  {
    id: 'Between',
    name: 'Between',
    scope: { DataTypes: ['Number'] },
    inputs: [{ type: 'number' }, { type: 'number' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) =>
      Number(value) > Number(inputs[0]) && Number(value) < Number(inputs[1]),
    iconText: 'BE',
    shortcuts: [':'],
  },
  {
    id: 'NotBetween',
    name: 'Not Between',
    scope: { DataTypes: ['Number'] },
    inputs: [{ type: 'number' }, { type: 'number' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) =>
      Number(value) < Number(inputs[0]) || Number(value) > Number(inputs[1]),
    iconText: '!BE',
    shortcuts: ['!:'],
  },

  // String System Filters
  {
    id: 'Is',
    name: 'Equals',
    scope: { DataTypes: ['String'] },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v == i;
    },
    iconPath: mdiEqual,
    shortcuts: ['='],
  },
  {
    id: 'IsNot',
    name: 'Not Equals',
    scope: { DataTypes: ['String'] },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v != i;
    },
    iconPath: mdiNotEqual,
    shortcuts: ['!='],
  },
  {
    id: 'Contains',
    name: 'Contains',
    scope: { DataTypes: ['String'] },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.indexOf(i) !== -1;
    },
    iconPath: mdiFormatTitle,
  },
  {
    id: 'NotContains',
    name: 'Not Contains',
    scope: { DataTypes: ['String'] },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.indexOf(i) === -1;
    },
    iconPath: mdiFormatStrikethrough,
  },
  {
    id: 'StartsWith',
    name: 'Starts With',
    scope: { DataTypes: ['String'] },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.startsWith(i);
    },
    iconPath: mdiFormatLetterStartsWith,
  },
  {
    id: 'EndsWith',
    name: 'Ends With',
    scope: { DataTypes: ['String'] },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.endsWith(i);
    },
    iconPath: mdiFormatLetterEndsWith,
  },
  {
    id: 'Regex',
    name: 'Regex',
    scope: { DataTypes: ['String'] },
    inputs: [{ type: 'text' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => new RegExp(inputs[0]).test(value),
    iconPath: mdiRegex,
  },

  // Date System Filters
  {
    id: 'Today',
    name: 'Today',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value }) => isToday(value),
    iconPath: mdiCalendar,
  },
  {
    id: 'Yesterday',
    name: 'Yesterday',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value }) => isYesterday(value),
    iconPath: mdiCalendar,
  },
  {
    id: 'Tomorrow',
    name: 'Tomorrow',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value }) => isTomorrow(value),
    iconPath: mdiCalendar,
  },
  {
    id: 'ThisWeek',
    name: 'This Week',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value }) => isThisWeek(value),
    iconPath: mdiCalendar,
  },
  {
    id: 'ThisMonth',
    name: 'This Month',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value }) => isThisMonth(value),
    iconPath: mdiCalendar,
  },
  {
    id: 'ThisQuarter',
    name: 'This Quarter',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value }) => isThisQuarter(value),
    iconPath: mdiCalendar,
  },
  {
    id: 'ThisYear',
    name: 'This Year',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value }) => isThisYear(value),
    iconPath: mdiCalendar,
  },
  {
    id: 'InPast',
    name: 'In Past',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value }) => isPast(value),
    iconPath: mdiCalendar,
  },
  {
    id: 'InFuture',
    name: 'In Future',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value }) => isFuture(value),
    iconPath: mdiCalendar,
  },
  {
    id: 'After',
    name: 'After',
    scope: { DataTypes: ['Date'] },
    inputs: [{ type: 'date' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => isAfter(value, new Date(inputs[0])),
    iconPath: mdiGreaterThan,
  },
  {
    id: 'Before',
    name: 'Before',
    scope: { DataTypes: ['Date'] },
    inputs: [{ type: 'date' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => isBefore(value, new Date(inputs[0])),
    iconPath: mdiLessThan,
  },
  {
    id: 'On',
    name: 'Equals',
    scope: { DataTypes: ['Date'] },
    inputs: [{ type: 'date' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => isSameDay(value, new Date(inputs[0])),
    iconPath: mdiEqual,
  },
  {
    id: 'NotOn',
    name: 'NotEquals',
    scope: { DataTypes: ['Date'] },
    inputs: [{ type: 'date' }],
    type: 'FilterPredicate',
    handler: ({ value, inputs }) => !isSameDay(value, new Date(inputs[0])),
    iconPath: mdiNotEqual,
  },
  {
    id: 'NextWorkDay',
    name: 'Next Work Day',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getNextWorkingDay()),
    iconPath: mdiCalendar,
  },
  {
    id: 'LastWorkDay',
    name: 'Last Work Day',
    scope: { DataTypes: ['Date'] },
    type: 'FilterPredicate',
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getPreviousWorkingDay()),
    iconPath: mdiCalendar,
  },

  // Boolean System Filters
  {
    id: 'True',
    name: 'True',
    scope: { DataTypes: ['Boolean'] },
    type: 'FilterPredicate',
    handler: ({ value }) => Boolean(value) === true,
    iconText: 'T',
  },
  {
    id: 'False',
    name: 'False',
    scope: { DataTypes: ['Boolean'] },
    type: 'FilterPredicate',
    handler: ({ value }) => Boolean(value) === false,
    iconText: 'F',
  },
];

export const SystemFilterPredicatesById = keyBy(SystemFilterPredicates, 'id');
export const SystemFilterIdList = SystemFilterPredicates.map(p => p.id);
