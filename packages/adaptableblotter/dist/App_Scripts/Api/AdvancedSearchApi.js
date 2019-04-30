"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const AdvancedSearchRedux = require("../Redux/ActionsReducers/AdvancedSearchRedux");
const ApiBase_1 = require("./ApiBase");
class AdvancedSearchApi extends ApiBase_1.ApiBase {
    getAdvancedSearchState() {
        return this.getBlotterState().AdvancedSearch;
    }
    setAdvancedSearch(advancedSearchName) {
        let advancedSearch = this.getBlotterState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
        if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyConstants.AdvancedSearchStrategyName)) {
            this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName));
        }
    }
    clearAdvancedSearch() {
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(""));
    }
    addAdvancedSearch(advancedSearch) {
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, advancedSearch));
    }
    editAdvancedSearch(advancedSearchName, advancedSearch) {
        let searchIndex = this.getBlotterState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch));
    }
    deleteAdvancedSearch(advancedSearchName) {
        let searchToDelete = this.getAdvancedSearchByName(advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete));
    }
    getCurrentAdvancedSearch() {
        let currentAdvancedSearchName = this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch;
        return this.getAdvancedSearchByName(currentAdvancedSearchName);
    }
    getCurrentAdvancedSearchName() {
        return this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch;
    }
    getAdvancedSearchByName(advancedSearchName) {
        return this.getBlotterState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    }
    getAllAdvancedSearch() {
        return this.getBlotterState().AdvancedSearch.AdvancedSearches;
    }
}
exports.AdvancedSearchApi = AdvancedSearchApi;
