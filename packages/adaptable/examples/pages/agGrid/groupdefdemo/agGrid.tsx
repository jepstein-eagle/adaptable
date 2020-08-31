import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions, RowNode, ColDef } from '@ag-grid-community/all-modules';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
  SearchChangedEventArgs,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection';
import { MenuModule } from '@ag-grid-enterprise/menu';
import { SideBarModule } from '@ag-grid-enterprise/side-bar';
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping';

import Adaptable from '../../../../agGrid';
import { AdaptableReadyInfo } from '../../../../src/Api/Events/AdaptableReady';
import { TickingDataHelper } from '../../TickingDataHelper';

var api: AdaptableApi;

async function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 30;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Group Def Demo',

    vendorGrid: {
      ...gridOptions,
      modules: [RangeSelectionModule, MenuModule, SideBarModule, RowGroupingModule],
    },
    predefinedConfig: demoConfig,
  };

  adaptableOptions.layoutOptions = {
    //  autoSizeColumnsInLayout: true,
  };
  adaptableOptions.userInterfaceOptions = {};

  api = await Adaptable.init(adaptableOptions); // turn on mimicing ticking data 200, tradeCount);
}

let demoConfig: PredefinedConfig = {
  Layout: {
    //  CurrentLayout: 'Flashing',
    Layouts: [
      {
        Name: 'Flashing',
        Columns: ['tradeId', 'ask', 'notional', 'bid', 'price'],
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
