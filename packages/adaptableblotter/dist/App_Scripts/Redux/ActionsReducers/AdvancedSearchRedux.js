"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADVANCED_SEARCH_ADD_UPDATE = 'ADVANCED_SEARCH_ADD_UPDATE';
exports.ADVANCED_SEARCH_DELETE = 'ADVANCED_SEARCH_DELETE';
exports.ADVANCED_SEARCH_SELECT = 'ADVANCED_SEARCH_SELECT';
exports.AdvancedSearchAddUpdate = (Index, AdvancedSearch) => ({
    type: exports.ADVANCED_SEARCH_ADD_UPDATE,
    Index,
    AdvancedSearch
});
exports.AdvancedSearchDelete = (AdvancedSearch) => ({
    type: exports.ADVANCED_SEARCH_DELETE,
    AdvancedSearch
});
exports.AdvancedSearchSelect = (SelectedSearchName) => ({
    type: exports.ADVANCED_SEARCH_SELECT,
    SelectedSearchName
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
            if (actionTypedAddUpdate.Index != -1) { // it exists
                advancedSearches[actionTypedAddUpdate.Index] = actionTypedAddUpdate.AdvancedSearch;
            }
            else {
                advancedSearches.push(actionTypedAddUpdate.AdvancedSearch);
            }
            return Object.assign({}, state, { AdvancedSearches: advancedSearches }); //, CurrentAdvancedSearch: currentSearchName })
        case exports.ADVANCED_SEARCH_DELETE:
            let actionTypedDelete = action;
            advancedSearches = [].concat(state.AdvancedSearches);
            index = advancedSearches.findIndex(a => a.Name == actionTypedDelete.AdvancedSearch.Name);
            advancedSearches.splice(index, 1);
            return Object.assign({}, state, { AdvancedSearches: advancedSearches, CurrentAdvancedSearch: "" });
        case exports.ADVANCED_SEARCH_SELECT:
            return Object.assign({}, state, { CurrentAdvancedSearch: action.SelectedSearchName });
        default:
            return state;
    }
};
