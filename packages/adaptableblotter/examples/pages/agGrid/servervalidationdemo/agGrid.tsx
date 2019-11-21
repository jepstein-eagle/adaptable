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
import { DataChangedInfo } from '../../../../App_Scripts/BlotterOptions/CommonObjects/DataChangedInfo';
import { ValidationResult } from '../../../../App_Scripts/BlotterOptions/EditOptions';

var adaptableblotter: IAdaptableBlotter;

function InitAdaptableBlotter() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 50;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const runServerValidation: boolean = true;

  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    blotterId: 'Server Validation Demo',
    vendorGrid: gridOptions,
    predefinedConfig: demoConfig,
  };

  if (runServerValidation) {
    adaptableBlotterOptions.editOptions = {
      validateOnServer: (dataChangedInfo: DataChangedInfo) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(getServerEditResponse(dataChangedInfo)), 500);
        });
      },
    };
  }

  adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);

  adaptableblotter.api.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
    adaptableblotter.api.gridApi.setCellValue('amount', 145, args.data[0].id.primaryKeyValue);
  });
}

function getServerEditResponse(dataChangedInfo: DataChangedInfo): ValidationResult {
  if (dataChangedInfo.ColumnId === 'amount') {
    if (dataChangedInfo.NewValue == 50) {
      return {
        NewValue: dataChangedInfo.OldValue,
        ValidationMessage: 'Cannot set Amount to 50',
      };
    } else if (dataChangedInfo.NewValue > 100) {
      return {
        NewValue: 100,
        //  ValidationMessage: 'Amount cannot be greater than 100',
      };
    } else if (dataChangedInfo.NewValue < 20) {
      return {
        NewValue: 20,
        ValidationMessage: 'Amount cannot  be less than  20',
      };
    }
  }
  return {};
}

let demoConfig: PredefinedConfig = {
  Dashboard: {
    VisibleToolbars: ['QuickSearch', 'Export', 'Layout', 'Alert'],
  },
  ActionColumn: {
    ActionColumns: [
      {
        ColumnId: 'Test',
        ButtonText: 'Test with API',
      },
    ],
  },
  Layout: {
    Layouts: [
      {
        ColumnSorts: [],
        Columns: ['tradeId', 'amount', 'country', 'starts', 'change', 'counterparty', 'Test'],
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
