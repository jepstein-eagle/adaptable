import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';
import '../../../../../../src/index.scss';
import '../../../../../../src/themes/dark.scss';
import './index.css';

import { AdaptableOptions, PredefinedConfig } from '../../../../../../src/types';
import { AllEnterpriseModules } from '@ag-grid-enterprise/all-modules';

import Adaptable from '../../../../../../agGrid';
import nocode from '../../../../../../../plugins/nocode-aggrid/src';
import charts from '../../../../../../../plugins/charts/src';

function InitAdaptableDemo() {
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',
    userName: 'Demo User',
    adaptableId: 'Nocode Plugin Basic Demo',

    predefinedConfig: demoConfig,
    plugins: [
      nocode({
        // headerMessage: 'Welcome to Adaptable!',
        // // actionMessage: 'D&D an excel or json file',
        // dropActionMessage: 'Drop it while its hot!',
        // theme: 'light',
        // loadingMessage: 'Please wait ...',
        onInit: adaptableOptions => {
          console.log(adaptableOptions);
          adaptableOptions.vendorGrid.suppressFieldDotNotation = true;
          adaptableOptions.vendorGrid.modules = AllEnterpriseModules;
        },
      }),
      // charts(),
    ],
  };

  Adaptable.initLazy(adaptableOptions).then(api => {
    console.log(api, '!!!');
  });
}

let demoConfig: PredefinedConfig = {
  Theme: {
    CurrentTheme: 'dark',
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
