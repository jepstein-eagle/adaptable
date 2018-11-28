"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const DualListBoxEditor_1 = require("../Components/ListBox/DualListBoxEditor");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const react_bootstrap_1 = require("react-bootstrap");
class HomeButtonsPopupComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__home";
        let selectedValues = [];
        this.props.DashboardState.VisibleButtons.forEach(x => {
            let menuItem = this.props.MenuState.MenuItems.find(m => m.StrategyId == x);
            if (menuItem != null && menuItem.IsVisible) {
                selectedValues.push(StrategyConstants.getNameForStrategyId(x));
            }
        });
        let availableValues = this.props.MenuState.MenuItems.filter(x => x.IsVisible && selectedValues.indexOf(x.Label) == -1).map(x => x.Label);
        let individualHomeToolbarOptions = React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName" },
                React.createElement(react_bootstrap_1.Col, { xs: 4, className: "ab_medium_margin" },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowFunctionsDropdownChanged(e), checked: this.props.DashboardState.ShowFunctionsDropdown }, " Functions Dropdown ")),
                React.createElement(react_bootstrap_1.Col, { xs: 4, className: "ab_medium_margin" },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowColumnsDropdownChanged(e), checked: this.props.DashboardState.ShowColumnsDropdown }, " Columns Dropdown")),
                React.createElement(react_bootstrap_1.Col, { xs: 3, className: "ab_medium_margin" },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowToolbarsDropdownChanged(e), checked: this.props.DashboardState.ShowToolbarsDropdown }, " Toolbars Dropdown ")),
                React.createElement(react_bootstrap_1.Col, { xs: 4, className: "ab_medium_margin" },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowSystemStatusButtonChanged(e), checked: this.props.DashboardState.ShowSystemStatusButton }, " System Status Button ")),
                React.createElement(react_bootstrap_1.Col, { xs: 4, className: "ab_medium_margin" },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowAboutButtonChanged(e), checked: this.props.DashboardState.ShowAboutButton }, " About Button "))));
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "Home Toolbar Configuration", bsStyle: "primary", glyphicon: StrategyConstants.FunctionsGlyph, className: "ab_main_popup" },
                individualHomeToolbarOptions,
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableValues, cssClassName: cssClassName, SelectedValues: selectedValues, HeaderAvailable: "Hidden Function Buttons", HeaderSelected: "Visible Function Buttons", onChange: (SelectedValues) => this.ListChange(SelectedValues), ReducedDisplay: true })));
    }
    onShowFunctionsDropdownChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.props.onDashboardShowFunctionsDropdown();
        }
        else {
            this.props.onDashboardHideFunctionsDropdown();
        }
    }
    onShowColumnsDropdownChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.props.onDashboardShowColumnsDropdown();
        }
        else {
            this.props.onDashboardHideColumnsDropdown();
        }
    }
    onShowToolbarsDropdownChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.props.onDashboardShowToolbarsDropdown();
        }
        else {
            this.props.onDashboardHideToolbarsDropdown();
        }
    }
    onShowSystemStatusButtonChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.props.onDashboardShowSystemStatusButton();
        }
        else {
            this.props.onDashboardHideSystemStatusButton();
        }
    }
    onShowAboutButtonChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.props.onDashboardShowAboutButton();
        }
        else {
            this.props.onDashboardHideAboutButton();
        }
    }
    ListChange(selectedValues) {
        let buttonNames = selectedValues.map(sv => StrategyConstants.getIdForStrategyName(sv));
        this.props.onDashboardSetFunctionButtons(buttonNames);
    }
}
function mapStateToProps(state, ownProps) {
    return {
        DashboardState: state.Dashboard,
        MenuState: state.Menu,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onDashboardSetFunctionButtons: (StrategyConstants) => dispatch(DashboardRedux.DashboardSetFunctionButtons(StrategyConstants)),
        onDashboardShowFunctionsDropdown: () => dispatch(DashboardRedux.DashboardShowFunctionsDropdown()),
        onDashboardHideFunctionsDropdown: () => dispatch(DashboardRedux.DashboardHideFunctionsDropdown()),
        onDashboardShowColumnsDropdown: () => dispatch(DashboardRedux.DashboardShowColumnsDropdown()),
        onDashboardHideColumnsDropdown: () => dispatch(DashboardRedux.DashboardHideColumnsDropdown()),
        onDashboardShowToolbarsDropdown: () => dispatch(DashboardRedux.DashboardShowToolbarsDropdown()),
        onDashboardHideToolbarsDropdown: () => dispatch(DashboardRedux.DashboardHideToolbarsDropdown()),
        onDashboardShowSystemStatusButton: () => dispatch(DashboardRedux.DashboardShowSystemStatusButton()),
        onDashboardHideSystemStatusButton: () => dispatch(DashboardRedux.DashboardHideSystemStatusButton()),
        onDashboardShowAboutButton: () => dispatch(DashboardRedux.DashboardShowAboutButton()),
        onDashboardHideAboutButton: () => dispatch(DashboardRedux.DashboardHideAboutButton()),
    };
}
exports.HomeButtonsPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HomeButtonsPopupComponent);
