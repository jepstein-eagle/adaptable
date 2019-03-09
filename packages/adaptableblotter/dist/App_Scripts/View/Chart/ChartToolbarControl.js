"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const PopupRedux = require("../../Redux/ActionsReducers/PopupRedux");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
const ChartRedux = require("../../Redux/ActionsReducers/ChartRedux");
const DashboardRedux = require("../../Redux/ActionsReducers/DashboardRedux");
const ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
const ButtonNew_1 = require("../Components/Buttons/ButtonNew");
const PanelDashboard_1 = require("../Components/Panels/PanelDashboard");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ScreenPopups = require("../../Utilities/Constants/ScreenPopups");
const Enums_1 = require("../../Utilities/Enums");
const react_bootstrap_1 = require("react-bootstrap");
const ButtonClear_1 = require("../Components/Buttons/ButtonClear");
const GeneralConstants = require("../../Utilities/Constants/GeneralConstants");
const ButtonShowChart_1 = require("../Components/Buttons/ButtonShowChart");
const ChartEnums_1 = require("../../Utilities/ChartEnums");
const ButtonDelete_1 = require("../Components/Buttons/ButtonDelete");
const ArrayExtensions_1 = require("../../Utilities/Extensions/ArrayExtensions");
class ChartToolbarControlComponent extends React.Component {
    render() {
        const selectChartString = "Select a Chart";
        let cssClassName = this.props.cssClassName + "__Chart";
        let currentChartDefinitionName = this.props.CurrentChartDefinition == null ?
            selectChartString : this.props.CurrentChartDefinition.Name;
        let sortedChartDefinitions = ArrayExtensions_1.ArrayExtensions.sortArrayWithProperty(Enums_1.SortOrder.Ascending, this.props.ChartDefinitions, "Title");
        let availablechartDefinitions = sortedChartDefinitions.filter(s => s.Name != currentChartDefinitionName).map((chartDefinition, index) => {
            return React.createElement(react_bootstrap_1.MenuItem, { key: index, eventKey: index, onClick: () => this.onSelectedChartDefinitionChanged(chartDefinition.Name) }, chartDefinition.Name);
        });
        let content = React.createElement("span", null,
            React.createElement(react_bootstrap_1.InputGroup, null,
                React.createElement(react_bootstrap_1.DropdownButton, { disabled: availablechartDefinitions.length == 0, style: { minWidth: "120px" }, className: cssClassName, bsSize: this.props.DashboardSize, bsStyle: "default", title: currentChartDefinitionName, id: "Chart", componentClass: react_bootstrap_1.InputGroup.Button }, availablechartDefinitions),
                currentChartDefinitionName != selectChartString &&
                    React.createElement(react_bootstrap_1.InputGroup.Button, null,
                        React.createElement(ButtonClear_1.ButtonClear, { bsStyle: "default", cssClassName: cssClassName, onClick: () => this.onSelectedChartDefinitionChanged(""), size: this.props.DashboardSize, overrideTooltip: "Clear Chart", overrideDisableButton: currentChartDefinitionName == selectChartString, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel }))),
            React.createElement("span", { className: this.props.AccessLevel == Enums_1.AccessLevel.ReadOnly ? GeneralConstants.READ_ONLY_STYLE : "" },
                React.createElement(ButtonShowChart_1.ButtonShowChart, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.onShowChart(), size: this.props.DashboardSize, overrideTooltip: "Show Chart", overrideDisableButton: currentChartDefinitionName == selectChartString, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel, showDefaultStyle: this.props.UseSingleColourForButtons }),
                React.createElement(ButtonNew_1.ButtonNew, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onNewChartDefinition(), size: this.props.DashboardSize, overrideTooltip: "Create New Chart Definition", DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel, showDefaultStyle: this.props.UseSingleColourForButtons }),
                React.createElement(ButtonEdit_1.ButtonEdit, { style: { marginLeft: "2px" }, cssClassName: cssClassName, onClick: () => this.props.onEditChartDefinition(), size: this.props.DashboardSize, overrideTooltip: "Edit Chart Definition", overrideDisableButton: currentChartDefinitionName == selectChartString, DisplayMode: "Glyph", AccessLevel: this.props.AccessLevel, showDefaultStyle: this.props.UseSingleColourForButtons }),
                React.createElement(ButtonDelete_1.ButtonDelete, { style: { marginLeft: "2px" }, cssClassName: cssClassName, size: this.props.DashboardSize, overrideTooltip: "Delete Chart", overrideDisableButton: currentChartDefinitionName == selectChartString, DisplayMode: "Glyph", ConfirmAction: ChartRedux.ChartDefinitionDelete(this.props.CurrentChartDefinition), ConfirmationMsg: "Are you sure you want to delete '" + currentChartDefinitionName + "'?", ConfirmationTitle: "Delete Chart", AccessLevel: this.props.AccessLevel, showDefaultStyle: this.props.UseSingleColourForButtons })));
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
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(c => c.Name == state.Chart.CurrentChartName),
        ChartDefinitions: state.Chart.ChartDefinitions,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onSelectChartDefinition: (chartDefinition) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
        onNewChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, "New")),
        onEditChartDefinition: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup, "Edit")),
        onShowChart: () => dispatch(SystemRedux.ChartSetChartVisibility(ChartEnums_1.ChartVisibility.Maximised)),
        onClose: (dashboardControl) => dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
        onConfigure: () => dispatch(PopupRedux.PopupShowScreen(StrategyConstants.ChartStrategyId, ScreenPopups.ChartPopup))
    };
}
exports.ChartToolbarControl = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartToolbarControlComponent);
