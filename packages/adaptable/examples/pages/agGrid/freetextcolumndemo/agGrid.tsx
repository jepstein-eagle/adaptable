import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(100000);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    `free text column demo`
  );
  adaptableOptions.predefinedConfig = demoConfig;
  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  const adaptableApi = await Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleButtons: ['FreeTextColumn'],
  },
  FreeTextColumn: {
    FreeTextColumns: [
      {
        ColumnId: 'Comments',
        DefaultValue: '',
        FreeTextStoredValues: [],
      },
    ],
  },
  Layout: {
    CurrentLayout: 'with freetext cols',
    Layouts: [
      {
        Columns: ['tradeId', 'country', 'notional', 'Comments'],
        RowGroupedColumns: ['currency'],
        ColumnSorts: [],
        Name: 'with freetext cols',
      },
    ],
  },
  ConditionalStyle: {
    ConditionalStyles: [
      {
        Style: {
          BackColor: '#0000ff',
          ForeColor: undefined,
          FontWeight: 'Normal',
          FontStyle: 'Normal',
          FontSize: undefined,
          ClassName: '',
        },
        Expression: '[currency]="EUR',
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
