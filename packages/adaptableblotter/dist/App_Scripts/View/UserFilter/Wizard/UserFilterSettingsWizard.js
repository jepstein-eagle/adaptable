"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const StringExtensions_1 = require("../../../Core/Extensions/StringExtensions");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ColumnHelper_1 = require("../../../Core/Helpers/ColumnHelper");
class UserFilterSettingsWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            FilterName: this.props.Data.Name, ErrorMessage: null
        };
    }
    render() {
        let validationState = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage) ? null : "error";
        let cssClassName = this.props.cssClassName + "-settings";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Filter Settings", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "filterName" },
                        React.createElement(react_bootstrap_1.Col, { xs: 12 },
                            React.createElement(react_bootstrap_1.HelpBlock, null, "Select a name for the User Filter - this is the name that will appear in Query Builder and Column Filter dropdowns.")),
                        React.createElement(react_bootstrap_1.Col, { xs: 2, componentClass: react_bootstrap_1.ControlLabel }, "Filter Name: "),
                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName", validationState: validationState },
                                React.createElement(react_bootstrap_1.FormControl, { value: this.state.FilterName, type: "string", placeholder: "Enter filter name", onChange: (e) => this.onFilterNameChange(e) }),
                                React.createElement(react_bootstrap_1.FormControl.Feedback, null),
                                React.createElement(react_bootstrap_1.HelpBlock, null, this.state.ErrorMessage)))),
                    React.createElement(react_bootstrap_1.Col, { xs: 2 },
                        ' ',
                        " "))));
    }
    onFilterNameChange(event) {
        let e = event.target;
        this.setState({
            FilterName: e.value,
            ErrorMessage: this.props.UserFilters.findIndex(x => x.Name == e.value && x.ColumnId == this.props.Data.ColumnId) > -1 ?
                "A User Filter already exists with that name for column: " + ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns)
                :
                    null
        }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return StringExtensions_1.StringExtensions.IsNotEmpty(this.state.FilterName) && StringExtensions_1.StringExtensions.IsNullOrEmpty(this.state.ErrorMessage);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.Name = this.state.FilterName;
    }
    Back() { }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.UserFilterSettingsWizard = UserFilterSettingsWizard;
