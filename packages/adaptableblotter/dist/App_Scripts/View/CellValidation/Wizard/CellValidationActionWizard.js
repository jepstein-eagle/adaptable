"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
class CellValidationActionWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            ActionMode: this.props.Data.ActionMode,
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-action";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Action When Validation Fails", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.HelpBlock, null, "Choose what should happen to an edit when cell validation fails.")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.HelpBlock, null,
                            React.createElement("i", null, "Prevent cell edit"),
                            " ensures that no edits which fail validation will occur.")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.HelpBlock, null,
                            React.createElement("i", null, "Show a warning"),
                            " gives you the option to allow the edit after providing a reason (which will be audited).")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: Enums_1.ActionMode.StopEdit, checked: this.state.ActionMode == Enums_1.ActionMode.StopEdit, onChange: (e) => this.onActionModeChanged(e) }, "Prevent the cell edit"),
                        ' ',
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Cell Validation Action: Prevent", bodyText: ["Disallows all cell edits that break the validation rule with no override available."], MessageType: Enums_1.MessageType.Info })),
                    React.createElement(react_bootstrap_1.Col, { xs: 12, className: "ab_large_margin" },
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: Enums_1.ActionMode.WarnUser, checked: this.state.ActionMode == Enums_1.ActionMode.WarnUser, onChange: (e) => this.onActionModeChanged(e) }, "Show a warning"),
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Cell Validation Action: Warning", bodyText: ["Displays a warning that the validation rule has been broken.  If this is overriden, the edit will be allowed."], MessageType: Enums_1.MessageType.Info })))));
    }
    onActionModeChanged(event) {
        let e = event.target;
        this.setState({ ActionMode: e.value }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return true;
    }
    canBack() { return true; }
    Next() {
        this.props.Data.ActionMode = this.state.ActionMode;
    }
    Back() {
        //
    }
    GetIndexStepIncrement() {
        return 1;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.CellValidationActionWizard = CellValidationActionWizard;
