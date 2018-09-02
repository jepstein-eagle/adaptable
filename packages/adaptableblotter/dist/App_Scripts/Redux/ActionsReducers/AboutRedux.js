"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ABOUT_INFO_CREATE = 'ABOUT_INFO_CREATE';
exports.ABOUT_INFO_SET = 'ABOUT_INFO_SET';
exports.AboutInfoCreate = () => ({
    type: exports.ABOUT_INFO_CREATE
});
exports.AboutInfoSet = (AboutInfo) => ({
    type: exports.ABOUT_INFO_SET,
    AboutInfo
});
const initialAboutState = {
    AboutInfo: []
};
exports.AboutReducer = (state = initialAboutState, action) => {
    switch (action.type) {
        case exports.ABOUT_INFO_SET:
            return Object.assign({}, state, { AboutInfo: action.AboutInfo });
        default:
            return state;
    }
};
