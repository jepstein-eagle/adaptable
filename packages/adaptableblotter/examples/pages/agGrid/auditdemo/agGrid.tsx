import { useEffect } from 'react'

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid'
import '../../../../App_Scripts/base.css'
import '../../../../App_Scripts/themes/light.css'

import { IAdaptableBlotter, IAdaptableBlotterOptions } from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();

  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(500);

  // creating blotter options here so we can add audit
  const adaptableBlotterOptions: IAdaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    blotterId: 'audit demo',
    licenceKey: examplesHelper.getEnterpriseLicenceKey(),
    auditOptions: {
      auditCellEdits: true,
      auditFunctionEvents: true,
      auditUserStateChanges: true,
      auditInternalStateChanges: false,
      pingInterval: 120,
      auditToConsole: true
    },
  };

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);


  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
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