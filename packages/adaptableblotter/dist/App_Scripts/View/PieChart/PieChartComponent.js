"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const igr_pie_chart_1 = require("igniteui-react-charts/ES2015/igr-pie-chart");
const igr_pie_chart_module_1 = require("igniteui-react-charts/ES2015/igr-pie-chart-module");
class PieChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        igr_pie_chart_module_1.IgrPieChartModule.register();
    }
    render() {
        let cssClassName = 'todo'; //this.props.cssClassName + PieChartConstants.PieChart_COMPONENT
        return React.createElement("div", { className: cssClassName },
            React.createElement(igr_pie_chart_1.IgrPieChart, { dataSource: this.props.PieData, labelMemberPath: this.props.LabelMember, valueMemberPath: this.props.ValueMember, width: this.props.Width + "px", height: this.props.Height + "px", legendLabelMemberPath: "Label" }));
    }
}
exports.PieChartComponent = PieChartComponent;
