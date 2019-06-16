import * as ThemeRedux from '../Redux/ActionsReducers/ThemeRedux';
import { ApiBase } from './ApiBase';
import { IThemeApi } from './Interface/IThemeApi';
import { ThemeState, IUserTheme } from '../PredefinedConfig/IUserState Interfaces/ThemeState';

export class ThemeApi extends ApiBase implements IThemeApi {
  public getThemeState(): ThemeState {
    return this.getBlotterState().Theme;
  }

  public setTheme(theme: string): void {
    this.dispatchAction(ThemeRedux.ThemeSelect(theme));
  }

  public getCurrentTheme(): string {
    return this.getBlotterState().Theme.CurrentTheme;
  }

  public setSystemThemes(systemThemes: string[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes));
  }

  public setUserThemes(userThemes: string[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes));
  }

  public getAllSystemTheme(): string[] {
    return this.getBlotterState().Theme.SystemThemes;
  }

  public getAllUserTheme(): IUserTheme[] {
    return this.getBlotterState().Theme.UserThemes;
  }
}
