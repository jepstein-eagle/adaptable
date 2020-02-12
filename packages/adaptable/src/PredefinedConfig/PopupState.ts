import {
  IScreenPopup,
  IAlertPopup,
  IConfirmationPopup,
  IPromptPopup,
  ILoadingPopup,
} from '../Utilities/Interface/IMessage';
import { InternalState } from './InternalState';
export interface PopupState extends InternalState {
  ScreenPopup: IScreenPopup;
  AlertPopup: IAlertPopup;
  ConfirmationPopup: IConfirmationPopup;
  PromptPopup: IPromptPopup;
  LoadingPopup: ILoadingPopup;
}
