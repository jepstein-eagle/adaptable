"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class ScheduleStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.ScheduleStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.ScheduleStrategyName, ScreenPopups.SchedulePopup, StrategyConstants.ScheduleGlyph);
    }
    addContextMenuItem(column) {
        if (this.canCreateContextMenuItem(column, this.blotter)) {
            // to do
        }
    }
    InitState() {
        if (this.ScheduleState != this.blotter.AdaptableBlotterStore.TheStore.getState().Schedule) {
            // just clear all jobs and recreate - simplest thing to do...
            this.blotter.ScheduleService.ClearAllJobs();
            this.blotter.AdaptableBlotterStore.TheStore.getState().Schedule.Schedules.forEach(s => {
                this.blotter.ScheduleService.AddSchedule(s);
            });
            this.ScheduleState = this.blotter.AdaptableBlotterStore.TheStore.getState().Schedule;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Schedule, this.ScheduleState);
            }
        }
    }
}
exports.ScheduleStrategy = ScheduleStrategy;
