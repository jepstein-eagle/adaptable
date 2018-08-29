"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="../../typings/index.d.ts" />
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
class ShortcutTypeWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            ColumnType: this.props.Data.ColumnType,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-type";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Select Where Shortcut is Applied", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Numeric column shortuts perform a mathematical operation on the current contents of the cell.")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Date shortcuts replace the cell contents with a new Date value.")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_medium_margin" },
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Number", checked: this.state.ColumnType == Enums_1.DataType.Number, onChange: (e) => this.onColumTypeChanged(e) }, "Numeric Columns")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_medium_margin" },
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "Date", checked: this.state.ColumnType == Enums_1.DataType.Date, onChange: (e) => this.onColumTypeChanged(e) }, "Date Columns")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_medium_margin" }))));
    }
    onColumTypeChanged(event) {
        let e = event.target;
        if (e.value == "Number") {
            this.setState({ ColumnType: Enums_1.DataType.Number }, () => this.props.UpdateGoBackState());
        }
        else {
            this.setState({ ColumnType: Enums_1.DataType.Date }, () => this.props.UpdateGoBackState());
        }
    }
    canNext() {
        return this.state.ColumnType != null;
    }
    canBack() { return true; }
    Next() {
        this.props.Data.ColumnType = this.state.ColumnType;
        if (this.state.ColumnType == Enums_1.DataType.Date) {
            this.props.Data.ShortcutOperation = Enums_1.MathOperation.Replace;
        }
    }
    Back() { }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ShortcutTypeWizard = ShortcutTypeWizard;
