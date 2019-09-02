import { IApplicationStrategy } from './Interface/IApplicationStrategy';
import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { AdaptableBlotterMenuItem } from '../Utilities/Interface/AdaptableBlotterMenu';

export class ApplicationStrategy extends AdaptableStrategyBase implements IApplicationStrategy {
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ApplicationStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ApplicationStrategyName,
      ComponentName: ScreenPopups.ApplicationPopup,
      GlyphIcon: StrategyConstants.ApplicationGlyph,
    });
  }
}
