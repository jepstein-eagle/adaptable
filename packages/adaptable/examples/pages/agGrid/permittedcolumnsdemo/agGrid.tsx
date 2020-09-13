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
import Adaptable from '../../../../agGrid';
import { AdaptableColumn } from '../../../../src/PredefinedConfig/Common/AdaptableColumn';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 5000;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Permitted Columns Demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  api = await Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  UserInterface: {
    PermittedValuesItems: [
      {
        Scope: {
          ColumnIds: ['status'],
        },
        PermittedValues: ['Rejected', 'Pending'],
      },

      {
        Scope: {
          ColumnIds: ['counterparty'],
        },
        PermittedValues: ['BAML', 'Nomura', 'UBS', 'JP Morgan', 'Citi', 'Soc Gen', 'Nat West'],
      },
    ],
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
