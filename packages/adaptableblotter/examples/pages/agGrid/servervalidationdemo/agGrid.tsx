import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';
import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { GridOptions } from 'ag-grid-community';
import AdaptableBlotter from '../../../../App_Scripts/agGrid';
import {
  AdaptableBlotterOptions,
  PredefinedConfig,
  IAdaptableBlotter,
} from '../../../../App_Scripts/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { ActionColumnClickedEventArgs } from '../../../../App_Scripts/Api/Events/BlotterEvents';
import { GridCell } from '../../../../App_Scripts/Utilities/Interface/Selection/GridCell';
import { DataChangedInfo } from '../../../../App_Scripts/Utilities/Interface/DataChangedInfo';
import { Validation } from '../../../../App_Scripts/BlotterOptions/EditOptions';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 50;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const testServerEdit: boolean = true;

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Server Validation Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  adaptableBlotterOptions.generalOptions = {
    showAdaptableBlotterToolPanel: true,
  };

  if (testServerEdit) {
    adaptableBlotterOptions.editOptions = {
      validateOnServer: (dataChangedInfo: DataChangedInfo) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(getServerEditResponse(dataChangedInfo)), 200);
        });
      },
    };
  }

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
    const rowDataNew = Object.assign({}, args.data[0].id.rowData);
    rowDataNew.notional = 200;
    rowDataNew.counterparty = 'Hello';
    rowDataNew.country = 'Disneyland';
    //   adaptableblotter.api.gridApi.updateGridData([rowDataNew]);
    // gridOptions.api!.updateRowData({ update: [rowDataNew] });

    let gridCell: GridCell = {
      columnId: 'notional',
      value: 50,
      primaryKeyValue: args.data[0].id.primaryKeyValue,
    };
    adaptableblotter.api.gridApi.setGridCell(gridCell, true);
  });
}

function getServerEditResponse(dataChangedInfo: DataChangedInfo): Validation {
  if (dataChangedInfo.ColumnId == 'counterparty') {
    if (dataChangedInfo.NewValue == 'Hello') {
      return {
        NewValue: dataChangedInfo.OldValue,
        ValidationMessage: 'Please say "hi" instead',
      };
    } else if (dataChangedInfo.NewValue == 'World') {
      return {
        NewValue: 'Universe',
        ValidationMessage: 'Should be universe',
      };
    }
  }
  if (dataChangedInfo.ColumnId == 'notional') {
    if (dataChangedInfo.NewValue == 50) {
      return {
        NewValue: dataChangedInfo.OldValue,
        ValidationMessage: 'Cannot set it to 50',
      };
    } else if (dataChangedInfo.NewValue > 100) {
      return {
        NewValue: 100,
        ValidationMessage: 'Cannot be greater than 100',
      };
    } else if (dataChangedInfo.NewValue < 20) {
      return {
        NewValue: 20,
        ValidationMessage: 'Cannot  be less than  20',
      };
    }
  }
  return {};
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Export', 'Layout'],
  },
  ActionColumn: {
    ActionColumns: [
      {
        ColumnId: 'Test',
        ButtonText: 'Test Updates',
      },
    ],
  },
  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: ['tradeId', 'notional', 'country', 'starts', 'change', 'counterparty', 'Test'],
        Name: 'Server Edit',
      },
    ],
    CurrentLayout: 'Server Edit',
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
