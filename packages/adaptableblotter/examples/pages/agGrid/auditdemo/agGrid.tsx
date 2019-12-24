import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';

import {
  IAdaptableBlotter,
  AdaptableBlotterOptions,
  BlotterApi,
} from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AuditLogEventArgs } from '../../../../App_Scripts/Api/Events/AuditEvents';
import { AuditLogEntry } from '../../../../App_Scripts/Utilities/Interface/AuditLogEntry';

var blotterApi: BlotterApi;

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

    auditOptions: {
      auditInternalStateChanges: {
        auditAsEvent: true,
        auditToConsole: true,
      },
      auditFunctionEvents: {
        auditAsEvent: true,
        //    auditToConsole: true,
      },
      auditUserStateChanges: {
        auditAsEvent: true,
        auditToConsole: true,
      },
      auditCellEdits: {
        auditAsEvent: true,
        auditToConsole: true,
      },
    },
  };

  blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);

  blotterApi.auditEventApi.on('AuditCellEdited', auditLogEventArgs => {
    listenToAuditLogEvent('cell edit', auditLogEventArgs);
  });
  blotterApi.auditEventApi.on('AuditFunctionApplied', auditLogEventArgs => {
    listenToAuditLogEvent('function applied', auditLogEventArgs);
  });
  blotterApi.auditEventApi.on('AuditStateChanged', auditLogEventArgs => {
    listenToAuditLogEvent('state changed', auditLogEventArgs);
  });
}

function listenToAuditLogEvent(auditType: string, auditLogEventArgs: AuditLogEventArgs) {
  console.log('audit event received: ' + auditType);
  let auditLogEntry: AuditLogEntry = auditLogEventArgs.data[0].id;
  console.log(auditLogEntry);
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
