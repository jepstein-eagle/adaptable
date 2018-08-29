"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AdaptableStrategyBase_1 = require("./AdaptableStrategyBase");
const StrategyIds = require("../Core/Constants/StrategyIds");
const StrategyNames = require("../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../Core/Constants/ScreenPopups");
class TeamSharingStrategy extends AdaptableStrategyBase_1.AdaptableStrategyBase {
    constructor(blotter) {
        super(StrategyIds.TeamSharingStrategyId, blotter);
    }
    addPopupMenuItem() {
        this.createMenuItemShowPopup(StrategyNames.TeamSharingStrategyName, ScreenPopups.TeamSharingPopup, StrategyGlyphs.TeamSharingGlyph);
    }
    hasPopupMenu() {
        return this.blotter.BlotterOptions.enableRemoteConfigServer;
    }
    InitState() {
        //nothing 
    }
}
exports.TeamSharingStrategy = TeamSharingStrategy;
