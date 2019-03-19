"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const igr_pie_chart_1 = require("igniteui-react-charts/ES2015/igr-pie-chart");
const igr_pie_chart_module_1 = require("igniteui-react-charts/ES2015/igr-pie-chart-module");
const Enums_1 = require("../../Utilities/Enums");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
class PieChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onOthersCategoryThresholdChanged = (e) => {
            this.setState({ OthersCategoryThreshold: e.target.value });
        };
        this.state = {
            ShowVisibleRowsOnly: this.props.ShowVisibleRows,
            PieChartOthersCategoryType: Enums_1.PieChartOthersCategoryType.Number,
            OthersCategoryThreshold: 0,
            CurrentColumnCount: 0,
            CurrentColumnValue: ""
        };
        igr_pie_chart_module_1.IgrPieChartModule.register();
    }
    render() {
        let cssClassName = 'todo'; //this.props.cssClassName + PieChartConstants.PieChart_COMPONENT
        return React.createElement("div", { className: cssClassName, style: { marginBottom: '0px', marginLeft: '5px' } },
            React.createElement(react_bootstrap_1.Row, null,
                React.createElement(react_bootstrap_1.Col, { xs: 8 },
                    React.createElement(igr_pie_chart_1.IgrPieChart, { dataSource: this.props.PieData, labelMemberPath: this.props.LabelMember, valueMemberPath: this.props.ValueMember, width: this.props.Width + "px", height: this.props.Height + "px", legendLabelMemberPath: "Label", othersCategoryThreshold: this.state.OthersCategoryThreshold, othersCategoryType: this.state.PieChartOthersCategoryType, othersCategoryText: "Others", 
                        //  ref={this.onPieRef}
                        selectionMode: "single", sliceClick: (s, e) => this.onSliceClick(s, e) })),
                React.createElement(react_bootstrap_1.Col, { xs: 4 },
                    React.createElement(react_bootstrap_1.Panel, { style: { marginRight: '35px', marginTop: '40px' }, header: "Pie Chart Settings" },
                        React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '0px', marginRight: '10px' } },
                            React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onRowVisibilityChanged(e), checked: this.state.ShowVisibleRowsOnly }, "Visible Rows Only"))),
                        React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '10px', marginRight: '10px' } },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formOthersThreshold" },
                                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } }, "'Others' Threshold"),
                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", type: "number", placeholder: "Input", onChange: this.onOthersCategoryThresholdChanged, value: this.state.OthersCategoryThreshold }))),
                        React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '10px', marginRight: '10px' } },
                            React.createElement(react_bootstrap_1.FormGroup, { controlId: "formOthersType" },
                                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } }, "'Others' Type"),
                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.PieChartOthersCategoryType, onChange: (x) => this.onOthersCategoryTypeChanged(x) }, this.getPieChartOthersCategoryTypeOptions()))),
                        StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.CurrentColumnValue) &&
                            React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '10px', marginRight: '10px' } },
                                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formSelectedColumnValue" },
                                    React.createElement(react_bootstrap_1.ControlLabel, { style: { fontSize: 'small' } },
                                        this.state.CurrentColumnValue,
                                        " (",
                                        this.state.CurrentColumnCount,
                                        ")")))))));
    }
    getPieChartOthersCategoryTypeOptions() {
        let options = EnumExtensions_1.EnumExtensions.getNames(Enums_1.PieChartOthersCategoryType).map((enumName) => {
            let name = enumName.toString();
            return React.createElement("option", { key: name, value: name }, name);
        });
        return options;
    }
    onRowVisibilityChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.props.showVisibleClick();
        }
        else {
            this.props.showAllClick();
        }
        this.setState({ ShowVisibleRowsOnly: e.checked, CurrentColumnCount: 0, CurrentColumnValue: '' });
    }
    onOthersCategoryTypeChanged(event) {
        let e = event.target;
        this.setState({ PieChartOthersCategoryType: e.value });
    }
    onSliceClick(s, e) {
        this.setState({ CurrentColumnCount: e.dataContext.ColumnCount, CurrentColumnValue: e.dataContext.ColumnValue });
    }
}
exports.PieChartComponent = PieChartComponent;
