import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 50;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Basic Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
    stateOptions: {
      saveState: state => {
        console.log('in save state');
        return {
          ...state,
          name: 'Jonny',
        };
      },
      applyState: state => {
        const { name, ...rest } = state;
        console.log('in apply state name is:', name);
        return rest;
      },
      loadState: () => {
        let state = localStorage.getItem('TestingState');
        if (state != null) {
          state = JSON.parse(state);
        }
        console.log('in load state:', state);
        return Promise.resolve(state);
      },
      persistState: state => {
        localStorage.setItem('TestingState', JSON.stringify(state));
        return Promise.resolve(true);
      },
    },
    layoutOptions: {
      autoSizeColumnsInLayout: true,
    },
  };

  adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Export', 'Layout'],
  },
};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
