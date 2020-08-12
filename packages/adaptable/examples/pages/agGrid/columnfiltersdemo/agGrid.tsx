import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions, RowNode } from '@ag-grid-community/all-modules';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
  SearchChangedEventArgs,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

import Adaptable from '../../../../agGrid';
import { AdaptableReadyInfo } from '../../../../src/Api/Events/AdaptableReady';

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
      modules: [RangeSelectionModule, MenuModule, SideBarModule, RowGroupingModule],
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
  };
  adaptableOptions.filterPredicates = [
    {
      name: 'Positive',
      handler: value => Number(value) > 0,
      scope: { DataType: 'Number' },
    },
    {
      name: 'Contains',
      handler: (value, input) => String(value).indexOf(String(input)) !== -1,
      inputs: [{ type: 'text' }],
      scope: { DataType: 'String' },
    },
    {
      name: 'Greater Than',
      handler: (value, input) => Number(value) > Number(input),
      inputs: [{ type: 'number', default: 0 }],
      scope: { DataType: 'Number' },
    },
    {
      name: 'Between',
      handler: (value, min, max) => Number(value) > Number(min) && Number(value) < Number(max),
      inputs: [
        { type: 'number', default: 0 },
        { type: 'number', default: 0 },
      ],
      scope: { DataType: 'Number' },
    },
    {
      name: 'Today',
      handler: value => {
        let today = new Date().setHours(0, 0, 0, 0);
        return today == value.setHours(0, 0, 0, 0);
      },
      scope: { DataType: 'Date' },
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
