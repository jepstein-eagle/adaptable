import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { ThemeApi } from '../ThemeApi';
import { ThemeState, AdaptableTheme } from '../../PredefinedConfig/ThemeState';

export class ThemeApiImpl extends ApiBase implements ThemeApi {
  public getThemeState(): ThemeState {
    return this.getAdaptableState().Theme;
  }

  public loadTheme(theme: string): void {
    this.dispatchAction(ThemeRedux.ThemeSelect(theme));
  }

  public loadLightTheme(): void {
    this.loadTheme('light');
  }

  public loadDarkTheme(): void {
    this.loadTheme('dark');
  }

  public getCurrentTheme(): string {
    return this.getAdaptableState().Theme.CurrentTheme;
  }

  public setSystemThemes(systemThemes: AdaptableTheme[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes));
  }

  public setUserThemes(userThemes: AdaptableTheme[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes));
  }

  public getAllSystemTheme(): AdaptableTheme[] {
    const themes = this.getAdaptableState().Theme.SystemThemes;

    return themes.map((theme: AdaptableTheme | string) => {
      if (typeof theme === 'string') {
        return {
          Name: theme,
          Description: theme,
        };
      }

      return theme;
    });
  }

  public getAllUserTheme(): AdaptableTheme[] {
    return this.getAdaptableState().Theme.UserThemes;
  }

  public getAllTheme(): AdaptableTheme[] {
    return [...this.getAllSystemTheme(), ...this.getAllUserTheme()];
  }

  public showThemePopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ThemeStrategyId,
      ScreenPopups.ThemePopup
    );
  }
}
