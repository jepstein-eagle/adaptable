import { AdaptablePlugin, IAdaptable } from '@adaptabletools/adaptable/types';

import { AdaptableFunctionName } from '@adaptabletools/adaptable/src/PredefinedConfig/Common/Types';
import { IStrategy } from '@adaptabletools/adaptable/src/Strategy/Interface/IStrategy';

import { ChartStrategy } from './strategies/ChartStrategy';
import { SparklineColumnStrategy } from './strategies/SparklineColumnStrategy';
import { SparklineStrategy } from './strategies/SparklineStrategy';
import { PieChartStrategy } from './strategies/PieChartStrategy';
import {
  ChartStrategyId,
  SparklineColumnStrategyId,
  SparklineStrategyId,
  PieChartStrategyId,
} from '@adaptabletools/adaptable/src/Utilities/Constants/StrategyConstants';
import {
  AdaptableViewFactory,
  AdaptableDashboardFactory,
  AdaptableToolPanelFactory,
} from '@adaptabletools/adaptable/src/View/AdaptableViewFactory';
import { ChartToolPanel } from './View/Chart/ChartToolPanel';
import { ChartToolbarControl } from './View/Chart/ChartToolbarControl';

// import {
//   PieChartPopup,
//   ChartPopup,
//   ChartDisplayPopup,
//   SparklineColumnPopup,
//   ViewAsSparklinesPopup,
// } from '@adaptabletools/adaptable/src/Utilities/Constants/ScreenPopups';

import { PieChartPopup } from './View/PieChart/PieChartPopup';
import { ChartPopup } from './View/Chart/ChartPopup';
import { ChartDisplayPopup } from './View/Chart/ChartDisplayPopup';
import { SparklineColumnPopup } from './View/Sparkline/SparklineColumnPopup';
import { ViewAsSparklinesPopup } from './View/Sparkline/ViewAsSparklinePopup';
import { getSparklineRendererForColumn } from './View/Sparkline/SparklineColumnRenderer';

const defaultOptions = {};
interface ChartsPluginOptions {}
class ChartsPlugin extends AdaptablePlugin {
  public options: ChartsPluginOptions;
  public pluginId: string = 'charts';

  constructor(options?: ChartsPluginOptions) {
    super(options);
    this.options = { ...defaultOptions, ...options };

    this.registerValue('sparklineColumnRenderer', sparklineColumn =>
      getSparklineRendererForColumn(sparklineColumn)
    );
  }

  afterInitStrategies(adaptable: IAdaptable, strategies: Map<AdaptableFunctionName, IStrategy>) {
    strategies.set(ChartStrategyId, new ChartStrategy(adaptable));
    strategies.set(SparklineColumnStrategyId, new SparklineColumnStrategy(adaptable));
    strategies.set(SparklineStrategyId, new SparklineStrategy(adaptable));
    strategies.set(PieChartStrategyId, new PieChartStrategy(adaptable));

    AdaptableViewFactory.PieChartPopup = PieChartPopup;
    AdaptableViewFactory.ChartPopup = ChartPopup;
    AdaptableViewFactory.ChartDisplayPopup = ChartDisplayPopup;
    AdaptableViewFactory.SparklineColumnPopup = SparklineColumnPopup;
    AdaptableViewFactory.ViewAsSparklinesPopup = ViewAsSparklinesPopup;

    AdaptableDashboardFactory.set(ChartStrategyId, ChartToolbarControl as any);
    AdaptableToolPanelFactory.set(ChartStrategyId, ChartToolPanel as any);
  }

  afterInitApi(adaptable: IAdaptable) {
    // redraw any sparklines if that has been changed
    adaptable._on('ColumnResized', colId => {
      const isSparklineColumn: boolean = adaptable.api.sparklineColumnApi.isSparklineColumn(colId);

      if (isSparklineColumn) {
        // this is a bit brute force as its redrawing the whole grid but its quite a rare use case so probably ok
        adaptable.redraw();
      }
    });
  }

  onAdaptableReady(adaptable: IAdaptable) {}
}

export default (options?: any) => new ChartsPlugin(options);
