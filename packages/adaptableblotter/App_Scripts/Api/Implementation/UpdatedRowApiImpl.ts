import { ApiBase } from './ApiBase';
import { UpdatedRowState } from '../../PredefinedConfig/UpdatedRowState';
import { UpdatedRowApi } from '../UpdatedRowApi';
import * as UpdatedRowRedux from '../../Redux/ActionsReducers/UpdatedRowRedux';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { UpdatedRowInfo } from '../../Utilities/Services/Interface/IDataService';
import { Thickness } from 'igniteui-react-core/ES5/Thickness';
/**
 * Provides full and comprehensive run-time access to the Updated Rows function (which colours rows as they change based on a scheme set by the user).
 *
 * Also provides access to the associated Updated Row state (from Predefined Config).
 */
export class UpdatedRowApiImpl extends ApiBase implements UpdatedRowApi {
  public getUpdatedRowState(): UpdatedRowState {
    return this.getBlotterState().UpdatedRow;
  }

  public updatedRowEnable(): void {
    this.dispatchAction(UpdatedRowRedux.UpdatedRowEnableDisable(true));
  }

  public updatedRowDisable(): void {
    this.dispatchAction(UpdatedRowRedux.UpdatedRowEnableDisable(false));
  }

  public jumpToRowEnable(): void {
    this.dispatchAction(UpdatedRowRedux.JumpToRowEnableDisable(true));
  }

  public jumpToRowDisable(): void {
    this.dispatchAction(UpdatedRowRedux.JumpToRowEnableDisable(false));
  }

  public setUpColor(upColor: string): void {
    this.dispatchAction(UpdatedRowRedux.UpColorSet(upColor));
  }

  public setDownColor(downColor: string): void {
    this.dispatchAction(UpdatedRowRedux.DownColorSet(downColor));
  }

  public setNeutralColor(neutralColor: string): void {
    this.dispatchAction(UpdatedRowRedux.NeutralColorSet(neutralColor));
  }

  public addUpdatedRowInfo(updatedRowInfo: UpdatedRowInfo): void {
    let maxUpdatedRowsInStore: number = this.getUpdatedRowState().MaxUpdatedRowsInStore;
    // if we exceed the amount allowed then we need to delete oldest item first
    // we do it here (and not in Redux) so that the store can listen and refresh the row.
    if (maxUpdatedRowsInStore != Infinity) {
      let updatedRowInfos: UpdatedRowInfo[] = this.getBlotterState().System.UpdatedRowInfos;
      if (updatedRowInfos.length > maxUpdatedRowsInStore) {
        // need to delete the oldest one
        let oldestUpdatedRowInfo: UpdatedRowInfo = updatedRowInfos[0];
        this.deleteUpdatedRowInfo(oldestUpdatedRowInfo);
      }
    }

    // now add
    this.dispatchAction(SystemRedux.SystemUpdatedRowAdd(updatedRowInfo));
  }

  public deleteUpdatedRowInfo(updatedRowInfo: UpdatedRowInfo): void {
    this.dispatchAction(SystemRedux.SystemUpdatedRowDelete(updatedRowInfo));
  }

  public deleteAllUpdatedRowInfo(): void {
    let updatedRowInfos: UpdatedRowInfo[] = this.blotter.api.internalApi.getUpdatedRowInfos();
    this.dispatchAction(SystemRedux.SystemUpdatedRowDeleteAll(updatedRowInfos));
  }
}
