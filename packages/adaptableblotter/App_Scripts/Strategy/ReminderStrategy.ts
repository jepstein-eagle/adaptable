import { AdaptableStrategyBase } from './AdaptableStrategyBase'
import * as StrategyConstants from '../Utilities/Constants/StrategyConstants'
import * as ScreenPopups from '../Utilities/Constants/ScreenPopups'
import { IAdaptableBlotter } from '../Utilities/Interface/IAdaptableBlotter'
import { IReminderStrategy } from './Interface/IReminderStrategy'
import { ReminderState } from '../Redux/ActionsReducers/Interface/IState';
import { StateChangedTrigger } from '../Utilities/Enums';

export class ReminderStrategy extends AdaptableStrategyBase implements IReminderStrategy {
    protected ReminderState: ReminderState
    constructor(blotter: IAdaptableBlotter) {
        super(StrategyConstants.ReminderStrategyId, blotter)
        this.blotter.onGridReloaded().Subscribe((sender, blotter) => this.handleGridReloaded())
    }

    protected addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ReminderStrategyName, ScreenPopups.ReminderPopup, StrategyConstants.ReminderGlyph);
    }

    protected InitState() {
        if (this.ReminderState != this.blotter.AdaptableBlotterStore.TheStore.getState().Reminder) {

            this.scheduleReminders();

            this.ReminderState = this.blotter.AdaptableBlotterStore.TheStore.getState().Reminder;

            if (this.blotter.isInitialised) {
                this.publishStateChanged(StateChangedTrigger.Reminder, this.ReminderState)
            }
        }
    }

    private handleGridReloaded() {
        this.scheduleReminders();
    }

    private scheduleReminders(): void {
        // just clear all jobs and recreate - simplest thing to do...
        this.blotter.ScheduleService.ClearAllAlertJobs();

        this.blotter.AdaptableBlotterStore.TheStore.getState().Reminder.Reminders.forEach(r => {
            this.blotter.ScheduleService.AddReminderSchedule(r);
        })
    }


}