"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSearchRedux = require("../Redux/ActionsReducers/QuickSearchRedux");
const ApiBase_1 = require("./ApiBase");
class QuickSearchApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().QuickSearch;
    }
    Apply(quickSearchText) {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText));
    }
    Clear() {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(""));
    }
    GetValue() {
        return this.getBlotterState().QuickSearch.QuickSearchText;
    }
    GetStyle() {
        return this.getBlotterState().QuickSearch.Style;
    }
    SetDisplayAction(displayAction) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction));
    }
    SetStyle(style) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style));
    }
}
exports.QuickSearchApi = QuickSearchApi;
