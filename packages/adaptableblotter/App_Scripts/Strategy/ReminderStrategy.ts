import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../BlotterInterfaces/IAdaptableBlotter';
import { IReminderStrategy } from './Interface/IReminderStrategy';
import { ReminderState } from '../PredefinedConfig/ReminderState';
import { AdaptableBlotterMenuItem } from '../PredefinedConfig/Common/Menu';

export class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
  protected ReminderState: ReminderState;
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ReminderStrategyId, blotter);

    this.blotter._on('GridReloaded', () => {
      this.scheduleReminders();
    });
  }

  public addFunctionMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ReminderStrategyName,
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
