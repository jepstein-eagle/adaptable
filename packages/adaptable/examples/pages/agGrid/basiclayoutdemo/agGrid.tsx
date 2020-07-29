import React, { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';

import { GridOptions, RowNode, ColDef } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableReadyInfo,
  AdaptableApi,
  ActionColumnClickedEventArgs,
  ActionColumnClickedInfo,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

const columnSchema: ColDef[] = [
  {
    headerName: 'Make',
    field: 'make',
    filter: true,
    editable: false,
    resizable: true,
    enableRowGroup: true,
    enablePivot: true,
    sortable: true,
    type: 'abColDefString',
  },
  {
    headerName: 'Model',
    field: 'model',
    enablePivot: true,
    enableRowGroup: true,
    filter: true,
    resizable: true,
    editable: true,
    sortable: true,
    type: 'abColDefString',
  },
  {
    headerName: 'ID',
    field: 'identifier',
    filter: false,
    resizable: true,
    sortable: true,
    editable: false,
    type: 'abColDefNumber',
  },

  // {
  //   headerName: 'Year',
  //   field: 'year',
  //   enableRowGroup: true,
  //   filter: true,
  //   resizable: true,
  //   sortable: true,
  //   editable: true,
  //   type: 'abColDefNumber',
  // },
  {
    headerName: 'Price',
    field: 'price',
    aggFunc: 'avg',
    enableRowGroup: true,

    enableValue: true,
    filter: true,
    resizable: true,
    sortable: true,
    editable: true,
    type: 'abColDefNumber',
  },
];

// Step 3: Get your data (in the real world this will be dynamically sourced)
const rowData: any[] = [
  {
    make: 'Toyota',
    model: 'Celica',
    price: 35000,
    year: 2010,
    identifier: 11,
  },
  { make: 'Toyota', model: 'Yaris', price: 40000, identifier: 12, year: 2011 },
  { make: 'Toyota', model: 'Corolla', price: 28000, identifier: 13, year: 2010 },
  { make: 'Ford', model: 'Mondeo', price: 32000, identifier: 14, year: 2010 },
  { make: 'Ford', model: 'Mondeo', price: 35000, identifier: 15, year: 2017 },
  { make: 'Ford', model: 'Focus', price: 26750, identifier: 16, year: 2016 },
  { make: 'Ford', model: 'Galaxy', price: 41000, identifier: 17, year: 2017 },
  { make: 'Porsche', model: 'Boxter', price: 72500, identifier: 18, year: 2011 },
  { make: 'Porsche', model: 'Mission', price: 81000, identifier: 19, year: 2010 },
  { make: 'Mitsubbishi', model: 'Outlander', price: 97800, identifier: 110, year: 2011 },
];
async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(50000);
  const gridOptions: GridOptions = {
    columnDefs: columnSchema,
    rowData: [], //rowData,
    enableRangeSelection: true,
    sideBar: true,
    suppressAggFuncInHeader: true,
    suppressMenuHide: true,
    floatingFilter: true,
    columnTypes: {
      // not strictly required but very useful for column data type identification
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefObject: {},
      abColDefNumberArray: {},
    },
  };
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'identifier',
    userName: 'Demo User',
    adaptableId: 'Basic Setup Demo Layout',
    userInterfaceOptions: {
      showAdaptableToolPanel: true,
    },

    layoutOptions: {
      autoSaveLayouts: true,
      includeOpenedRowGroups: true,
    },
    userFunctions: [
      {
        type: 'ActionColumnRenderFunction',
        name: 'renderMultiplyFunction',
        handler(params) {
          if (!params.rowData) {
            console.log(params);
            return '';
          }
          return params.rowData.Employee == 'Robert King' ||
            params.rowData.Employee == 'Janet Leverling'
            ? '<button style="color:blue; font-weight:bold">Double</button>'
            : '<button style="color:red; font-weight:bold; font-style:italic">Treble</button>';
        },
      },
      {
        type: 'ActionColumnShouldRenderPredicate',
        name: 'shouldRenderMultiplyPredicate',
        handler(params) {
          if (!params.rowData) {
            console.log(params);
            return false;
          }
          return params.rowData.Employee != 'Margaret Peacock';
        },
      },
    ],
    predefinedConfig: demoConfig,
    vendorGrid: { ...gridOptions, modules: AllEnterpriseModules },
    plugins: [],
  };

  // Step 6: Instantiate AdapTable using the Static Contstructor passing in the AdaptableOptions object
  // Note that the constructor returns the AdaptableApi object which gives run time access to AdapTable functions
  // Pass in the GridOptions object as the vendorGrid property (and add any Enterprise modules)
  const adaptableApi: AdaptableApi = await Adaptable.init(adaptableOptions);

  adaptableApi.eventApi.on(
    'ActionColumnClicked',
    (actionColumnEventArgs: ActionColumnClickedEventArgs) => {
      let actionColumnClickedInfo: ActionColumnClickedInfo = actionColumnEventArgs.data[0].id;
      let rowData: any = actionColumnClickedInfo.rowData;
      const column = actionColumnEventArgs.data[0].id.actionColumn;
      if (column.ColumnId == 'Plus') {
        let price = rowData.price;
        adaptableApi.gridApi.setCellValue(
          'price',
          price + 1,
          actionColumnClickedInfo.primaryKeyValue,
          true
        );
      } else if (column.ColumnId == 'Minus') {
        let price = rowData.price;
        adaptableApi.gridApi.setCellValue(
          'price',
          price - 1,
          actionColumnClickedInfo.primaryKeyValue,
          true
        );
      } else if (column.ColumnId == 'Multiply') {
        let multiplier: number =
          rowData.Employee == 'Robert King' || rowData.Employee == 'Janet Leverling' ? 2 : 3;
        let newItemCost = rowData.ItemCost * multiplier;
        newItemCost = Math.round(newItemCost * 100) / 100;
        adaptableApi.gridApi.setCellValue(
          'ItemCost',
          newItemCost,
          actionColumnClickedInfo.primaryKeyValue,
          true
        );
      } else if (column.ColumnId == 'Action') {
        adaptableApi.gridApi.deleteGridData([actionColumnClickedInfo.rowData]);
      }
    }
  );
  // Step 7 (optional): Listen to the AdaptableReady event to do anything required at startup
  // Here we are using the AdaptableApi to run a quick search via code
  adaptableApi.eventApi.on('AdaptableReady', ({ vendorGrid }: { vendorGrid: GridOptions }) => {
    vendorGrid.api?.addEventListener('gridReady', () => {
      alert('grid ready!');
    });
    adaptableApi.quickSearchApi.applyQuickSearch('o*');
    setTimeout(() => {
      vendorGrid.api?.setRowData(rowData);
    }, 500);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout'],

    VisibleButtons: ['FreeTextColumn', 'ColumnChooser', 'CalculatedColumn'],
    Revision: 5,
  },

  ActionColumn: {
    Revision: 5,
    ActionColumns: [
      {
        ColumnId: 'Multiply',
        ButtonText: 'Click',
        ShouldRenderPredicate: 'shouldRenderMultiplyPredicate',
        RenderFunction: 'renderMultiplyFunction',
      },
      {
        ColumnId: 'Plus',
        FriendlyName: 'The plus',
        ButtonText: '+',
      },
      {
        ColumnId: 'Minus',
        ButtonText: '-',
      },
      {
        ColumnId: 'Action',
        ButtonText: 'Delete Row',
      },
    ],
  },
  CalculatedColumn: {
    Revision: 5,
    CalculatedColumns: [
      // {
      //   ColumnId: 'Price1000',
      //   FriendlyName: 'Price multipled 1000',
      //   ColumnExpression: 'Col("price") * 1000',
      // },
    ],
  },
  FreeTextColumn: {
    Revision: 5,
    FreeTextColumns: [
      // {
      //   ColumnId: 'test',
      //   FriendlyName: 'test',
      //   DefaultValue: 'test default value',
      // },
    ],
  },
  // Layout: {
  //   CreateDefaultLayout: false,
  //   Revision: 5,
  //   CurrentLayout: 'Simple Layout',
  //   Layouts: [
  //     {
  //       Name: 'Simple Layout',
  //       Columns: ['model', 'make', 'Multiply'],
  //     },
  //     {
  //       Name: 'Pivot Layout',
  //       Columns: [],
  //       PivotDetails: {
  //         PivotColumns: ['make'],
  //         AggregationColumns: ['price'],
  //       },
  //     },
  //     {
  //       Name: 'Full Layout',
  //       Columns: ['year', 'model', 'make', 'identifier'],
  //       GroupedColumns: ['make', 'model'],
  //       ColumnWidthMap: {
  //         model: 600,
  //         year: 400,
  //       },
  //       ColumnFlexMap: {
  //         make: 1,
  //       },
  //       ExpandedRowGroupKeys: ['Toyota', 'Toyota/Celica'],
  //       PinnedColumnsMap: {
  //         // year: 'left',
  //         // model: 'right',
  //       },
  //       ColumnSorts: [
  //         {
  //           Column: 'model',
  //           SortOrder: 'Descending',
  //         },
  //       ],
  //     },
  // ],
  // },
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
