"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const AdaptablePopover_1 = require("../../AdaptablePopover");
class LayoutSelectionWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            LayoutSource: Enums_1.LayoutSource.Existing
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-selection";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select Source for Layout", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Choose whether to create a new layout using the Grid's current columns and sort order.")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Alternatively, choose to build a new layout from scratch.")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Existing", checked: this.state.LayoutSource == Enums_1.LayoutSource.Existing, onChange: (e) => this.onScopeSelectChanged(e) }, "Copy current Grid setup"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Layout:  Current Grid", bodyText: ["The new layout will contain the current column order and sort order in the grid."], MessageType: Enums_1.MessageType.Info })),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "New", checked: this.state.LayoutSource == Enums_1.LayoutSource.New, onChange: (e) => this.onScopeSelectChanged(e) }, "Create a new Layout"),
                        ' ',
                        " ",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Layout: New", bodyText: ["Build the layout yourself by selecting columns and sort order (in following steps)."], MessageType: Enums_1.MessageType.Info })))));
    }
    onScopeSelectChanged(event) {
        let e = event.target;
        if (e.value == "Existing") {
            this.setState({ LayoutSource: Enums_1.LayoutSource.Existing }, () => this.props.UpdateGoBackState());
        }
        else {
            this.setState({ LayoutSource: Enums_1.LayoutSource.New, ColumnId: "" }, () => this.props.UpdateGoBackState());
        }
    }
    canNext() { return true; }
    canBack() { return true; }
    Next() {
        if (this.state.LayoutSource == Enums_1.LayoutSource.Existing) { // need to popuplate the layout
            let visibleColumns = this.props.Columns.filter(c => c.Visible).map(c => c.ColumnId);
            this.props.Data.Columns = visibleColumns;
            this.props.Data.GridSorts = this.props.GridSorts;
        }
    }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return (this.state.LayoutSource == Enums_1.LayoutSource.Existing) ? 3 : 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.LayoutSelectionWizard = LayoutSelectionWizard;
