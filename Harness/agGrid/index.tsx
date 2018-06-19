import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterReact } from '../../App_Scripts/View/AdaptableBlotterReact';
import { IAdaptableBlotterOptionsAgGrid } from "../../App_Scripts/Vendors/agGrid/IAdaptableBlotterOptionsAgGrid";

let adaptableBlotterOptionsAgGrid: IAdaptableBlotterOptionsAgGrid = {
  primaryKey: 'Test',
  maxColumnValueItemsDisplayed: 1,
  columnValuesOnlyInQueries: true,
  includeVendorStateInLayouts: true,
  agGridContainerName: 'grid',
  gridOptions: null
};

ReactDOM.render(<AdaptableBlotterReact BlotterOptions={adaptableBlotterOptionsAgGrid} />, document.getElementById('adaptableBlotter'));