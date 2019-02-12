"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const StyleComponent_1 = require("../../Components/StyleComponent");
const UIHelper_1 = require("../../UIHelper");
class FormatColumnStyleWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Style: this.props.Data.Style };
    }
    render() {
        let canUseClassName = true; // get from somewhere...
        let cssClassName = this.props.cssClassName + "-style";
        return React.createElement("div", { className: cssClassName },
            React.createElement(StyleComponent_1.StyleComponent, { cssClassName: cssClassName, ColorPalette: this.props.ColorPalette, StyleClassNames: this.props.StyleClassNames, Style: this.props.Data.Style, UpdateStyle: (style) => this.onUpdateStyle(style), CanUseClassName: canUseClassName }));
    }
    canNext() {
        return UIHelper_1.UIHelper.IsNotEmptyStyle(this.state.Style);
    }
    canBack() { return true; }
    Next() {
        this.props.Data.Style = this.state.Style;
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
    onUpdateStyle(style) {
        this.setState({ Style: style }, () => this.props.UpdateGoBackState());
    }
}
exports.FormatColumnStyleWizard = FormatColumnStyleWizard;
