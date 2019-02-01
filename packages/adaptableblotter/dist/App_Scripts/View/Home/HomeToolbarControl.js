"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const ColumnChooserRedux = require("../../Redux/ActionsReducers/ColumnChooserRedux");
const react_bootstrap_1 = require("react-bootstrap");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const ButtonDashboard_1 = require("../Components/Buttons/ButtonDashboard");
const Enums_1 = require("../../Utilities/Enums");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
const ColumnHelper_1 = require("../../Utilities/Helpers/ColumnHelper");
const UIHelper_1 = require("../UIHelper");
class HomeToolbarControlComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = { configMenuItems: [] };
    }
    render() {
        let cssClassName = this.props.cssClassName + "__home";
        let cssDropdownClassName = this.props.cssClassName + "__home__dropdown";
        const functionsGlyph = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "functionsOverlay", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "functionsTooltipButton" },
                " ",
                "Functions") },
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "home" }));
        const colsGlyph = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "colsOverlay", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "colsTooltipButton" },
                " ",
                "Columns") },
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "list" }));
        const toolbarsGlyph = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "toolbarsOverlay", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "toolbarsTooltipButton" },
                " ",
                "Toolbars") },
            React.createElement(react_bootstrap_1.Glyphicon, { glyph: "align-justify" }));
        let visibleMenuItems = this.props.MenuState.MenuItems.filter(x => x.IsVisible);
        // function menu items
        let menuItems = visibleMenuItems.map((menuItem) => {
            return React.createElement(react_bootstrap_1.MenuItem, { disabled: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly, key: menuItem.Label, onClick: () => this.onClick(menuItem) },
                React.createElement(react_bootstrap_1.Glyphicon, { glyph: menuItem.GlyphIcon }),
                " ",
                menuItem.Label);
        });
        // column items
        let colItems = [];
        colItems.push(React.createElement("div", { key: "colTitle" },
            ' ',
            ' ',
            "\u00A0\u00A0",
            React.createElement("b", null, "Columns")));
        this.props.Columns.forEach((col, index) => {
            colItems.push(React.createElement("div", { className: "ab_home_toolbar_column_list", key: index },
                React.createElement(react_bootstrap_1.Checkbox, { value: col.ColumnId, key: col.ColumnId, checked: col.Visible, onChange: (e) => this.onSetColumnVisibility(e) },
                    " ",
                    col.FriendlyName)));
        });
        // toolbar items
        let toolbarItems = [];
        let visibleMenuNames = visibleMenuItems.map(vm => {
            return vm.StrategyId;
        });
        toolbarItems.push(React.createElement("div", { key: "toolbarTitle" },
            ' ',
            ' ',
            "\u00A0\u00A0",
            React.createElement("b", null, "Toolbars")));
        this.props.DashboardState.AvailableToolbars.forEach((toolbar, index) => {
            if (ArrayExtensions_1.ArrayExtensions.ContainsItem(visibleMenuNames, toolbar)) {
                let isVisible = ArrayExtensions_1.ArrayExtensions.ContainsItem(this.props.DashboardState.VisibleToolbars, toolbar);
                let functionName = StrategyConstants.getNameForStrategyId(toolbar);
                toolbarItems.push(React.createElement("div", { className: "ab_home_toolbar_column_list", key: index },
                    React.createElement(react_bootstrap_1.Checkbox, { value: toolbar, key: toolbar, checked: isVisible, onChange: (e) => this.onSetToolbarVisibility(e) },
                        " ",
                        functionName)));
            }
        });
        // status button
        let statusButton = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "systemstatus", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipButton" },
                " ",
                "System Status") },
            React.createElement(ButtonDashboard_1.ButtonDashboard, { glyph: UIHelper_1.UIHelper.getGlyphForSystemStatusButton(this.props.SystemStatus.StatusColour), cssClassName: cssClassName, bsStyle: UIHelper_1.UIHelper.getStyleForSystemStatusButton(this.props.SystemStatus.StatusColour), DisplayMode: "Glyph", bsSize: "small", ToolTipAndText: "Status: " + this.props.SystemStatus.StatusColour, overrideDisableButton: false, onClick: () => this.onClickStatus(), AccessLevel: Enums_1.AccessLevel.Full }));
        // about button
        let aboutButton = React.createElement(react_bootstrap_1.OverlayTrigger, { key: "about", overlay: React.createElement(react_bootstrap_1.Tooltip, { id: "tooltipButton" },
                " ",
                "About") },
            React.createElement(ButtonDashboard_1.ButtonDashboard, { glyph: "info-sign", cssClassName: cssClassName, bsStyle: "default", DisplayMode: "Glyph", bsSize: "small", ToolTipAndText: "About", overrideDisableButton: false, onClick: () => this.onClickAbout(), AccessLevel: Enums_1.AccessLevel.Full }));
        // functions dropdown
        let functionsDropdown = React.createElement(react_bootstrap_1.DropdownButton, { bsStyle: "default", className: cssDropdownClassName, bsSize: "small", title: functionsGlyph, key: "dropdown-functions", id: "dropdown-functions" }, menuItems);
        // columns dropdown
        let columnsDropDown = React.createElement(react_bootstrap_1.DropdownButton, { bsStyle: "default", className: cssDropdownClassName, bsSize: "small", title: colsGlyph, key: "dropdown-cols", id: "dropdown-cols" }, colItems);
        // toolbars dropdown
        let toolbarsDropDown = React.createElement(react_bootstrap_1.DropdownButton, { bsStyle: "default", className: cssDropdownClassName, bsSize: "small", title: toolbarsGlyph, key: "dropdown-toolbars", id: "dropdown-toolbars" }, toolbarItems);
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
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, showCloseButton: false, showMinimiseButton: true, onMinimise: () => this.props.onSetDashboardVisibility(Enums_1.Visibility.Minimised), headerText: toolbarTitle, glyphicon: "home", showGlyphIcon: false, onClose: () => this.props.onClose(StrategyConstants.HomeStrategyId), onConfigure: () => this.props.onConfigure() },
            this.props.DashboardState.ShowFunctionsDropdown &&
                functionsDropdown,
            this.props.DashboardState.ShowSystemStatusButton &&
                statusButton,
            this.props.DashboardState.ShowAboutButton &&
                aboutButton,
            shortcuts,
            this.props.DashboardState.ShowColumnsDropdown &&
                columnsDropDown,
            this.props.DashboardState.ShowToolbarsDropdown &&
                toolbarsDropDown);
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
    onClickAbout() {
        this.props.onShowAbout();
    }
    onSetColumnVisibility(event) {
        let e = event.target;
        let changedColumnn = ColumnHelper_1.ColumnHelper.getColumnFromId(e.value, this.props.Columns);
        let columns = [].concat(this.props.Columns);
        changedColumnn = Object.assign({}, changedColumnn, {
            Visible: !changedColumnn.Visible
        });
        let index = columns.findIndex(x => x.ColumnId == e.value);
        columns[index] = changedColumnn;
        this.props.onNewColumnListOrder(columns.filter(c => c.Visible));
    }
    onSetToolbarVisibility(event) {
        let e = event.target;
        let strategy = this.props.DashboardState.AvailableToolbars.find(at => at == e.value);
        let visibleToolbars = [].concat(this.props.DashboardState.VisibleToolbars);
        if (e.checked) {
            visibleToolbars.push(strategy);
        }
        else {
            let index = visibleToolbars.findIndex(vt => vt == strategy);
            visibleToolbars.splice(index, 1);
        }
        this.props.onSetToolbarVisibility(visibleToolbars);
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
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.HomeStrategyId, ScreenPopups.HomeButtonsPopup)),
        onNewColumnListOrder: (VisibleColumnList) => dispatch(ColumnChooserRedux.SetNewColumnListOrder(VisibleColumnList)),
        onSetDashboardVisibility: (visibility) => dispatch(DashboardRedux.DashboardSetVisibility(visibility)),
        onSetToolbarVisibility: (strategyIds) => dispatch(DashboardRedux.DashboardSetToolbars(strategyIds)),
        onShowStatusMessage: (alert) => dispatch(PopupRedux.PopupShowAlert(alert)),
        onShowAbout: () => dispatch(PopupRedux.PopupShowAbout()),
    };
}
exports.HomeToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HomeToolbarControlComponent);
