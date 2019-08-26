import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISparklinesStrategy } from './Interface/ISparklinesStrategy';

import { IColumn } from '../Utilities/Interface/IColumn';
import { SparklineColumnState } from '../PredefinedConfig/DesignTimeState/SparklineColumnState';

export class SparklinesStrategy extends AdaptableStrategyBase implements ISparklinesStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SparklinesStrategyId, blotter);
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'numeric')) {
      this.createColumnMenuItemShowPopup(
        'See as Sparkline Chart',
        ScreenPopups.ViewAsSparklinesPopup,
        StrategyConstants.SparklinesGlyph,
        column.ColumnId
      );
    }
  }
}
