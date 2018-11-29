"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ChartRedux = require("../../Redux/ActionsReducers/ChartRedux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const ScreenPopups = require("../../Core/Constants/ScreenPopups");
const Enums_1 = require("../../Utilities/Enums");
const react_bootstrap_1 = require("react-bootstrap");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const GeneralConstants = require("../../Core/Constants/GeneralConstants");
const ButtonShowChart_1 = require("../Components/Buttons/ButtonShowChart");
class ChartToolbarControlComponent extends React.Component {
    render() {
        const selectSearchString = "Select a Chart";
        let cssClassName = this.props.cssClassName + "__Chart";
        let savedSearch = this.props.ChartDefinitions.find(s => s.Name == this.props.CurrentChartName);
        let currentSearchName = StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentChartName) ?
            selectSearchString : this.props.CurrentChartName;
        let sortedChartes = Helper_1.Helper.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.ChartDefinitions, "Name");
        let availablechartDefinitions = sortedChartes.filter(s => s.Name != this.props.CurrentChartName).map((chartDefinition, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onSelectedChartDefinitionChanged(chartDefinition.Name) }, chartDefinition.Name);
        });
        let content = React.createElement("span", null,
            React.createElement(react_bootstrap_1.InputGroup, null,
                React.createElement(react_bootstrap_1.DropdownButton, { disabled: availablechartDefinitions.length == 0, style: { minWidth: "120px" }, className: cssClassName, bsSize: "small", bsStyle: "default", title: currentSearchName, id: "Chart", componentClass: react_bootstrap_1.InputGroup.Button }, availablechartDefinitions),
                currentSearchName != selectSearchString &&
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(ButtonClear_1.ButtonClear, { bsStyle: "default", cssClassName: cssClassName, onClick: () => this.onSelectedChartDefinitionChanged(""), size: "small", overrideTooltip: "Clear Chart", overrideDisableButton: currentSearchName == selectSearchString, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }))),
            React.createElement("span", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(ButtonShowChart_1.ButtonShowChart, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.onShowChart(), size: "small", overrideTooltip: "Show Chart", overrideDisableButton: currentSearchName == selectSearchString, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonNew_1.ButtonNew, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onNewChartDefinition(), size: "small", overrideTooltip: "Create New Chart Definition", DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }),
                React.createElement(ButtonEdit_1.ButtonEdit, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onEditChartDefinition(), size: "small", overrideTooltip: "Edit Chart Definition", overrideDisableButton: currentSearchName == selectSearchString, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel })));
        return React.createElement(PanelDashboard_1.PanelDashboard, { cssClassName: cssClassName, headerText: StrategyConstants.ChartStrategyName, glyphicon: StrategyConstants.ChartGlyph, onClose: () => this.props.onClose(StrategyConstants.ChartStrategyId), onConfigure: () => this.props.onConfigure() }, content);
    }
    onSelectedChartDefinitionChanged(chartDefinitionName) {
        this.props.onSelectChartDefinition(chartDefinitionName);
    }
    onShowChart() {
        this.props.onShowChart();
    }
}
function mapStateToProps(state, ownProps) {
    return {
        CurrentChartName: state.Chart.CurrentChartName,
        ChartDefinitions: state.Chart.ChartDefinitions,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectChartDefinition: (ChartName) => dispatch(ChartRedux.ChartDefinitionSelect(ChartName)),
        onNewChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, "New")),
        onEditChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, "Edit")),
        onShowChart: () => dispatch(PopupRedux.PopupShowChart()),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup))
    };
}
exports.ChartToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartToolbarControlComponent);
