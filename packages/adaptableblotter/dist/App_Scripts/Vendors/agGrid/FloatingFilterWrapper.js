"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ReactDOM = require("react-dom");
const FloatingFilterForm_1 = require("../../View/Components/FilterForm/FloatingFilterForm");
exports.FloatingFilterWrapperFactory = (blotter) => {
    return class FilterWrapper {
        init(params) {
            let colId = params.column.getColId();
            this.filterContainer = document.createElement("div");
            this.filterContainer.id = "floatingFilter_" + colId;
            let filterContext = {
                Column: blotter.AdaptableBlotterStore.TheStore.getState().Grid.Columns.find(c => c.ColumnId == colId),
                Blotter: blotter,
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
