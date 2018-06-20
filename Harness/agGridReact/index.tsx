import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterReact } from '../../App_Scripts/View/AdaptableBlotterReact';
import { IAdaptableBlotterOptionsAgGrid } from "../../App_Scripts/Vendors/agGrid/IAdaptableBlotterOptionsAgGrid";
import { AdaptableBlotterAgGridHarness } from './indexharnessaggrid';
import * as agGrid from 'ag-grid';
import { DataGenerator } from '../DataGenerator';

let dataGen = new DataGenerator();
let trades = dataGen.getTrades();

// Create a GridOptions object.  This is used to create the ag-Grid
// And is also passed into the IAdaptableBlotterOptionsAgGrid object as well
let gridOptions = {
    columnDefs: new AdaptableBlotterAgGridHarness().getTradeSchema(),  // returns a list of agGrid column definitions
    rowData: trades,                // the dummy data we are using
    enableSorting: true,
    enableRangeSelection: true,
    enableFilter: true,
    enableColResize: true,
    suppressColumnVirtualisation: false,
    columnTypes: {                  // not required but helpful for column data type identification
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
new agGrid.Grid(gridcontainer, gridOptions);

let adaptableBlotterOptionsAgGrid: IAdaptableBlotterOptionsAgGrid = {
  primaryKey: "tradeId",                  // pk for blotter - required
  userName: "demo user",                  // name of current user
  blotterId: "Trades Blotter",              // id for blotter 
  enableAuditLog: false,                  // not running audit log
  enableRemoteConfigServer: false,        // not running remote config
  //  predefinedConfig: tradeJson,  // "demoConfig.json",    // passing in predefined config with a file    
  serverSearchOption: "None",             // performing AdvancedSearch on the server, not the client
  iPushPullConfig: {
      api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
      api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
  },
  // ag Grid properties
  agGridContainerName: "grid",            // the name of the div which contains the ag-Grid
  includeVendorStateInLayouts: true,      // whether layouts should include things like column size
  gridOptions: gridOptions,               // the ag-Grid grid options object - MANDATORY
  maxColumnValueItemsDisplayed: 0,
  columnValuesOnlyInQueries: true
};

ReactDOM.render(<AdaptableBlotterReact BlotterOptions={adaptableBlotterOptionsAgGrid} />, document.getElementById('adaptableBlotter'));