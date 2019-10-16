import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { Action } from 'redux';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';

export interface AdaptableAlert {
  Header: string;
  Msg: string;
  MessageType: 'Info' | 'Success' | 'Warning' | 'Error';
  ShowAsPopup?: boolean;
}

export interface IUIConfirmation {
  Header: string;
  Msg: string;
  ConfirmButtonText: string;
  CancelButtonText: string;
  ConfirmAction: Action;
  CancelAction: Action;
  ShowInputBox: boolean;
  MessageType: MessageType;
}

export interface InputAction extends Action {
  InputText: string;
}

export interface IUIPrompt {
  Header: string;
  Msg: string;
  ConfirmAction: InputAction;
}

export interface IScreenPopup {
  ShowScreenPopup: boolean;
  ComponentStrategy: string;
  ComponentName: string;
  Params: StrategyParams;
}

export interface IChartPopup {
  ShowChartPopup: boolean;
}

export interface ILoadingPopup {
  ShowLoadingPopup: boolean;
}

export interface IGridInfoPopup {
  ShowGridInfoPopup: boolean;
}

export interface IAlertPopup {
  ShowAlertPopup: boolean;
  Header: string;
  Msg: string;
  MessageType: MessageType;
}

export interface IConfirmationPopup {
  ShowConfirmationPopup: boolean;
  Header: string;
  Msg: string;
  ConfirmButtonText: string;
  CancelButtonText: string;
  ConfirmAction: Action;
  CancelAction: Action;
  ShowInputBox: boolean;
  ConfirmationComment: string;
  MessageType: MessageType;
}

export interface IPromptPopup {
  ShowPromptPopup: boolean;
  Header: string;
  Msg: string;
  ConfirmAction: InputAction;
}
