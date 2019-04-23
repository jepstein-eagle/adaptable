import * as ThemeRedux from '../Redux/ActionsReducers/ThemeRedux'
import { ApiBase } from "./ApiBase";
import { IUserTheme } from "../Utilities/Interface/BlotterObjects/IUserTheme";
import { IThemeApi } from './Interface/IThemeApi';
import { ThemeState } from '../Redux/ActionsReducers/Interface/IState';

export class ThemeApi extends ApiBase implements IThemeApi {

  
  public GetState(): ThemeState {
    return this.getBlotterState().Theme;
}

public  SetCurrent(theme: string): void {
    this.dispatchAction(ThemeRedux.ThemeSelect(theme))
  }

  public  GetCurrent(): string {
    return this.getBlotterState().Theme.CurrentTheme;
  }

  public  SetSystemThemes(systemThemes: string[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes))
  }

  public  SetUserThemes(userThemes: string[]): void {
    this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes))
  }

  public  GetAllSystemTheme(): string[] {
    return this.getBlotterState().Theme.SystemThemes;
  }

  public  GetAllUserTheme(): IUserTheme[] {
    return this.getBlotterState().Theme.UserThemes;
  }

}