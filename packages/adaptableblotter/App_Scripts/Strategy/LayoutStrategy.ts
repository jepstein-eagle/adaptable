import { ILayoutStrategy } from './Interface/ILayoutStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { LayoutState } from '../PredefinedConfig/LayoutState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class LayoutStrategy extends AdaptableStrategyBase implements ILayoutStrategy {
  public CurrentLayout: string;
  protected LayoutState: LayoutState;

  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.LayoutStrategyId, adaptable);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.LayoutStrategyFriendlyName,
      ComponentName: ScreenPopups.LayoutPopup,
      Icon: StrategyConstants.LayoutGlyph,
    });
  }
}
