import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IThemeStrategy } from './Interface/IThemeStrategy';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { ThemeState, AdaptableBlotterTheme } from '../PredefinedConfig/RunTimeState/ThemeState';
import { ThemeChangedEventArgs } from '../Api/Events/BlotterEvents';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';
import { THEME_CHANGED_EVENT } from '../Utilities/Constants/GeneralConstants';

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
  private ThemeState: ThemeState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ThemeStrategyId, blotter);
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ThemeStrategyName,
      ComponentName: ScreenPopups.ThemePopup,
      GlyphIcon: StrategyConstants.ThemeGlyph,
    });
  }

  publishThemeChanged(themeState: ThemeState) {
    const themeName = themeState.CurrentTheme;

    const themeChangedEventArgs: ThemeChangedEventArgs = {
      themeName,
    };
    // now depprecated and shortly to be removed...
    this.blotter.api.eventApi._onThemeChanged.Dispatch(this.blotter, themeChangedEventArgs);
    // new way (and soon only way)
    this.blotter.api.eventApi.emit(THEME_CHANGED_EVENT, themeChangedEventArgs);
  }

  protected InitState() {
    if (this.ThemeState != this.blotter.api.themeApi.getThemeState()) {
      this.ThemeState = this.blotter.api.themeApi.getThemeState();

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

      // publish the theme changed event even on initialization
      this.publishThemeChanged(this.ThemeState);
    }
  }
}
