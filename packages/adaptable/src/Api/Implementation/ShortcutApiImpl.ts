import * as ShortcutRedux from '../../Redux/ActionsReducers/ShortcutRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { ApiBase } from './ApiBase';
import { ShortcutApi } from '../ShortcutApi';
import { ShortcutState, Shortcut } from '../../PredefinedConfig/ShortcutState';

export class ShortcutApiImpl extends ApiBase implements ShortcutApi {
  public getShortcutState(): ShortcutState {
    return this.getAdaptableState().Shortcut;
  }

  public getAllShortcut(): Shortcut[] {
    return this.getAdaptableState().Shortcut.Shortcuts;
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
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ShortcutStrategyId,
      ScreenPopups.ShortcutPopup
    );
  }
}
