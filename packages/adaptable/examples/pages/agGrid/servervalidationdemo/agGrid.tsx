import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { GridOptions } from '@ag-grid-community/all-modules';
import Adaptable from '../../../../src/agGrid';
import {
  AdaptableOptions,
  PredefinedConfig,
  AdaptableApi,
  ActionColumnClickedEventArgs,
  DataChangedInfo,
} from '../../../../src/types';
import { ExamplesHelper } from '../../ExamplesHelper';
import { ValidationResult } from '../../../../src/AdaptableOptions/EditOptions';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

var adaptableApi: AdaptableApi;

function InitAdaptableDemo() {
  const examplesHelper = new ExamplesHelper();
  const tradeCount: number = 50;
  const tradeData: any = examplesHelper.getTrades(tradeCount);
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(tradeData);

  const runServerValidation: boolean = true;

  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Server Validation Demo',
    vendorGrid: {
      ...gridOptions,
      modules: AllEnterpriseModules,
    },
    predefinedConfig: demoConfig,
  };

  if (runServerValidation) {
    adaptableOptions.editOptions = {
      validateOnServer: (dataChangedInfo: DataChangedInfo) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => resolve(getServerEditResponse(dataChangedInfo)), 500);
        });
      },
    };
  }

  adaptableApi = Adaptable.init(adaptableOptions);

  adaptableApi.eventApi.on('ActionColumnClicked', (args: ActionColumnClickedEventArgs) => {
    adaptableApi.gridApi.setCellValue('amount', 145, args.data[0].id.primaryKeyValue, false);
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
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
