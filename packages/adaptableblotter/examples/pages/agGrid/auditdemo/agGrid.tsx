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
      },
      auditUserStateChanges: {
        auditAsEvent: true,
      },
      auditCellEdits: {
        auditAsEvent: true,
      },
    },
  };

  blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);

  let runNewEvents: boolean = true;

  if (!runNewEvents) {
    blotterApi.auditEventApi
      .onAuditStateChanged()
      .Subscribe((sender, auditLogEventArgs) =>
        listenToAuditLogEvent('audit state', auditLogEventArgs)
      );
  } else {
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
}

function listenToAuditLogEvent(auditType: string, auditLogEventArgs: AuditLogEventArgs) {
  console.log('audit event received: ' + auditType);
  console.log(auditLogEventArgs.data[0].id);
  let auditLogEntry: AuditLogEntry = auditLogEventArgs.data[0].id;
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
