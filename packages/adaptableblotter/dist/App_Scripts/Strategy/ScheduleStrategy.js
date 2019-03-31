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
            // just trying one out...
            let scheduleRule = {
                DayOfWeek: 5,
                Hour: 14,
                Minute: 53
            };
            let scheduleTime = {
                RecurringDate: scheduleRule
            };
            let alertScheduleItem = {
                Alert: {
                    Header: "Test Schedule",
                    Msg: "This alert has worked",
                    MessageType: Enums_1.MessageType.Success,
                    ShowAsPopup: true
                }
            };
            let reportSchedule = {
                ScheduleItem: {
                    Name: "All Data",
                    ExportDestination: Enums_1.ExportDestination.CSV
                },
                ScheduleTime: scheduleTime,
                ScheduleType: Enums_1.ScheduleType.Report
            };
            let alertSchedule = {
                ScheduleItem: alertScheduleItem,
                ScheduleTime: scheduleTime,
                ScheduleType: Enums_1.ScheduleType.Alert
            };
            //    this.blotter.ScheduleService.AddSchedule(reportSchedule);
            this.blotter.ScheduleService.AddSchedule(alertSchedule);
            this.ScheduleState = this.blotter.AdaptableBlotterStore.TheStore.getState().Schedule;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Schedule, this.ScheduleState);
            }
        }
    }
}
exports.ScheduleStrategy = ScheduleStrategy;
