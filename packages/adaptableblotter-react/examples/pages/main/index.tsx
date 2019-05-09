
import React, { useState } from 'react'

// import AdaptableBlotterAgGrid from '../../../src/AdaptableBlotterAgGrid'
import { DataGenerator } from '../../../../../packages/adaptableblotter/Harness/DataGenerator'


function getRowsForGrid(dataGen: DataGenerator) {
  return dataGen.getTrades(6000);
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



function getColumnsForGrid() {
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
    type: 'abColDefNumber',
    filter: false
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
    //   editable: false,
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
    // filter: true,
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
    type: 'abColDefNumber'
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

const dataGen = new DataGenerator();
const trades = getRowsForGrid(dataGen);
const App = () => {
  const [name, setName] = useState<string>("Typescript")


  const gridOptions = {
    columnDefs: getColumnsForGrid(), // returns a list of agGrid column definitions
    rowData: trades, // the dummy data we are using
    enableRangeSelection: true,
    floatingFilter: true,
    suppressColumnVirtualisation: false,
    suppressMenuHide: true,
    sideBar: undefined, // this puts in filters and columns by default
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
  const abOptions = {
    vendorGrid: gridOptions, // the ag-Grid grid options object - MANDATORY
    primaryKey: 'ab-react-wrapper',
    userName: 'demo user',
    blotterId: 'trade demo',

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
    },

  };
  return <div>
    <div agTheme="balham-dark"
      AdaptableBlotterOptions={abOptions} GridOptions={gridOptions} />
  </div>
}


export default App