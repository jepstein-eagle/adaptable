"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ArrayExtensions_1 = require("../../../Utilities/Extensions/ArrayExtensions");
const StyleConstants_1 = require("../../../Utilities/Constants/StyleConstants");
class ColumnCategorySettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ColumnCategoryId: props.Data.ColumnCategoryId,
            ErrorMessage: null
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-settings";
        let validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Column Category Settings", bsStyle: StyleConstants_1.PRIMARY_BSSTYLE },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "ColumnCategoryName" },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, componentClass: react_bootstrap_1.ControlLabel }, " Name: "),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.ColumnCategoryId, type: "string", placeholder: "Enter name for Column Category", onChange: (e) => this.onColumnCategoryNameChange(e) }),
                                React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                React.createElement(react_bootstrap_1.HelpBlock, null, this.state.ErrorMessage)))),
                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                        ' ',
                        " "))));
    }
    onColumnCategoryNameChange(event) {
        let e = event.target;
        this.setState({
            ColumnCategoryId: e.value,
            ErrorMessage: ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.ColumnCategorys.map(s => s.ColumnCategoryId), e.value) ? "A Column Category already exists with that name" : null
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return StringExtensions_1.StringExtensions.IsNotEmpty(this.state.ColumnCategoryId) && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.ColumnCategoryId = this.state.ColumnCategoryId;
    }
    Back() {
        // todo
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.ColumnCategorySettingsWizard = ColumnCategorySettingsWizard;
