import { useEffect } from 'react';

import { startCase } from 'lodash';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { AdaptableNoCodeWizard } from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';
import { IAdaptableNoCodeWizard } from '../../../../src/AdaptableInterfaces/IAdaptableNoCodeWizard';
import { ColDef } from '@ag-grid-community/all-modules';

/*
Basic demo of wizard that allow d&d of a json with an array contents
*/

function InitAdaptableDemo() {
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'dtmKey', // will be added later ...
    //adaptableId: 'Position Monitor',
    userName: 'No Data User',
    predefinedConfig: demoConfig,
  };
  let abWizard: IAdaptableNoCodeWizard = new AdaptableNoCodeWizard(adaptableOptions, {
    //  fetchData: () => {
    //    return fetch(
    //      'https://dl.dropboxusercontent.com/s/effei2a3g7bc4dt/positionMonitor_ARBITRAGE-ALPHA-STRAT.json?dl=0'
    //    ).then(response => response.json());
    //  },
    onInit: ({ adaptableOptions, gridOptions }) => {
      adaptableOptions.filterOptions = adaptableOptions.filterOptions || {};
      gridOptions.columnDefs = gridOptions.columnDefs!.map(c => {
        return {
          ...c,
          headerName: startCase((c as ColDef).field),
        };
      });
    },
  });
}

let demoConfig: PredefinedConfig = {
  Theme: {
    CurrentTheme: 'dark',
  },
  /*
  Reminder: {
    Reminders: [
      {
        Alert: {
          Header: "Run 'All Data' Report",
          Msg: "Run the 'All Data' report so MO have full view of activity",
          AlertDefinition: {
            ColumnId: '',
            Range: {

            }
            MessageType: 'Info',
            AlertProperties: {
              ShowPopup: false,
            },
          },
        },

        Schedule: {
          DaysOfWeek: [1, 2, 3, 4, 5],
          Hour: 11,
          Minute: 8,
        },
      },
    ],
  },
  */
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
