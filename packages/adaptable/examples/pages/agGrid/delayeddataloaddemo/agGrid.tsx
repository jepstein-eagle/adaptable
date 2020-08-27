import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  IAdaptable,
  AdaptableApi,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

var adaptableApi: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 50;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(null);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Delayed Data Load Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
    includeExpandedRowGroups: true,
  };

  adaptableApi = await Adaptable.init(adaptableOptions);

  setTimeout(() => {
    adaptableApi.gridApi.loadGridData(tradeData);
  }, 5000);
}

let demoConfig: PredefinedConfig = {
  FormatColumn: {
    FormatColumns: [
      {
        ColumnId: 'tradeDate',
        DisplayFormat: {
          Formatter: 'DateFormatter',
          Options: {
            Pattern: 'yyyyMMdd',
          },
        },
      },
      {
        ColumnId: 'bid',
        CellAlignment: 'Right',
      },
      {
        ColumnId: 'counterparty',
        CellAlignment: 'Center',
      },
      {
        ColumnId: 'notional',
        Style: {
          FontWeight: 'Bold',
          FontSize: 'XSmall',
          FontStyle: 'Italic',
          ClassName: '',
        },
        DisplayFormat: {
          Formatter: 'NumberFormatter',
          Options: {
            Parentheses: true,
            IntegerDigits: 3,
          },
        },
        CellAlignment: 'Center',
      },
      {
        ColumnId: 'country',
        Style: {
          BackColor: '#d4fb79',
          ForeColor: '#8b0000',
          FontWeight: 'Normal',
          FontStyle: 'Normal',
          ClassName: '',
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
