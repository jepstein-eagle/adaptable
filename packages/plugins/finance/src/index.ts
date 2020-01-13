import { AdaptablePlugin, IAdaptable, IAdaptableStore } from '@adaptabletools/adaptable/types';

import { Helper } from '@adaptabletools/adaptable/src/Utilities/Helpers/Helper';
import { CellSummaryOperationDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/CellSummaryState';

import { version } from '../package.json';
import coreVersion from '@adaptabletools/adaptable/version';

if (version !== coreVersion) {
  console.warn(`
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
!!!!!!! "@adaptabletools/adaptable-plugin-finance" (v @${version}) and "@adaptabletools/adaptable" (v @${coreVersion}) have different versions - they should have the exact same version.
!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
`);
}

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

  constructor(options?: FinancePluginOptions) {
    super(options);
    this.options = { ...defaultOptions, ...options };
  }

  afterInitStore(adaptable: IAdaptable) {
    const pluginData = {
      OptionalSummaryOperations: [
        {
          OperationName: 'VWAP',
          OperationFunction: calculateVwap,
        },
        {
          OperationName: 'Only',
          OperationFunction: calculateOnly,
        },
      ] as CellSummaryOperationDefinition[],
    };

    adaptable.api!.pluginsApi.registerPlugin(this.pluginId, pluginData);

    adaptable.api!.internalApi.addCellSummaryOperationDefinitions(
      pluginData.OptionalSummaryOperations
    );
  }
}

export default (options?: any) => new FinancePlugin(options);
