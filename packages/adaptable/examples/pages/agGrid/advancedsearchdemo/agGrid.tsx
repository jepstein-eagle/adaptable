import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-blue.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';
import {
  IAdaptable,
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
} from '../../../../src/types';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

var adaptableApi: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(800);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    primaryKey: 'tradeId',
    userName: 'demo user',
    adaptableId: 'advanced search demo',
  };
  adaptableOptions.predefinedConfig = demoConfig;

  adaptableApi = await Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['AdvancedSearch'],
  },
  SharedExpression: {
    SharedExpressions: [
      {
        Name: 'US Banks',
        Expression: "[counterparty] IN ('BAML', 'Citi')",
      },
    ],
  },
  ConditionalStyle: {
    ConditionalStyles: [
      {
        ConditionalStyleScope: 'Row',
        Style: {
          FontStyle: 'Italic',
        },
        Expression: {
          Type: 'Custom',
          CustomExpression: '1=1',
        },
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
