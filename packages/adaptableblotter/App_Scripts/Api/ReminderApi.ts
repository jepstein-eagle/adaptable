import { ApiBase } from './ApiBase';
import { IReminderApi } from './Interface/IReminderApi';
import { ReminderState, Reminder } from '../PredefinedConfig/RunTimeState/ReminderState';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';

export class ReminderApi extends ApiBase implements IReminderApi {
  public getReminderState(): ReminderState {
    return this.getBlotterState().Reminder;
  }

  public getAllReminder(): Reminder[] {
    return this.getBlotterState().Reminder.Reminders;
  }

  public showReminderPopup(): void {
    this.blotter.api.internalApi.showPopupScreen(
      StrategyConstants.ReminderStrategyId,
      ScreenPopups.ReminderPopup
    );
  }
}
