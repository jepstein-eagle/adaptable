"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSearchRedux = require("../Redux/ActionsReducers/QuickSearchRedux");
const ApiBase_1 = require("./ApiBase");
class QuickSearchApi extends ApiBase_1.ApiBase {
    Apply(quickSearchText) {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText));
    }
    Clear() {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(""));
    }
    GetValue() {
        return this.getState().QuickSearch.QuickSearchText;
    }
    SetDisplayAction(displayAction) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction));
    }
    SetStyle(style) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style));
    }
}
exports.QuickSearchApi = QuickSearchApi;
