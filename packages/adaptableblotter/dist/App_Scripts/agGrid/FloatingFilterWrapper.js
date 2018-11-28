"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReactDOM = require("react-dom");
const FloatingFilterForm_1 = require("../App_Scripts/View/Components/FilterForm/FloatingFilterForm");
const ColumnHelper_1 = require("../App_Scripts/Utilities/Helpers/ColumnHelper");
exports.FloatingFilterWrapperFactory = (blotter) => {
    return class FilterWrapper {
        init(params) {
            let colId = params.column.getColId();
            this.filterContainer = document.createElement("div");
            this.filterContainer.id = "floatingFilter_" + colId;
            let column = ColumnHelper_1.ColumnHelper.getColumnFromId(colId, blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns);
            let filterContext = {
                Column: column,
                Blotter: blotter,
                ShowCloseButton: false,
            };
            ReactDOM.render(FloatingFilterForm_1.FloatingFilterFormReact(filterContext), this.filterContainer);
        }
        onParentModelChanged(parentModel) {
            //  console.log(parentModel)
        }
        getGui() {
            return this.filterContainer;
        }
        destroy() {
            this.filterContainer = null;
        }
    };
};
