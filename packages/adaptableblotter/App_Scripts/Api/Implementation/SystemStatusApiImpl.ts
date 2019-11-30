import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import { ApiBase } from './ApiBase';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { SystemStatusApi } from '../SystemStatusApi';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { SystemStatusUpdate } from '../../Utilities/Interface/SystemStatusUpdate';
import { SystemStatusState } from '../../PredefinedConfig/SystemStatusState';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';
import LoggingHelper from '../../Utilities/Helpers/LoggingHelper';

export class SystemStatusApiImpl extends ApiBase implements SystemStatusApi {
  public getSystemStatusState(): SystemStatusState {
    return this.getBlotterState().SystemStatus;
  }

  public setSystemStatus(
    statusMessage: string,
    messageType: 'Error' | 'Warning' | 'Success' | 'Info'
  ): void {
    if (StringExtensions.IsNullOrEmpty(statusMessage)) {
      LoggingHelper.LogAdaptableBlotterWarning('System Status Message cannot be empty.');
      return;
    }

    let systemStatus: SystemStatusUpdate = {
      StatusMessage: statusMessage,
      StatusType: messageType as MessageType,
    };
    this.dispatchAction(SystemStatusRedux.SystemStatusSetUpdate(systemStatus));
    if (this.getSystemStatusState().ShowAlert) {
      let messageType: MessageType = this.getSystemStatusState().StatusType as MessageType;
      switch (messageType) {
        case MessageType.Success:
          this.blotter.api.alertApi.showAlertSuccess(
            'System Status Success',
            this.getSystemStatusState().StatusMessage
          );
          return;
        case MessageType.Info:
          this.blotter.api.alertApi.showAlertInfo(
            'System Status Info',
            this.getSystemStatusState().StatusMessage
          );
          return;
        case MessageType.Warning:
          this.blotter.api.alertApi.showAlertWarning(
            'System Status Warning',
            this.getSystemStatusState().StatusMessage
          );
          return;
        case MessageType.Error:
          this.blotter.api.alertApi.showAlertError(
            'System Status Error',
            this.getSystemStatusState().StatusMessage
          );
          return;
      }
    }
  }

  public setErrorSystemStatus(statusMessage: string): void {
    this.setSystemStatus(statusMessage, MessageType.Error);
  }

  public setWarningSystemStatus(statusMessage: string): void {
    this.setSystemStatus(statusMessage, MessageType.Warning);
  }

  public setSuccessSystemStatus(statusMessage: string): void {
    this.setSystemStatus(statusMessage, MessageType.Success);
  }

  public setInfoSystemStatus(statusMessage: string): void {
    this.setSystemStatus(statusMessage, MessageType.Info);
  }

  public clearSystemStatus(): void {
    this.dispatchAction(SystemStatusRedux.SystemStatusClear());
  }

  public showSystemStatusPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.SystemStatusStrategyId,
      ScreenPopups.SystemStatusPopup
    );
  }
}
