"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_bootstrap_1 = require("react-bootstrap");
const igr_pie_chart_1 = require("igniteui-react-charts/ES2015/igr-pie-chart");
const igr_pie_chart_module_1 = require("igniteui-react-charts/ES2015/igr-pie-chart-module");
const Enums_1 = require("../../Utilities/Enums");
const igr_item_legend_module_1 = require("igniteui-react-charts/ES2015/igr-item-legend-module");
const igr_item_legend_1 = require("igniteui-react-charts/ES2015/igr-item-legend");
const igr_doughnut_chart_module_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart-module");
const igr_doughnut_chart_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart");
const igr_ring_series_module_1 = require("igniteui-react-charts/ES2015/igr-ring-series-module");
const igr_ring_series_1 = require("igniteui-react-charts/ES2015/igr-ring-series");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const AdaptablePopover_1 = require("../AdaptablePopover");
const ButtonGeneral_1 = require("../Components/Buttons/ButtonGeneral");
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ButtonClose_1 = require("../Components/Buttons/ButtonClose");
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
            CurrentColumnValue: "",
            ShowAsDoughnut: false,
            IsPieChartSettingsVisible: false
        };
        igr_pie_chart_module_1.IgrPieChartModule.register();
        igr_doughnut_chart_module_1.IgrDoughnutChartModule.register();
        igr_ring_series_module_1.IgrRingSeriesModule.register();
        igr_item_legend_module_1.IgrItemLegendModule.register();
        this.onPieChartRef = this.onPieChartRef.bind(this);
        this.onDoughnutChartRef = this.onDoughnutChartRef.bind(this);
        this.onDoughnutLegendRef = this.onDoughnutLegendRef.bind(this);
        this.onPieChartLegendRef = this.onPieChartLegendRef.bind(this);
    }
    render() {
        let cssClassName = 'todo'; //this.props.cssClassName + PieChartConstants.PieChart_COMPONENT
        let chartSize = (this.state.IsPieChartSettingsVisible) ? '300px' : '500px';
        let openChartSettingsButton = React.createElement(ButtonGeneral_1.ButtonGeneral, { cssClassName: cssClassName, style: { marginRight: '20px' }, onClick: () => this.onShowPieChartSettings(), bsStyle: StyleConstants_1.INFO_BSSTYLE, size: "small", DisplayMode: "Text", hideToolTip: true, overrideText: 'Show Chart Settings' });
        let closeChartSettingsButton = React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.onHidePieChartSettings(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Close Chart Settings" });
        let legendBlock = React.createElement("div", null,
            React.createElement(react_bootstrap_1.Panel, { style: {
                    'overflowY': 'auto',
                    'overflowX': 'hidden',
                    'height': '450px'
                } }, this.state.ShowAsDoughnut ?
                React.createElement("div", { className: "doughnutLegend" },
                    React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onDoughnutLegendRef }))
                :
                    React.createElement("div", { className: "pieChartLegend" },
                        React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onPieChartLegendRef }))));
        let chartBlock = React.createElement("div", null, this.state.ShowAsDoughnut ?
            React.createElement(igr_doughnut_chart_1.IgrDoughnutChart, { height: chartSize, width: chartSize, allowSliceSelection: "true", allowSliceExplosion: "true", sliceClick: (s, e) => this.onSliceClick(s, e), ref: this.onDoughnutChartRef },
                React.createElement(igr_ring_series_1.IgrRingSeries, { name: "ring1", dataSource: this.props.PieData, labelMemberPath: this.props.LabelMember, valueMemberPath: this.props.ValueMember, othersCategoryThreshold: this.state.OthersCategoryThreshold, othersCategoryType: this.state.PieChartOthersCategoryType, othersCategoryText: "Others" }))
            :
                React.createElement(igr_pie_chart_1.IgrPieChart, { ref: this.onPieChartRef, dataSource: this.props.PieData, labelMemberPath: this.props.LabelMember, valueMemberPath: this.props.ValueMember, width: chartSize, height: chartSize, legendLabelMemberPath: "Value", othersCategoryThreshold: this.state.OthersCategoryThreshold, othersCategoryType: this.state.PieChartOthersCategoryType, othersCategoryText: "Others", selectionMode: "single", sliceClick: (s, e) => this.onSliceClick(s, e) }));
        let settingsBlock = React.createElement(PanelWithButton_1.PanelWithButton, { bsSize: "xs", bsStyle: StyleConstants_1.INFO_BSSTYLE, headerText: "Settings", cssClassName: cssClassName, button: closeChartSettingsButton, style: { marginRight: '30px' } },
            React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '0px', marginRight: '10px', marginBottom: '0px', marginTop: '0px' } },
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small', marginBottom: '0px' } },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onShowDoughnutChanged(e), checked: this.state.ShowAsDoughnut }, "Doughnut View"))),
            React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '0px', marginRight: '10px', marginBottom: '0px' } },
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small', marginBottom: '10px' } },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onRowVisibilityChanged(e), checked: this.state.ShowVisibleRowsOnly }, "Visible Rows"))),
            React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '10px', marginRight: '10px', marginBottom: '0px' } },
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formOthersThreshold" },
                    React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                        "'Others' Threshold",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Pie Chart: Others Threshold", bodyText: ["Items with value less than or equal to the Threshold will be assigned to the “Others” category."] })),
                    React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", type: "number", placeholder: "Input", onChange: this.onOthersCategoryThresholdChanged, value: this.state.OthersCategoryThreshold }))),
            React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '10px', marginRight: '20px', marginBottom: '0px' } },
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formOthersType" },
                    React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                        "'Others' Type",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Pie Chart: Others Type", bodyText: ["Choose whether the 'Others' threshold will be interpreted as a percentage or as a value."] })),
                    React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.PieChartOthersCategoryType, onChange: (x) => this.onOthersCategoryTypeChanged(x) }, this.getPieChartOthersCategoryTypeOptions()))),
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.CurrentColumnValue) &&
                React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '10px', marginRight: '10px', marginBottom: '0px' } },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formSelectedColumnValue" },
                        React.createElement(react_bootstrap_1.ControlLabel, { style: { fontSize: 'small' } },
                            this.state.CurrentColumnValue,
                            " (",
                            this.state.CurrentColumnCount,
                            ")"))));
        return React.createElement("div", { className: cssClassName, style: { marginBottom: '0px', marginLeft: '5px' } },
            this.state.IsPieChartSettingsVisible == false &&
                React.createElement(react_bootstrap_1.Row, { style: { marginTop: '5px' } },
                    React.createElement(react_bootstrap_1.Col, { xs: 12 },
                        React.createElement("div", { className: "pull-right" }, openChartSettingsButton))),
            this.state.IsPieChartSettingsVisible ?
                React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '10px' } },
                    React.createElement(react_bootstrap_1.Col, { xs: 3, style: { marginTop: '20px' } }, legendBlock),
                    React.createElement(react_bootstrap_1.Col, { xs: 5 }, chartBlock),
                    React.createElement(react_bootstrap_1.Col, { xs: 4, style: { marginTop: '20px' } }, settingsBlock))
                :
                    React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '10px' } },
                        React.createElement(react_bootstrap_1.Col, { xs: 3, style: { marginTop: '20px' } }, legendBlock),
                        React.createElement(react_bootstrap_1.Col, { xs: 9 }, chartBlock)));
    }
    onShowPieChartSettings() {
        this.setState({ IsPieChartSettingsVisible: true, });
    }
    onHidePieChartSettings() {
        this.setState({ IsPieChartSettingsVisible: false, });
    }
    onDoughnutChartRef(doughnutChart) {
        this.doughnutChart = doughnutChart;
        if (this.doughnutlegend) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutlegend;
        }
    }
    onPieChartRef(pieChart) {
        this.pieChart = pieChart;
        if (this.pieChartlegend) {
            this.pieChart.legend = this.pieChartlegend;
        }
    }
    onDoughnutLegendRef(legend) {
        this.doughnutlegend = legend;
        if (this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutlegend;
        }
    }
    onPieChartLegendRef(legend) {
        this.pieChartlegend = legend;
        if (this.pieChart) {
            this.pieChart.legend = this.pieChartlegend;
        }
    }
    getPieChartOthersCategoryTypeOptions() {
        let options = EnumExtensions_1.EnumExtensions.getNames(Enums_1.PieChartOthersCategoryType).map((enumName) => {
            let name = enumName.toString();
            return React.createElement("option", { key: name, value: name }, name);
        });
        return options;
    }
    onShowDoughnutChanged(event) {
        let e = event.target;
        this.setState({ ShowAsDoughnut: e.checked, CurrentColumnCount: 0, CurrentColumnValue: '' });
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
        e.isExploded = !e.isExploded;
        e.isSelected = !e.isSelected;
        if (e.isExploded) {
            this.setState({ CurrentColumnCount: e.dataContext.ColumnCount, CurrentColumnValue: e.dataContext.ColumnValue });
        }
        else {
            this.setState({ CurrentColumnCount: 0, CurrentColumnValue: '' });
        }
    }
}
exports.PieChartComponent = PieChartComponent;
