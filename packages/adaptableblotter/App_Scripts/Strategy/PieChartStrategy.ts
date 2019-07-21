import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IPieChartStrategy } from './Interface/IPieChartStrategy';
import { IColumn } from '../Utilities/Interface/IColumn';

export class PieChartStrategy extends AdaptableStrategyBase implements IPieChartStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.PieChartStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.PieChartStrategyName,
      ScreenPopups.PieChartPopup,
      StrategyConstants.PieChartGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter)) {
      this.createColumnMenuItemShowPopup(
        'See as Pie Chart',
        ScreenPopups.PieChartPopup,
        StrategyConstants.PieChartGlyph,
        column.ColumnId
      );
    }
  }
}
