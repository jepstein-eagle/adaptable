"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SystemFilterRedux = require("../Redux/ActionsReducers/SystemFilterRedux");
const UserFilterRedux = require("../Redux/ActionsReducers/UserFilterRedux");
const ApiBase_1 = require("./ApiBase");
const FilterHelper_1 = require("../Utilities/Helpers/FilterHelper");
class SystemFilterApi extends ApiBase_1.ApiBase {
    userFilterSet(userFilters) {
        userFilters.forEach(uf => {
            this.dispatchAction(UserFilterRedux.UserFilterAddUpdate(-1, uf));
        });
    }
    Set(systemFilters) {
        this.dispatchAction(SystemFilterRedux.SystemFilterSet(systemFilters));
    }
    Clear() {
        this.dispatchAction(SystemFilterRedux.SystemFilterSet([]));
    }
    GetCurrent() {
        return this.getState().SystemFilter.SystemFilters;
    }
    GetAll() {
        return FilterHelper_1.FilterHelper.GetAllSystemFilters();
    }
}
exports.SystemFilterApi = SystemFilterApi;
