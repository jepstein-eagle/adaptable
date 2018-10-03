"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
const Enums_1 = require("../Core/Enums");
class CalendarStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.CalendarStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.CalendarStrategyName, ScreenPopups.CalendarsPopup, StrategyIds.CalendarGlyph);
    }
    InitState() {
        if (this.CalendarState != this.blotter.AdaptableBlotterStore.TheStore.getState().Calendar) {
            this.CalendarState = this.blotter.AdaptableBlotterStore.TheStore.getState().Calendar;
            if (this.blotter.isInitialised) {
                this.publishStateChanged(Enums_1.StateChangedTrigger.Calendar, this.CalendarState);
            }
        }
    }
}
exports.CalendarStrategy = CalendarStrategy;
