import * as React from "react";
import * as ReactDOM from "react-dom";
import { AdaptableBlotterReact } from '../../App_Scripts/View/AdaptableBlotterReact';
import { IAdaptableBlotterOptions } from "../../App_Scripts/Core/Api/Interface/IAdaptableBlotterOptions";

// var themeName = ""
// var adaptableblotter;

let gridOptions: IAdaptableBlotterOptions = {
  primaryKey: 'Test',
  maxColumnValueItemsDisplayed: 1,
  columnValuesOnlyInQueries: true
};

ReactDOM.render(<AdaptableBlotterReact BlotterOptions={gridOptions} />, document.getElementById('adaptableBlotter'));