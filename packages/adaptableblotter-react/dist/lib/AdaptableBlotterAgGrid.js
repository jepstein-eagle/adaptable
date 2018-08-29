"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ag_grid_react_1 = require("ag-grid-react");
const AdaptableBlotter_1 = require("./AdaptableBlotter");
class AdaptableBlotterAgGrid extends React.Component {
    componentWillMount() {
        this.state = {
            AdaptableBlotterOptions: this.props.AdaptableBlotterOptions,
            GridOptions: this.props.GridOptions
        };
    }
    render() {
        let theme = this.props.agTheme ? "ag-theme-" + this.props.agTheme : "ag-theme-balham";
        let style = this.props.agDivStyle ? this.props.agDivStyle : { width: '100%', height: '90%', position: 'absolute', margin: '0px' };
        return (React.createElement("div", { id: "adaptableBlotter-react" },
            React.createElement(AdaptableBlotter_1.default, { AdaptableBlotterOptions: this.state.AdaptableBlotterOptions, VendorGridName: "agGrid" }),
            React.createElement("div", { id: "grid", className: theme, style: style },
                React.createElement(ag_grid_react_1.AgGridReact, { gridOptions: this.state.GridOptions }))));
    }
}
exports.default = AdaptableBlotterAgGrid;
//# sourceMappingURL=AdaptableBlotterAgGrid.js.map