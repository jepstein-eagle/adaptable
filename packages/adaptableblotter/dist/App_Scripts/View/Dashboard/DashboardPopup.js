"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const DualListBoxEditor_1 = require("../Components/ListBox/DualListBoxEditor");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const react_bootstrap_1 = require("react-bootstrap");
var DashboardConfigView;
(function (DashboardConfigView) {
    DashboardConfigView["General"] = "General";
    DashboardConfigView["Buttons"] = "Buttons";
    DashboardConfigView["Toolbars"] = "Toolbars";
})(DashboardConfigView = exports.DashboardConfigView || (exports.DashboardConfigView = {}));
class DashboardPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DashboardConfigView: DashboardConfigView.General, EditedZoomFactor: props.DashboardState.Zoom
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "__home";
        let selectedValues = [];
        this.props.DashboardState.VisibleButtons.forEach(x => {
            let menuItem = this.props.MenuState.MenuItems.find(m => m.StrategyId == x);
            if (menuItem != null && menuItem.IsVisible) {
                selectedValues.push(StrategyConstants.getNameForStrategyId(x));
            }
        });
        let availableToolbarNames = this.props.DashboardState.AvailableToolbars.filter(at => this.isVisibleStrategy(at)).map(at => {
            return StrategyConstants.getNameForStrategyId(at);
        });
        let visibleToolbarNames = this.props.DashboardState.VisibleToolbars.filter(at => this.isVisibleStrategy(at)).map(vt => {
            return StrategyConstants.getNameForStrategyId(vt);
        });
        let availableValues = this.props.MenuState.MenuItems.filter(x => x.IsVisible && selectedValues.indexOf(x.Label) == -1).map(x => x.Label);
        let individualHomeToolbarOptions = React.createElement("div", null,
            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formInlineName" },
                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowFunctionsDropdownChanged(e), checked: this.props.DashboardState.ShowFunctionsDropdown }, " Show Functions Dropdown ")),
                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowColumnsDropdownChanged(e), checked: this.props.DashboardState.ShowColumnsDropdown }, " Show Columns Dropdown")),
                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowToolbarsDropdownChanged(e), checked: this.props.DashboardState.ShowToolbarsDropdown }, " Show Toolbars Dropdown ")),
                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowSystemStatusButtonChanged(e), checked: this.props.DashboardState.ShowSystemStatusButton }, " Show System Status Button ")),
                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowAboutButtonChanged(e), checked: this.props.DashboardState.ShowAboutButton }, " Show About Button ")),
                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onUseSingleColourForButtonsChanged(e), checked: this.props.DashboardState.UseSingleColourForButtons }, " Use Single Colour for All Dashboard Buttons ")),
                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onUseExtraSmallButtonsChanged(e), checked: this.props.DashboardState.UseExtraSmallButtons }, " Use Small Size Buttons ")),
                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                    React.createElement(react_bootstrap_1.Form, { inline: true },
                        "Dashboard Zoom Factor:",
                        ' ',
                        React.createElement(react_bootstrap_1.FormControl, { value: this.state.EditedZoomFactor.toString(), bsSize: 'small', type: "number", min: "0.5", step: "0.05", max: "1", placeholder: "Enter a Number", onChange: (e) => this.onSetFactorChange(e) })))));
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "Dashboard Configuration", bsStyle: "primary", glyphicon: StrategyConstants.DashboardGlyph, className: "ab_main_popup" },
                React.createElement(react_bootstrap_1.Row, { style: { marginBottom: '10px' } },
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: DashboardConfigView.General, checked: this.state.DashboardConfigView == DashboardConfigView.General, onChange: (e) => this.onShowGridPropertiesChanged(e) }, "General Options"),
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: DashboardConfigView.Buttons, checked: this.state.DashboardConfigView == DashboardConfigView.Buttons, onChange: (e) => this.onShowGridPropertiesChanged(e) }, "Function Buttons"),
                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: DashboardConfigView.Toolbars, checked: this.state.DashboardConfigView == DashboardConfigView.Toolbars, onChange: (e) => this.onShowGridPropertiesChanged(e) }, "Function Toolbars"))),
                this.state.DashboardConfigView == DashboardConfigView.General &&
                    React.createElement("div", null, individualHomeToolbarOptions),
                this.state.DashboardConfigView == DashboardConfigView.Buttons &&
                    React.createElement("div", null,
                        React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableValues, cssClassName: cssClassName, SelectedValues: selectedValues, HeaderAvailable: "Hidden Function Buttons", HeaderSelected: "Visible Function Buttons", onChange: (SelectedValues) => this.onDashboardButtonsChanged(SelectedValues), DisplaySize: DualListBoxEditor_1.DisplaySize.Large })),
                this.state.DashboardConfigView == DashboardConfigView.Toolbars &&
                    React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableToolbarNames, cssClassName: cssClassName, SelectedValues: visibleToolbarNames, HeaderAvailable: "Available Toolbars", HeaderSelected: "Visible Toolbars", onChange: (SelectedValues) => this.onDashboardToolbarsChanged(SelectedValues), DisplaySize: DualListBoxEditor_1.DisplaySize.Small })));
    }
    onShowGridPropertiesChanged(event) {
        let e = event.target;
        let dashboardConfigView = e.value;
        this.setState({ DashboardConfigView: dashboardConfigView, });
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
    onUseSingleColourForButtonsChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.props.onDashboardUseSingleColourForButtons();
        }
        else {
            this.props.onDashboardUseMultipleColourForButtons();
        }
    }
    onUseExtraSmallButtonsChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.props.onDashboardUseExtraSmallSizeButtons();
        }
        else {
            this.props.onDashboardUseDefaultSizeButtons();
        }
    }
    onDashboardButtonsChanged(selectedValues) {
        let selectedFunctions = selectedValues.map(sv => StrategyConstants.getIdForStrategyName(sv));
        this.props.onDashboardSetFunctionButtons(selectedFunctions);
    }
    onDashboardToolbarsChanged(selectedValues) {
        let selectedToolbars = selectedValues.map(sv => {
            return StrategyConstants.getIdForStrategyName(sv);
        });
        this.props.onDashboardSetToolbars(selectedToolbars);
    }
    onSetFactorChange(event) {
        const e = event.target;
        let factor = Number(e.value);
        if (factor > 1) {
            factor = 1;
        }
        if (factor < 0.5 && factor != 0) {
            factor = 0.5;
        }
        this.setState({ EditedZoomFactor: factor });
        if (factor != 0) {
            this.props.onSetDashboardZoom(factor);
        }
    }
    isVisibleStrategy(strategyId) {
        let entitlement = this.props.Entitlements.find(x => x.FunctionName == strategyId);
        if (entitlement) {
            return entitlement.AccessLevel != "Hidden";
        }
        return true;
    }
}
function mapStateToProps(state, ownProps) {
    return {
        DashboardState: state.Dashboard,
        MenuState: state.Menu,
        Entitlements: state.Entitlements.FunctionEntitlements,
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
        onDashboardUseSingleColourForButtons: () => dispatch(DashboardRedux.DashboardUseSingleColourForButtons()),
        onDashboardUseMultipleColourForButtons: () => dispatch(DashboardRedux.DashboardUseMultipleColourForButtons()),
        onDashboardUseExtraSmallSizeButtons: () => dispatch(DashboardRedux.DashboardUseExtraSmallButtons()),
        onDashboardUseDefaultSizeButtons: () => dispatch(DashboardRedux.DashboardUseDefaultSizeButtons()),
        onDashboardSetToolbars: (StrategyConstants) => dispatch(DashboardRedux.DashboardSetToolbars(StrategyConstants)),
        onSetDashboardZoom: (zoom) => dispatch(DashboardRedux.DashboardSetZoom(zoom)),
    };
}
exports.DashboardPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(DashboardPopupComponent);
