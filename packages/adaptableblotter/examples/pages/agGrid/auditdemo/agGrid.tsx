import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import Adaptable from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';

import { IAdaptable, AdaptableOptions, AdaptableApi } from '../../../../App_Scripts/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AuditLogEventArgs } from '../../../../App_Scripts/Api/Events/AuditEvents';
import { AuditLogEntry } from '../../../../App_Scripts/Utilities/Interface/AuditLogEntry';

var adaptableApi: AdaptableApi;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // creating blotter options here so we can add audit
  const adaptableOptions: AdaptableOptions = {
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

  adaptableApi = Adaptable.init(adaptableOptions);

  adaptableApi.auditEventApi.on('AuditCellEdited', auditLogEventArgs => {
    listenToAuditLogEvent('cell edit', auditLogEventArgs);
  });
  adaptableApi.auditEventApi.on('AuditFunctionApplied', auditLogEventArgs => {
    listenToAuditLogEvent('function applied', auditLogEventArgs);
  });
  adaptableApi.auditEventApi.on('AuditStateChanged', auditLogEventArgs => {
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
