"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const QuickSearchRedux = require("../Redux/ActionsReducers/QuickSearchRedux");
const ApiBase_1 = require("./ApiBase");
class QuickSearchApi extends ApiBase_1.ApiBase {
    getQuickSearchState() {
        return this.getBlotterState().QuickSearch;
    }
    applyQuickSearch(quickSearchText) {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(quickSearchText));
    }
    clearQuickSearch() {
        this.dispatchAction(QuickSearchRedux.QuickSearchApply(""));
    }
    getQuickSearchValue() {
        return this.getBlotterState().QuickSearch.QuickSearchText;
    }
    getQuickSearchStyle() {
        return this.getBlotterState().QuickSearch.Style;
    }
    setQuickSearchDisplayAction(displayAction) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetDisplay(displayAction));
    }
    setQuickSearchStyle(style) {
        this.dispatchAction(QuickSearchRedux.QuickSearchSetStyle(style));
    }
}
exports.QuickSearchApi = QuickSearchApi;
