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
  const tradeCount: number = 20;
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
    filterOptions: {
      useVendorFilterFormStyle: true,
      useAdaptableFilterForm: true,
    },
    userFunctions: [
      {
        type: 'CustomReportFunction',
        name: 'getDummyData',
        handler(reportName: string) {
          let data = [
            ['Eliana', 5],
            ['Naftali', 9],
            ['Sigal', 10],
          ];
          return data;
        },
      },
    ],
    predefinedConfig: {
      Theme: {
        Revision: Date.now(),
        // SystemThemes: [
        //   {
        //     Name: 'light',
        //     Description: 'light theme',
        //     VendorGridClassName: 'ag-theme-alpine',
        //   },
        //   {
        //     Name: 'dark',
        //     Description: 'dark theme',
        //     VendorGridClassName: 'ag-theme-alpine-dark',
        //   },
        // ],
      },
      Dashboard: {
        Revision: 141,
        CanFloat: false,
        Tabs: [
          {
            Name: 'General',
            Toolbars: ['Toolbar1', 'SmartEdit', 'CellSummary', 'Layout'],
          },
        ],
        VisibleButtons: ['CellSummary', 'ColumnChooser'],
        CustomToolbars: [
          {
            Name: 'Toolbar1',
            Title: 'Demo Toolbar',
            Glyph: 'advanced-search',
            ToolbarButtons: [
              {
                Name: 'btnNewLayout',
                Caption: 'New Layout',
              },
              {
                Name: 'btnCopyLayout',
                Caption: 'Copy Layout',
              },
              {
                Name: 'btnCopyLayout',
                Caption: 'Copy Layout',
              },
            ],
          },
        ],
        ShowFunctionsDropdown: true,
        //  HomeToolbarTitle: 'Hello world',
        ShowQuickSearchInHeader: true,
        IsInline: false, // making it false in Redux so we dont forget but true here for testing purposes
      },
      SystemStatus: {
        Revision: 13,
        DefaultStatusMessage: 'System Running Fine',
        DefaultStatusType: 'Error',
      },
      AdvancedSearch: {
        Revision: 4,
        AdvancedSearches: [],
      },
      FormatColumn: {
        FormatColumns: [
          {
            ColumnId: 'notional',
            CellAlignment: 'Right',
          },
        ],
      },
      QuickSearch: {
        Revision: 11,
        QuickSearchText: 'b',
      },
      Entitlements: {
        Revision: 3,
        DefaultAccessLevel: 'Full',
        FunctionEntitlements: [
          {
            FunctionName: 'Layout',
            AccessLevel: 'Full',
          },
          {
            FunctionName: 'Dashboard',
            AccessLevel: 'Full',
          },
        ],
      },
      PercentBar: {
        Revision: 1,
        PercentBars: [
          {
            ColumnId: 'changeOnYear',
            PositiveValue: 200,
            NegativeValue: -200,
            NegativeColor: '#FF0000',
            PositiveColor: '#008000',
            ShowValue: false,
          },
        ],
      },
      Export: {
        Revision: 4,
        Reports: [
          {
            ReportColumnScope: 'BespokeColumns',
            ReportRowScope: 'CustomRows',
            ColumnIds: ['notional', 'currency'],
            Name: 'My Custom Report',
            CustomReportFunction: 'getDummyData',
          },
        ],
      },
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
        GroupedColumns: ['country'],
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
      const gridOptions: GridOptions = api.gridApi.getadaptableOptions().vendorGrid as GridOptions;
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

  // tickingDataHelper.useTickingDataagGrid(adaptableOptions.vendorGrid, api, 200, tradeCount);

  setTimeout(() => {
    api.eventApi.on('AdaptableReady', (info: AdaptableReadyInfo) => {
      console.log('READY');
      // info.adaptableApi.layoutApi.setLayout(newLayout.Name);
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
  }, 3000);

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
