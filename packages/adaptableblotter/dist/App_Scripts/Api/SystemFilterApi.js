"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemFilterRedux = require("../Redux/ActionsReducers/SystemFilterRedux");
const UserFilterRedux = require("../Redux/ActionsReducers/UserFilterRedux");
const ApiBase_1 = require("./ApiBase");
const FilterHelper_1 = require("../Utilities/Helpers/FilterHelper");
class SystemFilterApi extends ApiBase_1.ApiBase {
    getSystemFilterState() {
        return this.getBlotterState().SystemFilter;
    }
    setSystemFilterByUserFilters(userFilters) {
        userFilters.forEach(uf => {
            this.dispatchAction(UserFilterRedux.UserFilterAddUpdate(-1, uf));
        });
    }
    setSystemFilter(systemFilters) {
        this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
    }
    clearSystemFilter() {
        this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
    }
    getCurrentSystemFilter() {
        return this.getBlotterState().SystemFilter.SystemFilters;
    }
    getAllSystemFilter() {
        return FilterHelper_1.FilterHelper.GetAllSystemFilters();
    }
}
exports.SystemFilterApi = SystemFilterApi;
