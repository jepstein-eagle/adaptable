"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const PanelWithImage_1 = require("../Panels/PanelWithImage");
const AdaptableObjectRow_1 = require("../AdaptableObjectRow");
const Helper_1 = require("../../../Utilities/Helpers/Helper");
const AdaptableObjectCollection_1 = require("../AdaptableObjectCollection");
const ColumnHelper_1 = require("../../../Utilities/Helpers/ColumnHelper");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const ColumnFilterHelper_1 = require("../../../Utilities/Helpers/ColumnFilterHelper");
const react_bootstrap_1 = require("react-bootstrap");
const StyleConstants = require("../../../Core/Constants/StyleConstants");
const UIHelper_1 = require("../../UIHelper");
class AdaptableBlotterAbout extends React.Component {
    render() {
        let cssClassName = StyleConstants.AB_STYLE;
        let modalContainer = UIHelper_1.UIHelper.getModalContainer(this.props.AdaptableBlotter.BlotterOptions, document);
        let colItems = [
            { Content: "Property", Size: 5 },
            { Content: "Value", Size: 7 },
        ];
        let aboutItems = this.CreateAboutInfo(colItems).map((x, index) => {
            return React.createElement(AdaptableObjectRow_1.AdaptableObjectRow, { cssClassName: cssClassName, key: index, colItems: x });
        });
        return React.createElement(react_bootstrap_1.Modal, { show: this.props.showAbout, onHide: this.props.onClose, className: cssClassName + StyleConstants.BASE, container: modalContainer },
            React.createElement("div", { className: cssClassName + StyleConstants.MODAL_BASE },
                React.createElement(react_bootstrap_1.Modal.Body, { className: cssClassName + StyleConstants.MODAL_BODY },
                    React.createElement("div", { className: cssClassName },
                        React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: "About", bsStyle: "primary", glyphicon: "info-sign" },
                            React.createElement(AdaptableObjectCollection_1.AdaptableObjectCollection, { cssClassName: cssClassName, colItems: colItems, items: aboutItems })))),
                React.createElement(react_bootstrap_1.Modal.Footer, { className: cssClassName + StyleConstants.MODAL_FOOTER },
                    React.createElement(react_bootstrap_1.Button, { className: cssClassName + StyleConstants.MODAL_FOOTER + StyleConstants.CLOSE_BUTTON, onClick: () => this.props.onClose() }, "Close"))));
    }
    CreateAboutInfo(colItems) {
        let returnRows = [];
        if (this.props.showAbout) {
            //get state - do better?
            let state = this.props.AdaptableBlotter.AdaptableBlotterStore.TheStore.getState();
            let calcColumns = state.CalculatedColumn.CalculatedColumns.map(c => c.ColumnId);
            let columns = state.Grid.Columns;
            let columnFilterDescription = ColumnFilterHelper_1.ColumnFilterHelper.getColumnFiltersDescription(state.ColumnFilter.ColumnFilters, columns, this.props.AdaptableBlotter);
            let sorts = state.Grid.GridSorts.map(gs => {
                return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(gs.Column, columns) + ": " + gs.SortOrder;
            });
            let options = this.props.AdaptableBlotter.BlotterOptions;
            returnRows.push(this.createColItem(colItems, "Vendor Grid", this.props.AdaptableBlotter.VendorGridName));
            returnRows.push(this.createColItem(colItems, "Adaptable Blotter Version", "2.6"));
            if (options.blotterId != undefined) {
                returnRows.push(this.createColItem(colItems, "Blotter Id", options.blotterId));
            }
            if (options.userName != undefined) {
                returnRows.push(this.createColItem(colItems, "User", options.userName));
            }
            if (options.enableAuditLog != undefined) {
                returnRows.push(this.createColItem(colItems, "Audit Log", (options.enableAuditLog) ? "On" : "Off"));
            }
            if (options.enableRemoteConfigServer != undefined) {
                returnRows.push(this.createColItem(colItems, "Remote Configuration", (options.enableRemoteConfigServer) ? "On" : "Off"));
            }
            if (options.serverSearchOption != undefined) {
                returnRows.push(this.createColItem(colItems, "Server Search Option", options.serverSearchOption));
            }
            returnRows.push(this.createColItem(colItems, "Sorted Columns", ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(sorts) ? sorts.join("; ") : "None"));
            returnRows.push(this.createColItem(colItems, "Can Filter", this.props.AdaptableBlotter.isFilterable() ? "True" : "False"));
            returnRows.push(this.createColItem(colItems, "Column Filters", columnFilterDescription));
            returnRows.push(this.createColItem(colItems, "All Rows", this.props.AdaptableBlotter.getRowCount()));
            returnRows.push(this.createColItem(colItems, "Visible Rows", this.props.AdaptableBlotter.getVisibleRowCount()));
            returnRows.push(this.createColItem(colItems, "All Columns", this.props.AdaptableBlotter.getColumnCount()));
            returnRows.push(this.createColItem(colItems, "Visible Column", this.props.AdaptableBlotter.getVisibleColumnCount()));
            returnRows.push(this.createColItem(colItems, "Can Multi Select", this.props.AdaptableBlotter.isSelectable() ? "True" : "False"));
            returnRows.push(this.createColItem(colItems, "Calculated Columns", ArrayExtensions_1.ArrayExtensions.IsNotNullOrEmpty(calcColumns) ? calcColumns : "None"));
        }
        return returnRows;
    }
    createColItem(colItems, item1, item2) {
        let rowColItems = Helper_1.Helper.cloneObject(colItems);
        rowColItems[0].Content = item1;
        rowColItems[1].Content = item2;
        return rowColItems;
    }
}
exports.AdaptableBlotterAbout = AdaptableBlotterAbout;
