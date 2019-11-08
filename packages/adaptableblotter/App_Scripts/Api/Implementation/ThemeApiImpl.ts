import * as ThemeRedux from '../../Redux/ActionsReducers/ThemeRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { ThemeApi } from '../ThemeApi';
import { ThemeState, AdaptableBlotterTheme } from '../../PredefinedConfig/RunTimeState/ThemeState';

export class ThemeApiImpl extends ApiBase implements ThemeApi {
  public getThemeState(): ThemeState {
    return this.getBlotterState().Theme;
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
    return this.getBlotterState().Theme.CurrentTheme;
  }

  public setSystemThemes(systemThemes: AdaptableBlotterTheme[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes));
  }

  public setUserThemes(userThemes: AdaptableBlotterTheme[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes));
  }

  public getAllSystemTheme(): AdaptableBlotterTheme[] {
    const themes = this.getBlotterState().Theme.SystemThemes;

    return themes.map((theme: AdaptableBlotterTheme | string) => {
      if (typeof theme === 'string') {
        return {
          Name: theme,
          Description: theme,
        };
      }

      return theme;
    });
  }

  public getAllUserTheme(): AdaptableBlotterTheme[] {
    return this.getBlotterState().Theme.UserThemes;
  }

  public getAllTheme(): AdaptableBlotterTheme[] {
    return [...this.getAllSystemTheme(), ...this.getAllUserTheme()];
  }

  public showThemePopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.ThemeStrategyId,
      ScreenPopups.ThemePopup
    );
  }
}
