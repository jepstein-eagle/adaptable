"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const ColumnChooserRedux = require("../../Redux/ActionsReducers/ColumnChooserRedux");
const react_bootstrap_1 = require("react-bootstrap");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const ButtonDashboard_1 = require("../Components/Buttons/ButtonDashboard");
const Enums_1 = require("../../Core/Enums");
const StringExtensions_1 = require("../../Core/Extensions/StringExtensions");
class HomeToolbarControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { configMenuItems: [] };
    }
    render() {
        let cssClassName = this.props.cssClassName + "__home";
        let cssDropdownClassName = this.props.cssClassName + "__home__dropdown";
        // dropdown menu items
        let menuItems = this.props.MenuState.MenuItems.filter(x => x.IsVisible && x.StrategyId != StrategyConstantsAboutStrategyId).map((menuItem) => {
            return React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, key: menuItem.Label, onClick: () => this.onClick(menuItem) },
                React.createElement(react_bootstrap_1.Glyphicon, { glyph: menuItem.GlyphIcon }),
                " ",
                menuItem.Label);
        });
        // columns
        let colItems = this.props.Columns.map((col, index) => {
            return React.createElement("div", { className: "ab_home_toolbar_column_list", key: index },
                React.createElement(react_bootstrap_1.Checkbox, { value: col.ColumnId, key: col.ColumnId, checked: col.Visible, onChange: (e) => this.onSetColumnVisibility(e) },
                    " ",
                    col.FriendlyName));
        });
        // status button
        let statusButton = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "systemstatus", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipButton" },
                " ",
                "System Status") },
            React.createElement(ButtonDashboard_1.ButtonDashboard, { glyph: this.getGlyphForSystemStatusButton(), cssClassName: cssClassName, bsStyle: this.getStyleForSystemStatusButton(), DisplayMode: "Glyph", bsSize: "small", ToolTipAndText: "Status: " + this.props.SystemStatus.StatusColour, overrideDisableButton: false, onClick: () => this.onClickStatus(), AccessLevel: Enums_1.AccessLevel.Full }));
        // shortcuts
        let shortcutsArray = this.props.DashboardState.VisibleButtons;
        let shortcuts;
        if (shortcutsArray) {
            shortcuts = shortcutsArray.map(x => {
                let menuItem = this.props.MenuState.MenuItems.find(y => y.IsVisible && y.StrategyId == x);
                if (menuItem) {
                    return React.createElement(react_bootstrap_1.OverlayTrigger, { key: x, overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipButton" },
                            " ",
                            menuItem.Label) },
                        React.createElement(ButtonDashboard_1.ButtonDashboard, { glyph: menuItem.GlyphIcon, cssClassName: cssClassName, bsStyle: "default", DisplayMode: "Glyph", bsSize: "small", ToolTipAndText: menuItem.Label, overrideDisableButton: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, onClick: () => this.onClick(menuItem), AccessLevel: Enums_1.AccessLevel.Full }));
                }
            });
        }
        let toolbarTitle = this.props.DashboardState.HomeToolbarTitle;
        if (StringExtensions_1.StringExtensions.IsNullOrEmpty(toolbarTitle)) {
            toolbarTitle = this.props.Blotter.BlotterOptions.blotterId;
            if (toolbarTitle == GeneralConstants.USER_NAME) {
                toolbarTitle = "Blotter ";
            }
        }
        const functionsGlyph = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "functionsOverlay", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "functionsTooltipButton" },
                " ",
                "Functions") },
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "home" }));
        const colsGlyph = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "colsOverlay", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "colsTooltipButton" },
                " ",
                "Columns") },
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "list" }));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, showCloseButton: false, showMinimiseButton: true, onMinimise: () => this.props.onSetDashboardVisibility(Enums_1.Visibility.Minimised), headerText: toolbarTitle, glyphicon: "home", showGlyphIcon: false, onClose: () => this.props.onClose(StrategyConstantsHomeStrategyId), onConfigure: () => this.props.onConfigure() },
            this.props.DashboardState.ShowFunctionsDropdown &&
                React.createElement(react_bootstrap_1.DropdownButton, { bsStyle: "default", className: cssDropdownClassName, bsSize: "small", title: functionsGlyph, key: "dropdown-functions", id: "dropdown-functions" }, menuItems),
            this.props.DashboardState.ShowSystemStatusButton &&
                statusButton,
            shortcuts,
            this.props.DashboardState.ShowColumnsDropdown &&
                React.createElement(react_bootstrap_1.DropdownButton, { bsStyle: "default", className: cssDropdownClassName, bsSize: "small", title: colsGlyph, key: "dropdown-cols", id: "dropdown-cols" }, colItems));
    }
    onClick(menuItem) {
        this.props.onClick(menuItem.Action);
    }
    onClickStatus() {
        let statusColor = this.props.SystemStatus.StatusColour;
        switch (statusColor) {
            case Enums_1.StatusColour.Green:
                let info = {
                    Header: "System Status",
                    Msg: StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.SystemStatus.StatusMessage) ?
                        this.props.SystemStatus.StatusMessage :
                        "No issues",
                    MessageType: Enums_1.MessageType.Info
                };
                this.props.onShowStatusMessage(info);
                return;
            case Enums_1.StatusColour.Amber:
                let warning = {
                    Header: "System Status",
                    Msg: this.props.SystemStatus.StatusMessage,
                    MessageType: Enums_1.MessageType.Warning
                };
                this.props.onShowStatusMessage(warning);
                return;
            case Enums_1.StatusColour.Red:
                let error = {
                    Header: "System Status",
                    Msg: this.props.SystemStatus.StatusMessage,
                    MessageType: Enums_1.MessageType.Error
                };
                this.props.onShowStatusMessage(error);
                return;
        }
    }
    onSetColumnVisibility(event) {
        let e = event.target;
        let changedColumnn = this.props.Columns.find(c => c.ColumnId == e.value);
        let columns = [].concat(this.props.Columns);
        changedColumnn = Object.assign({}, changedColumnn, {
            Visible: !changedColumnn.Visible
        });
        let index = columns.findIndex(x => x.ColumnId == e.value);
        columns[index] = changedColumnn;
        this.props.onNewColumnListOrder(columns.filter(c => c.Visible));
    }
    getStyleForSystemStatusButton() {
        let statusColor = this.props.SystemStatus.StatusColour;
        switch (statusColor) {
            case Enums_1.StatusColour.Green:
                return "success";
            case Enums_1.StatusColour.Amber:
                return "warning";
            case Enums_1.StatusColour.Red:
                return "danger";
        }
    }
    getGlyphForSystemStatusButton() {
        let statusColor = this.props.SystemStatus.StatusColour;
        switch (statusColor) {
            case Enums_1.StatusColour.Green:
                return "ok-circle";
            case Enums_1.StatusColour.Amber:
                return "ban-circle";
            case Enums_1.StatusColour.Red:
                return "remove-circle";
        }
    }
}
function mapStateToProps(state, ownProps) {
    return {
        MenuState: state.Menu,
        DashboardState: state.Dashboard,
        Columns: state.Grid.Columns,
        SystemStatus: state.System.SystemStatus,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onClick: (action) => dispatch(action),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstantsHomeStrategyId, ScreenPopups.HomeButtonsPopup)),
        onNewColumnListOrder: (VisibleColumnList) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList)),
        onSetDashboardVisibility: (visibility) => dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
        onShowStatusMessage: (alert) => dispatch(PopupRedux.PopupShowAlert(alert)),
    };
}
exports.HomeToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HomeToolbarControlComponent);
