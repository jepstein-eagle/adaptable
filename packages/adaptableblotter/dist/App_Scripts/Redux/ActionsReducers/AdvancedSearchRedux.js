"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADVANCED_SEARCH_ADD_UPDATE = 'ADVANCED_SEARCH_ADD_UPDATE';
exports.ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';
exports.ADVANCED_SEARCH_SELECT = 'ADVANCED_SEARCH_SELECT';
exports.AdvancedSearchAddUpdate = (index, advancedSearch) => ({
    type: exports.ADVANCED_SEARCH_ADD_UPDATE,
    index,
    advancedSearch
});
exports.AdvancedSearchDelete = (advancedSearch) => ({
    type: exports.ADVANCED_SEARCH_DELETE,
    advancedSearch
});
exports.AdvancedSearchSelect = (selectedSearchName) => ({
    type: exports.ADVANCED_SEARCH_SELECT,
    selectedSearchName
});
const initialAdvancedSearchState = {
    AdvancedSearches: [],
    CurrentAdvancedSearch: ""
};
exports.AdvancedSearchReducer = (state = initialAdvancedSearchState, action) => {
    let index;
    let advancedSearches;
    switch (action.type) {
        case exports.ADVANCED_SEARCH_ADD_UPDATE:
            let actionTypedAddUpdate = action;
            advancedSearches = [].concat(state.AdvancedSearches);
            if (actionTypedAddUpdate.index != -1) { // it exists
                advancedSearches[actionTypedAddUpdate.index] = actionTypedAddUpdate.advancedSearch;
            }
            else {
                advancedSearches.push(actionTypedAddUpdate.advancedSearch);
            }
            return Object.assign({}, state, { AdvancedSearches: advancedSearches }); //, CurrentAdvancedSearch: currentSearchName })
        case exports.ADVANCED_SEARCH_DELETE:
            let actionTypedDelete = action;
            advancedSearches = [].concat(state.AdvancedSearches);
            index = advancedSearches.findIndex(a => a.Name == actionTypedDelete.advancedSearch.Name);
            advancedSearches.splice(index, 1);
            return Object.assign({}, state, { AdvancedSearches: advancedSearches, CurrentAdvancedSearch: "" });
        case exports.ADVANCED_SEARCH_SELECT:
            return Object.assign({}, state, { CurrentAdvancedSearch: action.selectedSearchName });
        default:
            return state;
    }
};
