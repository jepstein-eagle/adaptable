import React, { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';

import { GridOptions } from 'ag-grid-community';
import { LicenseManager } from 'ag-grid-enterprise';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';

/*
Demo for checking alerts work
*/

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeData: any = examplesHelper.getTrades(500);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'Alerts Demo'
  );
  adaptableOptions.predefinedConfig = demoConfig;
  const adaptableApi = Adaptable.init(adaptableOptions);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['Layout', 'Alert'],
  },
  Alert: {
    AlertDefinitions: [
      {
        ColumnId: 'price',
        Expression: undefined,
        MessageType: 'Warning',
        Range: {
          Operand1: '100',
          Operand1Type: 'Value',
          Operand2: '',
          Operand2Type: 'Value',
          Operator: 'PercentChange',
        },
        AlertProperties: {
          ShowPopup: false,
          ShowInDiv: true,
        },
      },
    ],
    AlertDisplayDiv: 'alertDiv', // for when testing showing alerts in the User nominated Div
    // AlertDisplayDiv: '',
    MaxAlertsInStore: 5,
  },
};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
