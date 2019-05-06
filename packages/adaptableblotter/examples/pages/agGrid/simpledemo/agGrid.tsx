import React, { useEffect } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { Grid } from 'ag-grid-community/dist/lib/grid'

import AdaptableBlotter from '../../../../App_Scripts/agGrid'

import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'

import { DataGenerator } from '../../../../Harness/DataGenerator'
import { IAdaptableBlotter } from '../../../../App_Scripts/types';
import { GridOptions, ColDef } from 'ag-grid-community';
import { AdaptableBlotterState } from '../../../../App_Scripts/Redux/Store/Interface/IAdaptableStore';
import { ExportDestination } from '../../../../App_Scripts/Utilities/Enums';
import { ISearchChangedEventArgs, IColumnStateChangedEventArgs, IStateChangedEventArgs, IAlertFiredEventArgs } from '../../../../App_Scripts/Utilities/Interface/IStateEvents';

var adaptableblotter: IAdaptableBlotter;
var quickSearchText: string;
var trades: any;
var gridOptions: GridOptions;
var showTrade = true;

// these 2 functions are used currently when demoing how to access teh api outside the Blotter
// Ideally they should go into a DIFFERENT demo once we start to have more than one
function runQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  adaptableblotter.api.quickSearchApi.applyQuickSearch(element.value);
}

function clearQuickSearchViaAPI() {
  const element: any = document.getElementById('txtQuickSearchText');
  element.value = '';
  adaptableblotter.api.quickSearchApi.clearQuickSearch();
}


function getRowsForGrid(dataGen: any): any {
  if (showTrade) {
    return dataGen.getTrades(5);
  }
  return dataGen.getFtseData(199);
}

function getColumnsForGrid(): ColDef[] {
  if (showTrade) {
    return getTradeSchema();
  }
  return getFTSESchema();
}

function getPKForGrid() {
  if (showTrade) {
    return 'tradeId';
  }
  return 'date';
}

function getBlotterIdforGrid() {
  if (showTrade) {
    return 'trade demo';
  }
  return 'demo ftse';
}

function InitTradeBlotter() {
  const dataGen = new DataGenerator();
  trades = getRowsForGrid(dataGen);


  // Create a GridOptions object.  This is used to create the ag-Grid
  // And is also passed into the IAdaptableBlotterOptionsAgGrid object as well
  gridOptions = {
    columnDefs: getColumnsForGrid(), // returns a list of agGrid column definitions
    rowData: trades, // the dummy data we are using
    enableRangeSelection: true,
    floatingFilter: true,
    suppressColumnVirtualisation: false,
    suppressMenuHide: true,
    sideBar: undefined, // this puts in filters and columns by default
    getRowNodeId: (data) => {
      return data.tradeId;
    },

    /*
        sideBar: {
          toolPanels: [
            {
              id: 'columns',
              labelDefault: 'Columns',
              labelKey: 'columns',
              iconKey: 'columns',
              toolPanel: 'agColumnsToolPanel',
            },
            {
              id: 'filters',
              labelDefault: 'Filters',
              labelKey: 'filters',
              iconKey: 'filter',
              toolPanel: 'agFiltersToolPanel',
            },
          ],
        },
    */
    columnTypes: { // not required but helpful for column data type identification
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefObject: {},
    },
  };

  var instantiateAgGridInHarness = true;
  // Create and instantiate an ag-Grid object - now want to do this ONLY in the AB!
  // NOTE: we much prefer it if the vendor Grid is created by us and not by the user...
  if (instantiateAgGridInHarness) {
    const gridcontainer: HTMLElement = document.getElementById('grid') as HTMLElement;
    gridcontainer.innerHTML = '';
    const grid = new Grid(gridcontainer, gridOptions);
  }
  //dataGen.startTickingDataagGrid(gridOptions);

  const s = 2;

  if (s === 2) {
    // Create an Adaptable Blotter passing in the ag-Grid Options as the VendorGrid property
    const adaptableBlotterOptions = {
      vendorGrid: gridOptions, // the ag-Grid grid options object - MANDATORY
      primaryKey: getPKForGrid(), // pk for blotter - required
      userName: 'demo user', // name of current user
      blotterId: getBlotterIdforGrid(), // id for blotter

      //   predefinedConfig: dataSourceJson,
      auditOptions: {
        //     auditCellEdits: true,
        //  auditFunctionEvents: true,
        //     auditUserStateChanges: true,
        //     auditInternalStateChanges: true,
        //        pingInterval: 120
      },
      containerOptions: {
        chartContainer: 'chart-container-xx', // set our own container
        vendorContainer: 'grid',
      },
      licenceKey: 'abc5834u-yt5a4evp1-r1oq9nclf1',
      configServerOptions: {
        //   enableConfigServer: true,
        //   configServerUrl: 'http://localhost:8080/adaptableblotter-config',
      },
      layoutOptions: {
        includeVendorStateInLayouts: true,
        autoSaveLayouts: true,
      },
      queryOptions: {
        //  ignoreCaseInQueries: false,
        // maxColumnValueItemsDisplayed: 5,
        //  columnValuesOnlyInQueries: true,
        // getColumnValues: retrieveValues,
      },
      filterOptions: {
        useAdaptableBlotterFilterForm: true,
        useAdaptableBlotterFloatingFilter: true
      },
      chartOptions: {
        displayOnStartUp: true,
        showModal: false,
        // pieChartMaxItems: 100
      },
      generalOptions: {
        showAdaptableBlotterToolPanel: true,
        // serverSearchOption: "AdvancedSearch", // performing AdvancedSearch on the server, not the client
      },
      iPushPullConfig: {
        api_key: 'CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP',
        api_secret: 'xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj',
        api_url: 'https://www.ipushpull.com/api/1.0',
        hsts: false,
      }

    };

    // instantiate the Adaptable Blotter, passing in JUST the AdaptableBlotterOptions

    adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
 
  //  adaptableblotter.adaptableBlotterStore.TheStore.subscribe(() => {
   //   apiTester(adaptableblotter.adaptableBlotterStore.TheStore.getState(), gridOptions);
   // });
    
    //  adaptableblotter.api.eventApi.onColumnStateChanged().Subscribe((sender, columnChangedArgs) => listenToColumnStateChange(columnChangedArgs));
    //  adaptableblotter.api.eventApi.onAlertFired().Subscribe((sender, alertFiredArgs) => listenToAlertFired(alertFiredArgs));
    //  adaptableblotter.api.eventApi.onStateChanged().Subscribe((sender, stateChangedArgs) => listenToStateChange(stateChangedArgs));
    //  adaptableblotter.api.eventApi.onSearchedChanged().Subscribe((sender, searchChangedArgs) => listenToSearchChange(searchChangedArgs));
    setTimeout(() => {
      if (adaptableblotter.adaptableBlotterStore.TheStore.getState().Layout.CurrentLayout === 'Ab_Default_Layout') {
        gridOptions.columnApi.autoSizeAllColumns();
      }
    });
  }
}

function retrieveValues(columnName: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(getValuesForColumn(columnName)), 500);
  });
}

function listenToColumnStateChange(columnChangedArgs: IColumnStateChangedEventArgs) {
  console.log("column event received");
  console.log(columnChangedArgs);
}

function listenToStateChange(stateChangedArgs: IStateChangedEventArgs) {
  console.log("state event received");
  console.log(stateChangedArgs);
}

function listenToSearchChange(searchChangedArgs: ISearchChangedEventArgs) {
  console.log("search changed event received");
  console.log(searchChangedArgs);
}

function listenToAlertFired(alertFiredArgs: IAlertFiredEventArgs) {
  console.log('alert fired event received');
  console.log(alertFiredArgs.alert);
}

function getValuesForColumn(columnName: string) {
  let vals;
  if (columnName === 'notionalhhh') {
    vals = [1000000, 5000000, 10000000];
  } else if (columnName === 'settlementDate') {
    vals = [
      trades[0].settlementDate,
      trades[1].settlementDate,
      trades[2].settlementDate,
      trades[3].settlementDate,
      trades[4].settlementDate,
    ];
  } else {
    vals = ['val1', 'val2', 'val3'];
  }
  return {
    DistinctCriteriaPairValue: 'DisplayValue',
    ColumnValues: vals,
  };
}

function getFTSESchema(): ColDef[] {
  var schema: any[] = [];
  schema.push({
    headerName: 'Date',
    field: 'date',
    editable: false,
    filter: true,
    cellEditorParams: {
      useFormatter: true,
    },
    valueParser: dateParseragGrid,
    valueFormatter: shortDateFormatteragGrid,
  });

  schema.push({
    headerName: 'Start',
    field: 'start',
    filter: true,
    editable: true,
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'End',
    field: 'end',
    filter: true,
    editable: true,
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'Low',
    field: 'low',
    filter: true,
    editable: true,
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'High',
    field: 'high',
    editable: true,
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'Volume',
    field: 'volume',
    filter: true,
    editable: true,
    cellClass: 'number-cell',
  });

  return schema;
}

function getTradeSchema(): ColDef[] {
  var schema: any[] = [];
  schema.push({
    headerName: 'Trade Id',
    field: 'tradeId',
    editable: true,
    type: 'abColDefNumber',
    sortable: false,
    filter: true,
  });
  schema.push({
    headerName: 'Notional',
    field: 'notional',
    enableValue: true,
    editable: true,
    // valueFormatter: notionalFormatter,
    cellClass: 'number-cell',
    type: 'abColDefNumber',
    filter: true
  });
  schema.push({
    headerName: 'Counterparty',
    field: 'counterparty',
    editable: true,
    enableRowGroup: true,
    filter: true,
    sortable: true,
    type: 'abColDefString',
  });

  schema.push({
    headerName: 'Change',
    field: 'changeOnYear',
    filter: true,
    editable: true,
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Currency',
    field: 'currency',
    editable: true,
    enableRowGroup: true,
    sortable: true,
    filter: 'agTextColumnFilter',
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Status',
    field: 'status',
    editable: true,
    filter: true,
    sortable: true,
    enableRowGroup: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'B/O Spread',
    field: 'bidOfferSpread',
    columnGroupShow: 'open',
    enableValue: true,
    editable: true,
    filter: true,
    cellClass: 'number-cell',
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Price',
    field: 'price',
    columnGroupShow: 'open',
    editable: true,
    enableValue: true,
    cellClass: 'number-cell',
    enableRowGroup: true,
    filter: 'agNumberColumnFilter',
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Country',
    field: 'country',
    editable: true,
    filter: true,
    sortable: true,
    enableRowGroup: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Ask',
    field: 'ask',
    columnGroupShow: 'closed',
    filter: true,
    cellClass: 'number-cell',
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'DV01',
    field: 'dv01',
    columnGroupShow: 'closed',
    filter: true,
    cellClass: 'number-cell',
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Bid',
    field: 'bid',
    columnGroupShow: 'closed',
    filter: true,
    cellClass: 'number-cell',
    type: 'abColDefNumber',
  });

  schema.push({
    headerName: 'Bbg Ask',
    field: 'bloombergAsk',
    columnGroupShow: 'closed',
    cellClass: 'number-cell',
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Bbg Bid',
    field: 'bloombergBid',
    columnGroupShow: 'closed',
    cellClass: 'number-cell',
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Moodys',
    field: 'moodysRating',
    editable: true,
    filter: 'text',
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Trade Date',
    field: 'tradeDate',
    editable: true,
    cellEditorParams: {
      useFormatter: true,
    },
    valueParser: dateParseragGrid,
    valueFormatter: shortDateFormatteragGrid,
    filter: 'agDateColumnFilter',
    type: 'abColDefDate',
  });
  schema.push({
    headerName: 'SandP',
    field: 'sandpRating',
    editable: true,
    sortable: true,
    filter: 'text',
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Settlement Date',
    field: 'settlementDate',
    editable: true,
    cellEditorParams: {
      useFormatter: true,
    },
    valueParser: dateParseragGrid,
    valueFormatter: shortDateFormatteragGrid,
    type: 'abColDefDate',
  });
  schema.push({
    headerName: 'Last Updated By',
    field: 'lastUpdatedBy',
    enableRowGroup: true,
    type: 'abColDefString',
  });
  schema.push({
    headerName: 'Last Updated',
    field: 'lastUpdated',
    editable: true,
    cellEditorParams: {
      useFormatter: true,
    },
    valueParser: dateParseragGrid,
    valueFormatter: shortDateFormatteragGrid,
    type: 'abColDefDate',
  });
  schema.push({
    headerName: 'Pct Change',
    field: 'percentChange',
    editable: true,
    filter: 'text',
    type: 'abColDefNumber',
  });
  schema.push({
    headerName: 'Desk No.',
    field: 'deskId',
    editable: true,
    //   type: 'abColDefNumber',
    // cellRenderer: percentCellRenderer,
    enableRowGroup: true,
    type: 'abColDefString',
  });
  return schema;
}





function apiTester(state: AdaptableBlotterState, gridOptions: GridOptions) {
  if (state.QuickSearch.QuickSearchText !== quickSearchText) {
    quickSearchText = state.QuickSearch.QuickSearchText;
    if (quickSearchText === '#advanced') {
      const test = adaptableblotter.api.configApi.configGetUserStateByFunction('AdvancedSearch', false);
      console.log('object');
      console.log(test);
      const test2 = adaptableblotter.api.configApi.configGetUserStateByFunction('AdvancedSearch', true);
      console.log('string version');
      console.log(test2);
      const test3 = adaptableblotter.api.configApi.configGetAllUserState();
      console.log('all version');
      console.log(test3);
      const test4 = adaptableblotter.api.configApi.configGetAdvancedSearchState(false);
      console.log('advanced search');
      console.log(test4);
      const test5 = adaptableblotter.api.configApi.configGetAdvancedSearchState(true);
      console.log('advanced search string');
      console.log(test5);
    } else if (quickSearchText === '#hideabout') {
      adaptableblotter.api.dashboardApi.HideAboutButton();
    } else if (quickSearchText === '#showabout') {
      adaptableblotter.api.dashboardApi.ShowAboutButton();
    } else if (quickSearchText === '#permies') {
      adaptableblotter.api.userInterfaceApi.setColumnPermittedValues('counterparty', ['first', 'second', 'third']);
    } else if (quickSearchText === '#systemfilters') {
      adaptableblotter.api.systemFilterApi.clearSystemFilter();
    } else if (quickSearchText === '#reset') {
      //     adaptableblotter.api.configDeleteLocalStorage()
    } else if (quickSearchText === '#loadUserState') {
      //  adaptableblotter.api.configApi.loadUserState(oldjson);
    } else if (quickSearchText === '#miguel') {
      setTimeout(() => adaptableblotter.api.userInterfaceApi.setColumnPermittedValues('deskId', ['5555555',
        '8888888',
      ]), 20000);
    } else if (quickSearchText === '#allsf') {
      const thisxx = adaptableblotter.api.systemFilterApi.getAllSystemFilter();
    } else if (quickSearchText === '#permiex') {
      adaptableblotter.api.userInterfaceApi.setColumnPermittedValues('counterparty', ['fourth', 'fith', 'sixth']);
    } else if (quickSearchText === '#clear') {
      adaptableblotter.api.userInterfaceApi.clearColumnPermittedValues('counterparty');
    } else if (quickSearchText === '#send') {
      adaptableblotter.api.exportApi.sendReport('All Data', ExportDestination.CSV);
    } else if (quickSearchText === '#info') {
      adaptableblotter.api.alertApi.displayAlert('Nice one', 'Your data is fine actually its very good and I want to check that this wraps', 'Info', true);
    } else if (quickSearchText === '#success') {
      adaptableblotter.api.alertApi.displayAlert('Success Message', 'You have won the lottery', 'Success', true);
    } else if (quickSearchText === '#warning') {
      adaptableblotter.api.alertApi.displayAlert('End of Day', 'Dont forget to send the report', 'Warning', true);
    } else if (quickSearchText === '#error') {
      adaptableblotter.api.alertApi.displayAlert('Limits Breached', 'Pleae adjust your PnL', 'Error', true);
    } else if (quickSearchText === '#green') {
      adaptableblotter.api.systemStatusApi.setGreenSystemStatus('The server is fine');
    } else if (quickSearchText === '#blue') {
      adaptableblotter.api.systemStatusApi.setBlueSystemStatus('nothing to worry aobut');
    } else if (quickSearchText === '#amber') {
      adaptableblotter.api.systemStatusApi.setAmberSystemStatus('The server is running slowly');
    } else if (quickSearchText === '#red') {
      adaptableblotter.api.systemStatusApi.setRedSystemStatus('The server has stopped ');
    } else if (quickSearchText === '#sbutton') {
      adaptableblotter.api.dashboardApi.ShowSystemStatusButton();
    } else if (quickSearchText === '#hbutton') {
      adaptableblotter.api.dashboardApi.HideSystemStatusButton();
    } else if (quickSearchText === '#sfunc') {
      adaptableblotter.api.dashboardApi.ShowFunctionsDropdown();
    } else if (quickSearchText === '#hfunc') {
      adaptableblotter.api.dashboardApi.HideFunctionsDropdown();
    } else if (quickSearchText === '#scols') {
      adaptableblotter.api.dashboardApi.ShowColumnsDropdown();
    } else if (quickSearchText === '#hcols') {
      adaptableblotter.api.dashboardApi.HideColumnsDropdown();
    } else if (quickSearchText === '#title') {
      adaptableblotter.api.dashboardApi.SetHomeToolbarTitle('hello world');
    } else if (quickSearchText === '#filterclear') {
      adaptableblotter.api.columnFilterApi.clearAllColumnFilter();
    } else if (quickSearchText === '#userfilter') {
      adaptableblotter.api.columnFilterApi.setColumnFilterFromUserFilter('Big Desk Id');
    } else if (quickSearchText === '#savelayout') {
      adaptableblotter.api.layoutApi.saveLayout();
    } else if (quickSearchText === '#setlayout') {
      adaptableblotter.api.layoutApi.setLayout('miguel');
    } 
  }
}



function notionalFormatter(params: any) {
  return `£${formatNumber(params.value)}`;
}

function formatNumber(number: any) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

var currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function notionalCellRenderer(params: any) {
  if (params.value) {
    return currencyFormatter.format(params.value);
  }
  return null;
}

function numberToBool(params: any) {
  if (params.value === 0) {
    return 'false';
  }
  return 'true';
}

function dateParseragGrid(params: any) {
  try {
    return stringToDate(params.newValue, 'dd/mm/yyyy', '/');
  } catch (ex) {
    console.error(`Error parsing the date value: ${params.newValue} and node : `, params.node);
    return null;
  }
}


function stringToDate(date: any, format: any, delimiter: any) {
  var formatLowerCase = format.toLowerCase();
  var formatItems = formatLowerCase.split(delimiter);
  var dateItems = date.split(delimiter);
  var monthIndex = formatItems.indexOf('mm');
  var dayIndex = formatItems.indexOf('dd');
  var yearIndex = formatItems.indexOf('yyyy');
  var month = parseInt(dateItems[monthIndex], 10);
  month -= 1;
  var formatedDate = new Date(parseInt(dateItems[yearIndex], 10), month, parseInt(dateItems[dayIndex], 10));
  return formatedDate;
}

var decimalPlaceRendereragGrid = (minDigits: any, maxDigits: any) => (params: any) => {
  if (params.value) {
    var decimalPlaceFormatter = new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    });
    return decimalPlaceFormatter.format(params.value);
  }
  return null;
};

function capitalize(mystring: string) {
  return (/[a-z]/.test(mystring) ? mystring : mystring.toLowerCase())
    .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, replacer)
    .replace(/[A-Z]/g, ' $&')
    .trim();
}

function replacer(a: any, b: any, c: any) {
  return b.toUpperCase() + c;
}
var shortDateFormatter = new Intl.DateTimeFormat('en-GB');

function shortDateFormatteragGrid(params: any) {
  try {
    if (params.value) {
      return shortDateFormatter.format(params.value);
    }
  } catch (ex) {
    console.error(`Error formatting the date for value: ${params.value} and node : `, params.node);
  }
  return null;
}

function boolParseragGrid(params: any) {
  try {
    return `<input type='checkbox'   ${params.value ? 'checked' : ''} />`;
  } catch (ex) {
    console.error(`Error parsing the date value: ${params.newValue} and node : `, params.node);
  }
  return null;
}

function currencyRendereragGrid(params: any) {
  try {
    if (params.value) {
      return currencyFormatter.format(params.value);
    }
    return null;
  } catch (ex) {
    console.error(`Error formatting the currency for value: ${params.value} and node : `,
      params.node);
  }
  return null;
}


let myJson = {
  QuickSearch: {
    QuickSearchText: 'Pen',
  },
  Dashboard: {
    DashboardVisibility: 'Minimised',
  }
};


let reportJson = {
  Layout: {
    CurrentLayout: "Citi Price",
    Layouts: [
      {
        Columns: [
          "ask",
          "bid",
          "bidOfferSpread"
        ],
        GridSorts: [],
        Name: "Citi Price"
      }
    ]
  },
  Export: {
    CurrentReport: "test",
    Reports: [
      {
        ColumnIds: [],
        Expression: { ColumnValueExpressions: [], FilterExpressions: [], RangeExpressions: [] },
        Name: "test",
        ReportColumnScope: "AllColumns",
        ReportRowScope: "AllRows"
      }
    ]
  }
};
let dataSourceJson = {
  DataSource: {
    CurrentDataSource: "Second",
    DataSources: [
      {
        Name: "First",
        Description: "DataSource 1",
      },
      {
        Name: "Second",
        Description: "Datasource 2",
      }
    ]
  },
  Chart: {
    ChartDefinitions: [
      {
        ChartType: "PieChart",
        Description: "",
        Name: "Hello",
        PrimaryColumnId: "counterparty",
        SecondaryColumnId: null,
        SecondaryColumnOperation: "Count",
        VisibleRowsOnly: true,
        ChartProperties: {

        }
      }
    ],
    CurrentChartName: "Hello",
    RefreshRate: 3
  }
};

export default () => {
  useEffect(() => {


    if (!process.browser) {
      return
    }


    InitTradeBlotter()
  }, [])

  return null
}