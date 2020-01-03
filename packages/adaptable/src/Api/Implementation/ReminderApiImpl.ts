import { ApiBase } from './ApiBase';
import { ReminderApi } from '../ReminderApi';
import { ReminderState, Reminder } from '../../PredefinedConfig/ReminderState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class ReminderApiImpl extends ApiBase implements ReminderApi {
  public getReminderState(): ReminderState {
    return this.getAdaptableState().Reminder;
  }

  public getAllReminder(): Reminder[] {
    return this.getAdaptableState().Reminder.Reminders;
  }

  public showReminderPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ReminderStrategyId,
      ScreenPopups.ReminderPopup
    );
  }
}
