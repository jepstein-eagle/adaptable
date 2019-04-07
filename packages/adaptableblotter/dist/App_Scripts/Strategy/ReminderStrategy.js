"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class ReminderStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ReminderStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ReminderStrategyName, ScreenPopups.ReminderPopup, StrategyConstants.ReminderGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            // to do
        }
    }
    InitState() {
        if (this.ReminderState != this.blotter.AdaptableBlotterStore.TheStore.getState().Reminder) {
            // just clear all jobs and recreate - simplest thing to do...
            this.blotter.ScheduleService.ClearAllAlertJobs();
            this.blotter.AdaptableBlotterStore.TheStore.getState().Reminder.Reminders.forEach(r => {
                this.blotter.ScheduleService.AddAlertSchedule(r);
            });
            this.ReminderState = this.blotter.AdaptableBlotterStore.TheStore.getState().Reminder;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Reminder, this.ReminderState);
            }
        }
    }
}
exports.ReminderStrategy = ReminderStrategy;
