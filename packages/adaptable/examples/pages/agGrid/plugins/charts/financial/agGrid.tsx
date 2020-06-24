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
import { FinancialChartDefinition } from '../../../../../../src/PredefinedConfig/ChartState';

var api: AdaptableApi;

import rowData from './FTSEClose.json';

async function InitAdaptableDemo() {
  const gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      editable: true,
    },
    columnDefs: [
      {
        field: 'CloseDate',
        type: 'abColDefDate',
      },
      {
        field: 'Open',
        type: 'abColDefNumber',
      },
      {
        field: 'High',
        type: 'abColDefNumber',
      },
      {
        field: 'Low',
        type: 'abColDefNumber',
      },
      {
        field: 'Close',
        type: 'abColDefNumber',
      },
      {
        field: 'Volume',
        type: 'abColDefNumber',
      },
    ],
    rowData,
    enableRangeSelection: true,
    floatingFilter: true,
    suppressColumnVirtualisation: false,
    suppressMenuHide: true,
    sideBar: undefined,
    enableFilter: true,
    rowHeight: 30,
    rowSelection: 'multiple',
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefNumberArray: {},
      abColDefObject: {},
    },
  };

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'CloseDate',
    userName: 'Demo User',
    adaptableId: 'Charts Plugin - Financial Chart Demo',

    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    chartOptions: {
      displayOnStartUp: true,
      showModal: false,
    },
    predefinedConfig: demoConfig,
    plugins: [charts()],
  };

  adaptableOptions.layoutOptions = {
    autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {
    showAdaptableToolPanel: true,
  };

  api = await Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    Revision: 2,
    Tabs: [
      {
        Name: 'Charting',
        Toolbars: ['Chart', 'AdvancedSearch'],
      },
    ],
  },
  Chart: {
    Revision: 4,
    CurrentChartName: 'Trade date',
    ChartDefinitions: [
      {
        ChartType: 'FinancialChart',
        Description: 'For Most Populated Countries',
        Name: 'Trade date',
        VisibleRowsOnly: true,
        DataSources: [
          // {
          //   Name: 'Tesla',
          //   XAxisDateColumnId: 'CloseDate',
          //   YAxisNumericCloseColumnId: 'Close',
          //   YAxisNumericOpenColumnId: 'Open',
          //   YAxisNumericVolumeColumnId: 'Volume',
          //   YAxisNumericHighColumnId: 'High',
          //   YAxisNumericLowColumnId: 'Low',
          // },
          {
            Name: 'Amazon',
            XAxisDateColumnId: 'CloseDate',
            YAxisNumericCloseColumnId: 'Close',
            YAxisNumericOpenColumnId: 'Open',
            YAxisNumericVolumeColumnId: 'Volume',
            YAxisNumericHighColumnId: 'High',
            YAxisNumericLowColumnId: 'Low',
          },
        ],
      } as FinancialChartDefinition,
    ],
  },
  ToolPanel: {
    Revision: 2,
    VisibleToolPanels: ['Export', 'AdvancedSearch', 'Layout', 'Chart', 'ColumnFilter'],
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
