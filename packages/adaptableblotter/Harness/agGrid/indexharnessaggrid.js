var themeName = '';
var adaptableblotter;
var quickSearchText;
var trades;
var gridOptions;
var showTrade = true;
var instantiateAgGridInHarness = false;

function runQuickSearchViaAPI() {
  const element = document.getElementById('txtQuickSearchText');
  adaptableblotter.api.quickSearchApi.Apply(element.value);
}

function clearQuickSearchViaAPI() {
  const element = document.getElementById('txtQuickSearchText');
  element.value = '';
  adaptableblotter.api.quickSearchApi.Clear();
}

function getCommunityKey() {
  return 'AB Licence Key';
}
function getStandardKey() {
  return 'xs2543-as6b8ejw3-e94syjze8a';
}
function getEnterpriseKey() {
  return 'xs2543-as6b8esw3-e94fyjzc7a';
}
function getColumns() {
  this.gridOptions.api.setColumnDefs(getTradeSchema());
}

function getData() {
  const dataGen = new harness.DataGenerator();
  const data = dataGen.getTrades(10);
  gridOptions.api.setRowData(data);
}

function getRowsForGrid(dataGen) {
  if (showTrade) {
    return dataGen.getTrades(50);
  }
  return dataGen.getFtseData(10);
}

function getColumnsForGrid() {
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
  const dataGen = new harness.DataGenerator();
  trades = getRowsForGrid(dataGen);

  // Create a GridOptions object.  This is used to create the ag-Grid
  // And is also passed into the IAdaptableBlotterOptionsAgGrid object as well
  gridOptions = {
    columnDefs: getColumnsForGrid(), // returns a list of agGrid column definitions
    rowData: trades, // the dummy data we are using
    enableRangeSelection: true,
    floatingFilter: true,
    suppressColumnVirtualisation: false,
    //  sideBar: undefined, // this puts in filters and columns by default

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

    columnTypes: { // not required but helpful for column data type identification
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefObject: {},
    },
  };

  // Create and instantiate an ag-Grid object
  if (instantiateAgGridInHarness) {
    const gridcontainer = document.getElementById('grid');
    gridcontainer.innerHTML = '';
    const grid = new agGrid.Grid(gridcontainer, gridOptions);
  }
 // dataGen.startTickingDataagGrid(gridOptions);

  const s = 2;

  if (s === 2) {
    // Create an Adaptable Blotter passing in the ag-Grid Options as the VendorGrid property
    const adaptableBlotterOptions = {
      vendorGrid: gridOptions, // the ag-Grid grid options object - MANDATORY
      primaryKey: getPKForGrid(), // pk for blotter - required
      userName: 'demo user', // name of current user
      blotterId: getBlotterIdforGrid(), // id for blotter
     //   licenceKey: getCommunityKey(),
      //    licenceKey: getStandardKey(),
      licenceKey: getEnterpriseKey(),

       //   predefinedConfig: myJson,

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
      configServerOptions: {
        enableConfigServer: false,
        //  configServerUrl: "", //  'http://localhost:8080/adaptableblotter-config',
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
        //  useAdaptableBlotterFilterForm: false,
        //  useAdaptableBlotterQuickFilter: false
      },
      generalOptions: {
        // serverSearchOption: "AdvancedSearch", // performing AdvancedSearch on the server, not the client
      },
      iPushPullConfig: {
        api_key: 'CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP',
        api_secret: 'xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj',
        api_url: 'https://www.ipushpull.com/api/1.0',
        hsts: false,
      },

    };

    // instantiate the Adaptable Blotter, passing in JUST the AdaptableBlotterOptions

    adaptableblotter = new adaptableblotteraggrid.AdaptableBlotter(adaptableBlotterOptions);
    window.adaptableblotter = adaptableblotter;

    adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => {
      dataChangeHack(adaptableblotter.AdaptableBlotterStore.TheStore.getState(), gridOptions);
    });

    adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => {
      apiTester(adaptableblotter.AdaptableBlotterStore.TheStore.getState(), gridOptions);
    });
    adaptableblotter.api.eventApi.onColumnStateChanged().Subscribe((sender, columnChangedArgs) => listenToColumnStateChange(columnChangedArgs));
    adaptableblotter.api.eventApi.onAlertFired().Subscribe((sender, alertFiredArgs) => listenToAlertFired(alertFiredArgs));
    adaptableblotter.api.eventApi.onStateChanged().Subscribe((sender, stateChangedArgs) => listenToStateChange(
      stateChangedArgs,
    ));
    adaptableblotter.api.eventApi.onSearchedChanged().Subscribe((sender, searchChangedArgs) => listenToSearchChange(searchChangedArgs));
    setTimeout(() => {
      if (adaptableblotter.AdaptableBlotterStore.TheStore.getState().Layout.CurrentLayout === 'Ab_Default_Layout') {
        gridOptions.columnApi.autoSizeAllColumns();
      }
    });
  }
}

function retrieveValues(columnName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(getValuesForColumn(columnName)), 500);
  });
}

function listenToColumnStateChange(columnChangedArgs) {
  //    console.log("column event received")
  //     console.log(columnChangedArgs)
}

function listenToStateChange(stateChangedArgs) {
  //  console.log("state event received")
  //    console.log(stateChangedArgs)
}

function listenToSearchChange(searchChangedArgs) {
  //  console.log("search changed event received")
  //   console.log(searchChangedArgs)
}

function listenToAlertFired(alertFiredArgs) {
  console.log('from Harness');
  console.log(alertFiredArgs.alert);
}

function getValuesForColumn(columnName) {
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

function getFTSESchema() {
  var schema = [];
  schema.push({
    headerName: 'Date',
    field: 'date',
    editable: false,
    cellEditorParams: {
      useFormatter: true,
    },
    valueParser: dateParseragGrid,
    valueFormatter: shortDateFormatteragGrid,
  });

  schema.push({
    headerName: 'Start',
    field: 'start',
    editable: true,
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'End',
    field: 'end',
    editable: true,
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'Low',
    field: 'low',
    editable: true,
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'High',
    field: 'high',
    editable: true,
    cellClass: 'number-cell',
  });

  return schema;
}

function getTradeSchema() {
  var schema = [];
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
    filter: false
  });
  schema.push({
    headerName: 'Counterparty',
    field: 'counterparty',
    editable: true,
    enableRowGroup: true,
    filter: true,
    sortable: true
  });

  schema.push({
    headerName: 'Change On Year',
    field: 'changeOnYear',
    filter: true,
    editable: true,
  });
  schema.push({
    headerName: 'Currency',
    field: 'currency',
    //   editable: false,
    enableRowGroup: true,
    filter: 'agTextColumnFilter',
  });
  schema.push({
    headerName: 'Status',
    field: 'status',
    editable: true,
    filter: true,
    enableRowGroup: true,
  });
  schema.push({
    headerName: 'B/O Spread',
    field: 'bidOfferSpread',
    columnGroupShow: 'open',
    enableValue: true,
    editable: true,
    filter: true,
    cellClass: 'number-cell',
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
  });
  schema.push({
    headerName: 'Country',
    field: 'country',
    editable: true,
    filter: true,
    enableRowGroup: true,
  });
  schema.push({
    headerName: 'Ask',
    field: 'ask',
    columnGroupShow: 'closed',
    filter: true,
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'DV01',
    field: 'dv01',
    columnGroupShow: 'closed',
    filter: true,
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'Bid',
    field: 'bid',
    columnGroupShow: 'closed',
    filter: true,
    cellClass: 'number-cell',
  });

  schema.push({
    headerName: 'Bbg Ask',
    field: 'bloombergAsk',
    columnGroupShow: 'closed',
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'Bbg Bid',
    field: 'bloombergBid',
    columnGroupShow: 'closed',
    cellClass: 'number-cell',
  });
  schema.push({
    headerName: 'Moodys',
    field: 'moodysRating',
    editable: true,
    filter: true,
    filter: 'text',
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
  });
  schema.push({
    headerName: 'SandP',
    field: 'sandpRating',
    editable: true,
    sortable: true,
    filter: 'text',
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
  });
  schema.push({
    headerName: 'Last Updated By',
    field: 'lastUpdatedBy',
    enableRowGroup: true,
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
  });
  schema.push({
    headerName: 'Pct Change',
    field: 'percentChange',
    editable: true,
    filter: 'text',
    //  type: "numericColumn"
  });
  schema.push({
    headerName: 'Desk No.',
    field: 'deskId',
    editable: true,
    // cellRenderer: percentCellRenderer,
    enableRowGroup: true,
  });
  return schema;
}

function dataChangeHack(state, gridOptions) {
  if (state.QuickSearch.QuickSearchText === '#demohack') {
    gridOptions.api.forEachNode((rowNode, index) => {
      if (index === 4) {
        rowNode.setDataValue('bidOfferSpread', 20);
      }
    });
  }
}


function apiTester(state, gridOptions) {
  if (state.QuickSearch.QuickSearchText !== quickSearchText) {
    quickSearchText = state.QuickSearch.QuickSearchText;
    if (quickSearchText === '#advanced') {
      const test = adaptableblotter.api.ConfigApi.configGetUserStateByFunction('AdvancedSearch');
      console.log('object');
      console.log(test);
      const test2 = adaptableblotter.api.ConfigApi.configGetUserStateByFunction('AdvancedSearch', true);
      console.log('string version');
      console.log(test2);
      const test3 = adaptableblotter.api.ConfigApi.configGetAllUserState();
      console.log('all version');
      console.log(test3);
      const test4 = adaptableblotter.api.ConfigApi.configGetAdvancedSearchState();
      console.log('advanced search');
      console.log(test4);
      const test5 = adaptableblotter.api.ConfigApi.configGetAdvancedSearchState(true);
      console.log('advanced search string');
      console.log(test5);
    } else if (quickSearchText === '#hideabout') {
      adaptableblotter.api.DashboardApi.dashboardHideAboutButton();
    } else if (quickSearchText === '#showabout') {
      adaptableblotter.api.DashboardApi.dashboardShowAboutButton();
    } else if (quickSearchText === '#permies') {
      adaptableblotter.api.UserInterfaceApi.uiSetColumnPermittedValues('counterparty', ['first', 'second', 'third']);
    } else if (quickSearchText === '#systemfilters') {
      adaptableblotter.api.SystemFilterApi.systemFilterClear();
    } else if (quickSearchText === '#reset') {
      //     adaptableblotter.api.configDeleteLocalStorage()
    } else if (quickSearchText === '#loadUserState') {
      adaptableblotter.api.loadUserState(oldjson);
    } else if (quickSearchText === '#miguel') {
      setTimeout(() => adaptableblotter.api.uiSetColumnPermittedValues('deskId', ['5555555',
        '8888888',
      ]), 20000);
    } else if (quickSearchText === '#allsf') {
      const thisxx = adaptableblotter.api.filterGetAllSystemFilters();
    } else if (quickSearchText === '#permiex') {
      adaptableblotter.api.uiSetColumnPermittedValues('counterparty', ['fourth', 'fith', 'sixth']);
    } else if (quickSearchText === '#clear') {
      adaptableblotter.api.uiClearColumnPermittedValues('counterparty');
    } else if (quickSearchText === '#send') {
      adaptableblotter.api.ExportApi.exportSendReport('All Data', 'CSV');
    } else if (quickSearchText === '#info') {
      adaptableblotter.api.alertApi.Show('Nice one', 'Your data is fine actually its very good and I want to check that this wraps', 'Info', true);
    } else if (quickSearchText === '#success') {
      adaptableblotter.api.alertApi.Show('Success Message', 'You have won the lottery', 'Success', true);
    } else if (quickSearchText === '#warning') {
      adaptableblotter.api.alertApi.Show('End of Day', 'Dont forget to send the report', 'Warning', true);
    } else if (quickSearchText === '#error') {
      adaptableblotter.api.alertApi.Show('Limits Breached', 'Pleae adjust your PnL', 'Error', true);
    } else if (quickSearchText === '#green') {
      adaptableblotter.api.systemStatusApi.SetGreen('The server is fine');
    } else if (quickSearchText === '#blue') {
      adaptableblotter.api.systemStatusApi.setBlue('nothing to worry aobut');
    } else if (quickSearchText === '#amber') {
      adaptableblotter.api.systemStatusApi.SetAmber('The server is running slowly');
    } else if (quickSearchText === '#red') {
      adaptableblotter.api.systemStatusApi.SetRed('The server has stopped ');
    } else if (quickSearchText === '#sbutton') {
      adaptableblotter.api.DashboardApi.dashboardShowSystemStatusButton();
    } else if (quickSearchText === '#hbutton') {
      adaptableblotter.api.DashboardApi.dashboardHideSystemStatusButton();
    } else if (quickSearchText === '#sfunc') {
      adaptableblotter.api.dashboardApi.ShowFunctionsDropdown();
    } else if (quickSearchText === '#hfunc') {
      adaptableblotter.api.dashboardApi.HideFunctionsDropdown();
    } else if (quickSearchText === '#scols') {
      adaptableblotter.api.DashboardApi.dashboardShowColumnsDropdown();
    } else if (quickSearchText === '#hcols') {
      adaptableblotter.api.DashboardApi.dashboardHideColumnsDropdown();
    } else if (quickSearchText === '#title') {
      adaptableblotter.api.DashboardApi.dashboardSetHomeToolbarTitle('hello world');
    } else if (quickSearchText === '#filterclear') {
      adaptableblotter.api.ColumnFilterApi.columnFilterClearAll();
    } else if (quickSearchText === '#userfilter') {
      adaptableblotter.api.ColumnFilterApi.columnFilterSetUserFilter('Big Desk Id');
    } else if (quickSearchText === '#savelayout') {
      adaptableblotter.api.LayoutApi.layoutSave();
    } else if (quickSearchText === '#setlayout') {
      adaptableblotter.api.LayoutApi.layoutSet('miguel');
    } else if (quickSearchText === '#notionalkkkk') {
      gridOptions.api.forEachNode((rowNode, index) => {
        if (index === 4) {
          rowNode.setDataValue('notional', 345);
        }
      });
    }
  }
}

function getTradesForSearch(searchArgs, dataGen) {
  const searchChangedInfo = searchArgs.data[0].id;
  if (searchChangedInfo.searchChangedTrigger === 'QuickSearch') {
    //  alert("Quick search: " + searchChangedInfo.blotterSearchState.quickSearch)
  }

  const jsonstring = JSON.stringify(searchArgs);
  console.log(jsonstring);

  // alert(searchArgs.SearchChangedTrigger)
  if (searchChangedInfo.searchChangedTrigger === 'DataSource') {
    if (searchArgs.BlotterSearchState.DataSource === 'Eurssso') {
      //     adaptableblotter.api.themeSelectCurrent("Dark Theme");
      adaptableblotter.api.systemStatusSet('its all broken', 'Red');
      adaptableblotter.api.systemStatusSet('its all broken', 'Red');
      adaptableblotter.api.alertShow('Error Header', 'Error message', 'Error');
    } else if (searchArgs.BlotterSearchState.DataSource === 'Euro') {
      //       adaptableblotter.api.themeSelectCurrent("White Theme");
      adaptableblotter.api.configClear();
      adaptableblotter.api.systemStatusClear();
      adaptableblotter.api.alertShow('Hello Arjun', 'This is a message sent from the Server...',
        'Info');
    } else if (searchArgs.BlotterSearchState.DataSource === 'Dollar') {
      //      adaptableblotter.api.themeSelectCurrent("White Theme");
      adaptableblotter.api.systemStatusSet('a few issues perhaps', 'Amber');
      adaptableblotter.api.alertShow('Warning Header', 'Warning message', 'Warning');
    }
    /*
    if (searchArgs.BlotterSearchState.DataSource === "Dollar") {
        adaptableblotter.api.setGridData(dataGen.getDollarTrades());
        adaptableblotter.api.selectLayout("Dollar View")
      //  adaptableblotter.api.selectCurrentTheme("Dark Theme")
    } else if (searchArgs.BlotterSearchState.DataSource === "Sterling") {
        adaptableblotter.api.setGridData(dataGen.getGBPTrades());
        adaptableblotter.api.selectLayout("Sterling View")
    } else if (searchArgs.BlotterSearchState.DataSource === "Euro") {
        adaptableblotter.api.setGridData(dataGen.getEuroTrades());
        adaptableblotter.api.selectLayout("Euro View")
    } else {
        adaptableblotter.api.setGridData(dataGen.getTrades(15000));
        adaptableblotter.api.clearLayout();
    }
    */
  }
}

function notionalFormatter(params) {
  return `£${formatNumber(params.value)}`;
}

function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

var currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function notionalCellRenderer(params) {
  if (params.value) {
    return currencyFormatter.format(params.value);
  }
  return null;
}

function numberToBool(params) {
  if (params.value === 0) {
    return 'false';
  }
  return 'true';
}

function dateParseragGrid(params) {
  try {
    return stringToDate(params.newValue, 'dd/mm/yyyy', '/');
  } catch (ex) {
    console.error(`Error parsing the date value: ${params.newValue} and node : `, params.node);
    return null;
  }
}


function stringToDate(date, format, delimiter) {
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

var decimalPlaceRendereragGrid = (minDigits, maxDigits) => (params) => {
  if (params.value) {
    var decimalPlaceFormatter = new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits,
    });
    return decimalPlaceFormatter.format(params.value);
  }
  return null;
};

function capitalize(string) {
  return (/[a-z]/.test(string) ? string : string.toLowerCase())
    .replace(/[\s\-_]*([^\s\-_])([^\s\-_]+)/g, replacer)
    .replace(/[A-Z]/g, ' $&')
    .trim();
}

function replacer(a, b, c) {
  return b.toUpperCase() + c;
}
var shortDateFormatter = new Intl.DateTimeFormat('en-GB');

function shortDateFormatteragGrid(params) {
  try {
    if (params.value) {
      return shortDateFormatter.format(params.value);
    }
  } catch (ex) {
    console.error(`Error formatting the date for value: ${params.value} and node : `, params.node);
  }
  return null;
}

function boolParseragGrid(params) {
  try {
    return `<input type='checkbox'   ${params.value ? 'checked' : ''} />`;
  } catch (ex) {
    console.error(`Error parsing the date value: ${params.newValue} and node : `, params.node);
  }
  return null;
}

function currencyRendereragGrid(params) {
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
  },
};
