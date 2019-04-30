"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApiBase_1 = require("./ApiBase");
class UserFilterApi extends ApiBase_1.ApiBase {
    getUserFilterState() {
        return this.getBlotterState().UserFilter;
    }
    getAllUserFilter() {
        return this.getUserFilterState().UserFilters;
    }
}
exports.UserFilterApi = UserFilterApi;
