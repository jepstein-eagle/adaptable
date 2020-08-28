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
  column: AdaptableColumn;
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
    toString: () => 'TODO',
    shortcuts: ['#', '['],
  },
  {
    id: 'Blanks',
    name: 'Blanks',
    icon: { path: mdiCheckboxBlankCircleOutline },
    columnScope: { All: true },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => Helper.IsInputNullOrEmpty(value),
    toString: () => 'TODO',
  },
  {
    id: 'NonBlanks',
    name: 'Non Blanks',
    icon: { path: mdiCheckboxBlankCircle },
    columnScope: { All: true },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => Helper.IsInputNotNullOrEmpty(value),
    toString: () => 'TODO',
  },

  // Numeric System Filters
  {
    id: 'GreaterThan',
    name: 'Greater Than',
    icon: { path: mdiGreaterThan },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) > Number(inputs[0]),
    toString: () => 'TODO',
    shortcuts: ['>'],
  },
  {
    id: 'LessThan',
    name: 'Less Than',
    icon: { path: mdiLessThan },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) < Number(inputs[0]),
    toString: () => 'TODO',
    shortcuts: ['<'],
  },
  {
    id: 'Positive',
    name: 'Positive',
    icon: { text: '>0' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => Number(value) > 0,
    toString: () => 'TODO',
  },
  {
    id: 'Negative',
    name: 'Negative',
    icon: { text: '<0' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => Number(value) < 0,
    toString: () => 'TODO',
  },
  {
    id: 'Zero',
    name: 'Zero',
    icon: { text: '=0' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => Number(value) == 0,
    toString: () => 'TODO',
  },
  {
    id: 'Equals',
    name: 'Equals',
    icon: { path: mdiEqual },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) === Number(inputs[0]),
    toString: () => 'TODO',
    shortcuts: ['='],
  },
  {
    id: 'NotEquals',
    name: 'Not Equals',
    icon: { path: mdiNotEqual },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) !== Number(inputs[0]),
    toString: () => 'TODO',
    shortcuts: ['!='],
  },
  {
    id: 'Between',
    name: 'Between',
    icon: { text: 'BE' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'number' }, { type: 'number' }],
    handler: ({ value, inputs }) =>
      Number(value) > Number(inputs[0]) && Number(value) < Number(inputs[1]),
    toString: () => 'TODO',
    shortcuts: [':'],
  },
  {
    id: 'NotBetween',
    name: 'Not Between',
    icon: { text: '!BE' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'number' }, { type: 'number' }],
    handler: ({ value, inputs }) =>
      Number(value) < Number(inputs[0]) || Number(value) > Number(inputs[1]),
    toString: () => 'TODO',
    shortcuts: ['!:'],
  },

  // String System Filters
  {
    id: 'Is',
    name: 'Equals',
    icon: { path: mdiEqual },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v == i;
    },
    toString: () => 'TODO',
    shortcuts: ['='],
  },
  {
    id: 'IsNot',
    name: 'Not Equals',
    icon: { path: mdiNotEqual },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v != i;
    },
    toString: () => 'TODO',
    shortcuts: ['!='],
  },
  {
    id: 'Contains',
    name: 'Contains',
    icon: { path: mdiFormatTitle },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.indexOf(i) !== -1;
    },
    toString: () => 'TODO',
  },
  {
    id: 'NotContains',
    name: 'Not Contains',
    icon: { path: mdiFormatStrikethrough },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.indexOf(i) === -1;
    },
    toString: () => 'TODO',
  },
  {
    id: 'StartsWith',
    name: 'Starts With',
    icon: { path: mdiFormatLetterStartsWith },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.startsWith(i);
    },
    toString: () => 'TODO',
  },
  {
    id: 'EndsWith',
    name: 'Ends With',
    icon: { path: mdiFormatLetterEndsWith },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs, api }) => {
      const adaptableOptions = api.internalApi.getAdaptableOptions();
      const ignoreCase = adaptableOptions.queryOptions?.ignoreCaseInQueries;
      const v = ignoreCase ? String(value).toLocaleLowerCase() : String(value);
      const i = ignoreCase ? String(inputs[0]).toLocaleLowerCase() : String(inputs[0]);
      return v.endsWith(i);
    },
    toString: () => 'TODO',
  },
  {
    id: 'Regex',
    name: 'Regex',
    icon: { path: mdiRegex },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs }) => new RegExp(inputs[0]).test(value),
    toString: () => 'TODO',
  },

  // Date System Filters
  {
    id: 'Today',
    name: 'Today',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => isToday(value),
    toString: () => 'TODO',
  },
  {
    id: 'Yesterday',
    name: 'Yesterday',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => isYesterday(value),
    toString: () => 'TODO',
  },
  {
    id: 'Tomorrow',
    name: 'Tomorrow',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => isTomorrow(value),
    toString: () => 'TODO',
  },
  {
    id: 'ThisWeek',
    name: 'This Week',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => isThisWeek(value),
    toString: () => 'TODO',
  },
  {
    id: 'ThisMonth',
    name: 'This Month',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => isThisMonth(value),
    toString: () => 'TODO',
  },
  {
    id: 'ThisQuarter',
    name: 'This Quarter',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => isThisQuarter(value),
    toString: () => 'TODO',
  },
  {
    id: 'ThisYear',
    name: 'This Year',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => isThisYear(value),
    toString: () => 'TODO',
  },
  {
    id: 'InPast',
    name: 'In Past',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => isPast(value),
    toString: () => 'TODO',
  },
  {
    id: 'InFuture',
    name: 'In Future',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => isFuture(value),
    toString: () => 'TODO',
  },
  {
    id: 'After',
    name: 'After',
    icon: { path: mdiGreaterThan },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isAfter(value, new Date(inputs[0])),
    toString: () => 'TODO',
  },
  {
    id: 'Before',
    name: 'Before',
    icon: { path: mdiLessThan },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isBefore(value, new Date(inputs[0])),
    toString: () => 'TODO',
  },
  {
    id: 'On',
    name: 'Equals',
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isSameDay(value, new Date(inputs[0])),
    toString: () => 'TODO',
    icon: { path: mdiEqual },
  },
  {
    id: 'NotOn',
    name: 'NotEquals',
    icon: { path: mdiNotEqual },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => !isSameDay(value, new Date(inputs[0])),
    toString: () => 'TODO',
  },
  {
    id: 'NextWorkDay',
    name: 'Next Work Day',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getNextWorkingDay()),
    toString: () => 'TODO',
  },
  {
    id: 'LastWorkDay',
    name: 'Last Work Day',
    icon: { path: mdiCalendar },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getPreviousWorkingDay()),
    toString: () => 'TODO',
  },

  // Boolean System Filters
  {
    id: 'True',
    name: 'True',
    icon: { text: 'T' },
    columnScope: { DataTypes: ['Boolean'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => Boolean(value) === true,
    toString: () => 'TODO',
  },
  {
    id: 'False',
    name: 'False',
    icon: { text: 'F' },
    columnScope: { DataTypes: ['Boolean'] },
    functionScope: ['filter', 'alert', 'validation'],
    handler: ({ value }) => Boolean(value) === false,
    toString: () => 'TODO',
  },
  {
    id: 'Any',
    name: 'Any Change',
    columnScope: { All: true },
    functionScope: ['alert', 'validation'],
    handler: ({ value: newValue, oldValue }) => newValue !== oldValue,
    toString: () => 'TODO',
  },
  {
    id: 'PercentChange',
    name: 'Percent Change',
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['alert', 'validation'],
    inputs: [{ type: 'number' }],
    handler: ({ value: newValue, oldValue, inputs }) =>
      (Math.abs(Number(newValue) - Number(oldValue)) / Number(newValue)) * 100 > Number(inputs[0]),
    toString: () => 'TODO',
  },
];

export const SystemPredicateDefsById = keyBy(SystemPredicateDefs, 'id');
export const SystemFilterPredicateIds = SystemPredicateDefs.filter(p =>
  p.functionScope.includes('filter')
).map(p => p.id);
