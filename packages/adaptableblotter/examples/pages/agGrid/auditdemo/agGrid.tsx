import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/base.scss';
import '../../../../App_Scripts/themes/light.scss';

import { IAdaptableBlotter, AdaptableBlotterOptions } from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AuditLogEventArgs } from '../../../../App_Scripts/Api/Events/AuditEvents';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // creating blotter options here so we can add audit
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    blotterId: 'audit demo',
    licenceKey: examplesHelper.getEnterpriseLicenceKey(),

    auditOptions: {
      auditUserStateChanges: {
        auditToConsole: true,
        auditAsEvent: false,
      },
      auditFunctionEvents: {
        auditToConsole: true,
      },
      auditCellEdits: {
        auditToConsole: true,
      },
    },
  };

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.auditEventApi
    .onAuditStateChanged()
    .Subscribe((sender, columnChangedArgs) => listenToAuditLogEvent(columnChangedArgs));

  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
}

function listenToAuditLogEvent(auditLogEventArgs: AuditLogEventArgs) {
  console.log('audit event received');
  console.log(auditLogEventArgs);
}

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
