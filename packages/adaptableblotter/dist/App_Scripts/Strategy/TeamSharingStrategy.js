"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class TeamSharingStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.TeamSharingStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyIds.TeamSharingStrategyName, ScreenPopups.TeamSharingPopup, StrategyIds.TeamSharingGlyph);
    }
    hasPopupMenu() {
        return this.blotter.BlotterOptions.enableRemoteConfigServer;
    }
    InitState() {
        //nothing 
    }
}
exports.TeamSharingStrategy = TeamSharingStrategy;
