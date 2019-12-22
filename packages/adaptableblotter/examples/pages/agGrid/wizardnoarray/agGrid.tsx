import { useEffect } from 'react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-theme-balham-dark.css';

import '../../../../App_Scripts/index.scss';
import '../../../../App_Scripts/themes/dark.scss';
import './index.css';

import { AdaptableWizard } from '../../../../App_Scripts/agGrid';
import { AdaptableBlotterOptions, PredefinedConfig } from '../../../../App_Scripts/types';

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

function InitAdaptableBlotter() {
  const adaptableBlotterOptions: AdaptableBlotterOptions = {
    primaryKey: 'tradeId',

    predefinedConfig: demoConfig,
  };

  new AdaptableWizard(adaptableBlotterOptions, {
    prepareData: data => {
      const result = {
        columns: ['name', 'value'],
        data: Object.keys(data).reduce(
          (acc, key) => {
            acc.push({
              id: key,
              name: key,
              value: data[key],
            });
            return acc;
          },
          [] as any[]
        ),
      };
      return result;
    },
  });
}

let demoConfig: PredefinedConfig = {};

export default () => {
  useEffect(() => {
    if (!process.browser) {
      return;
    }

    InitAdaptableBlotter();
  }, []);

  return null;
};
