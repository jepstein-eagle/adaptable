import React, { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/base.scss';
import '../../../../App_Scripts/base-new.scss';

import '../../../../App_Scripts/themes/light.scss';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';

/*
Basic demo that just tests that we can create an agGrid and an Adaptable Blotter working together
No JSON or anything complicated
Nor do we create the ag-Grid
*/

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(500);
  examplesHelper.startTickingDataagGrid(gridOptions);
  gridOptions.singleClickEdit = true;
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'basic demo'
  );
  adaptableBlotterOptions.auditOptions = {
    auditCellEdits: {
      auditToHttpChannel: true,
    },
    auditFunctionEvents: {
      auditToConsole: true,
    },
    auditInternalStateChanges: {
      auditAsEvent: true,
    },
    auditUserStateChanges: {
      auditAsEvent: true,
      auditToHttpChannel: true,
    },
    pingInterval: 50,
    auditLogsSendInterval: 3,
  };
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
  adaptableblotter.applyLightTheme();
}

let demoConfig: PredefinedConfig = {
  UserInterface: {
    // EditLookUpColumns: [
    //   { ColumnId: 'currency' },
    //  { ColumnId: 'counterparty', LookUpValues: ['first', 'second'] },
    // ],
  },
};

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
