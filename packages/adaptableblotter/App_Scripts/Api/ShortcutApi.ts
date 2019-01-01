import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux'
import { ApiBase } from "./ApiBase";
import { IShortcut } from './Interface/IAdaptableBlotterObjects';

export interface IShortcutApi {

  // Shortcut api methods
  shortcutGetAll(): IShortcut[]
  shortcutAdd(shortcut: IShortcut): void
  shortcutDelete(shortcut: IShortcut): void
  shortcutDeleteAll(): void

}


export class ShortcutApi extends ApiBase implements IShortcutApi {

    // Shortuct State
    public shortcutGetAll(): IShortcut[] {
      return this.getState().Shortcut.Shortcuts;
    }
  
    public shortcutAdd(shortcut: IShortcut): void {
      this.dispatchAction(ShortcutRedux.ShortcutAdd(shortcut))
    }
  
    public shortcutDelete(shortcut: IShortcut): void {
      this.dispatchAction(ShortcutRedux.ShortcutDelete(shortcut))
    }
  
    public shortcutDeleteAll(): void {
      this.shortcutGetAll().forEach(s => {
        this.shortcutDelete(s);
      })
    }


}