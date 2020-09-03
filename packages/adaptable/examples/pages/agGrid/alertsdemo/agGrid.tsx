import React, { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';
/*
Demo for checking alerts work
*/

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 25;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const tickingDataHelper = new TickingDataHelper();
  const useTickingData: boolean = true;
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);
  const adaptableOptions: AdaptableOptions = {
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    primaryKey: 'tradeId',
    userName: 'demo user',
    adaptableId: 'alerts demo',
    predefinedConfig: demoConfig,
  };
  const adaptableApi = await Adaptable.init(adaptableOptions);
  tickingDataHelper.useTickingDataagGrid(
    adaptableOptions.vendorGrid,
    adaptableApi,
    1000,
    tradeCount,
    true
  );
}

let demoConfig: PredefinedConfig = {
  Alert: {
    Revision: 6,
    AlertDefinitions: [
      {
        ColumnId: 'notional',
        MessageType: 'Warning',
        Range: {
          Operand1Type: 'Value',
          Operator: 'Equals',
          Operand1: '1200',
        },
        AlertProperties: {
          ShowPopup: false,
          ShowInDiv: false,
          HighlightCell: true,
        },
      },
    ],
    //  AlertDisplayDiv: 'alertDiv', // for when testing showing alerts in the User nominated Div
    // AlertDisplayDiv: '',
    MaxAlertsInStore: 105,
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
