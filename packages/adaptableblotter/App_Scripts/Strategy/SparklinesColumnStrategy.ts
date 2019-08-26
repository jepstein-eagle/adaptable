import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISparklinesColumnStrategy } from './Interface/ISparklinesColumnStrategy';

import { IColumn } from '../Utilities/Interface/IColumn';
import { SparklineColumnState } from '../PredefinedConfig/DesignTimeState/SparklineColumnState';
import { DataType } from '../PredefinedConfig/Common/Enums';

export class SparklinesColumnStrategy extends AdaptableStrategyBase
  implements ISparklinesColumnStrategy {
  protected SparklinesState: SparklineColumnState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SparklinesColumnStrategyId, blotter);
  }

  public addColumnMenuItem(column: IColumn): void {
    if (column.DataType === DataType.NumberArray) {
      this.createColumnMenuItemShowPopup(
        'Edit Sparkline',
        ScreenPopups.SparklinesColumnPopup,
        StrategyConstants.SparklinesColumnGlyph,
        column.ColumnId
      );
    }
  }

  protected InitState() {
    if (this.SparklinesState != this.GetSparklinesState()) {
      if (this.blotter.isInitialised) {
        // if we have made any changes then first delete them all
        this.SparklinesState.Columns.forEach(sparklineColumn => {
          this.blotter.removeSparkline(sparklineColumn);
        });

        this.GetSparklinesState().Columns.forEach(sparklineColumn => {
          this.blotter.editSparkline(sparklineColumn);
        });
        this.blotter.redraw();
      }
      this.SparklinesState = this.GetSparklinesState();
    }
  }

  protected GetSparklinesState(): SparklineColumnState {
    return this.blotter.api.sparklineColumnApi.getSparklineColumnState();
  }
}
