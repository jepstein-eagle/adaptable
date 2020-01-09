import { useEffect } from 'react';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-balham-dark.css';

import '../../../../src/index.scss';
import '../../../../src/themes/dark.scss';
import './index.css';

import { AdaptableNoCodeWizard } from '../../../../src/agGrid';
import { AdaptableOptions, PredefinedConfig } from '../../../../src/types';

/*
Basic demo of wizard that allows dropping a file that's not an array
but a plain JSON object like the one below

{
  "minSecondsWaitBetweenClips": "600",
  "minimumSpreadMoneyToForegoTrade": "0.15",
  "centsAnchorGiveaway": "0.05",
  "maxMwhSizeToShowInAlpha": "3",
  "tooLargeSpreadPercent": "0.1",
  "existingFlowAtSOD": "DA;TTF=100,NCG=4|WE;GPL=1|",
  "tooLargePrice": "100.0",
  "parametrizationType": "com.dalwyn.ceparbitragestrategy.strategy.ArbitrageStrategyParams",
  "minimumSpreadMoneyToBeginTrade": "0.25"
}


*/

function InitAdaptableDemo() {
  const adaptableOptions: AdaptableOptions = {
    primaryKey: 'tradeId',

    predefinedConfig: demoConfig,
  };

  new AdaptableNoCodeWizard(adaptableOptions, {
    prepareData: data => {
      const result = {
        columns: ['name', 'value'],
        data: Object.keys(data).reduce((acc, key) => {
          acc.push({
            id: key,
            name: key,
            value: data[key],
          });
          return acc;
        }, [] as any[]),
      };
      return result;
    },
  });
}

let demoConfig: PredefinedConfig = {};

export default () => {
  useEffect(() => {
    if (!(process as any).browser) {
      return;
    }

    InitAdaptableDemo();
  }, []);

  return null;
};
