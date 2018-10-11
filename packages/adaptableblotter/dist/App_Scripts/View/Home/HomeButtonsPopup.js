"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const DualListBoxEditor_1 = require("../Components/ListBox/DualListBoxEditor");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
class HomeButtonsPopupComponent extends React.Component {
    render() {
        let cssClassName = this.props.cssClassName + "__home";
        let selectedValues = [];
        this.props.DashboardState.VisibleButtons.forEach(x => {
            let menuItem = this.props.MenuState.MenuItems.find(m => m.StrategyId == x);
            if (menuItem != null && menuItem.IsVisible) {
                selectedValues.push(StrategyConstantsgetNameForStrategyId(x));
            }
        });
        let availableValues = this.props.MenuState.MenuItems.filter(x => x.IsVisible && selectedValues.indexOf(x.Label) == -1).map(x => x.Label);
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithButton_1.PanelWithButton, { cssClassName: cssClassName, headerText: "Function Buttons Configuration", bsStyle: "primary", glyphicon: StrategyConstantsFunctionsGlyph, className: "ab_main_popup" },
                React.createElement(DualListBoxEditor_1.DualListBoxEditor, { AvailableValues: availableValues, cssClassName: cssClassName, SelectedValues: selectedValues, HeaderAvailable: "Hidden Function Buttons", HeaderSelected: "Visible Function Buttons", onChange: (SelectedValues) => this.ListChange(SelectedValues) })));
    }
    ListChange(selectedValues) {
        let buttonNames = selectedValues.map(sv => StrategyConstantsgetIdForStrategyName(sv));
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
        onDashboardSetFunctionButtons: (StrategyConstants) => dispatch(DashboardRedux.DashboardSetFunctionButtons(StrategyConstants))
    };
}
exports.HomeButtonsPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(HomeButtonsPopupComponent);
