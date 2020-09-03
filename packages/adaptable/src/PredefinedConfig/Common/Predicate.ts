import { Scope, FunctionScope } from './Scope';
import { AdaptableColumn } from './AdaptableColumn';
import { AdaptableApi } from '../../types';
import Helper from '../../Utilities/Helpers/Helper';
import {
  mdiCheckboxBlankCircleOutline,
  mdiCheckboxBlankCircle,
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
} from '@mdi/js';
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

export interface Predicate {
  Id: string;
  Inputs?: any[];
}

export interface PredicateDef {
  id: string;
  name: string;
  columnScope: Scope;
  functionScope: FunctionScope[];
  inputs?: PredicateDefInput[];
  handler: (params: PredicateDefHandlerParams) => boolean;
  toString: (params: PredicateDefToStringParams) => string;
  icon?: { path: string } | { text: string };
  shortcuts?: string[];
}

export interface PredicateDefInput {
  type: 'number' | 'text' | 'date';
  label?: string;
  defaultValue?: any;
}

export interface PredicateDefHandlerParams {
  value: any;
  oldValue: any;
  displayValue: any;
  inputs: any[];
  column: AdaptableColumn;
  api: AdaptableApi;
}

export interface PredicateDefToStringParams {
  inputs: any[];
}

////

export const SystemPredicateDefs: PredicateDef[] = [
  {
    id: 'Values',
    name: 'Values',
    icon: { text: 'IN' },
    columnScope: { All: true },
    functionScope: ['filter'],
    handler: ({ displayValue, inputs }) => inputs.length === 0 || inputs.includes(displayValue),
    toString: ({ inputs }) => `IN (${inputs.join(', ')})`,
    shortcuts: ['#', '['],
  },
  {
    id: 'Blanks',
    name: 'Blanks',
    icon: { path: mdiCheckboxBlankCircleOutline },
    columnScope: { All: true },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Helper.IsInputNullOrEmpty(value),
    toString: () => 'Blanks',
  },
  {
    id: 'NonBlanks',
    name: 'Non Blanks',
    icon: { path: mdiCheckboxBlankCircle },
    columnScope: { All: true },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Helper.IsInputNotNullOrEmpty(value),
    toString: () => 'Non Blanks',
  },

  // Numeric System Filters
  {
    id: 'GreaterThan',
    name: 'Greater Than',
    icon: { path: mdiGreaterThan },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) > Number(inputs[0]),
    toString: ({ inputs }) => `> ${inputs[0]}`,
    shortcuts: ['>'],
  },
  {
    id: 'LessThan',
    name: 'Less Than',
    icon: { path: mdiLessThan },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) < Number(inputs[0]),
    toString: ({ inputs }) => `< ${inputs[0]}`,
    shortcuts: ['<'],
  },
  {
    id: 'Positive',
    name: 'Positive',
    icon: { text: '>0' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Number(value) > 0,
    toString: () => 'Positive',
  },
  {
    id: 'Negative',
    name: 'Negative',
    icon: { text: '<0' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Number(value) < 0,
    toString: () => 'Negative',
  },
  {
    id: 'Zero',
    name: 'Zero',
    icon: { text: '=0' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Number(value) == 0,
    toString: () => 'Zero',
  },
  {
    id: 'Equals',
    name: 'Equals',
    icon: { path: mdiEqual },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) === Number(inputs[0]),
    toString: ({ inputs }) => `= ${inputs[0]}`,
    shortcuts: ['='],
  },
  {
    id: 'NotEquals',
    name: 'Not Equals',
    icon: { path: mdiNotEqual },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) !== Number(inputs[0]),
    toString: ({ inputs }) => `!= ${inputs[0]}`,
    shortcuts: ['!='],
  },
  {
    id: 'Between',
    name: 'Between',
    icon: { text: 'BE' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }, { type: 'number' }],
    handler: ({ value, inputs }) =>
      Number(value) > Number(inputs[0]) && Number(value) < Number(inputs[1]),
    toString: ({ inputs }) => `Between ${inputs[0]}:${inputs[1]}`,
    shortcuts: [':'],
  },
  {
    id: 'NotBetween',
    name: 'Not Between',
    icon: { text: '!BE' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }, { type: 'number' }],
    handler: ({ value, inputs }) =>
      Number(value) < Number(inputs[0]) || Number(value) > Number(inputs[1]),
    toString: ({ inputs }) => `Not Between ${inputs[0]}:${inputs[1]}`,
    shortcuts: ['!:'],
  },

  // String System Filters
  {
    id: 'Is',
    name: 'Equals',
    icon: { path: mdiEqual },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v == i;
    },
    toString: ({ inputs }) => `= ${inputs[0]}`,
    shortcuts: ['='],
  },
  {
    id: 'IsNot',
    name: 'Not Equals',
    icon: { path: mdiNotEqual },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v != i;
    },
    toString: ({ inputs }) => `!= ${inputs[0]}`,
    shortcuts: ['!='],
  },
  {
    id: 'Contains',
    name: 'Contains',
    icon: { path: mdiFormatTitle },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.indexOf(i) !== -1;
    },
    toString: ({ inputs }) => `Contains ${inputs[0]}`,
  },
  {
    id: 'NotContains',
    name: 'Not Contains',
    icon: { path: mdiFormatStrikethrough },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.indexOf(i) === -1;
    },
    toString: ({ inputs }) => `Not Contains ${inputs[0]}`,
  },
  {
    id: 'StartsWith',
    name: 'Starts With',
    icon: { path: mdiFormatLetterStartsWith },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.startsWith(i);
    },
    toString: ({ inputs }) => `Starts With ${inputs[0]}`,
  },
  {
    id: 'EndsWith',
    name: 'Ends With',
    icon: { path: mdiFormatLetterEndsWith },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.endsWith(i);
    },
    toString: ({ inputs }) => `Ends With ${inputs[0]}`,
  },
  {
    id: 'Regex',
    name: 'Regex',
    icon: { path: mdiRegex },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs }) => new RegExp(inputs[0]).test(value),
    toString: ({ inputs }) => `Regex ${inputs[0]}`,
  },

  // Date System Filters
  {
    id: 'Today',
    name: 'Today',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isToday(value),
    toString: () => 'Today',
  },
  {
    id: 'Yesterday',
    name: 'Yesterday',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isYesterday(value),
    toString: () => 'Yesterday',
  },
  {
    id: 'Tomorrow',
    name: 'Tomorrow',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isTomorrow(value),
    toString: () => 'Tomorrow',
  },
  {
    id: 'ThisWeek',
    name: 'This Week',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isThisWeek(value),
    toString: () => 'This Week',
  },
  {
    id: 'ThisMonth',
    name: 'This Month',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isThisMonth(value),
    toString: () => 'This Month',
  },
  {
    id: 'ThisQuarter',
    name: 'This Quarter',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isThisQuarter(value),
    toString: () => 'This Quarter',
  },
  {
    id: 'ThisYear',
    name: 'This Year',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isThisYear(value),
    toString: () => 'This Year',
  },
  {
    id: 'InPast',
    name: 'In Past',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isPast(value),
    toString: () => 'TODO',
  },
  {
    id: 'InFuture',
    name: 'In Future',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isFuture(value),
    toString: () => 'In Future',
  },
  {
    id: 'After',
    name: 'After',
    icon: { path: mdiGreaterThan },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isAfter(value, new Date(inputs[0])),
    toString: ({ inputs }) => `> ${inputs[0]}`,
  },
  {
    id: 'Before',
    name: 'Before',
    icon: { path: mdiLessThan },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isBefore(value, new Date(inputs[0])),
    toString: ({ inputs }) => `< ${inputs[0]}`,
  },
  {
    id: 'On',
    name: 'Equals',
    icon: { path: mdiEqual },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isSameDay(value, new Date(inputs[0])),
    toString: ({ inputs }) => `= ${inputs[0]}`,
  },
  {
    id: 'NotOn',
    name: 'NotEquals',
    icon: { path: mdiNotEqual },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => !isSameDay(value, new Date(inputs[0])),
    toString: ({ inputs }) => `!= ${inputs[0]}`,
  },
  {
    id: 'NextWorkDay',
    name: 'Next Work Day',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getNextWorkingDay()),
    toString: () => 'Next Work Day',
  },
  {
    id: 'LastWorkDay',
    name: 'Last Work Day',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getPreviousWorkingDay()),
    toString: () => 'Last Work Day',
  },

  // Boolean System Filters
  {
    id: 'True',
    name: 'True',
    icon: { text: 'T' },
    columnScope: { DataTypes: ['Boolean'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Boolean(value) === true,
    toString: () => 'True',
  },
  {
    id: 'False',
    name: 'False',
    icon: { text: 'F' },
    columnScope: { DataTypes: ['Boolean'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Boolean(value) === false,
    toString: () => 'False',
  },
  {
    id: 'Any',
    name: 'Any Change',
    columnScope: { All: true },
    functionScope: ['alert', 'validation'],
    handler: ({ value, oldValue }) => value !== oldValue,
    toString: () => 'Any Change',
  },
  {
    id: 'PercentChange',
    name: 'Percent Change',
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['alert', 'validation'],
    inputs: [{ type: 'number' }],
    handler: ({ value, oldValue, inputs }) =>
      (Math.abs(Number(value) - Number(oldValue)) / Number(value)) * 100 > Number(inputs[0]),
    toString: () => 'Percent Change',
  },
  {
    id: 'PrimaryKeyDuplicate',
    name: 'Primary Key Duplicate',
    columnScope: { All: true },
    functionScope: ['validation'],
    // TODO try to put the implementation inside the handler
    handler: () => {
      throw 'This should not be called';
    },
    toString: () => 'Primary Key Duplicate',
  },
];

export const SystemPredicateDefsById = keyBy(SystemPredicateDefs, 'id');
export const SystemFilterPredicateIds = SystemPredicateDefs.filter(p =>
  p.functionScope.includes('filter')
).map(p => p.id);