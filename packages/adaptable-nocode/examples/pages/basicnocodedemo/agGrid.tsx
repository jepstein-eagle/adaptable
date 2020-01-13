import { useEffect } from 'react';

import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham-dark.css';

import '../../../src/index.scss'; // from '@adaptabletools/adaptable-nocode/index.css'
import '../../../src/themes/dark.scss'; // from '@adaptabletools/adaptable-nocode/themes/dark.css'

import './index.css';

/*
Basic demo of wizard that allow d&d of a json with an array contents
*/

function InitAdaptableDemo() {
  const adaptableOptions: AdaptableOptions = {
    primaryKey: '', // will be added later ...
    userName: 'No Data User',
    predefinedConfig: demoConfig,
  };
  AdaptableNoCodeWizard.init(adaptableOptions).then(api => {
    console.log(api);
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
