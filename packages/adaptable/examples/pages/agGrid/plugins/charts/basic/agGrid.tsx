import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../../../src/index.scss';
import '../../../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
  SearchChangedEventArgs,
} from '../../../../../../src/types';
import { ExamplesHelper } from '../../../../ExamplesHelper';
import Adaptable from '../../../../../../agGrid';
import charts from '../../../../../../../plugins/charts/src';

var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 5000;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTradeWithSparkline(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Charts Plugin Basic Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
    plugins: [charts()],
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {};

  api = await Adaptable.init(adaptableOptions);

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    console.log('search changed');
    console.log(searchChangedArgs.data[0].id);
  });
}

let demoConfig: PredefinedConfig = {
  SparklineColumn: {
    SparklineColumns: [
      {
        ColumnId: 'history',
        SparklineType: 'Line',
      },
    ],
  },
  Dashboard: {
    Revision: 2,
    Tabs: [
      {
        Name: 'Charting',
        Toolbars: ['Chart', 'Query'],
      },
    ],
  },
  ToolPanel: {
    Revision: 2,
    VisibleToolPanels: ['Export', 'Query', 'Layout', 'Chart', 'Filter'],
  },
  SystemStatus: {
    // ShowAlert: false,
    DefaultStatusMessage: 'This is default message and its quite long',
    DefaultStatusType: 'Warning',
    StatusMessage: 'overriding with this',
    StatusType: 'Error',
  },

  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: ['tradeId', 'notional', 'counterparty', 'country'],
        Name: 'fixing a bug',
        // RowGroupedColumns: ['currency'],
        RowGroupedColumns: [],
      },
    ],
    CurrentLayout: 'fixing a bug',
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
