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
  const tickingDataHelper = new TickingDataHelper();
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  let coldefs: ColDef[] = gridOptions.columnDefs as ColDef[];

  // lets try the different ways of colouring cells
  // see:  https://www.ag-grid.com/javascript-grid-cell-styles/  for more info

  // 1.  Using simple cellStyle - for the ASK column
  let askColDef: ColDef | undefined = coldefs.find(c => c.field == 'ask');
  if (askColDef) {
    askColDef.cellStyle = function(params) {
      if (params.value < 120) {
        return { color: 'white', backgroundColor: 'pink' };
      } else {
        return null;
      }
    };
  }

  // 2.  Using cellClass - for the Notional column
  let notionalColDef: ColDef | undefined = coldefs.find(c => c.field == 'notional');
  if (notionalColDef) {
    notionalColDef.cellClass = function(params) {
      return params.value > 1200 ? 'demo-purple' : 'demo-grey';
    };
  }

  // 3. Using CellClassRules - for the BID column
  let bidColDef: ColDef | undefined = coldefs.find(c => c.field == 'bid');
  if (bidColDef) {
    bidColDef.cellClassRules = {
      'demo-brown': function(params: any) {
        return params.value < 120;
      },
    };
  }

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Flashing Cells Demo',

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

  api = await Adaptable.init(adaptableOptions); // turn on mimicing ticking data
  //  tickingDataHelper.useTickingDataagGrid(adaptableOptions.vendorGrid, api, 200, tradeCount);
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleButtons: ['FlashingCells'],
  },
  Layout: {
    CurrentLayout: 'Flashing',
    Layouts: [
      {
        Name: 'Flashing',
        Columns: ['tradeId', 'ask', 'notional', 'bid', 'price'],
      },
    ],
  },
  FlashingCell: {
    FlashingCells: [
      {
        IsLive: true,
        ColumnId: 'notional',
      },
      {
        IsLive: true,
        ColumnId: 'ask',
      },
      {
        IsLive: true,
        ColumnId: 'bid',
        UpColor: 'Orange',
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
