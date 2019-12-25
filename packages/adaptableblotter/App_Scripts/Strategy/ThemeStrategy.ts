import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IThemeStrategy } from './Interface/IThemeStrategy';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { ThemeState, AdaptableBlotterTheme } from '../PredefinedConfig/ThemeState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';
import { ThemeChangedEventArgs, ThemeChangedInfo } from '../Api/Events/ThemeChanged';

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
  private ThemeState: ThemeState;

  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ThemeStrategyId, blotter);
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ThemeStrategyFriendlyName,
      ComponentName: ScreenPopups.ThemePopup,
      Icon: StrategyConstants.ThemeGlyph,
    });
  }

  publishThemeChanged(themeState: ThemeState) {
    const themeName = themeState.CurrentTheme;

    let themeChangedInfo: ThemeChangedInfo = {
      themeName: themeState.CurrentTheme,
    };
    const themeChangedEventArgs: ThemeChangedEventArgs = AdaptableHelper.createFDC3Message(
      'Theme Changed Args',
      themeChangedInfo
    );

    this.blotter.api.eventApi.emit('ThemeChanged', themeChangedEventArgs);
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
