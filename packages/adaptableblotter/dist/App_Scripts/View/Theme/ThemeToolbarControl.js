"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const ThemeRedux = require("../../Redux/ActionsReducers/ThemeRedux");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const Enums_1 = require("../../Utilities/Enums");
const react_bootstrap_1 = require("react-bootstrap");
class ThemeToolbarControlComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__Theme";
        let allThemes = [].concat(this.props.SystemThemes).concat(this.props.UserThemes.map(x => { return x.Name; }));
        let themes = allThemes.filter(s => s != this.props.CurrentTheme).map((search, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onSelectTheme(search) }, search);
        });
        let content = React.createElement("div", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
            React.createElement(react_bootstrap_1.DropdownButton, { style: { minWidth: "100px" }, className: cssClassName, bsSize: this.props.DashboardSize, bsStyle: "default", title: this.props.CurrentTheme, id: "themeDropDown" }, themes));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, useDefaultPanelStyle: this.props.UseSingleColourForButtons, headerText: StrategyConstants.ThemeStrategyName, glyphicon: StrategyConstants.ThemeGlyph, onClose: () => this.props.onClose(StrategyConstants.ThemeStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onSelectTheme(theme) {
        this.props.onSelectTheme(theme);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        SystemThemes: state.Theme.SystemThemes,
        CurrentTheme: state.Theme.CurrentTheme,
        UserThemes: state.Theme.UserThemes,
        Entitlements: state.Entitlements.FunctionEntitlements,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectTheme: (theme) => dispatch(ThemeRedux.ThemeSelect(theme)),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ThemeStrategyId, ScreenPopups.ThemePopup))
    };
}
exports.ThemeToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ThemeToolbarControlComponent);
