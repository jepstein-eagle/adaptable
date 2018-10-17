var themeName = ""
var adaptableblotter
var quickSearchText
var trades

function InitTradeBlotter() {
  let dataGen = new harness.DataGenerator();
  trades = dataGen.getTrades(100);

  // Create a GridOptions object.  This is used to create the ag-Grid
  // And is also passed into the IAdaptableBlotterOptionsAgGrid object as well
  let gridOptions = {
    columnDefs: getTradeSchema(), // returns a list of agGrid column definitions
    rowData: trades, // the dummy data we are using
    enableSorting: true,
    enableRangeSelection: true,
    enableFilter: true,
    //  floatingFilter: true,
    enableColResize: true,
    suppressColumnVirtualisation: false,
    columnTypes: { // not required but helpful for column data type identification
      "abColDefNumber": {},
      "abColDefString": {},
      "abColDefBoolean": {},
      "abColDefDate": {},
      "abColDefObject": {},
    }
  };

  // Create and instantiate an ag-Grid object
  let gridcontainer = document.getElementById('grid');
  gridcontainer.innerHTML = ""
  let grid = new agGrid.Grid(gridcontainer, gridOptions);
  dataGen.startTickingDataagGrid(gridOptions);

  // Create an Adaptable Blotter passing in the ag-Grid Options as the VendorGrid property
  let adaptableBlotterOptions = {
    primaryKey: "tradeId", // pk for blotter - required
    userName: "demo user", // name of current user
    blotterId: "demo blotter", // id for blotter
    enableAuditLog: false, // not running audit log
    enableRemoteConfigServer: false, // not running remote config
    // remoteConfigServerUrl: 'http://localhost:8080/adaptableblotter-config',
    // predefinedConfig: "demoConfig.json", // passing in predefined config with a file
    //serverSearchOption: "AdvancedSearch", // performing AdvancedSearch on the server, not the client
    iPushPullConfig: {
      api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
      api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
    },
    includeVendorStateInLayouts: true, // whether layouts should include things like column size
    autoSaveLayouts: true, // layouts will save automatically
    vendorGrid: gridOptions, // the ag-Grid grid options object - MANDATORY
    ignoreCaseInQueries: true,
    useDefaultVendorGridThemes: true,
    useAdaptableBlotterFilterForm: false,
    // useAdaptableBlotterQuickFilter: false
   // getColumnValues: retrieveValues,
    //  maxColumnValueItemsDisplayed: 5
  }

  // instantiate the Adaptable Blotter, passing in JUST the AdaptableBlotterOptions
  adaptableblotter = new adaptableblotteraggrid.AdaptableBlotter(adaptableBlotterOptions);
  window.adaptableblotter = adaptableblotter;

  adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => {
    dataChangeHack(adaptableblotter.AdaptableBlotterStore.TheStore.getState(), gridOptions);
  });

  adaptableblotter.AdaptableBlotterStore.TheStore.subscribe(() => {
    apiTester(adaptableblotter.AdaptableBlotterStore.TheStore.getState(), gridOptions);
  });
  adaptableblotter.api.onColumnStateChanged().Subscribe((sender, columnChangedArgs) =>
    listenToColumnStateChange(columnChangedArgs))
  adaptableblotter.api.onStateChanged().Subscribe((sender, stateChangedArgs) => listenToStateChange(
    stateChangedArgs))
  adaptableblotter.api.onSearchedChanged().Subscribe((sender, searchChangedArgs) =>
    listenToSearchChange(searchChangedArgs))
  setTimeout(() => {
    if (adaptableblotter.AdaptableBlotterStore.TheStore.getState().Layout.CurrentLayout ==
      "Ab_Default_Layout") {
      gridOptions.columnApi.autoSizeAllColumns(), 2;
    }
  })
}

function retrieveValues(columnName) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(getValuesForColumn(columnName)), 500);
  });
}

function listenToColumnStateChange(columnChangedArgs) {
  //  console.log("column event received")
  //   console.log(columnChangedArgs)
}

function listenToStateChange(stateChangedArgs) {
  //   console.log("state event received")
  //   console.log(stateChangedArgs)
}

function listenToSearchChange(searchChangedArgs) {
  //   console.log("search changed event received")
  //   console.log(searchChangedArgs)
}

function getValuesForColumn(columnName) {
  let vals;
  if (columnName == "notional") {
    vals = [1000000, 5000000, 10000000];
  } else if (columnName == "settlementDate") {
    vals = [
      trades[0]["settlementDate"],
      trades[1]["settlementDate"],
      trades[2]["settlementDate"],
      trades[3]["settlementDate"],
      trades[4]["settlementDate"],
    ];
  } else {
    vals = ["val1", "val2", "val3"]
  }
  return {
    DistinctCriteriaPairValue: "DisplayValue",
    ColumnValues: vals
  }
}

function getTradeSchema() {
  var schema = []
  schema.push({
    headerName: "Trade Id",
    field: "tradeId",
    editable: true,
    type: "abColDefNumber",
    suppressSorting: true
  });
  schema.push({
    headerName: "Notional",
    field: "notional",
    editable: true,
    valueFormatter: notionalFormatter,
    cellClass: 'number-cell'
  });
  schema.push({
    headerName: "Desk No.",
    field: "deskId",
    editable: true,
    enableRowGroup: true,
    suppressSorting: false,
    suppressFilter: true
  });
  schema.push({
    headerName: "Counterparty",
    field: "counterparty",
    editable: true,
    enableRowGroup: true
  });
  schema.push({
    headerName: "Country",
    field: "country",
    editable: true,
    enableRowGroup: true
  });
  schema.push({
    headerName: "Currency",
    field: "currency",
    editable: false,
    enableRowGroup: true,
    filter: 'agTextColumnFilter'
  });
  schema.push({
    headerName: "Change On Year",
    field: "changeOnYear",
    editable: true
  });

  schema.push({
    headerName: "B/O Spread",
    field: "bidOfferSpread",
    columnGroupShow: 'open',
    editable: true,
    cellClass: 'number-cell'
  });
  schema.push({
    headerName: "Status",
    field: "status",
    editable: true,
    enableRowGroup: true
  });
  schema.push({
    headerName: "Price",
    field: "price",
    columnGroupShow: 'open',
    editable: true,
    cellClass: 'number-cell',
    enableRowGroup: true,
    filter: 'agNumberColumnFilter'
  });
  schema.push({
    headerName: "Ask",
    field: "ask",
    columnGroupShow: 'closed',
    cellClass: 'number-cell'
  });
  schema.push({
    headerName: "Bid",
    field: "bid",
    columnGroupShow: 'closed',
    cellClass: 'number-cell'
  });
  schema.push({
    headerName: "Bbg Ask",
    field: "bloombergAsk",
    columnGroupShow: 'closed',
    cellClass: 'number-cell'
  });
  schema.push({
    headerName: "Bbg Bid",
    field: "bloombergBid",
    columnGroupShow: 'closed',
    cellClass: 'number-cell'
  });
  schema.push({
    headerName: "Moodys",
    field: "moodysRating",
    editable: true,
    filter: 'text'
  });
  schema.push({
    headerName: "SandP",
    field: "sandpRating",
    editable: true,
    filter: 'text'
  });
  schema.push({
    headerName: "Trade Date",
    field: "tradeDate",
    editable: true,
    cellEditorParams: {
      useFormatter: true
    },
    valueParser: dateParseragGrid,
    valueFormatter: shortDateFormatteragGrid,
    filter: 'agDateColumnFilter'
  });
  schema.push({
    headerName: "Settlement Date",
    field: "settlementDate",
    editable: true,
    cellEditorParams: {
      useFormatter: true
    },
    valueParser: dateParseragGrid,
    valueFormatter: shortDateFormatteragGrid
  });
  schema.push({
    headerName: "Pct Change",
    field: "percentChange",
    filter: 'text'
  });
  schema.push({
    headerName: "Last Updated By",
    field: "lastUpdatedBy",
    enableRowGroup: true
  });
  schema.push({
    headerName: "Last Updated",
    field: "lastUpdated",
    editable: true,
    cellEditorParams: {
      useFormatter: true
    },
    valueParser: dateParseragGrid,
    valueFormatter: shortDateFormatteragGrid
  });
  return schema;
}

function dataChangeHack(state, gridOptions) {
  if (state.QuickSearch.QuickSearchText == "#demohack") {
    gridOptions.api.forEachNode((rowNode, index) => {
      if (index == 4) {
        rowNode.setDataValue("bidOfferSpread", 20)
      }
    });
  }
}

function apiTester(state, gridOptions) {
  if (state.QuickSearch.QuickSearchText != quickSearchText) {
    quickSearchText = state.QuickSearch.QuickSearchText
    if (quickSearchText == "#advanced") {
      let test = adaptableblotter.api.configGetUserStateByFunction('AdvancedSearch')
      console.log("object");
      console.log(test);
      let test2 = adaptableblotter.api.configGetUserStateByFunction('AdvancedSearch', true)
      console.log("string version");
      console.log(test2);
      let test3 = adaptableblotter.api.configGetAllUserState()
      console.log("all version");
      console.log(test3);
      let test4 = adaptableblotter.api.configGetAdvancedSearchState()
      console.log("advanced search");
      console.log(test4);
      let test5 = adaptableblotter.api.configGetAdvancedSearchState(true)
      console.log("advanced search string");
      console.log(test5);
    } else if (quickSearchText == "#hideabout") {
      adaptableblotter.api.dashboardHideAboutButton()
    } else if (quickSearchText == "#showabout") {
      adaptableblotter.api.dashboardShowAboutButton()
    } else if (quickSearchText == "#permies") {
      adaptableblotter.api.uiSetColumnPermittedValues('counterparty', ['first', 'second', 'third'])
    } else if (quickSearchText == "#systemfilters") {
      adaptableblotter.api.filterClearSystemFilters()
    } else if (quickSearchText == "#reset") {
      //     adaptableblotter.api.configDeleteLocalStorage()
    } else if (quickSearchText == "#loadUserState") {
      adaptableblotter.api.loadUserState(oldjson)

    } else if (quickSearchText == "#miguel") {
      setTimeout(() => adaptableblotter.api.uiSetColumnPermittedValues("deskId", ["5555555",
        "8888888"
      ]), 20000);
    } else if (quickSearchText == "#allsf") {
      let thisxx = adaptableblotter.api.filterGetAllSystemFilters()
    } else if (quickSearchText == "#permiex") {
      adaptableblotter.api.uiSetColumnPermittedValues('counterparty', ['fourth', 'fith', 'sixth'])
    } else if (quickSearchText == "#clear") {
      adaptableblotter.api.uiClearColumnPermittedValues('counterparty')
    } else if (quickSearchText == "#send") {
      adaptableblotter.api.exportSendReport('All Data', 'CSV')
    } else if (quickSearchText == "#info") {
      adaptableblotter.api.alertShow("Hello",
        "Your data is fine actually its very good and I want to check that this wraps", "Info",
        true)
    } else if (quickSearchText == "#warning") {
      adaptableblotter.api.alertShow("End of Day", "Dont forget to send the report", "Warning",
        true)
    } else if (quickSearchText == "#error") {
      adaptableblotter.api.alertShow("Limits Breached", "Pleae adjust your PnL", "Error", true)
    } else if (quickSearchText == "#green") {
      adaptableblotter.api.systemStatusSetGreen("The server is fine")
    } else if (quickSearchText == "#amber") {
      adaptableblotter.api.systemStatusSetAmber("The server is running slowly")
    } else if (quickSearchText == "#red") {
      adaptableblotter.api.systemStatusSetRed("The server has stopped ")
    } else if (quickSearchText == "#sbutton") {
      adaptableblotter.api.dashboardShowSystemStatusButton()
    } else if (quickSearchText == "#hbutton") {
      adaptableblotter.api.dashboardHideSystemStatusButton()
    } else if (quickSearchText == "#sfunc") {
      adaptableblotter.api.dashboardShowFunctionsDropdown()
    } else if (quickSearchText == "#hfunc") {
      adaptableblotter.api.dashboardHideFunctionsDropdown()
    } else if (quickSearchText == "#scols") {
      adaptableblotter.api.dashboardShowColumnsDropdown()
    } else if (quickSearchText == "#hcols") {
      adaptableblotter.api.dashboardHideColumnsDropdown()
    } else if (quickSearchText == "#title") {
      adaptableblotter.api.dashboardSetHomeToolbarTitle("hello world")
    } else if (quickSearchText == "#filterclear") {
      adaptableblotter.api.filterClearColumnFilters()
    } else if (quickSearchText == "#userfilter") {
      adaptableblotter.api.columnFilterSetUserFilter("Big Desk Id")
    } else if (quickSearchText == "#savelayout") {
      adaptableblotter.api.layoutSave()
    } else if (quickSearchText == "#setlayout") {
      adaptableblotter.api.layoutSet("miguel")
    } else if (quickSearchText == "#toolbarTitle") {
      adaptableblotter.api.dashboardSetApplicationToolbarTitle("my app")
    } else if (quickSearchText == "#notional") {
      gridOptions.api.forEachNode((rowNode, index) => {
        if (index == 4) {
          rowNode.setDataValue("bidOfferSpread", 20)
        }
      });
    }
  }
}

function getTradesForSearch(searchArgs, dataGen) {
  let searchChangedInfo = searchArgs.data[0].id;
  if (searchChangedInfo.searchChangedTrigger == "QuickSearch") {
    //  alert("Quick search: " + searchChangedInfo.blotterSearchState.quickSearch)
  }

  let jsonstring = JSON.stringify(searchArgs)
  console.log(jsonstring)

  //alert(searchArgs.SearchChangedTrigger)
  if (searchChangedInfo.searchChangedTrigger == "DataSource") {
    if (searchArgs.BlotterSearchState.DataSource == "Eurssso") {
      //     adaptableblotter.api.themeSelectCurrent("Dark Theme");
      adaptableblotter.api.systemStatusSet("its all broken", "Red")
      adaptableblotter.api.systemStatusSet("its all broken", "Red")
      adaptableblotter.api.alertShow("Error Header", "Error message", "Error")
    } else if (searchArgs.BlotterSearchState.DataSource == "Euro") {
      //       adaptableblotter.api.themeSelectCurrent("White Theme");
      adaptableblotter.api.configClear()
      adaptableblotter.api.systemStatusClear()
      adaptableblotter.api.alertShow("Hello Arjun", "This is a message sent from the Server...",
        "Info")
    } else if (searchArgs.BlotterSearchState.DataSource == "Dollar") {
      //      adaptableblotter.api.themeSelectCurrent("White Theme");
      adaptableblotter.api.systemStatusSet("a few issues perhaps", "Amber")
      adaptableblotter.api.alertShow("Warning Header", "Warning message", "Warning")
    }
    /*
    if (searchArgs.BlotterSearchState.DataSource == "Dollar") {
        adaptableblotter.api.setGridData(dataGen.getDollarTrades());
        adaptableblotter.api.selectLayout("Dollar View")
      //  adaptableblotter.api.selectCurrentTheme("Dark Theme")
    } else if (searchArgs.BlotterSearchState.DataSource == "Sterling") {
        adaptableblotter.api.setGridData(dataGen.getGBPTrades());
        adaptableblotter.api.selectLayout("Sterling View")
    } else if (searchArgs.BlotterSearchState.DataSource == "Euro") {
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
  return '£' + formatNumber(params.value);
}

function formatNumber(number) {
  // this puts commas into the number eg 1000 goes to 1,000,
  // i pulled this from stack overflow, i have no idea how it works
  return Math.floor(number).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

var currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function notionalCellRenderer(params) {
  if (params.value) {
    return currencyFormatter.format(params.value)
  } else {
    return null;
  }
}

function numberToBool(params) {
  if (params.value === 0) {
    return 'false';
  } else {
    return 'true';
  }
}

function dateParseragGrid(params) {
  try {
    return stringToDate(params.newValue, "dd/mm/yyyy", "/");
  } catch (ex) {
    console.error("Error parsing the date value: " + params.newValue + " and node : ", params.node)
  }
}



function stringToDate(date, format, delimiter) {
  var formatLowerCase = format.toLowerCase();
  var formatItems = formatLowerCase.split(delimiter);
  var dateItems = date.split(delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(parseInt(dateItems[yearIndex]), month, parseInt(dateItems[dayIndex]));
  return formatedDate;
}

var decimalPlaceRendereragGrid = (minDigits, maxDigits) => function (params) {
  if (params.value) {
    var decimalPlaceFormatter = new Intl.NumberFormat('en-GB', {
      minimumFractionDigits: minDigits,
      maximumFractionDigits: maxDigits
    });
    return decimalPlaceFormatter.format(params.value)
  }
}

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
      return shortDateFormatter.format(params.value)
    } else {
      return null;
    }
  } catch (ex) {
    console.error("Error formatting the date for value: " + params.value + " and node : ", params.node)
  }
}

function boolParseragGrid(params) {
  try {
    return `<input type='checkbox'   ${params.value ? 'checked' : ''} />`;
  } catch (ex) {
    console.error("Error parsing the date value: " + params.newValue + " and node : ", params.node)
  }
}

var currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});

function currencyRendereragGrid(params) {
  try {
    if (params.value) {
      return currencyFormatter.format(params.value)
    } else {
      return null;
    }
  } catch (ex) {
    console.error("Error formatting the currency for value: " + params.value + " and node : ",
      params.node)
  }
}


let layoutdemojson = {
  "Layout": {
    "IncludeVendorState": false,
    "CurrentLayout": "Hidden",
    "Layouts": [{
      "Columns": ["tradeId", "notional", "deskId", "counterparty"],
      "GridSorts": [],
      "Name": "Hidden",
      "VendorGridInfo": null,
      "IsReadOnly": false
    }]
  }
}

let tradeJson = {
  "Filter": {
    "SystemFilters": ["Zero", "Positive", "Negative"]
  }
}

let oldjson = {
  "Layout": {
    "IncludeVendorState": false,
    "CurrentLayout": "Hidden",
    "Layouts": [{
      "Columns": ["tradeId", "notional", "deskId", "counterparty"],
      "GridSorts": [],
      "Name": "Hidden",
      "VendorGridInfo": null,
      "IsReadOnly": false
    }]
  },
  "QuickSearch": {
    "Style": {
      "ClassName": "styleBackGreen"
    },

  },
  "Filter": {
    "ColumnFilters": [],
    "UserFilters": [{
      "Name": "April 2018",
      "Expression": {
        "ColumnValueExpressions": [],
        "FilterExpressions": [],
        "RangeExpressions": [{
          "ColumnId": "tradeDate",
          "Ranges": [{
            "Operator": "Between",
            "Operand1": "2018-04-01",
            "Operand2": "2018-04-30",
            "Operand1Type": "Value",
            "Operand2Type": "Value"
          }]
        }]
      },
      "ColumnId": "tradeDate",
      "IsReadOnly": false
    }],
    "SystemFilters": [
      "Blanks",
      "Non Blanks",
      "Today",
      "In Past",
      "True",
      "False"
    ]
  },
  "UserInterface": {
    "StyleClassNames": [
      "styleBackBrown",
      "styleForeYellow"
    ],
    "PermittedColumnValues": [{
      "ColumnId": "country",
      "PermittedValues": [
        "France",
        "Russia",
        "Israel"
      ]
    },
    {
      "ColumnId": "currency",
      "PermittedValues": [
        "EUR",
        "USD",
        "NIS"
      ]
    },
    ]
  },
  "Theme": {
    "CurrentTheme": "Default",
  },
  "FormatColumn": {
    "FormatColumns": [{
      "ColumnId": "notional",
      "Style": {
        "BackColor": "#ff0000",
        "ForeColor": null,
        "FontWeight": "Normal",
        "FontStyle": "Normal",
        "FontSize": null
      },
    }],

  },
  "Dashboard": {
    "VisibleToolbars": [
      "SmartEdit",
      "Layout",
      "BulkUpdate"
    ],
    "VisibleButtons": [
      "About",
      "Dashboard",
      "SmartEdit",
      "ColumnChooser",
      "BulkUpdate"
    ],
    "Zoom": "0.5",
    "DashboardVisibility": "Minimised",
    "ShowSystemStatusButton": true
  }
}
