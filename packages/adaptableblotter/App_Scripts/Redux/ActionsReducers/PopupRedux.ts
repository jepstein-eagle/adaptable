import * as Redux from 'redux';
import { PopupState } from '../../PredefinedConfig/ISystemState/PopupState';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import {
  InputAction,
  IUIPrompt,
  IUIConfirmation,
  IScreenPopup,
  IPromptPopup,
  IConfirmationPopup,
  IAlertPopup,
  ILoadingPopup,
  IAboutPopup,
  IAdaptableAlert,
} from '../../Utilities/Interface/IMessage';

export const POPUP_SHOW_SCREEN = 'POPUP_SHOW_SCREEN';
export const POPUP_HIDE_SCREEN = 'POPUP_HIDE_SCREEN';
export const POPUP_SHOW_LOADING = 'POPUP_SHOW_LOADING';
export const POPUP_HIDE_LOADING = 'POPUP_HIDE_LOADING';
export const POPUP_SHOW_ABOUT = 'POPUP_SHOW_ABOUT';
export const POPUP_HIDE_ABOUT = 'POPUP_HIDE_ABOUT';
export const POPUP_SHOW_ALERT = 'POPUP_SHOW_ALERT';
export const POPUP_HIDE_ALERT = 'POPUP_HIDE_ALERT';
export const POPUP_SHOW_PROMPT = 'POPUP_SHOW_PROMPT';
export const POPUP_HIDE_PROMPT = 'POPUP_HIDE_PROMPT';
export const POPUP_CONFIRM_PROMPT = 'POPUP_CONFIRM_PROMPT';
export const POPUP_SHOW_CONFIRMATION = 'POPUP_SHOW_CONFIRMATION';
export const POPUP_CONFIRM_CONFIRMATION = 'POPUP_CONFIRM_CONFIRMATION';
export const POPUP_CANCEL_CONFIRMATION = 'POPUP_CANCEL_CONFIRMATION';
export const POPUP_CLEAR_PARAM = 'POPUP_CLEAR_PARAM';

export interface PopupShowScreenAction extends Redux.Action {
  ComponentStrategy: string;
  ComponentName: string;
  Params?: string;
}

export interface PopupHideScreenAction extends Redux.Action {}

export interface PopupShowLoadingAction extends Redux.Action {}

export interface PopupHideLoadingAction extends Redux.Action {}

export interface PopupShowAboutAction extends Redux.Action {}

export interface PopupHideAboutAction extends Redux.Action {}

export interface PopupShowAlertAction extends Redux.Action {
  Alert: IAdaptableAlert;
}

export interface PopupHideAlertAction extends Redux.Action {}

export interface PopupHidePromptAction extends Redux.Action {}

export interface PopupConfirmPromptAction extends InputAction {}

export interface PopupConfirmConfirmationAction extends Redux.Action {
  comment: string;
}

export interface PopupCancelConfirmationAction extends Redux.Action {}

export interface PopupShowPromptAction extends Redux.Action {
  Prompt: IUIPrompt;
}

export interface PopupShowConfirmationAction extends Redux.Action {
  Confirmation: IUIConfirmation;
}

export interface PopupClearParamAction extends Redux.Action {}

export interface PopupChartClearParamAction extends Redux.Action {}

export const PopupShowScreen = (
  ComponentStrategy: string,
  ComponentName: string,
  Params?: string
): PopupShowScreenAction => ({
  type: POPUP_SHOW_SCREEN,
  ComponentStrategy,
  ComponentName,
  Params,
});

export const PopupHideScreen = (): PopupHideScreenAction => ({
  type: POPUP_HIDE_SCREEN,
});

export const PopupShowAlert = (Alert: IAdaptableAlert): PopupShowAlertAction => {
  return {
    type: POPUP_SHOW_ALERT,
    Alert,
  };
};

export const PopupHideAlert = (): PopupHideAlertAction => ({
  type: POPUP_HIDE_ALERT,
});

export const PopupShowLoading = (): PopupShowLoadingAction => ({
  type: POPUP_SHOW_LOADING,
});

export const PopupHideLoading = (): PopupHideLoadingAction => ({
  type: POPUP_HIDE_LOADING,
});

export const PopupShowAbout = (): PopupShowAboutAction => ({
  type: POPUP_SHOW_ABOUT,
});

export const PopupHideAbout = (): PopupHideAboutAction => ({
  type: POPUP_HIDE_ABOUT,
});

export const PopupShowPrompt = (Prompt: IUIPrompt): PopupShowPromptAction => ({
  type: POPUP_SHOW_PROMPT,
  Prompt,
});

export const PopupHidePrompt = (): PopupHidePromptAction => ({
  type: POPUP_HIDE_PROMPT,
});

export const PopupConfirmPrompt = (InputText: string): PopupConfirmPromptAction => ({
  type: POPUP_CONFIRM_PROMPT,
  InputText,
});

export const PopupShowConfirmation = (
  Confirmation: IUIConfirmation
): PopupShowConfirmationAction => ({
  type: POPUP_SHOW_CONFIRMATION,
  Confirmation,
});

export const PopupConfirmConfirmation = (comment: string): PopupConfirmConfirmationAction => ({
  type: POPUP_CONFIRM_CONFIRMATION,
  comment,
});

export const PopupCancelConfirmation = (): PopupCancelConfirmationAction => ({
  type: POPUP_CANCEL_CONFIRMATION,
});

export const PopupClearParam = (): PopupClearParamAction => ({
  type: POPUP_CLEAR_PARAM,
});

const initialPopupState: PopupState = {
  ScreenPopup: {
    ShowScreenPopup: false,
    ComponentStrategy: '',
    ComponentName: '',
    Params: null,
  },

  LoadingPopup: {
    ShowLoadingPopup: true,
  },
  AboutPopup: {
    ShowAboutPopup: false,
  },
  AlertPopup: {
    ShowAlertPopup: false,
    Header: '',
    Msg: '',
    MessageType: MessageType.Info,
  },
  ConfirmationPopup: {
    ShowConfirmationPopup: false,
    Msg: '',
    Header: '',
    ConfirmButtonText: '',
    CancelButtonText: '',
    CancelAction: null,
    ConfirmAction: null,
    ShowInputBox: false,
    ConfirmationComment: null,
    MessageType: MessageType.Info,
  },
  PromptPopup: {
    ShowPromptPopup: false,
    Header: '',
    Msg: '',
    ConfirmAction: null,
  },
};

export const ShowPopupReducer: Redux.Reducer<PopupState> = (
  state: PopupState = initialPopupState,
  action: Redux.Action
): PopupState => {
  switch (action.type) {
    case POPUP_SHOW_SCREEN: {
      let actionTypedShowPopup = <PopupShowScreenAction>action;
      let newScreenPopup: IScreenPopup = {
        ShowScreenPopup: true,
        ComponentStrategy: actionTypedShowPopup.ComponentStrategy,
        ComponentName: actionTypedShowPopup.ComponentName,
        Params: actionTypedShowPopup.Params,
      };
      return Object.assign({}, state, { ScreenPopup: newScreenPopup });
    }
    case POPUP_HIDE_SCREEN: {
      let newScreenPopup: IScreenPopup = {
        ShowScreenPopup: false,
        ComponentStrategy: '',
        ComponentName: '',
        Params: null,
      };
      return Object.assign({}, state, { ScreenPopup: newScreenPopup });
    }
    case POPUP_SHOW_PROMPT: {
      let actionTyped = <PopupShowPromptAction>action;
      let newPromptPopup: IPromptPopup = {
        ShowPromptPopup: true,
        Header: actionTyped.Prompt.Header,
        Msg: actionTyped.Prompt.Msg,
        ConfirmAction: actionTyped.Prompt.ConfirmAction,
      };
      return Object.assign({}, state, { PromptPopup: newPromptPopup });
    }
    case POPUP_HIDE_PROMPT: {
      let newPromptPopup: IPromptPopup = {
        ShowPromptPopup: false,
        Header: '',
        Msg: '',
        ConfirmAction: null,
      };
      return Object.assign({}, state, { PromptPopup: newPromptPopup });
    }
    case POPUP_CONFIRM_PROMPT: {
      //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
      let newPromptPopup: IPromptPopup = {
        ShowPromptPopup: false,
        Header: '',
        Msg: '',
        ConfirmAction: null,
      };
      return Object.assign({}, state, { PromptPopup: newPromptPopup });
    }
    case POPUP_SHOW_CONFIRMATION: {
      let actionTyped = <PopupShowConfirmationAction>action;
      let newConfirmationPopup: IConfirmationPopup = {
        ShowConfirmationPopup: true,
        Msg: actionTyped.Confirmation.Msg,
        Header: actionTyped.Confirmation.Header,
        ConfirmButtonText: actionTyped.Confirmation.ConfirmButtonText,
        CancelButtonText: actionTyped.Confirmation.CancelButtonText,
        ConfirmAction: actionTyped.Confirmation.ConfirmAction,
        CancelAction: actionTyped.Confirmation.CancelAction,
        ShowInputBox: actionTyped.Confirmation.ShowInputBox,
        ConfirmationComment: null,
        MessageType: actionTyped.Confirmation.MessageType,
      };
      return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
    }
    case POPUP_CONFIRM_CONFIRMATION: {
      let actionTyped = <PopupConfirmConfirmationAction>action;
      //we dispatch the Action of ConfirmAction in the middelware in order to keep the reducer pure
      let newConfirmationPopup: IConfirmationPopup = {
        ShowConfirmationPopup: false,
        Msg: '',
        Header: '',
        ConfirmButtonText: '',
        CancelButtonText: '',
        ConfirmAction: null,
        CancelAction: null,
        ShowInputBox: false,
        ConfirmationComment: actionTyped.comment,
        MessageType: null, // ???
      };
      return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
    }
    case POPUP_CANCEL_CONFIRMATION: {
      //we dispatch the Action of CancelAction in the middelware in order to keep the reducer pure
      let newConfirmationPopup: IConfirmationPopup = {
        ShowConfirmationPopup: false,
        Msg: '',
        Header: '',
        ConfirmButtonText: '',
        CancelButtonText: '',
        ConfirmAction: null,
        CancelAction: null,
        ShowInputBox: false,
        ConfirmationComment: null,
        MessageType: null,
      };
      return Object.assign({}, state, { ConfirmationPopup: newConfirmationPopup });
    }
    case POPUP_SHOW_ALERT: {
      let showAlertAction = <PopupShowAlertAction>action;
      let newAlertPopup: IAlertPopup = {
        ShowAlertPopup: true,
        Header: showAlertAction.Alert.Header,
        Msg: showAlertAction.Alert.Msg,
        MessageType: showAlertAction.Alert.MessageType,
      };
      return Object.assign({}, state, { AlertPopup: newAlertPopup });
    }
    case POPUP_HIDE_ALERT: {
      let newAlertPopup: IAlertPopup = {
        ShowAlertPopup: false,
        Header: '',
        Msg: '',
        MessageType: MessageType.Info,
      };
      return Object.assign({}, state, { AlertPopup: newAlertPopup });
    }
    case POPUP_SHOW_LOADING: {
      let newLoadingPopup: ILoadingPopup = { ShowLoadingPopup: true };
      return Object.assign({}, state, { LoadingPopup: newLoadingPopup });
    }
    case POPUP_HIDE_LOADING: {
      let newLoadingPopup: ILoadingPopup = { ShowLoadingPopup: false };
      return Object.assign({}, state, { LoadingPopup: newLoadingPopup });
    }
    case POPUP_SHOW_ABOUT: {
      let newAboutPopup: IAboutPopup = { ShowAboutPopup: true };
      return Object.assign({}, state, { AboutPopup: newAboutPopup });
    }
    case POPUP_HIDE_ABOUT: {
      let newAboutPopup: IAboutPopup = { ShowAboutPopup: false };
      return Object.assign({}, state, { AboutPopup: newAboutPopup });
    }
    case POPUP_CLEAR_PARAM: {
      let newScreenPopup: IScreenPopup = {
        ShowScreenPopup: state.ScreenPopup.ShowScreenPopup,
        ComponentStrategy: state.ScreenPopup.ComponentStrategy,
        ComponentName: state.ScreenPopup.ComponentName,
        Params: null,
      };
      return Object.assign({}, state, { ScreenPopup: newScreenPopup });
    }

    default:
      return state;
  }
};
