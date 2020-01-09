import { useEffect } from 'react';

import './node_modules/@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import './node_modules/@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import './node_modules/@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig, AdaptableApi } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import Adaptable from '../../../../agGrid';
import { AdaptableColumn } from '../../../../src/PredefinedConfig/Common/AdaptableColumn';
import { Report } from '../../../../src/PredefinedConfig/ExportState';

var api: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 5000;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Export Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  adaptableOptions.exportOptions = {
    exportColumnRawValue: (column: AdaptableColumn, report: Report) => {
      if (column.ColumnId === 'bid') {
        return true;
      } else if (column.ColumnId === 'tradeDate' && report.Name === 'Visible Data') {
        return true;
      }
      return false;
    },
  };
  adaptableOptions.searchOptions = {
    excludeColumnFromQuickSearch: (column: AdaptableColumn) => {
      if (column.ColumnId === 'country') {
        return true;
      }
      return false;
    },
  };

  api = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'Export', 'SystemStatus'],
  },
  Export: {
    Reports: [
      {
        Name: 'End of Day',
        ColumnIds: [
          'bid',
          'changeOnYear',
          'counterparty',
          'country',
          'currency',
          'tradeDate',
          'settlementDate',
          'ask',
          'moodysRating',
          'bloombergBid',
          'bloombergAsk',
        ],
        ReportColumnScope: 'BespokeColumns',
        ReportRowScope: 'VisibleRows',
        AutoExport: {
          Schedule: {
            Hour: 17,
            Minute: 30,
            DaysOfWeek: [5, 4, 3, 2, 1],
          },
          ExportDestination: 'JSON',
        },
      },
    ],
    CurrentReport: 'End of Day',
  },
  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: [
          'tradeId',
          'notional',
          'bid',
          'bloombergBid',
          'tradeDate',
          'settlementDate',
          'ask',
          'counterparty',
          'country',
        ],
        Name: 'export layout',
        // GroupedColumns: ['currency'],
        GroupedColumns: [],
      },
    ],
    CurrentLayout: 'export layout',
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
