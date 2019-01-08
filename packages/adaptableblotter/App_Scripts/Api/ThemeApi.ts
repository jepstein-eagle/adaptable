import * as ThemeRedux from '../Redux/ActionsReducers/ThemeRedux'
import { ApiBase } from "./ApiBase";
import { IUserTheme } from './Interface/IAdaptableBlotterObjects';
import { IThemeApi } from './Interface/IThemeApi';

export class ThemeApi extends ApiBase implements IThemeApi {

   public  SetCurrent(theme: string): void {
    this.dispatchAction(ThemeRedux.ThemeSelect(theme))
  }

  public  GetCurrent(): string {
    return this.getState().Theme.CurrentTheme;
  }

  public  SetSystemThemes(systemThemes: string[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes))
  }

  public  SetUserThemes(userThemes: string[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes))
  }

  public  SystemThemeGetAll(): string[] {
    return this.getState().Theme.SystemThemes;
  }

  public  UserThemeGetAll(): IUserTheme[] {
    return this.getState().Theme.UserThemes;
  }

}