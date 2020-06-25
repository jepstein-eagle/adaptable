import { AdaptablePlugin, IAdaptable } from '@adaptabletools/adaptable/types';
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

const calculateWeightedAverage = ({
  numericValues,
  numericColumns,
}: {
  numericValues: number[];
  numericColumns: string[];
}): any => {
  if (numericColumns.length != 2 || numericValues.length % 2 != 0) {
    return '';
  }

  // assumption is that the first col is the Amount and the second col is the Weight
  let mainValues: number[] = [];
  let multiplierValues: number[] = [];
  let weightedValues: number[] = [];
  let halfWay: number = numericValues.length / 2;

  for (var i = 0; i < halfWay; i++) {
    const mainValue: number = numericValues[i];
    mainValues.push(mainValue);
    const multiplierValue = numericValues[i + halfWay];
    multiplierValues.push(multiplierValue);
    weightedValues.push(mainValue * multiplierValue);
  }
  const sumMainValues = sumNumberArray(mainValues);
  const sumWeightedValues = sumNumberArray(weightedValues);
  return sumWeightedValues / sumMainValues;
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

  onAdaptableReady(adaptable: IAdaptable) {
    const pluginData = {
      OptionalSummaryOperations: [
        {
          OperationName: 'VWAP',
          OperationFunction: 'calculateVwap',
        },
        {
          OperationName: 'Only',
          OperationFunction: 'calculateOnly',
        },
        {
          OperationName: 'Weighted Avg',
          OperationFunction: 'calculateWeightedAverage',
        },
      ] as CellSummaryOperationDefinition[],
    };

    adaptable.adaptableOptions.userFunctions = adaptable.adaptableOptions.userFunctions || [];
    adaptable.adaptableOptions.userFunctions.push({
      type: 'CellSummaryOperationFunction',
      name: 'calculateVwap',
      handler: calculateVwap,
    });

    adaptable.adaptableOptions.userFunctions.push({
      type: 'CellSummaryOperationFunction',
      name: 'calculateOnly',
      handler: calculateOnly,
    });

    adaptable.adaptableOptions.userFunctions.push({
      type: 'CellSummaryOperationFunction',
      name: 'calculateWeightedAverage',
      handler: calculateWeightedAverage,
    });

    adaptable.api!.pluginsApi.registerPlugin(this.pluginId, pluginData);

    adaptable.api!.cellSummaryApi.addCellSummaryOperationDefinitions(
      pluginData.OptionalSummaryOperations
    );
  }
}

export default (options?: FinancePluginOptions) => new FinancePlugin(options);
