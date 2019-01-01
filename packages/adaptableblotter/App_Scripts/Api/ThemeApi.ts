import * as ThemeRedux from '../Redux/ActionsReducers/ThemeRedux'
import { ApiBase } from "./ApiBase";
import { IUserTheme } from './Interface/IAdaptableBlotterObjects';

export interface IThemeApi {
    
   // Theme State
   themeSetCurrent(theme: string): void
   themeGetCurrent(): string
   themeSetSystemThemes(systemThemes: string[]): void
   themeSetUserThemes(userThemes: string[]): void
   themeSystemThemeGetAll(): string[]
   themeUserThemeGetAll(): IUserTheme[]
}



export class ThemeApi extends ApiBase implements IThemeApi {

    // Theme State
    public themeSetCurrent(theme: string): void {
      this.dispatchAction(ThemeRedux.ThemeSelect(theme))
    }
  
    public themeGetCurrent(): string {
      return this.getState().Theme.CurrentTheme;
    }
  
    public themeSetSystemThemes(systemThemes: string[]): void {
      this.dispatchAction(ThemeRedux.ThemeSetSystemThemes(systemThemes))
    }
  
    public themeSetUserThemes(userThemes: string[]): void {
      this.dispatchAction(ThemeRedux.ThemeSetUserThemes(userThemes))
    }
  
    public themeSystemThemeGetAll(): string[] {
      return this.getState().Theme.SystemThemes;
    }
  
    public themeUserThemeGetAll(): IUserTheme[] {
      return this.getState().Theme.UserThemes;
    }

}