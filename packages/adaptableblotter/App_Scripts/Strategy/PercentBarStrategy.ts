import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IPercentBarStrategy } from './Interface/IPercentBarStrategy';
import { PercentBarState } from '../PredefinedConfig/RunTimeState/PercentBarState';
import { ArrayExtensions } from '../Utilities/Extensions/ArrayExtensions';
import { IColumn } from '../Utilities/Interface/IColumn';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';
import { StrategyParams } from '../View/Components/SharedProps/StrategyViewPopupProps';

export class PercentBarStrategy extends AdaptableStrategyBase implements IPercentBarStrategy {
  protected PercentBarState: PercentBarState;
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.PercentBarStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.PercentBarStrategyName,
      ComponentName: ScreenPopups.PercentBarPopup,
      GlyphIcon: StrategyConstants.PercentBarGlyph,
    });
  }

  public addColumnMenuItem(column: IColumn): AdaptableBlotterMenuItem | undefined {
    if (this.canCreateColumnMenuItem(column, this.blotter, 'numeric')) {
      let percentBarExists: boolean = ArrayExtensions.ContainsItem(
        this.PercentBarState.PercentBars.map(f => f.ColumnId),
        column.ColumnId
      );
      let label = percentBarExists ? 'Edit ' : 'Create ';

      let popupParam: StrategyParams = {
        columnId: column.ColumnId,
        action: percentBarExists ? 'Edit' : 'New',
      };

      return this.createColumnMenuItemShowPopup(
        label + StrategyConstants.PercentBarStrategyName,
        ScreenPopups.PercentBarPopup,
        StrategyConstants.PercentBarGlyph,
        popupParam
      );
    }
  }

  protected InitState() {
    if (this.PercentBarState != this.GetPercentBarState()) {
      if (this.blotter.isInitialised) {
        // if we have made any changes then first delete them all
        this.PercentBarState.PercentBars.forEach(pb => {
          this.blotter.removePercentBar(pb);
        });

        this.GetPercentBarState().PercentBars.forEach(pb => {
          this.blotter.editPercentBar(pb);
        });
        this.blotter.redraw();
      }
      this.PercentBarState = this.GetPercentBarState();
    }
  }

  protected GetPercentBarState(): PercentBarState {
    return this.blotter.api.percentBarApi.getPercentBarState();
  }
}
