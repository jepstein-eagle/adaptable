"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const AdvancedSearchRedux = require("../Redux/ActionsReducers/AdvancedSearchRedux");
const ApiBase_1 = require("./ApiBase");
class AdvancedSearchApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().AdvancedSearch;
    }
    Set(advancedSearchName) {
        let advancedSearch = this.getBlotterState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
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
        let searchIndex = this.getBlotterState().AdvancedSearch.AdvancedSearches.findIndex(a => a.Name == advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchAddUpdate(searchIndex, advancedSearch));
    }
    Delete(advancedSearchName) {
        let searchToDelete = this.GetByName(advancedSearchName);
        this.dispatchAction(AdvancedSearchRedux.AdvancedSearchDelete(searchToDelete));
    }
    GetCurrent() {
        let currentAdvancedSearchName = this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch;
        return this.GetByName(currentAdvancedSearchName);
    }
    GetCurrentName() {
        return this.getBlotterState().AdvancedSearch.CurrentAdvancedSearch;
    }
    GetByName(advancedSearchName) {
        return this.getBlotterState().AdvancedSearch.AdvancedSearches.find(a => a.Name == advancedSearchName);
    }
    GetAll() {
        return this.getBlotterState().AdvancedSearch.AdvancedSearches;
    }
}
exports.AdvancedSearchApi = AdvancedSearchApi;
