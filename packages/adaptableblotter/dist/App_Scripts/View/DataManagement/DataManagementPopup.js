"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const UIHelper_1 = require("../UIHelper");
class DataManagementPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = UIHelper_1.UIHelper.EmptyConfigState();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__userDataManagement";
        let infoBody = ["Function that clears user config - for development use only."];
        let clearButton = React.createElement(ButtonClear_1.ButtonClear, { cssClassName: cssClassName, onClick: () => this.onClear(), bsStyle: "default", overrideText: "Clear User Data", overrideTooltip: "Clear User Data", DisplayMode: "Text", size: "large" });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { headerText: StrategyNames.DataManagementStrategyName, button: null, bsStyle: "primary", cssClassName: cssClassName, glyphicon: StrategyGlyphs.DataManagementGlyph, infoBody: infoBody },
                React.createElement(react_bootstrap_1.Well, { bsSize: "small" },
                    "Click below to clear all current state.",
                    React.createElement("br", null),
                    React.createElement("br", null),
                    "When you restart / refresh the Blotter any predefined config will be re-added."),
                clearButton));
    }
    onClear() {
        this.props.Blotter.api.configClear();
    }
}
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.DataManagementPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DataManagementPopupComponent);
