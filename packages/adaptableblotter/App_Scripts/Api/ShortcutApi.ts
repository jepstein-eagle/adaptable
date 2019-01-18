import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux'
import { ApiBase } from "./ApiBase";
import { IShortcut } from '../Utilities/Interface/IAdaptableBlotterObjects';
import { IShortcutApi } from './Interface/IShortcutApi';

export class ShortcutApi extends ApiBase implements IShortcutApi {

     public  GetAll(): IShortcut[] {
      return this.getState().Shortcut.Shortcuts;
    }
  
    public  Add(shortcut: IShortcut): void {
      this.dispatchAction(ShortcutRedux.ShortcutAdd(shortcut))
    }
  
    public  Delete(shortcut: IShortcut): void {
      this.dispatchAction(ShortcutRedux.ShortcutDelete(shortcut))
    }
  
    public  DeleteAll(): void {
      this.GetAll().forEach(s => {
        this.Delete(s);
      })
    }

}