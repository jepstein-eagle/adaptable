import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { LayoutState } from '../PredefinedConfig/RunTimeState/LayoutState';
import { StateChangedTrigger } from '../PredefinedConfig/Common/Enums';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
  public CurrentLayout: string;
  protected LayoutState: LayoutState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.LayoutStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.LayoutStrategyName,
      ScreenPopups.LayoutPopup,
      StrategyConstants.LayoutGlyph
    );
  }
}
