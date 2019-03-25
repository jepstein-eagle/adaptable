"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const igr_pie_chart_1 = require("igniteui-react-charts/ES2015/igr-pie-chart");
class PieChartComponent extends React.Component {
    constructor(props) {
        super(props);
        //  this.state = CategoryChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition as ICategoryChartDefinition, this.props.Columns);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        //  if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
        //      this.state = CategoryChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition as ICategoryChartDefinition, this.props.Columns);
        //  }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__CategoryCharts";
        let chartElement = React.createElement(igr_pie_chart_1.IgrPieChart
        // ref={this.onPieChartRef}
        , { 
            // ref={this.onPieChartRef}
            dataSource: this.props.ChartData, radiusFactor: 0.6, selectionMode: "single" });
        return React.createElement("span", { className: cssClassName },
            React.createElement("div", null,
                React.createElement("span", null,
                    "In pie chart component",
                    this.props.ChartData != null &&
                        chartElement)));
    }
    updateChartProperties(chartProperties) {
        //   this.setState({ ChartProperties: chartProperties, } as CategoryChartComponentState)
        //   this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Name, chartProperties)
    }
}
exports.PieChartComponent = PieChartComponent;
