import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ApiBase } from './ApiBase';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { ISystemStatusApi } from '../Interface/ISystemStatusApi';
import { ISystemStatus } from '../../Utilities/Interface/ISystemStatus';

export class SystemStatusApi extends ApiBase implements ISystemStatusApi {
  public setSystemStatus(
    statusMessage: string,
    messageType: 'Error' | 'Warning' | 'Success' | 'Info'
  ): void {
    let systemStatus: ISystemStatus = {
      StatusMessage: statusMessage,
      StatusType: messageType as MessageType,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setErrorSystemStatus(statusMessage: string): void {
    let systemStatus: ISystemStatus = {
      StatusMessage: statusMessage,
      StatusType: MessageType.Error,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setWarningSystemStatus(statusMessage: string): void {
    let systemStatus: ISystemStatus = {
      StatusMessage: statusMessage,
      StatusType: MessageType.Warning,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setSuccessSystemStatus(statusMessage: string): void {
    let systemStatus: ISystemStatus = {
      StatusMessage: statusMessage,
      StatusType: MessageType.Success,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setInfoSystemStatus(statusMessage: string): void {
    let systemStatus: ISystemStatus = {
      StatusMessage: statusMessage,
      StatusType: MessageType.Info,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }

  public clearSystemStatus(): void {
    this.dispatchAction(SystemRedux.SystemClearHealthStatus());
  }
}
