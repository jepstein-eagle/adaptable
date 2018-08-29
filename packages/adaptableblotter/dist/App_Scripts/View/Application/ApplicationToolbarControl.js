"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
class ApplicationToolbarControlComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__Application";
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyNames.ApplicationStrategyName, glyphicon: StrategyGlyphs.ApplicationGlyph, onClose: () => this.props.onClose(StrategyIds.ApplicationStrategyId), onConfigure: () => this.props.onConfigure(this.props.IsReadOnly) },
            React.createElement("div", { className: "ApplicationToolBarContents", style: { minHeight: 30 } }));
    }
}
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps(dispatch) {
    return {
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: (isReadOnly) => dispatch(PopupRedux.PopupShowScreen(ScreenPopups.ApplicationPopup, isReadOnly))
    };
}
exports.ApplicationToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ApplicationToolbarControlComponent);
