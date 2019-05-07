import { useEffect } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';


import AdaptableBlotter from '../../../../App_Scripts/agGrid'

import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'

import { DataGenerator } from '../../../../Harness/DataGenerator'
import { IAdaptableBlotter } from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';


function InitAdaptableBlotter() {
  const dataGen = new DataGenerator();

  const gridOptions: GridOptions = {
    columnDefs: dataGen.getFTSESchema(),
    rowData: dataGen.getFtseData(5),
    enableRangeSelection: true,
    floatingFilter: true,
    suppressColumnVirtualisation: false,
    suppressMenuHide: true,
    sideBar: undefined,
    columnTypes: {
      abColDefNumber: {},
      abColDefString: {},
      abColDefBoolean: {},
      abColDefDate: {},
      abColDefObject: {},
    },
  };

  const adaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'date',
    userName: 'demo user',
    blotterId: 'ftse demo',
    licenceKey: dataGen.getLicenceKey(),
  };

  const adaptableblotter: IAdaptableBlotter = new AdaptableBlotter(adaptableBlotterOptions);

  setTimeout(() => {
    if (adaptableblotter.adaptableBlotterStore.TheStore.getState().Layout.CurrentLayout === 'Ab_Default_Layout') {
      gridOptions.columnApi.autoSizeAllColumns();
    }
  });
}



export default () => {
  useEffect(() => {


    if (!process.browser) {
      return
    }


    InitAdaptableBlotter()
  }, [])

  return null
}