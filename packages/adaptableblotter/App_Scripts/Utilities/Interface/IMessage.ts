import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { Action } from 'redux';
import { StrategyParams } from '../../View/Components/SharedProps/StrategyViewPopupProps';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { DataChangedInfo } from '../../BlotterOptions/CommonObjects/DataChangedInfo';
import { AdaptableObject } from '../../PredefinedConfig/Common/AdaptableObject';
import { AdaptableFunctionName } from '../../PredefinedConfig/Common/Types';

export interface AdaptableAlert extends AdaptableObject {
  Header: string;
  Msg: string;
  AlertDefinition: AlertDefinition;
  DataChangedInfo?: DataChangedInfo;
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
  ComponentStrategy: AdaptableFunctionName;
  ComponentName: string;
  Params: StrategyParams;
  PopupProps?: { [key: string]: any };
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
