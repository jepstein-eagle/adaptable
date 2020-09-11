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
    // lockPinned: true,
    enableRowGroup: true,
    hide: true,
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
    hide: true,
    sortable: true,
    editable: false,
    type: 'abColDefNumber',
  },

  {
    headerName: 'Year',
    field: 'year',
    enableRowGroup: true,
    lockVisible: true,
    filter: true,
    aggFunc: 'sum',
    resizable: true,
    sortable: true,
    editable: true,
    type: 'abColDefNumber',
  },
  {
    headerName: 'Year2',
    field: 'year',
    colId: 'year2',
    enableRowGroup: true,
    lockVisible: true,
    filter: true,
    aggFunc: 'sum',
    resizable: true,
    sortable: true,
    editable: true,
    type: 'abColDefNumber',
  },
  {
    headerName: 'Price',
    field: 'price',
    aggFunc: 'min',
    enableRowGroup: true,
    enableValue: true,
    filter: true,
    resizable: true,
    sortable: true,
    editable: true,
    type: 'abColDefNumber',
  },
  {
    headerName: 'Rating',
    field: 'rating',
    enableRowGroup: true,
    filter: true,
    resizable: true,
    suppressMovable: true,
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
  { make: 'Toyota', model: 'Yaris', price: 10, identifier: 12, year: 2011, rating: 1 },
  { make: 'Toyota', model: 'Corolla', price: 20, identifier: 13, year: 2010, rating: 2 },
  { make: 'Ford', model: 'Mondeo', price: 30, identifier: 14, year: 2010, rating: 3 },
  { make: 'Ford', model: 'Mondeo', price: 40, identifier: 15, year: 2017, rating: 4 },
  { make: 'Ford', model: 'Focus', price: 50, identifier: 16, year: 2016, rating: 5 },
  { make: 'Ford', model: 'Galaxy', price: 60, identifier: 17, year: 2017, rating: 6 },
  { make: 'Porsche', model: 'Boxter', price: 70, identifier: 18, year: 2011, rating: 7 },
  { make: 'Porsche', model: 'Mission', price: 80, identifier: 19, year: 2010, rating: 8 },
  { make: 'Mitsubbishi', model: 'Outlander', price: 90, identifier: 110, year: 2011, rating: 9 },
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
    adaptableId: 'Basic Setup Demo Layout 1',
    userInterfaceOptions: {},

    layoutOptions: {
      autoSaveLayouts: true,
      autoSizeColumnsInLayout: false,
      autoSizeColumnsInPivotLayout: true,
      includeExpandedRowGroups: true,
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
    // setTimeout(() => {
    // adaptableApi.gridApi.showColumn('rating');
    // }, 3000);
  });
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleButtons: ['FreeTextColumn', 'Layout', 'CalculatedColumn'],
    Revision: 5,
  },

  SystemStatus: {
    Revision: 1,
    StatusType: 'Info',
    StatusMessage: 'all good',
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
  Layout: {
    Revision: Date.now(),
    CurrentLayout: 'Test',
    Layouts: [
      {
        Name: 'Simple Layout',
        AutoSave: true,
        Columns: ['price', 'model', 'make', 'Multiply'],
        PivotDetails: {
          PivotColumns: ['make'],
          //  AggregationColumns: ['InvoicedCost', 'ItemCost'],
          AggregationColumns: ['price'],
        },
      },
    ],
  },
  // Layout: {
  //   CreateDefaultLayout: true,
  //   // },
  //   // // Layout: {
  //   //   CreateDefaultLayout: false,
  //   Revision: 2,
  //   CurrentLayout: 'Simple Layout',

  //     {
  //       Name: 'Full Layout',
  //       Columns: ['year', 'model', 'make', 'identifier', 'price'],
  //       RowGroupedColumns: ['make'],
  //       // GroupedColumns: ['make', 'model'],
  //       ColumnWidthMap: {
  //         model: 600,
  //         year: 400,
  //       },
  //       ColumnFlexMap: {
  //         make: 1,
  //       },
  //       //  ExpandedRowGroupKeys: ['Toyota', 'Toyota/Celica'],
  //       PinnedColumnsMap: {
  //         // year: 'left',
  //         // model: 'right',
  //       },
  //       ColumnSorts: [
  //         {
  //           ColumnId: 'model',
  //           SortOrder: 'Desc',
  //         },
  //       ],
  //     },
  //   ],
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
