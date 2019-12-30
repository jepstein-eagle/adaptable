import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptable } from '../BlotterInterfaces/IAdaptable';
import { IReminderStrategy } from './Interface/IReminderStrategy';
import { ReminderState } from '../PredefinedConfig/ReminderState';
import { AdaptableMenuItem } from '../PredefinedConfig/Common/Menu';

export class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
  protected ReminderState: ReminderState;
  constructor(blotter: IAdaptable) {
    super(StrategyConstants.ReminderStrategyId, blotter);

    this.blotter._on('GridReloaded', () => {
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
    this.blotter.ScheduleService.ClearAllReminderJobs();

    this.blotter.api.reminderApi.getAllReminder().forEach(r => {
      this.blotter.ScheduleService.AddReminderSchedule(r);
    });
  }
}
