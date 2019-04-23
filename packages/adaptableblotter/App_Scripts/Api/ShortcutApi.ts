import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux'
import { ApiBase } from "./ApiBase";
import { IShortcut } from "../Utilities/Interface/BlotterObjects/IShortcut";
import { IShortcutApi } from './Interface/IShortcutApi';
import { ShortcutState } from '../Redux/ActionsReducers/Interface/IState';

export class ShortcutApi extends ApiBase implements IShortcutApi {

    
  public GetState(): ShortcutState {
    return this.getBlotterState().Shortcut;
}

public  GetAll(): IShortcut[] {
      return this.getBlotterState().Shortcut.Shortcuts;
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