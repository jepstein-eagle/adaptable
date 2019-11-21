import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  IAdaptableBlotter,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { PlusMinusSummaryComponent } from '../../../../App_Scripts/View/PlusMinus/PlusMinusSummary';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 50;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Basic Demo',

    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
    stateOptions: {
      saveState: state => {
        return {
          ...state,
          name: 'atest',
        };
      },
      applyState: state => {
        const { name, ...rest } = state;

        console.log(name, '!!!');
        return rest;
      },
      loadState: () => {
        const state = JSON.parse(localStorage.getItem('xxxxx') || '');
        return Promise.resolve(state);
      },
      persistState: state => {
        localStorage.setItem('xxxxx', JSON.stringify(state));
        return Promise.resolve(true);
      },
    },
  };

  adaptableBlotterOptions.generalOptions = {
    showAdaptableBlotterToolPanel: true,
  };

  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInDefaultLayout: true,
  };
  adaptableBlotterOptions.queryOptions = {
    columnValuesOnlyInQueries: true,
  };

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi.on('SearchChanged', args => {
    console.log(args);
    /// do stuf
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Export', 'Layout'],
  },
};

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
