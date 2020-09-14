import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IThemeStrategy } from './Interface/IThemeStrategy';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.ThemeStrategyId,
      StrategyConstants.ThemeStrategyFriendlyName,
      StrategyConstants.ThemeGlyph,
      ScreenPopups.ThemePopup,
      adaptable
    );
  }

  public tidyOldConfig(): void {
    this.adaptable.api.themeApi.applyCurrentTheme();
  }
}
