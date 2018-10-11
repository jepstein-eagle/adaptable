"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const StrategyConstants = require("../../Core/Constants/StrategyConstants");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const igr_category_chart_1 = require("igniteui-react-charts/ES2015/igr-category-chart");
const igr_category_chart_module_1 = require("igniteui-react-charts/ES2015/igr-category-chart-module");
class ChartDisplayPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        // this line is commented out as we cannot run it otherwise...
        igr_category_chart_module_1.IgrCategoryChartModule.register();
        let currentChartDefinition = this.props.ChartDefinitions.find(cd => cd.Name == this.props.CurrentChartName);
        this.state = {
            chartData: this.props.ChartService.BuildChartData(currentChartDefinition, this.props.Columns)
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Charts";
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstants.ChartStrategyName, bsStyle: "primary", glyphicon: StrategyConstants.ChartGlyph }, this.state.chartData != null &&
                React.createElement(igr_category_chart_1.IgrCategoryChart, { yAxisMinimumValue: 0, chartTitle: this.props.CurrentChartName, yAxisTitle: "Notional", xAxisTitle: "Counterparty", width: "700px", height: "500px", dataSource: this.state.chartData })));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartName: state.Chart.CurrentChartName,
        ChartService: ownProps.ChartService
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.ChartDisplayPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
/*
 
*/ 
