"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const AdaptableViewFactory_1 = require("../AdaptableViewFactory");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const StrategyIds = require("../../Core/Constants/StrategyIds");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const Enums_1 = require("../../Core/Enums");
const StyleConstants = require("../../Core/Constants/StyleConstants");
const AdaptableBlotterLogger_1 = require("../../Core/Helpers/AdaptableBlotterLogger");
const ArrayExtensions_1 = require("../../Core/Extensions/ArrayExtensions");
class DashboardComponent extends React.Component {
    render() {
        let cssClassName = StyleConstants.AB_STYLE + StyleConstants.DASHBOARD;
        let cssBaseClassName = StyleConstants.AB_STYLE + StyleConstants.DASHBOARD_BASE;
        let optionsBlotterName = this.props.Blotter.BlotterOptions.blotterId;
        let blotterName = (optionsBlotterName == GeneralConstants.USER_NAME) ? "Blotter " : optionsBlotterName;
        let showBlotterName = "Show " + blotterName + " Dashboard";
        let hiddenEntitlements = this.props.EntitlementsState.FunctionEntitlements.filter(e => e.AccessLevel == "Hidden");
        let visibleDashboardControls = this.props.DashboardState.VisibleToolbars.filter(vt => ArrayExtensions_1.ArrayExtensions.NotContainsItem(hiddenEntitlements, vt)); //.filter(dc => dc.IsVisible);
        let visibleDashboardElements = visibleDashboardControls.map((control, idx) => {
            //here we use the strategy id but if we start to have multiple dashboard control per strategy (which I doubt)
            //we'll need to use the name or something else
            let dashboardControl = AdaptableViewFactory_1.AdaptableDashboardViewFactory.get(control);
            if (dashboardControl) {
                let isReadOnly = this.props.EntitlementsState.FunctionEntitlements.findIndex(x => x.FunctionName == control && x.AccessLevel == "ReadOnly") > -1;
                let dashboardElememt = React.createElement(dashboardControl, {
                    Blotter: this.props.Blotter,
                    IsReadOnly: isReadOnly,
                    Columns: this.props.Columns,
                    UserFilters: this.props.UserFilters,
                    SystemFilters: this.props.SystemFilters,
                    ColorPalette: this.props.ColorPalette,
                    GridSorts: this.props.GridSorts,
                    cssClassName: cssClassName
                });
                return React.createElement(react_bootstrap_1.Nav, { key: control, style: { marginRight: "5px", marginTop: "3px", marginBottom: "3px" } }, dashboardElememt);
            }
            else {
                AdaptableBlotterLogger_1.AdaptableBlotterLogger.LogError("Cannot find Dashboard Control for " + control);
            }
        });
        let homeToolbar = AdaptableViewFactory_1.AdaptableDashboardPermanentToolbarFactory.get(StrategyIds.HomeStrategyId);
        let homeToolbarElement = React.createElement(react_bootstrap_1.Nav, { key: "home", style: { marginRight: "5px", marginTop: "3px", marginBottom: "3px" } }, React.createElement(homeToolbar, { cssClassName: cssClassName, Blotter: this.props.Blotter }));
        return React.createElement("div", { className: cssBaseClassName }, this.props.DashboardState.DashboardVisibility != Enums_1.Visibility.Hidden &&
            React.createElement("div", { className: "ab_no_margin" }, this.props.DashboardState.DashboardVisibility == Enums_1.Visibility.Minimised ?
                React.createElement(react_bootstrap_1.ButtonToolbar, { bsSize: "small", bsStyle: "primary", className: "ab_no_padding_no_margin" },
                    React.createElement(react_bootstrap_1.OverlayTrigger, { overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipShowButton" },
                            showBlotterName,
                            " ") },
                        React.createElement(react_bootstrap_1.Button, { bsSize: "small", bsStyle: "primary", onClick: () => this.props.onSetDashboardVisibility(Enums_1.Visibility.Visible) },
                            blotterName,
                            " ",
                            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "chevron-down" }))))
                :
                    React.createElement(react_bootstrap_1.Navbar, { key: "mainnavbar", fluid: true, style: { zoom: this.props.DashboardState.Zoom } },
                        React.createElement("div", { className: "ab_no_margin" },
                            homeToolbarElement,
                            visibleDashboardElements))));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        DashboardState: state.Dashboard,
        EntitlementsState: state.Entitlements,
        // need to get these props so we can 'feed' the toolbars...
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters,
        ColorPalette: state.UserInterface.ColorPalette,
        GridSorts: state.Grid.GridSorts
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClick: (action) => dispatch(action),
        onSetDashboardVisibility: (visibility) => dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
    };
}
exports.Dashboard = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DashboardComponent);
