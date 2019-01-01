import * as ThemeRedux from '../Redux/ActionsReducers/ThemeRedux'
import { ApiBase } from "./ApiBase";
import { IUserTheme } from './Interface/IAdaptableBlotterObjects';

export interface IThemeApi {

  SetCurrent(theme: string): void
  GetCurrent(): string
  SetSystemThemes(systemThemes: string[]): void
  SetUserThemes(userThemes: string[]): void
  SystemThemeGetAll(): string[]
  UserThemeGetAll(): IUserTheme[]
}



export class ThemeApi extends ApiBase implements IThemeApi {

  // Theme State
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