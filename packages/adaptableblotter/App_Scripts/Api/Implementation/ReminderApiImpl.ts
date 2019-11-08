import { ApiBase } from './ApiBase';
import { ReminderApi } from '../ReminderApi';
import { ReminderState, Reminder } from '../../PredefinedConfig/RunTimeState/ReminderState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class ReminderApiImpl extends ApiBase implements ReminderApi {
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
