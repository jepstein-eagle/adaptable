import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import { ApiBase } from './ApiBase';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { SystemStatusApi } from '../SystemStatusApi';
import { SystemStatus } from '../../Utilities/Interface/SystemStatus';

export class SystemStatusApiImpl extends ApiBase implements SystemStatusApi {
  public setSystemStatus(
    statusMessage: string,
    messageType: 'Error' | 'Warning' | 'Success' | 'Info'
  ): void {
    let systemStatus: SystemStatus = {
      StatusMessage: statusMessage,
      StatusType: messageType as MessageType,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setErrorSystemStatus(statusMessage: string): void {
    let systemStatus: SystemStatus = {
      StatusMessage: statusMessage,
      StatusType: MessageType.Error,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setWarningSystemStatus(statusMessage: string): void {
    let systemStatus: SystemStatus = {
      StatusMessage: statusMessage,
      StatusType: MessageType.Warning,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setSuccessSystemStatus(statusMessage: string): void {
    let systemStatus: SystemStatus = {
      StatusMessage: statusMessage,
      StatusType: MessageType.Success,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }
  public setInfoSystemStatus(statusMessage: string): void {
    let systemStatus: SystemStatus = {
      StatusMessage: statusMessage,
      StatusType: MessageType.Info,
    };
    this.dispatchAction(SystemRedux.SystemSetHealthStatus(systemStatus));
  }

  public clearSystemStatus(): void {
    this.dispatchAction(SystemRedux.SystemClearHealthStatus());
  }
}
