"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const react_bootstrap_1 = require("react-bootstrap");
const Enums_1 = require("../../Utilities/Enums");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const ColumnSelector_1 = require("../Components/Selectors/ColumnSelector");
const igr_item_legend_module_1 = require("igniteui-react-charts/ES2015/igr-item-legend-module");
const igr_item_legend_1 = require("igniteui-react-charts/ES2015/igr-item-legend");
const igr_doughnut_chart_module_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart-module");
const igr_doughnut_chart_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart");
const igr_ring_series_module_1 = require("igniteui-react-charts/ES2015/igr-ring-series-module");
const igr_ring_series_1 = require("igniteui-react-charts/ES2015/igr-ring-series");
const igr_pie_chart_1 = require("igniteui-react-charts/ES2015/igr-pie-chart");
const igr_pie_chart_module_1 = require("igniteui-react-charts/ES2015/igr-pie-chart-module");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
const AdaptablePopover_1 = require("../AdaptablePopover");
class PieChartPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onOthersCategoryThresholdChanged = (e) => {
            this.setState({ OthersCategoryThreshold: e.target.value });
        };
        this.state = {
            SelectedColumnId: "",
            PieChartData: null,
            ShowVisibleRowsOnly: false,
            PieChartOthersCategoryType: Enums_1.PieChartOthersCategoryType.Number,
            OthersCategoryThreshold: 0,
            CurrentColumnCount: 0,
            CurrentColumnValue: "",
            ShowAsDoughnut: false,
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
    componentDidMount() {
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let pieChartData = this.props.Blotter.ChartService.BuildPieChartData(this.props.PopupParams, false);
            this.setState({ SelectedColumnId: this.props.PopupParams, PieChartData: pieChartData });
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__PieChart";
        let infoBody = ["See the count for each distinct value in the column as pie chart.", React.createElement("br", null), React.createElement("br", null), "There is an option to view as doughnut and to set the 'Others' threshold."];
        let chartSize = '450px';
        let chartBlock = React.createElement("div", null,
            this.state.ShowAsDoughnut ?
                React.createElement(igr_doughnut_chart_1.IgrDoughnutChart, { height: chartSize, width: chartSize, allowSliceSelection: "true", allowSliceExplosion: "true", sliceClick: (s, e) => this.onSliceClick(s, e), ref: this.onDoughnutChartRef },
                    React.createElement(igr_ring_series_1.IgrRingSeries, { name: "ring1", dataSource: this.state.PieChartData, labelMemberPath: "ColumnValue", valueMemberPath: "ColumnCount", othersCategoryThreshold: this.state.OthersCategoryThreshold, othersCategoryType: this.state.PieChartOthersCategoryType, othersCategoryText: "Others" }))
                :
                    React.createElement(igr_pie_chart_1.IgrPieChart, { ref: this.onPieChartRef, dataSource: this.state.PieChartData, labelMemberPath: "ColumnValue", valueMemberPath: "ColumnCount", width: chartSize, height: chartSize, legendLabelMemberPath: "Value", othersCategoryThreshold: this.state.OthersCategoryThreshold, othersCategoryType: this.state.PieChartOthersCategoryType, othersCategoryText: "Others", selectionMode: "single", sliceClick: (s, e) => this.onSliceClick(s, e) }),
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.CurrentColumnValue) &&
                React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '0px', marginRight: '0px', marginBottom: '0px' } },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formSelectedColumnValue" },
                        React.createElement(react_bootstrap_1.ControlLabel, { style: { fontSize: 'small' } },
                            this.state.CurrentColumnValue,
                            " (",
                            this.state.CurrentColumnCount,
                            ")"))));
        let settingsBlock = React.createElement(react_bootstrap_1.Panel, { bsSize: "xs", bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, header: "Settings", style: {
                'overflowY': 'auto',
                'overflowX': 'hidden',
                height: '470px',
                padding: '0px',
                margin: '0px',
                marginTop: '10px',
                marginRight: '0px',
                fontSize: 'small'
            } },
            React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '0px', marginRight: '0px', marginBottom: '0px', marginTop: '0px', padding: '0px' } },
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small', margin: '0px' } },
                    React.createElement(react_bootstrap_1.Checkbox, { style: { fontSize: 'small', marginBottom: '0px', marginTop: '0px' }, onChange: (e) => this.onShowDoughnutChanged(e), checked: this.state.ShowAsDoughnut }, "Doughnut View")),
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small', marginBottom: '10px' } },
                    React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onRowVisibilityChanged(e), checked: this.state.ShowVisibleRowsOnly }, "Visible Rows")),
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formOthersThreshold" },
                    React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                        "Others Threshold",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Pie Chart: Others Threshold", bodyText: ["Items with value less than or equal to the Threshold will be assigned to the “Others” category."] })),
                    React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", type: "number", placeholder: "Input", onChange: this.onOthersCategoryThresholdChanged, value: this.state.OthersCategoryThreshold })),
                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formOthersType" },
                    React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                        "'Others' Type",
                        ' ',
                        React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Pie Chart: Others Type", bodyText: ["Choose whether the 'Others' threshold will be interpreted as a percentage or as a value."] })),
                    React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.PieChartOthersCategoryType, onChange: (x) => this.onOthersCategoryTypeChanged(x) }, this.getPieChartOthersCategoryTypeOptions()))),
            this.state.ShowAsDoughnut ?
                React.createElement("div", { className: "doughnutLegend" },
                    React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onDoughnutLegendRef }))
                :
                    React.createElement("div", { className: "pieChartLegend" },
                        React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onPieChartLegendRef })));
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstants.PieChartStrategyName, bsStyle: "primary", glyphicon: StrategyConstants.PieChartGlyph, infoBody: infoBody },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "pieChartSettings", style: { marginBottom: '0px' } },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                ' ',
                                " "),
                            React.createElement(react_bootstrap_1.Col, { xs: 3 },
                                React.createElement(react_bootstrap_1.ControlLabel, null, "Selected Column")),
                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.SelectedColumnId], ColumnList: this.props.Columns, onColumnChange: columns => this.onColumnSelectedChanged(columns), SelectionMode: Enums_1.SelectionMode.Single })),
                            React.createElement(react_bootstrap_1.Col, { xs: 3 })))),
                StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId) &&
                    React.createElement("div", null,
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 8 }, chartBlock),
                            React.createElement(react_bootstrap_1.Col, { xs: 4 }, settingsBlock)))));
    }
    onColumnSelectedChanged(columns) {
        let pieChartData = (columns.length > 0) ?
            this.props.Blotter.ChartService.BuildPieChartData(columns[0].ColumnId, this.state.ShowVisibleRowsOnly)
            :
                [];
        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : null, PieChartData: pieChartData });
    }
    onDoughnutChartRef(doughnutChart) {
        this.doughnutChart = doughnutChart;
        if (this.doughnutlegend && this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutlegend;
        }
    }
    onPieChartRef(pieChart) {
        this.pieChart = pieChart;
        if (this.pieChartlegend && this.pieChart) {
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
        let pieChartData = this.props.Blotter.ChartService.BuildPieChartData(this.state.SelectedColumnId, e.checked);
        this.setState({ ShowVisibleRowsOnly: e.checked, PieChartData: pieChartData, CurrentColumnCount: 0, CurrentColumnValue: '' });
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
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps() {
    return {};
}
exports.PieChartPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PieChartPopupComponent);
