import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IThemeStrategy } from './Interface/IThemeStrategy';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { ThemeState, AdaptableTheme } from '../PredefinedConfig/ThemeState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';
import AdaptableHelper from '../Utilities/Helpers/AdaptableHelper';
import { ThemeChangedEventArgs, ThemeChangedInfo } from '../Api/Events/ThemeChanged';
import * as ThemeRedux from '../Redux/ActionsReducers/ThemeRedux';

export class ThemeStrategy extends AdaptableStrategyBase implements IThemeStrategy {
  private ThemeState: ThemeState;

  constructor(adaptable: IAdaptable) {
    super(
      StrategyConstants.ThemeStrategyId,
      StrategyConstants.ThemeStrategyFriendlyName,
      StrategyConstants.ThemeGlyph,
      ScreenPopups.ThemePopup,
      adaptable
    );
  }

  publishThemeChanged(themeState: ThemeState) {
    const themeName = themeState.CurrentTheme;

    let themeChangedInfo: ThemeChangedInfo = {
      themeName: themeState.CurrentTheme,
      adaptableApi: this.adaptable.api,
    };
    const themeChangedEventArgs: ThemeChangedEventArgs = AdaptableHelper.createFDC3Message(
      'Theme Changed Args',
      themeChangedInfo
    );

    this.adaptable.api.eventApi.emit('ThemeChanged', themeChangedEventArgs);
  }

  protected InitState() {
    if (this.ThemeState != this.adaptable.api.themeApi.getThemeState()) {
      this.ThemeState = this.adaptable.api.themeApi.getThemeState();

      const allThemeNames = [
        ...(this.ThemeState.SystemThemes || []),
        ...(this.ThemeState.UserThemes || []),
      ];

      const currentTheme: AdaptableTheme | string = allThemeNames.filter(theme =>
        typeof theme === 'string'
          ? theme === this.ThemeState.CurrentTheme
          : theme.Name === this.ThemeState.CurrentTheme
      )[0];

      if (!currentTheme) {
        return;
      }

      this.adaptable.applyAdaptableTheme(currentTheme);

      // publish the theme changed event even on initialization
      this.publishThemeChanged(this.ThemeState);
    }
  }
}
