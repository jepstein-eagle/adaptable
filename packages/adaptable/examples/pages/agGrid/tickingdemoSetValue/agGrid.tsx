import React, { useEffect } from 'react';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import Adaptable from '../../../../src/agGrid';
import '../../../../src/index.scss';

import { GridOptions } from '@ag-grid-community/all-modules';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

/*
Has pseudo ticking data together with some JSON that sets flashing in 3 columns
This uses the agGrid setDataValue method which DOES call cell value changed
*/

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeCount: number = 30;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // tickingDataHelper.startTickingDataagGridSetData(gridOptions);

  const adaptableOptions: AdaptableOptions = examplesHelper.createAdaptableOptionsTrade(
    gridOptions,
    'ticking demo set value'
  );
  adaptableOptions.predefinedConfig = flashingJson;

  adaptableOptions.filterOptions = {
    //   filterActionOnExternalDataChange: {
    //    RunFilter: 'Always',
    //  },
  };

  adaptableOptions.auditOptions = {
    auditCellEdits: {
      //   auditAsAlert: true,
      //   auditToConsole: true,
    },
    auditFunctionEvents: {
      //   auditAsAlert: true,
      //    auditToConsole: true,
    },
    auditUserStateChanges: {
      // auditAsAlert: true,
      //  auditToConsole: true,
    },
    auditTickingDataUpdates: {
      //   auditAsAlert: true,
      //   auditToConsole: true,
    },
    alertShowAsPopup: true,
  };

  const adaptableApi = Adaptable.init(adaptableOptions);

  // turn on mimicing ticking data
  tickingDataHelper.useTickingDataagGrid(gridOptions, adaptableApi, 500, tradeCount);
}

let flashingJson: PredefinedConfig = {
  FlashingCell: {
    FlashingCells: [
      {
        IsLive: true,
        ColumnId: 'ask',
        FlashingCellDuration: 500,
        UpColor: '#008000',
        DownColor: '#FF0000',
      },
      {
        IsLive: true,
        ColumnId: 'bid',
        FlashingCellDuration: 500,
        UpColor: '#008000',
        DownColor: '#FF0000',
      },
      {
        IsLive: true,
        ColumnId: 'price',
        FlashingCellDuration: 1000,
        UpColor: 'Blue',
        DownColor: 'Yellow',
      },
    ],
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
