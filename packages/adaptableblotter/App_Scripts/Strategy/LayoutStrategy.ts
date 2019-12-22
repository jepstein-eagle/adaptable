import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { LayoutState } from '../PredefinedConfig/LayoutState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
  public CurrentLayout: string;
  protected LayoutState: LayoutState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.LayoutStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.LayoutStrategyName,
      ComponentName: ScreenPopups.LayoutPopup,
      Icon: StrategyConstants.LayoutGlyph,
    });
  }
}
