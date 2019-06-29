import * as SystemRedux from '../Redux/ActionsReducers/SystemRedux';
import { ApiBase } from './ApiBase';
import { StatusColour } from '../PredefinedConfig/Common/Enums';
import { ISystemStatusApi } from './Interface/ISystemStatusApi';
import { ISystemStatus } from '../Utilities/Interface/ISystemStatus';

export class SystemStatusApi extends ApiBase implements ISystemStatusApi {
  public setSystemStatus(
    statusMessage: string,
    statusColour: 'Blue' | 'Red' | 'Amber' | 'Green'
  ): void {
    let systemStatus: ISystemStatus = { StatusMessage: statusMessage, StatusColour: statusColour };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setRedSystemStatus(statusMessage: string): void {
    let systemStatus: ISystemStatus = {
      StatusMessage: statusMessage,
      StatusColour: StatusColour.Red,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setAmberSystemStatus(statusMessage: string): void {
    let systemStatus: ISystemStatus = {
      StatusMessage: statusMessage,
      StatusColour: StatusColour.Amber,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setGreenSystemStatus(statusMessage: string): void {
    let systemStatus: ISystemStatus = {
      StatusMessage: statusMessage,
      StatusColour: StatusColour.Green,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setBlueSystemStatus(statusMessage: string): void {
    let systemStatus: ISystemStatus = {
      StatusMessage: statusMessage,
      StatusColour: StatusColour.Blue,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }

  public clearSystemStatus(): void {
    this.dispatchAction(SystemRedux.SystemClearHealthStatus());
  }
}
