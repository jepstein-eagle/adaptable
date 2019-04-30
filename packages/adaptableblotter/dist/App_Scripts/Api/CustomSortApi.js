"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const CustomSortRedux = require("../Redux/ActionsReducers/CustomSortRedux");
const ApiBase_1 = require("./ApiBase");
class CustomSortApi extends ApiBase_1.ApiBase {
    getCustomSortState() {
        return this.getBlotterState().CustomSort;
    }
    getAllCustomSort() {
        return this.getBlotterState().CustomSort.CustomSorts;
    }
    getCustomSortByColumn(column) {
        return this.getBlotterState().CustomSort.CustomSorts.find(cs => cs.ColumnId == column);
    }
    addCustomSort(customSort) {
        this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort));
    }
    createCustomSort(columnId, values) {
        let customSort = { ColumnId: columnId, SortedValues: values };
        this.addCustomSort(customSort);
    }
    editCustomSort(columnId, values) {
        let customSort = { ColumnId: columnId, SortedValues: values };
        if (this.checkItemExists(customSort, columnId, StrategyConstants.CustomSortStrategyId)) {
            this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort));
        }
    }
    deleteCustomSort(column) {
        let customSort = this.getCustomSortByColumn(column);
        this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort));
    }
}
exports.CustomSortApi = CustomSortApi;
