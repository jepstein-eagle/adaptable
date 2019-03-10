"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Utilities/Enums");
const AdaptableBlotterForm_1 = require("../Forms/AdaptableBlotterForm");
class ListBoxFilterSortComponent extends React.Component {
    render() {
        return React.createElement("div", null,
            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                React.createElement(react_bootstrap_1.FormGroup, { style: { margin: 0 } },
                    React.createElement(react_bootstrap_1.InputGroup, null,
                        React.createElement(react_bootstrap_1.FormControl, { type: "text", bsSize: 'small', value: this.props.FilterValue, placeholder: "Search", onChange: (e) => this.handleChangeFilterValue(e) }),
                        React.createElement(react_bootstrap_1.InputGroup.Button, null,
                            React.createElement(react_bootstrap_1.Button, { onClick: () => this.clearFilter(), bsSize: 'small' },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "remove" }))),
                        React.createElement(react_bootstrap_1.InputGroup.Button, null, this.props.SortOrder == Enums_1.SortOrder.Ascending ?
                            React.createElement(react_bootstrap_1.Button, { bsSize: 'small', disabled: this.props.DisableSort, onClick: () => this.props.sortColumnValues() },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "sort-by-alphabet" })) :
                            React.createElement(react_bootstrap_1.Button, { bsSize: 'small', disabled: this.props.DisableSort, onClick: () => this.props.sortColumnValues() },
                                React.createElement(react_bootstrap_1.Glyphicon, { glyph: "sort-by-alphabet-alt" })))),
                    React.createElement(react_bootstrap_1.InputGroup, null))));
    }
    handleChangeFilterValue(x) {
        let e = x.target;
        this.props.handleChangeFilterValue(e.value);
    }
    clearFilter() {
        this.props.handleChangeFilterValue("");
    }
}
exports.ListBoxFilterSortComponent = ListBoxFilterSortComponent;
