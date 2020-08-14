import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

import Adaptable from '../../../../agGrid';
import Helper from '../../../../src/Utilities/Helpers/Helper';
import {
  isToday,
  isYesterday,
  isTomorrow,
  isFuture,
  isPast,
  isThisYear,
  isThisQuarter,
  isAfter,
  isBefore,
  isSameDay,
} from 'date-fns';
import { isThisWeek, isThisMonth } from 'date-fns/esm';

var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 50;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Column Filters Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
  };
  adaptableOptions.filterOptions = {
    autoApplyFilter: true,
  };
  adaptableOptions.filterPredicates = [
    {
      id: 'Greater Than',
      label: 'Greater Than',
      scope: { DataType: 'Number' },
      inputs: [{ type: 'number', default: 0 }],
      handler: ({ value, inputs }) => Number(value) > Number(inputs[0]),
    },
    {
      id: 'Less Than',
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
      handler: ({ value, inputs }) => {
        return new RegExp(inputs[0]).test(value);
      },
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
      id: 'Blanks',
      label: 'Blanks',
      handler: ({ value }) => Helper.IsInputNullOrEmpty(value),
    },
    {
      id: 'Non Blanks',
      label: 'Non Blanks',
      handler: ({ value }) => Helper.IsInputNotNullOrEmpty(value),
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

  api = await Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
