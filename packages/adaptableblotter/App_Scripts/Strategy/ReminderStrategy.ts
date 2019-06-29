import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IReminderStrategy } from './Interface/IReminderStrategy';
import { ReminderState } from '../PredefinedConfig/RunTimeState/ReminderState';

export class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
  protected ReminderState: ReminderState;
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ReminderStrategyId, blotter);
    this.blotter.onGridReloaded().Subscribe(() => this.handleGridReloaded());
  }

  protected addPopupMenuItem() {
    this.createMenuItemShowPopup(
      StrategyConstants.ReminderStrategyName,
      ScreenPopups.ReminderPopup,
      StrategyConstants.ReminderGlyph
    );
  }

  private handleGridReloaded() {
    this.scheduleReminders();
  }

  public scheduleReminders(): void {
    // just clear all jobs and recreate - simplest thing to do...
    this.blotter.ScheduleService.ClearAllAlertJobs();

    this.blotter.api.reminderApi.getAllReminder().forEach(r => {
      this.blotter.ScheduleService.AddReminderSchedule(r);
    });
  }
}
