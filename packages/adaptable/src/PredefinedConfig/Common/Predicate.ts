import { Scope, FunctionScope } from './Scope';
import { AdaptableColumn } from './AdaptableColumn';
import { AdaptableApi } from '../../types';
import Helper from '../../Utilities/Helpers/Helper';
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

export interface Predicate {
  PredicateId: string;
  Inputs?: any[];
}

export interface PredicateDef {
  id: string;
  label: string;
  columnScope: Scope;
  functionScope: FunctionScope[];
  inputs?: PredicateDefInput[];
  handler: (params: PredicateDefHandlerParams) => boolean;
  toString?: (params: PredicateDefToStringParams) => string;
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
    label: 'Values',
    icon: { text: 'IN' },
    columnScope: { All: true },
    functionScope: ['filter'],
    handler: ({ displayValue, inputs }) => inputs.length === 0 || inputs.includes(displayValue),
    toString: ({ inputs }) => `IN (${inputs.join(', ')})`,
    shortcuts: ['#', '['],
  },
  {
    id: 'Blanks',
    label: 'Blanks',
    icon: { path: 'blanks' },
    columnScope: { All: true },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Helper.IsInputNullOrEmpty(value),
  },
  {
    id: 'NonBlanks',
    label: 'Non Blanks',
    icon: { path: 'non-blanks' },
    columnScope: { All: true },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Helper.IsInputNotNullOrEmpty(value),
  },

  // Numeric System Filters
  {
    id: 'GreaterThan',
    label: 'Greater Than',
    icon: { path: 'greater-than' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) > Number(inputs[0]),
    toString: ({ inputs }) => `> ${inputs[0]}`,
    shortcuts: ['>'],
  },
  {
    id: 'LessThan',
    label: 'Less Than',
    icon: { path: 'less-than' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) < Number(inputs[0]),
    toString: ({ inputs }) => `< ${inputs[0]}`,
    shortcuts: ['<'],
  },
  {
    id: 'Positive',
    label: 'Positive',
    icon: { text: '>0' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Number(value) > 0,
  },
  {
    id: 'Negative',
    label: 'Negative',
    icon: { text: '<0' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Number(value) < 0,
  },
  {
    id: 'Zero',
    label: 'Zero',
    icon: { text: '=0' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Number(value) == 0,
  },
  {
    id: 'Equals',
    label: 'Equals',
    icon: { path: 'equal' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) === Number(inputs[0]),
    toString: ({ inputs }) => `= ${inputs[0]}`,
    shortcuts: ['='],
  },
  {
    id: 'NotEquals',
    label: 'Not Equals',
    icon: { path: 'not-equal' },
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'number' }],
    handler: ({ value, inputs }) => Number(value) !== Number(inputs[0]),
    toString: ({ inputs }) => `!= ${inputs[0]}`,
    shortcuts: ['!='],
  },
  {
    id: 'Between',
    label: 'Between',
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
    label: 'Not Between',
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
    label: 'Equals',
    icon: { path: 'equal' },
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
    label: 'Not Equals',
    icon: { path: 'not-equal' },
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
    label: 'Contains',
    icon: { path: 'contains' },
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
    label: 'Not Contains',
    icon: { path: 'not-contains' },
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
    label: 'Starts With',
    icon: { path: 'format-letter-starts-with' },
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
    label: 'Ends With',
    icon: { path: 'format-letter-ends-with' },
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
    label: 'Regex',
    icon: { path: 'regex' },
    columnScope: { DataTypes: ['String'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'text' }],
    handler: ({ value, inputs }) => new RegExp(inputs[0]).test(value),
    toString: ({ inputs }) => `Regex ${inputs[0]}`,
  },

  // Date System Filters
  {
    id: 'Today',
    label: 'Today',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isToday(value),
  },
  {
    id: 'Yesterday',
    label: 'Yesterday',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isYesterday(value),
  },
  {
    id: 'Tomorrow',
    label: 'Tomorrow',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isTomorrow(value),
  },
  {
    id: 'ThisWeek',
    label: 'This Week',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isThisWeek(value),
  },
  {
    id: 'ThisMonth',
    label: 'This Month',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isThisMonth(value),
  },
  {
    id: 'ThisQuarter',
    label: 'This Quarter',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isThisQuarter(value),
  },
  {
    id: 'ThisYear',
    label: 'This Year',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isThisYear(value),
  },
  {
    id: 'InPast',
    label: 'In Past',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isPast(value),
  },
  {
    id: 'InFuture',
    label: 'In Future',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => isFuture(value),
  },
  {
    id: 'After',
    label: 'After',
    icon: { path: 'greater-than' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isAfter(value, new Date(inputs[0])),
    toString: ({ inputs }) => `> ${inputs[0]}`,
  },
  {
    id: 'Before',
    label: 'Before',
    icon: { path: 'less-than' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isBefore(value, new Date(inputs[0])),
    toString: ({ inputs }) => `< ${inputs[0]}`,
  },
  {
    id: 'On',
    label: 'Equals',
    icon: { path: 'equal' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => isSameDay(value, new Date(inputs[0])),
    toString: ({ inputs }) => `= ${inputs[0]}`,
  },
  {
    id: 'NotOn',
    label: 'NotEquals',
    icon: { path: 'not-equal' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    inputs: [{ type: 'date' }],
    handler: ({ value, inputs }) => !isSameDay(value, new Date(inputs[0])),
    toString: ({ inputs }) => `!= ${inputs[0]}`,
  },
  {
    id: 'NextWorkDay',
    label: 'Next Work Day',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getNextWorkingDay()),
  },
  {
    id: 'LastWorkDay',
    label: 'Last Work Day',
    icon: { path: 'calendar' },
    columnScope: { DataTypes: ['Date'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value, api }) => isSameDay(value, api.calendarApi.getPreviousWorkingDay()),
  },

  // Boolean System Filters
  {
    id: 'True',
    label: 'True',
    icon: { text: 'T' },
    columnScope: { DataTypes: ['Boolean'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Boolean(value) === true,
  },
  {
    id: 'False',
    label: 'False',
    icon: { text: 'F' },
    columnScope: { DataTypes: ['Boolean'] },
    functionScope: ['filter', 'alert', 'validation', 'conditionalstyle'],
    handler: ({ value }) => Boolean(value) === false,
  },
  {
    id: 'Any',
    label: 'Any Change',
    columnScope: { All: true },
    functionScope: ['alert', 'validation'],
    handler: ({ value, oldValue }) => value !== oldValue,
  },
  {
    id: 'PercentChange',
    label: 'Percent Change',
    columnScope: { DataTypes: ['Number'] },
    functionScope: ['alert', 'validation'],
    inputs: [{ type: 'number' }],
    handler: ({ value, oldValue, inputs }) =>
      (Math.abs(Number(value) - Number(oldValue)) / Number(value)) * 100 > Number(inputs[0]),
  },
  {
    id: 'PrimaryKeyDuplicate',
    label: 'Primary Key Duplicate',
    columnScope: { All: true },
    functionScope: ['validation'],
    // TODO try to put the implementation inside the handler
    handler: () => {
      throw 'This should not be called';
    },
  },
];

export const SystemFilterPredicateIds = SystemPredicateDefs.filter(p =>
  p.functionScope.includes('filter')
).map(p => p.id);
