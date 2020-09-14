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
import { Report } from '../../../../src/PredefinedConfig/ExportState';
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
    adaptableId: 'Export Demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };

  adaptableOptions.filterOptions = {
    //  clearFiltersOnStartUp: true,
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
  (adaptableOptions.userFunctions = [
    {
      type: 'CustomReportFunction',
      name: 'getDummyData',
      handler(reportName: string) {
        // this will typically run a call on the server but here we just provide some dummy data
        // note that it takes the form of an array of arrays - each array is a row and must match the column names
        let data = [
          ['Joe', 52, 'London'],
          ['Dawn', 39, 'New York'],
          ['Peter', , 'France'],
          ['Eleanor', 55],
        ];
        return data;
      },
    },
  ]),
    (api = await Adaptable.init(adaptableOptions));
}

let demoConfig: PredefinedConfig = {
  Export: {
    Reports: [
      {
        ReportColumnScope: 'CustomColumns',
        ReportRowScope: 'CustomRows',
        Scope: { ColumnIds: ['Name', 'Age', 'Location'] },
        Name: 'People Report',
        CustomReportFunction: 'getDummyData',
      },
      {
        Name: 'End of Day',
        Scope: {
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
        },
        ReportColumnScope: 'ScopeColumns',
        ReportRowScope: 'VisibleRows',
      },
    ],
    CurrentReport: 'People Report',
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
        // RowGroupedColumns: ['currency'],
        RowGroupedColumns: [],
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
