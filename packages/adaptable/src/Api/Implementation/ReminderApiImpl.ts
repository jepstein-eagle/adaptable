import { ApiBase } from './ApiBase';
import { ReminderApi } from '../ReminderApi';
import { ReminderSchedule } from '../../PredefinedConfig/ReminderState';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';

export class ReminderApiImpl extends ApiBase implements ReminderApi {
  public getAllReminder(): ReminderSchedule[] {
    return this.getAdaptableState().Schedule.Reminders;
  }

  public showReminderPopup(): void {
    this.adaptable.api.internalApi.showPopupScreen(
      StrategyConstants.ReminderStrategyId,
      ScreenPopups.ReminderPopup
    );
  }
}
