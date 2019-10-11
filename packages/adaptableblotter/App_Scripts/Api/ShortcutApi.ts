import * as ShortcutRedux from '../Redux/ActionsReducers/ShortcutRedux';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { IShortcutApi } from './Interface/IShortcutApi';
import { ShortcutState, Shortcut } from '../PredefinedConfig/RunTimeState/ShortcutState';

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

  public showShortcutPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.ShortcutStrategyId,
      ScreenPopups.ShortcutPopup
    );
  }
}
