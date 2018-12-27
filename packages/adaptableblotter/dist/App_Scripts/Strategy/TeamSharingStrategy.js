"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../Utilities/Constants/ScreenPopups");
class TeamSharingStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyConstants.TeamSharingStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyConstants.TeamSharingStrategyName, ScreenPopups.TeamSharingPopup, StrategyConstants.TeamSharingGlyph);
    }
    hasPopupMenu() {
        return this.blotter.BlotterOptions.remoteConfigServerOptions != null
            && this.blotter.BlotterOptions.remoteConfigServerOptions.enableRemoteConfigServer != null
            && this.blotter.BlotterOptions.remoteConfigServerOptions.enableRemoteConfigServer == true;
    }
    InitState() {
        //nothing 
    }
}
exports.TeamSharingStrategy = TeamSharingStrategy;
