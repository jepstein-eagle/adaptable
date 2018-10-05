"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
class ApplicationToolbarControlComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__Application";
        let headerText = StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.ApplicationToolbarTitle) ?
            this.props.ApplicationToolbarTitle :
            StrategyIds.ApplicationStrategyName;
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: headerText, glyphicon: StrategyIds.ApplicationGlyph, onClose: () => this.props.onClose(StrategyIds.ApplicationStrategyId), onConfigure: () => this.props.onConfigure() },
            React.createElement("div", { className: "ApplicationToolBarContents", style: { minHeight: 30 } }));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ApplicationToolbarTitle: state.Dashboard.ApplicationToolbarTitle,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyIds.ApplicationStrategyId, ScreenPopups.ApplicationPopup))
    };
}
exports.ApplicationToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ApplicationToolbarControlComponent);
