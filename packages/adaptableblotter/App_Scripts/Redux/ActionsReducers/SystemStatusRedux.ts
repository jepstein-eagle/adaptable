import * as Redux from 'redux';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { SystemStatusState } from '../../PredefinedConfig/SystemStatusState';
import { SystemStatusUpdate } from '../../Utilities/Interface/SystemStatusUpdate';

export const SYSTEM_SYSTEM_SET_UPDATE = 'SYSTEM_SYSTEM_SET_UPDATE';
export const SYSTEM_SYSTEM_SET_SHOW_ALERT = 'SYSTEM_SYSTEM_SET_SHOW_ALERT';
export const SYSTEM_STATUS_CLEAR = 'SYSTEM_STATUS_CLEAR';

export interface SystemStatusSetUpdateAction extends Redux.Action {
  systemStatusUpdate: SystemStatusUpdate;
}
export interface SystemStatusSetMessageAction extends Redux.Action {
  systemStatusMessage: string;
}
export interface SystemStatusSetStatusTypeAction extends Redux.Action {
  systemStatusType: string;
}
export interface SystemStatusSetShowAlertAction extends Redux.Action {
  showAlert: boolean;
}

export interface SystemStatusClearAction extends Redux.Action {}

export const SystemStatusSetUpdate = (
  systemStatusUpdate: SystemStatusUpdate
): SystemStatusSetUpdateAction => ({
  type: SYSTEM_SYSTEM_SET_UPDATE,
  systemStatusUpdate,
});

export const SystemStatusSetShowAlert = (showAlert: boolean): SystemStatusSetShowAlertAction => ({
  type: SYSTEM_SYSTEM_SET_SHOW_ALERT,
  showAlert,
});

export const SystemStatusClear = (): SystemStatusClearAction => ({
  type: SYSTEM_STATUS_CLEAR,
});

const initialSystemStatusState: SystemStatusState = {
  DefaultStatusMessage: 'All fine',
  DefaultStatusType: MessageType.Success,
  StatusMessage: '',
  StatusFurtherInformation: '',
  StatusType: undefined,
  ShowAlert: false,
};

export const SystemStatusReducer: Redux.Reducer<SystemStatusState> = (
  state: SystemStatusState = initialSystemStatusState,
  action: Redux.Action
): SystemStatusState => {
  switch (action.type) {
    case SYSTEM_SYSTEM_SET_UPDATE:
      let systemStatusUpdate: SystemStatusUpdate = (action as SystemStatusSetUpdateAction)
        .systemStatusUpdate;
      return Object.assign({}, state, {
        StatusMessage: systemStatusUpdate.StatusMessage,
        StatusType: systemStatusUpdate.StatusType,
        StatusFurtherInformation: systemStatusUpdate.StatusFurtherInformation,
      });
    case SYSTEM_SYSTEM_SET_SHOW_ALERT:
      let showAlert: boolean = (action as SystemStatusSetShowAlertAction).showAlert;
      return Object.assign({}, state, {
        ShowAlert: showAlert,
      });
    case SYSTEM_STATUS_CLEAR:
      return Object.assign({}, state, {
        StatusMessage: state.DefaultStatusMessage,
        StatusType: state.DefaultStatusType,
        StatusFurtherInformation: '',
      });

    default:
      return state;
  }
};
