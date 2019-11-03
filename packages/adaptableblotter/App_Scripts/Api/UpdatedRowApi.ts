import { ApiBase } from './ApiBase';
import { UpdatedRowState } from '../PredefinedConfig/RunTimeState/UpdatedRowState';
import { IUpdatedRowApi } from './Interface/IUpdatedRowApi';
import * as UpdatedRowRedux from '../Redux/ActionsReducers/UpdatedRowRedux';
import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { UpdatedRowInfo } from '../Utilities/Services/Interface/IDataService';

export class UpdatedRowApi extends ApiBase implements IUpdatedRowApi {
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
