import React, { useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import '../../../../App_Scripts/index.scss';

import { GridOptions } from 'ag-grid-community';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { TickingDataHelper } from '../../TickingDataHelper';

/*
Has pseudo ticking data together with some JSON that sets flashing in 3 columns
This uses the agGrid setDataValue method which DOES call cell value changed
*/

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tickingDataHelper = new TickingDataHelper();
  const tradeData: any = examplesHelper.getTrades(20);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  // turn on mimicing ticking data
  tickingDataHelper.startTickingDataagGridSetDataValue(gridOptions);
  // tickingDataHelper.startTickingDataagGridSetData(gridOptions);

  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'ticking demo set value'
  );
  adaptableBlotterOptions.predefinedConfig = flashingJson;

  adaptableBlotterOptions.filterOptions = {
    //   filterActionOnExternalDataChange: {
    //    RunFilter: 'Always',
    //  },
  };

  adaptableBlotterOptions.auditOptions = {
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
    auditTickingDataChanges: {
      //   auditAsAlert: true,
      //   auditToConsole: true,
    },
    alertShowAsPopup: true,
  };

  const blotterApi = AdaptableBlotter.init(adaptableBlotterOptions);
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
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
