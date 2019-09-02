import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IPieChartStrategy } from './Interface/IPieChartStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';

export class PieChartStrategy extends AdaptableStrategyBase implements IPieChartStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.PieChartStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup(
      StrategyConstants.PieChartStrategyName,
      ScreenPopups.PieChartPopup,
      StrategyConstants.PieChartGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      return this.createColumnMenuItemShowPopup(
        'See as Pie Chart',
        ScreenPopups.PieChartPopup,
        StrategyConstants.PieChartGlyph,
        column.ColumnId
      );
    }
  }
}
