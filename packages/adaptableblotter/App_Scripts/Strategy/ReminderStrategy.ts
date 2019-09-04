import { AdaptableStrategyBase } from './AdaptableStrategyBase';
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups';
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter';
import { IReminderStrategy } from './Interface/IReminderStrategy';
import { ReminderState } from '../PredefinedConfig/RunTimeState/ReminderState';
import { GRID_RELOADED_EVENT } from '../Utilities/Constants/GeneralConstants';
import { AdaptableBlotterMenuItem } from '../Utilities/MenuItem';

export class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
  protected ReminderState: ReminderState;
  constructor(blotter: IAdaptableBlotter) {
    super(StrategyConstants.ReminderStrategyId, blotter);
    //this.blotter.onGridReloaded().Subscribe(() => this.handleGridReloaded());

    this.blotter.on(GRID_RELOADED_EVENT, () => {
      this.scheduleReminders();
    });
  }

  public addMainMenuItem(): AdaptableBlotterMenuItem | undefined {
    return this.createMainMenuItemShowPopup({
      Label: StrategyConstants.ReminderStrategyName,
      ComponentName: ScreenPopups.ReminderPopup,
      GlyphIcon: StrategyConstants.ReminderGlyph,
    });
  }

  public scheduleReminders(): void {
    // just clear all jobs and recreate - simplest thing to do...
    this.blotter.ScheduleService.ClearAllAlertJobs();

    this.blotter.api.reminderApi.getAllReminder().forEach(r => {
      this.blotter.ScheduleService.AddReminderSchedule(r);
    });
  }
}
