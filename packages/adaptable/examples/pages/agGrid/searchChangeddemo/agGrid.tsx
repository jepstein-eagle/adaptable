import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-blue.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';

import {
  IAdaptable,
  AdaptableOptions,
  SearchChangedEventArgs,
  AdaptableApi,
  PredefinedConfig,
  MenuInfo,
} from '../../../../src/types';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import { ColumnSort } from '../../../../src/PredefinedConfig/Common/ColumnSort';

var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 100;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Search Changed Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    userFunctions: [
      // todo: test this later but get from columnfiltersdemo
    ],
  };

  api = await Adaptable.init(adaptableOptions);

  (globalThis as any).api = api;

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    console.log('search changed');
    console.log(searchChangedArgs.data[0].id);
    console.log(searchChangedArgs.data[0].id.adaptableApi);
  });
}

let demoConfig: PredefinedConfig = {
  // Need to provide something here!!!
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
