import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IThemeStrategy } from './Interface/IThemeStrategy';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { ThemeState, AdaptableBlotterTheme } from '../PredefinedConfig/RunTimeState/ThemeState';
import { ThemeChangedEventArgs } from '../Api/Events/BlotterEvents';

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
  private ThemeState: ThemeState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ThemeStrategyId, blotter);
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.ThemeStrategyName,
      ScreenPopups.ThemePopup,
      StrategyConstants.ThemeGlyph
    );
  }

  publishThemeChanged(themeState: ThemeState) {
    const themeName = themeState.CurrentTheme;

    const themeChangedInfo: ThemeChangedEventArgs = {
      themeName,
    };
    this.blotter.api.eventApi._onThemeChanged.Dispatch(this.blotter, themeChangedInfo);
  }

  protected InitState() {
    if (this.ThemeState != this.blotter.api.themeApi.getThemeState()) {
      this.ThemeState = this.blotter.api.themeApi.getThemeState();

      // publish the theme changed event even on initialization
      this.publishThemeChanged(this.ThemeState);

      const allThemeNames = [
        ...(this.ThemeState.SystemThemes || []),
        ...(this.ThemeState.UserThemes || []),
      ];

      const currentTheme: AdaptableBlotterTheme | string = allThemeNames.filter(theme =>
        typeof theme === 'string'
          ? theme === this.ThemeState.CurrentTheme
          : theme.Name === this.ThemeState.CurrentTheme
      )[0];

      if (!currentTheme) {
        return;
      }

      this.blotter.applyBlotterTheme(currentTheme);
    }
  }
}
