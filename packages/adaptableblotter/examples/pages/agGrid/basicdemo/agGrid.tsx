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
  const gridOptions: GridOptions = examplesHelper.getGridOptionsTrade(20);
  const adaptableBlotterOptions: AdaptableBlotterOptions = examplesHelper.createAdaptableBlotterOptionsTrade(
    gridOptions,
    'basic demo'
  );
  adaptableBlotterOptions.predefinedConfig = demoConfig;
  const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
  examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
  adaptableblotter.applyLightTheme();
}

let demoConfig: PredefinedConfig = {
  ColumnFilter: {
    ColumnFilters: [
      {
        Filter: {
          RangeExpressions: [
            {
              ColumnId: 'price',
              Ranges: [
                {
                  Operand1: '10',
                  Operand1Type: 'Value',
                  Operand2: '50',
                  Operand2Type: 'Value',
                  Operator: 'Between',
                },
              ],
            },
          ],
        },
        ColumnId: 'price',
      },
    ],
  },
  CellValidation: {
    CellValidations: [
      {
        ActionMode: 'Stop Edit',
        ColumnId: 'changeOnYear',
        Range: {
          Operator: 'None',
          Operand1: '',
          Operand2: '',
          Operand1Type: 'Value',
          Operand2Type: 'Value',
        },
      },
    ],
  },

  UserInterface: {
    StyleClassNames: ['first', 'secod'],
  },

  Export: {
    CurrentReport: 'sssss',
    Reports: [
      {
        Name: 'sssss',
        ReportColumnScope: 'AllColumns',
        ReportRowScope: 'VisibleRows',
      },
    ],
  },

  Alert: {
    MaxAlertsInStore: 500,
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
