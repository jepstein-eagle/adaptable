import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux';
import { ApiBase } from './ApiBase';
import { IShortcutApi } from './Interface/IShortcutApi';
import { ShortcutState, Shortcut } from '../PredefinedConfig/IUserState/ShortcutState';

export class ShortcutApi extends ApiBase implements IShortcutApi {
  public getShortcutState(): ShortcutState {
    return this.getBlotterState().Shortcut;
  }

  public getAllShortcut(): Shortcut[] {
    return this.getBlotterState().Shortcut.Shortcuts;
  }

  public addShortcut(shortcut: Shortcut): void {
    this.dispatchAction(ShortcutRedux.ShortcutAdd(shortcut));
  }

  public deleteShortcut(shortcut: Shortcut): void {
    this.dispatchAction(ShortcutRedux.ShortcutDelete(shortcut));
  }

  public deleteAllShortcut(): void {
    this.getAllShortcut().forEach(s => {
      this.deleteShortcut(s);
    });
  }
}
