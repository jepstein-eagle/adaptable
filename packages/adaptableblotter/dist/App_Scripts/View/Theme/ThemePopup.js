"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const ThemeRedux = require("../../Redux/ActionsReducers/ThemeRedux");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
class ThemePopupComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__theme";
        let infoBody = ["Choose a theme to change the look & feel of the Adaptable Blotter screens.", React.createElement("br", null), React.createElement("br", null), "Select ", React.createElement("i", null, "None"), " if you prefer to upload your own custom theme or ", React.createElement("i", null, "Default"), " to use the standard Bootstrap theme."];
        let availableThemes = [];
        this.props.SystemThemes.forEach(st => {
            availableThemes.push(st);
        });
        this.props.UserThemes.forEach(ut => {
            availableThemes.push(ut.Name);
        });
        let optionThemes = availableThemes.map(x => {
            return React.createElement("option", { value: x, key: x }, x);
        });
        return (React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: StrategyConstants.ThemeStrategyName, bsStyle: "primary", glyphicon: StrategyConstants.ThemeGlyph, infoBody: infoBody },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "themepicker" },
                        React.createElement(react_bootstrap_1.Col, { xs: 2 },
                            React.createElement(react_bootstrap_1.ControlLabel, null, "Current")),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.props.CurrentTheme, onChange: (x) => this.onChangeTheme(x) }, optionThemes)))))));
    }
    onChangeTheme(event) {
        let e = event.target;
        this.props.SelectTheme(e.value);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        SystemThemes: state.Theme.SystemThemes,
        UserThemes: state.Theme.UserThemes,
        CurrentTheme: state.Theme.CurrentTheme
    };
}
function mapDispatchToProps(dispatch) {
    return {
        SelectTheme: (newTheme) => dispatch(ThemeRedux.ThemeSelect(newTheme))
    };
}
exports.ThemePopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ThemePopupComponent);
