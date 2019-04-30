"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class ReminderStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ReminderStrategyId, blotter);
        this.blotter.onGridReloaded().Subscribe((sender, blotter) => this.handleGridReloaded());
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ReminderStrategyName, ScreenPopups.ReminderPopup, StrategyConstants.ReminderGlyph);
    }
    InitState() {
        if (this.ReminderState != this.blotter.api.reminderApi.getReminderState()) {
            this.scheduleReminders();
            this.ReminderState = this.blotter.api.reminderApi.getReminderState();
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Reminder, this.ReminderState);
            }
        }
    }
    handleGridReloaded() {
        this.scheduleReminders();
    }
    scheduleReminders() {
        // just clear all jobs and recreate - simplest thing to do...
        this.blotter.ScheduleService.ClearAllAlertJobs();
        this.blotter.api.reminderApi.getAllReminder().forEach(r => {
            this.blotter.ScheduleService.AddReminderSchedule(r);
        });
    }
}
exports.ReminderStrategy = ReminderStrategy;
