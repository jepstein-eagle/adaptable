import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../AdaptableInterfaces/IAdaptable';
import { IReminderStrategy } from './Interface/IReminderStrategy';
import { ReminderState } from '../PredefinedConfig/ReminderState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
  protected ReminderState: ReminderState;
  constructor(adaptable: IAdaptable) {
    super(StrategyConstants.ReminderStrategyId, adaptable);

    this.adaptable._on('GridReloaded', () => {
      this.scheduleReminders();
    });
  }

  public addFunctionMenuItem(): AdaptableMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ReminderStrategyFriendlyName,
      ComponentName: ScreenPopups.ReminderPopup,
      Icon: StrategyConstants.ReminderGlyph,
    });
  }

  public scheduleReminders(): void {
    // just clear all jobs and recreate - simplest thing to do...
    this.adaptable.ScheduleService.ClearAllReminderJobs();

    this.adaptable.api.reminderApi.getAllReminder().forEach(r => {
      this.adaptable.ScheduleService.AddReminderSchedule(r);
    });
  }
}
