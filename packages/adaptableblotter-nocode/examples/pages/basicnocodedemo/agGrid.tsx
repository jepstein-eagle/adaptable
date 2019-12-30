import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../src/index.scss'; // from '@adaptabletools/adaptableblotter-nocode/index.css'
import '../../../src/themes/dark.scss'; // from '@adaptabletools/adaptableblotter-nocode/themes/dark.css'

import './index.css';

/*
Basic demo of wizard that allow d&d of a json with an array contents
*/

function InitAdaptableBlotter() {
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
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
