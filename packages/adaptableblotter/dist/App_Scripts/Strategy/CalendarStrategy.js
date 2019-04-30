"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../Utilities/Enums");
class CalendarStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.CalendarStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.CalendarStrategyName, ScreenPopups.CalendarsPopup, StrategyConstants.CalendarGlyph);
    }
    InitState() {
        if (this.CalendarState != this.blotter.api.calendarApi.getCalendarState()) {
            this.CalendarState = this.blotter.api.calendarApi.getCalendarState();
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Calendar, this.CalendarState);
            }
        }
    }
}
exports.CalendarStrategy = CalendarStrategy;
