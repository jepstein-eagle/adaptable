import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-blue.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';

import { IAdaptable, AdaptableOptions, AdaptableApi } from '../../../../src/types';
import { GridOptions } from 'ag-grid-community';
import { ExamplesHelper } from '../../ExamplesHelper';
import { AuditLogEventArgs } from '../../../../src/Api/Events/AuditEvents';
import { AuditLogEntry } from '../../../../src/Utilities/Interface/AuditLogEntry';

var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    vendorGrid: gridOptions,
    primaryKey: 'tradeId',
    userName: 'demo user',
    adaptableId: 'audit demo',

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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
