"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Core/Constants/StrategyConstants");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class TeamSharingStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.TeamSharingStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.TeamSharingStrategyName, ScreenPopups.TeamSharingPopup, StrategyConstants.TeamSharingGlyph);
    }
    hasPopupMenu() {
        return this.blotter.BlotterOptions.enableRemoteConfigServer;
    }
    InitState() {
        //nothing 
    }
}
exports.TeamSharingStrategy = TeamSharingStrategy;
