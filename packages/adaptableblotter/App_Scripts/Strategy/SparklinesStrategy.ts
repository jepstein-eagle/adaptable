import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ISparklinesStrategy } from './Interface/ISparklinesStrategy';

import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { IColumn } from '../Utilities/Interface/IColumn';
import { SparklineColumnState } from '../PredefinedConfig/DesignTimeState/SparklineColumnState';

export class SparklinesStrategy extends AdaptableStrategyBase implements ISparklinesStrategy {
  protected SparklinesState: SparklineColumnState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.SparklinesStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.SparklinesStrategyName,
      ScreenPopups.SparklinesPopup,
      StrategyConstants.SparklinesGlyph
    );
  }

  public addColumnMenuItem(column: IColumn): void {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'numeric')) {
      const sparklinesExists: boolean = ArrayExtensions.ContainsItem(
        this.SparklinesState.Columns.map(f => f.ColumnId),
        column.ColumnId
      );
      const label = sparklinesExists ? 'Edit ' : 'Create ';
      const popupParam = sparklinesExists ? 'Edit|' : 'New|';

      this.createColumnMenuItemShowPopup(
        label + StrategyConstants.ShortcutStrategyName,
        ScreenPopups.SparklinesPopup,
        StrategyConstants.SparklinesGlyph,
        popupParam + column.ColumnId
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
