"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../../Core/Enums");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ExpressionHelper_1 = require("../../../Utilities/Helpers/ExpressionHelper");
class CellValidationSelectQueryWizard extends React.Component {
    constructor(props) {
        super(props);
        this.StepName = this.props.StepName;
        this.state = {
            HasExpression: ExpressionHelper_1.ExpressionHelper.IsNotEmptyExpression(this.props.Data.Expression),
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "-selectquery";
        return React.createElement("div", { className: cssClassName },
            React.createElement(react_bootstrap_1.Panel, { header: "Cell Validation Query", bsStyle: "primary" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { inline: true },
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.HelpBlock, null,
                            "A Query is used if the rule is dependent on other values in the row.",
                            React.createElement("br", null),
                            "The rule will only be activated and checked if the Query passes.")),
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.Checkbox, { inline: true, onChange: (e) => this.onOtherExpressionOptionChanged(e), checked: this.state.HasExpression }, "Use Validation Query"),
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Validation Rule: Query", bodyText: ["Create a query (in next step) which will stipulate other cell values required for the Rule."], MessageType: Enums_1.MessageType.Info })))));
    }
    onOtherExpressionOptionChanged(event) {
        let e = event.target;
        this.setState({ HasExpression: e.checked }, () => this.props.UpdateGoBackState());
    }
    canNext() {
        return true;
    }
    canBack() { return true; }
    Next() {
        // this.props.Data.HasExpression = this.state.HasExpression;
    }
    Back() { }
    GetIndexStepIncrement() {
        return this.state.HasExpression ? 1 : 2;
    }
    GetIndexStepDecrement() {
        return 1;
    }
}
exports.CellValidationSelectQueryWizard = CellValidationSelectQueryWizard;
