import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AdaptableBlotterAgGridReact } from '../../App_Scripts/Vendors/agGrid/AdaptableBlotterAgGridReact';
import { IAdaptableBlotterOptionsAgGrid } from "../../App_Scripts/Vendors/agGrid/IAdaptableBlotterOptionsAgGrid";
import { AdaptableBlotterAgGridReactHarness } from './indexharnessaggrid';
import { DataGenerator } from '../DataGenerator';
import { Grid, GridOptions, GridApi, ColumnApi } from "ag-grid";
import "ag-grid-enterprise";

let dataGen = new DataGenerator();
let trades = dataGen.getTrades();
let gridOptions: GridOptions = {
  columnDefs: new AdaptableBlotterAgGridReactHarness().getTradeSchema(),
  rowData: trades,
  enableSorting: true,
  enableRangeSelection: true,
  enableFilter: true,
  enableColResize: true,
  suppressColumnVirtualisation: false,
  columnTypes: {
    "abColDefNumber": {},
    "abColDefString": {},
    "abColDefBoolean": {},
    "abColDefDate": {},
    "abColDefObject": {},
  }
}

let gridcontainer = document.getElementById('grid');
new Grid(gridcontainer, gridOptions);

let adaptableBlotterOptionsAgGrid: IAdaptableBlotterOptionsAgGrid = {
  primaryKey: "tradeId",
  userName: "demo user",
  blotterId: "Trades Blotter",
  enableAuditLog: false,
  enableRemoteConfigServer: false,
  serverSearchOption: "None",
  iPushPullConfig: {
      api_key: "CbBaMaoqHVifScrYwKssGnGyNkv5xHOhQVGm3cYP",
      api_secret: "xYzE51kuHyyt9kQCvMe0tz0H2sDSjyEQcF5SOBlPQmcL9em0NqcCzyqLYj5fhpuZxQ8BiVcYl6zoOHeI6GYZj1TkUiiLVFoW3HUxiCdEUjlPS8Vl2YHUMEPD5qkLYnGj",
  },
  agGridContainerName: "grid",
  includeVendorStateInLayouts: true,
  gridOptions: gridOptions
}

ReactDOM.render(<AdaptableBlotterAgGridReact BlotterOptions={adaptableBlotterOptionsAgGrid} />, document.getElementById('adaptableBlotter'));