import {
  IScreenPopup,
  IAlertPopup,
  IConfirmationPopup,
  IPromptPopup,
  ILoadingPopup,
  IAboutPopup,
} from '../../Utilities/Interface/IMessage';
import { ISystemState } from './ISystemState';
export interface PopupState extends ISystemState {
  ScreenPopup: IScreenPopup;
  AlertPopup: IAlertPopup;
  ConfirmationPopup: IConfirmationPopup;
  PromptPopup: IPromptPopup;
  LoadingPopup: ILoadingPopup;
  AboutPopup: IAboutPopup;
}
