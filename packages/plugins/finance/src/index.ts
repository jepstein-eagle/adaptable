import {
  AdaptablePlugin,
  IAdaptable,
  AdaptableApi,
  IAdaptableStore,
} from '@adaptabletools/adaptable/types';

import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { CellSummaryOperationDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/CellSummaryState';

const sumNumberArray = (numericValues: number[]): number => {
  if (numericValues.length) {
    let sum = numericValues.reduce(function(a, b) {
      return a + b;
    });
    return sum;
  } else {
    return 0;
  }
};

const calculateOnly = ({
  allValues,
  distinctCount,
}: {
  distinctCount: number;
  allValues: any[];
}): any => {
  return distinctCount == 1 ? allValues[0] : '';
};

const calculateVwap = ({
  numericValues,
  numericColumns,
}: {
  numericValues: number[];
  numericColumns: string[];
}): any => {
  if (numericColumns.length == 2) {
    return '';
  }

  let firstColValues: number[] = [];
  let secondColComputedValues: number[] = [];
  for (var i = 0; i < numericValues.length; i++) {
    if (i % 2 === 0) {
      // index is odd
      firstColValues.push(numericValues[i]);
    } else {
      let newValue: any = numericValues[i] * numericValues[i - 1];
      secondColComputedValues.push(newValue);
    }
  }
  let firstColTotal: number = sumNumberArray(firstColValues);
  let secondColTotal: number = sumNumberArray(secondColComputedValues);
  let result: any = Helper.RoundNumberTo4dp(secondColTotal / firstColTotal);
  return result;
};

const defaultOptions = {};
interface FinancePluginOptions {}
class FinancePlugin extends AdaptablePlugin {
  public options: FinancePluginOptions;
  public pluginId: string = 'finance';
  public api?: AdaptableApi;

  constructor(options?: FinancePluginOptions) {
    super(options);
    this.options = { ...defaultOptions, ...options };
  }
  afterInitApi(adaptable: IAdaptable, api: AdaptableApi) {
    this.api = api;
  }

  afterInitStore(adaptable: IAdaptable, store: IAdaptableStore) {
    const pluginData = {
      OptionalSummaryOperations: [
        {
          name: 'VWAP',
          fn: calculateVwap,
        },
        {
          name: 'Only',
          fn: calculateOnly,
        },
      ] as CellSummaryOperationDefinition[],
    };

    this.api!.pluginsApi.registerPlugin(this.pluginId, pluginData);

    this.api!.internalApi.addCellSummaryOperationDefinitions(pluginData.OptionalSummaryOperations);
  }
}

export default (options?: any) => new FinancePlugin(options);
