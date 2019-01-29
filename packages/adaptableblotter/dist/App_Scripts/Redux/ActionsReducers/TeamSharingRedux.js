"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const GeneralConstants_1 = require("../../Utilities/Constants/GeneralConstants");
exports.TEAMSHARING_SHARE = 'TEAMSHARING_SHARE';
exports.TEAMSHARING_SET = 'TEAMSHARING_SET';
exports.TEAMSHARING_IMPORT_ITEM = 'TEAMSHARING_IMPORT_ITEM';
exports.TEAMSHARING_GET = 'TEAMSHARING_GET';
exports.TeamSharingShare = (Entity, Strategy) => ({
    type: exports.TEAMSHARING_SHARE,
    Entity,
    Strategy
});
exports.TeamSharingSet = (Entities) => ({
    type: exports.TEAMSHARING_SET,
    Entities
});
exports.TeamSharingImportItem = (Entity, Strategy) => ({
    type: exports.TEAMSHARING_IMPORT_ITEM,
    Entity,
    Strategy
});
exports.TeamSharingGet = () => ({
    type: exports.TEAMSHARING_GET
});
const initialTeamSharingState = {
    Activated: false,
    SharedEntities: GeneralConstants_1.EMPTY_ARRAY
};
exports.TeamSharingReducer = (state = initialTeamSharingState, action) => {
    switch (action.type) {
        case exports.TEAMSHARING_SET: {
            let actionTyped = action;
            return Object.assign({}, state, {
                SharedEntities: actionTyped.Entities
            });
        }
        default:
            return state;
    }
};
