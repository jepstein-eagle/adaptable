import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  BlotterApi,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import AdaptableBlotter from '../../../../agGrid';
import { AdaptableColumn } from '../../../../App_Scripts/PredefinedConfig/Common/AdaptableColumn';

var api: BlotterApi;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 5000;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  gridOptions.singleClickEdit = true;
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Edit Lookup Columns Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  api = AdaptableBlotter.init(adaptableBlotterOptions);
}

let demoConfig: PredefinedConfig = {
  UserInterface: {
    EditLookUpColumns: [
      {
        ColumnId: 'country',
        LookUpValues: ['UK', 'France', 'Italy', 'Germany'],
      },
      {
        ColumnId: 'counterparty',
        LookUpValues: (column: AdaptableColumn) => {
          return ['BAML', 'Nomura', 'UBS'];
        },
      },
      {
        ColumnId: 'currency',
      },
      {
        ColumnId: 'status',
      },
    ],
    PermittedColumnValues: [
      {
        ColumnId: 'status',
        PermittedValues: ['Rejected', 'Pending'],
      },
    ],
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
