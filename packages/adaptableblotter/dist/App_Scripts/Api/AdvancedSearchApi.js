"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const AdvancedSearchRedux = require("../Redux/ActionsReducers/AdvancedSearchRedux");
const ApiBase_1 = require("./ApiBase");
class AdvancedSearchApi extends ApiBase_1.ApiBase {
    Set(advancedSearchName) {
        let advancedSearch = this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
        if (this.checkItemExists(advancedSearch, advancedSearchName, StrategyConstants.AdvancedSearchStrategyName)) {
            this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(advancedSearchName));
        }
    }
    Clear() {
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchSelect(""));
    }
    Add(advancedSearch) {
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(-1, advancedSearch));
    }
    Edit(advancedSearchName, advancedSearch) {
        let searchIndex = this.getState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch));
    }
    Delete(advancedSearchName) {
        let searchToDelete = this.GetByName(advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete));
    }
    GetCurrent() {
        let currentAdvancedSearchName = this.getState().AdvancedSearch.CurrentAdvancedSearch;
        return this.GetByName(currentAdvancedSearchName);
    }
    GetByName(advancedSearchName) {
        return this.getState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    }
    GetAll() {
        return this.getState().AdvancedSearch.AdvancedSearches;
    }
}
exports.AdvancedSearchApi = AdvancedSearchApi;
