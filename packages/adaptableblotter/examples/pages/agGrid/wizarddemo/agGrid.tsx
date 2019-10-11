import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { LicenseManager } from 'ag-grid-enterprise';
import AdaptableBlotter, { AdaptableBlotterWizard } from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';

/*
Basic demo of wizard that allow d&d of a json with an array contents
*/

LicenseManager.setLicenseKey(process.env.ENTERPRISE_LICENSE!);
function InitAdaptableBlotter() {
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    predefinedConfig: demoConfig,
  };
  new AdaptableBlotterWizard(adaptableBlotterOptions, {
    onInit: ({ adaptableBlotterOptions, gridOptions }) => {
      adaptableBlotterOptions.filterOptions = adaptableBlotterOptions.filterOptions || {};
      adaptableBlotterOptions.filterOptions.autoApplyFilter = false;
      // const adaptableblotter = new AdaptableBlotter(adaptableBlotterOptions);
      //   // examplesHelper.autoSizeDefaultLayoutColumns(adaptableblotter, gridOptions);
      //   // adaptableblotter.api.systemStatusApi.setSuccessSystemStatus('ouch');
      //   // global.adaptableblotter = adaptableblotter;
      // return adaptableblotter;
    },
  });
}

let demoConfig: PredefinedConfig = {
  Theme: {
    CurrentTheme: 'dark',
  },
  Reminder: {
    Reminders: [
      {
        Alert: {
          Header: "Run 'All Data' Report",
          MessageType: 'Info',
          Msg: "Run the 'All Data' report so MO have full view of activity",
          ShowAsPopup: true,
        },
        Schedule: {
          DaysOfWeek: [1, 2, 3, 4, 5],
          Hour: 11,
          Minute: 8,
        },
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
