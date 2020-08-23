import { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';
import { GridOptions, Column, ColDef } from '@ag-grid-community/all-modules';
import {
  AdaptableOptions,
  AdaptableApi,
  AdaptableReadyInfo,
  SearchChangedEventArgs,
  ToolbarButtonClickedInfo,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
import Adaptable from '../../../../agGrid';
import { TickingDataHelper } from '../../TickingDataHelper';
import { Layout } from '../../../../src/PredefinedConfig/LayoutState';
import { ToolbarButton } from '../../../../src/PredefinedConfig/Common/ToolbarButton';
var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeCount: number = 5;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Basic Demo New',
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
    },
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    generalOptions: {
      showMissingColumnsWarning: false,
    },
    layoutOptions: {
      autoSizeColumnsInDefaultLayout: false,
    },

    predefinedConfig: {
      /*
      Layout: {
        CurrentLayout: 'Simple Layout',

        Layouts: [
          {
            Name: 'Simple Layout',
            Columns: ['country', 'currency', 'countryStars', 'tradeId', 'notional', 'counterparty'],
          },
        ],

      },
      */
    },
  };

  api = await Adaptable.init(adaptableOptions);

  api.eventApi.on('ToolbarButtonClicked', toolbarButtonClickedEventArgs => {
    let eventInfo: ToolbarButtonClickedInfo = toolbarButtonClickedEventArgs.data[0].id;
    let toolbarButton = eventInfo.toolbarButton;

    if (toolbarButton.Name == 'btnNewLayout') {
      let newLayout: Layout = {
        Name: 'test',
        Columns: ['bid', 'currency', 'counterparty'],
        //  GroupedColumns: ['country'],
      };
      // api.layoutApi.createAndSetLayout(newLayout);
      api.gridApi.showQuickFilterBar();
    } else if (toolbarButton.Name == 'btnCopyLayout') {
      api.gridApi.hideQuickFilterBar();

      let cols: string[] = ['Person', 'How much loves Dad'];

      let data = [
        ['Eliana', 5],
        ['Naftali', 9],
        ['Sigal', 10],
      ];

      api.exportApi.exportDataToExcel(cols, data, 'Test Report');
      //   let currentLayout = api.layoutApi.getCurrentLayout();
      //  let testLayout: Layout = api.layoutApi.getLayoutByName('test');

      //  api.layoutApi.cloneAndSetLayout(currentLayout, 'Hello World');

      //  api.customSortApi.addCustomSort()

      console.log('here world');
      const gridOptions: GridOptions = api.internalApi.getAdaptableOptions()
        .vendorGrid as GridOptions;
      console.log(gridOptions);
      let bbgBid: ColDef = {
        headerName: 'Bbg Bid',
        field: 'bloombergBid',
        type: 'abColDefNumber',
        hide: true,
        sortable: true,
      };
      let columnDefs: any = gridOptions.columnDefs;
      columnDefs?.push(bbgBid);
      gridOptions.api?.setColumnDefs(columnDefs);
    }
  });

  tickingDataHelper.useTickingDataagGrid(adaptableOptions.vendorGrid, api, 200, tradeCount);

  setTimeout(() => {
    api.eventApi.on('AdaptableReady', (info: AdaptableReadyInfo) => {
      console.log('READY');
      //  api.gridApi.setCellValue('changeOnYear', 300, 1, true);
      /*
    setTimeout(() => {
      api.dashboardApi.floatDashboard();
    }, 2000);
    setTimeout(() => {
      api.dashboardApi.unFloatDashboard();
    }, 4000);
    setTimeout(() => {
      api.dashboardApi.collapseDashboard();
    }, 6000);
    setTimeout(() => {
      api.dashboardApi.unCollapseDashboard();
    }, 8000); */
      //  info.adaptableApi.flashingCellApi.showFlashingCellPopup();
    });
  }, 10000);

  api.eventApi.on('SearchChanged', (searchChangedArgs: SearchChangedEventArgs) => {
    //  console.log('search changed');
    //  console.log(searchChangedArgs.data[0].id);
  });
}

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
