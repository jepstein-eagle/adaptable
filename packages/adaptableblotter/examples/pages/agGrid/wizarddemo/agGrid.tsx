import { useEffect } from 'react';

import { startCase } from 'lodash';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { AdaptableNoCodeWizard } from '../../../../App_Scripts/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../App_Scripts/types';
import { IAdaptableNoCodeWizard } from '../../../../App_Scripts/BlotterInterfaces/IAdaptableNoCodeWizard';
import { ColDef } from 'ag-grid-community';

/*
Basic demo of wizard that allow d&d of a json with an array contents
*/

function InitAdaptableBlotter() {
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'dtmKey', // will be added later ...
    //blotterId: 'Position Monitor',
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
      // const adaptableblotter = new Adaptable(adaptableOptions);
      //
      // return adaptableblotter;
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
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
