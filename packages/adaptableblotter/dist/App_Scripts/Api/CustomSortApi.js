"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StrategyConstants = require("../Utilities/Constants/StrategyConstants");
const CustomSortRedux = require("../Redux/ActionsReducers/CustomSortRedux");
const ApiBase_1 = require("./ApiBase");
class CustomSortApi extends ApiBase_1.ApiBase {
    GetState() {
        return this.getBlotterState().CustomSort;
    }
    GetAll() {
        return this.getBlotterState().CustomSort.CustomSorts;
    }
    GetByColumn(column) {
        return this.getBlotterState().CustomSort.CustomSorts.find(cs => cs.ColumnId == column);
    }
    Add(customSort) {
        this.dispatchAction(CustomSortRedux.CustomSortAdd(customSort));
    }
    Create(columnId, values) {
        let customSort = { ColumnId: columnId, SortedValues: values };
        this.Add(customSort);
    }
    Edit(columnId, values) {
        let customSort = { ColumnId: columnId, SortedValues: values };
        if (this.checkItemExists(customSort, columnId, StrategyConstants.CustomSortStrategyId)) {
            this.dispatchAction(CustomSortRedux.CustomSortEdit(customSort));
        }
    }
    Delete(column) {
        let customSort = this.GetByColumn(column);
        this.dispatchAction(CustomSortRedux.CustomSortDelete(customSort));
    }
}
exports.CustomSortApi = CustomSortApi;
