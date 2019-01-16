"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const ChartRedux = require("../../Redux/ActionsReducers/ChartRedux");
class ChartDisplayPopupComponent extends React.Component {
    render() {
        return "chart here";
    }
}
function mapStateToProps(state) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.CurrentChartDefinition,
        ChartData: state.System.ChartData,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateChartDefinition: (index, chartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onUpdateChartProperties: (chartTitle, chartProperties) => dispatch(ChartRedux.ChartPropertiesUpdate(chartTitle, chartProperties)),
        onSelectChartDefinition: (chartDefinition) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
    };
}
exports.ChartDisplayPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
