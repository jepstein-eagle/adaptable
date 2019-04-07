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
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
const AdaptablePopover_1 = require("../AdaptablePopover");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const ObjectFactory_1 = require("../../Utilities/ObjectFactory");
const ChartEnums_1 = require("../../Utilities/ChartEnums");
const PieChartUIHelper_1 = require("../Chart/PieChart/PieChartUIHelper");
class PieChartPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.SliceValueOptions = ["Value", "Ratio"];
        this.SliceLabelOptions = ["Value", "ValueAndName",
            "Ratio", "RatioAndName", "Name",];
        this.SliceSorByOptions = ["Value Descending", "Value Ascending", "Name Descending", "Name Ascending",];
        this.onOthersCategoryThresholdChanged = (e) => {
            this.setState({ OthersCategoryThreshold: e.target.value });
        };
        this.state = {
            PieChartDefinition: ObjectFactory_1.ObjectFactory.CreateEmptyPieChartDefinition(),
            DataSource: null,
            OthersCategoryType: ChartEnums_1.PieChartOthersCategoryType.Percent,
            OthersCategoryThreshold: 2,
            ShowAsDoughnut: false,
            SliceValuesMapping: "Value",
            SliceLabelsMapping: "Name",
            SliceLegendMapping: "ValueAndName",
            SliceSortOption: ChartEnums_1.SliceSortOption.ValueDescending,
            SliceLabelsPosition: ChartEnums_1.PieChartLabelPosition.BestFit,
            SliceBrushes: PieChartUIHelper_1.PieChartUIHelper.getBrushesEven(),
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
        const column = this.props.PopupParams;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(column)) {
            this.updateDataSource(null, column);
        }
    }
    getOptionsForLabelsPosition() {
        let optionElements = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.PieChartLabelPosition).map((v) => {
            return React.createElement("option", { key: v, value: v }, v);
        });
        return optionElements;
    }
    getOptionsForSliceLabelsMapping() {
        let optionElements = this.SliceLabelOptions.map((v) => {
            return React.createElement("option", { key: v, value: v }, v);
        });
        return optionElements;
    }
    getOptionsForSliceValuesMapping() {
        let optionElements = this.SliceValueOptions.map((v) => {
            return React.createElement("option", { key: v, value: v }, v);
        });
        return optionElements;
    }
    getOptionsForSliceSortOrders() {
        let optionElements = this.SliceSorByOptions.map((v) => {
            return React.createElement("option", { key: v, value: v }, v);
        });
        return optionElements;
    }
    hasValidDataSelection() {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.SecondaryColumnId) ||
            StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.PrimaryColumnId);
    }
    render() {
        let cssClassName = this.props.cssClassName + "__PieChart";
        let infoBody = ["See the count for each distinct visible value in the column as pie chart.", React.createElement("br", null), "There are options to view as doughnut, set the 'Others' threshold (and type) and manage labels."];
        let chartSize = '450px';
        let radiusFactor = 0.8;
        let chartBlock = React.createElement("div", null, this.state.ShowAsDoughnut ?
            React.createElement(igr_doughnut_chart_1.IgrDoughnutChart, { height: chartSize, width: chartSize, allowSliceSelection: "true", allowSliceExplosion: "true", ref: this.onDoughnutChartRef },
                React.createElement(igr_ring_series_1.IgrRingSeries, { name: "ring1", dataSource: this.state.DataSource, labelsPosition: this.state.SliceLabelsPosition, labelMemberPath: this.state.SliceLabelsMapping, valueMemberPath: this.state.SliceValuesMapping, legendLabelMemberPath: this.state.SliceLegendMapping, othersCategoryThreshold: this.state.OthersCategoryThreshold, othersCategoryType: this.state.OthersCategoryType, othersCategoryText: "Others", brushes: this.state.SliceBrushes, outlines: this.state.SliceBrushes, radiusFactor: radiusFactor }))
            :
                React.createElement(igr_pie_chart_1.IgrPieChart, { ref: this.onPieChartRef, dataSource: this.state.DataSource, labelsPosition: this.state.SliceLabelsPosition, labelMemberPath: this.state.SliceLabelsMapping, valueMemberPath: this.state.SliceValuesMapping, legendLabelMemberPath: this.state.SliceLegendMapping, width: chartSize, height: chartSize, othersCategoryThreshold: this.state.OthersCategoryThreshold, othersCategoryType: this.state.OthersCategoryType, othersCategoryText: "Others", othersCategoryFill: "#9A9A9A", othersCategoryStroke: "#9A9A9A", brushes: this.state.SliceBrushes, outlines: this.state.SliceBrushes, radiusFactor: radiusFactor, selectionMode: "single" }));
        let settingsBlock = React.createElement(react_bootstrap_1.Panel, { bsSize: "xs", bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, header: "Settings", style: {
                'overflowY': 'auto',
                'overflowX': 'hidden',
                height: '520px',
                padding: '0px',
                margin: '0px',
                marginTop: '0px',
                marginRight: '0px',
                fontSize: 'small'
            } },
            React.createElement(react_bootstrap_1.Row, { style: { marginLeft: '0px', marginRight: '0px', marginBottom: '0px', marginTop: '0px', padding: '0px' } },
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small', margin: '0px' } },
                    React.createElement(react_bootstrap_1.Checkbox, { style: { fontSize: 'small', marginBottom: '0px', marginTop: '0px' }, onChange: (e) => this.onShowDoughnutChanged(e), checked: this.state.ShowAsDoughnut }, "Doughnut View")),
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                    "Others Threshold",
                    ' ',
                    React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Pie Chart: Others Threshold", bodyText: ["Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value."] })),
                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", type: "number", min: "0", step: "1", placeholder: "Input", onChange: this.onOthersCategoryThresholdChanged, value: this.state.OthersCategoryThreshold }),
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                    React.createElement(react_bootstrap_1.Checkbox, { style: { fontSize: 'small', marginBottom: '0px', marginTop: '0px' }, onChange: (e) => this.onThresholdAsPercentChanged(e), checked: this.state.OthersCategoryType == ChartEnums_1.PieChartOthersCategoryType.Percent }, "Others Threshold %")),
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                    "Labels Position:",
                    ' '),
                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.SliceLabelsPosition, onChange: (x) => this.onSliceLabelsPositionChanged(x) }, this.getOptionsForLabelsPosition()),
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                    "Labels Content:",
                    ' '),
                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.SliceLabelsMapping, onChange: (x) => this.onSliceLabelsMappingChanged(x) }, this.getOptionsForSliceLabelsMapping()),
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                    "Slices Sort By:",
                    ' '),
                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.SliceSortOption, onChange: (x) => this.onSliceSortByColumnChanged(x) }, this.getOptionsForSliceSortOrders()),
                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small' } },
                    " ",
                    ' ')),
            this.state.ShowAsDoughnut ?
                React.createElement("div", { className: "doughnutLegend" },
                    React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onDoughnutLegendRef }))
                :
                    React.createElement("div", { className: "pieChartLegend" },
                        React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onPieChartLegendRef })));
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyConstants.PieChartStrategyName, glyphicon: StrategyConstants.PieChartGlyph, infoBody: infoBody, bsStyle: "primary" },
                React.createElement("div", null,
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { key: "DataGroupColumnSelector", horizontal: true },
                                React.createElement(react_bootstrap_1.FormGroup, { controlId: "pieChartSettings", style: { marginBottom: '10px' } },
                                    React.createElement(react_bootstrap_1.Row, null,
                                        React.createElement(react_bootstrap_1.Col, { xs: 1 }, ' '),
                                        React.createElement(react_bootstrap_1.Col, { xs: 4 },
                                            ' ',
                                            React.createElement(react_bootstrap_1.ControlLabel, null,
                                                ' ',
                                                "Selected Column")),
                                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                            React.createElement(ColumnSelector_1.ColumnSelector, { cssClassName: cssClassName, SelectedColumnIds: [this.state.PieChartDefinition.PrimaryColumnId], SelectionMode: Enums_1.SelectionMode.Single, ColumnList: this.props.Columns, onColumnChange: columns => this.onDataGroupColumnChanged(columns) }))))),
                            this.hasValidDataSelection() &&
                                React.createElement("div", null, chartBlock)),
                        React.createElement(react_bootstrap_1.Col, { xs: 4 }, this.hasValidDataSelection() &&
                            React.createElement("div", null, settingsBlock))))));
    }
    onDataValueColumnChanged(columns) {
        let valueColumn = null;
        let labelColumn = this.state.PieChartDefinition.PrimaryColumnId;
        if (columns.length > 0) {
            valueColumn = columns[0].ColumnId;
        }
        this.updateDataSource(valueColumn, labelColumn);
    }
    onDataGroupColumnChanged(columns) {
        let valueColumn = this.state.PieChartDefinition.SecondaryColumnId;
        let labelColumn = null;
        if (columns.length > 0) {
            labelColumn = columns[0].ColumnId;
        }
        this.updateDataSource(valueColumn, labelColumn);
    }
    updateDataSource(valueColumn, labelColumn) {
        let pieChartDefinition = this.state.PieChartDefinition;
        pieChartDefinition.PrimaryColumnId = labelColumn;
        pieChartDefinition.SecondaryColumnId = valueColumn;
        let dataSource = this.props.Blotter.ChartService.BuildPieChartData(pieChartDefinition);
        dataSource = PieChartUIHelper_1.PieChartUIHelper.sortDataSource(this.state.SliceSortOption, dataSource);
        this.setState({
            PieChartDefinition: pieChartDefinition,
            DataSource: dataSource,
            // making sure the first and last slice do not have the same brush
            SliceBrushes: dataSource.length % 2 == 0 ? PieChartUIHelper_1.PieChartUIHelper.getBrushesOdd() : PieChartUIHelper_1.PieChartUIHelper.getBrushesEven()
        });
    }
    onDoughnutChartRef(doughnutChart) {
        this.doughnutChart = doughnutChart;
        if (this.doughnutLegend && this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    }
    onPieChartRef(pieChart) {
        this.pieChart = pieChart;
        if (this.pieChartLegend && this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    }
    onDoughnutLegendRef(legend) {
        this.doughnutLegend = legend;
        if (this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    }
    onPieChartLegendRef(legend) {
        this.pieChartLegend = legend;
        if (this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    }
    onShowDoughnutChanged(event) {
        let e = event.target;
        this.setState({ ShowAsDoughnut: e.checked });
    }
    onThresholdAsPercentChanged(event) {
        let e = event.target;
        let othersCategoryType = (e.checked) ? ChartEnums_1.PieChartOthersCategoryType.Percent : ChartEnums_1.PieChartOthersCategoryType.Number;
        this.setState({ OthersCategoryType: othersCategoryType });
    }
    onSliceLabelsPositionChanged(event) {
        let e = event.target;
        this.setState({ SliceLabelsPosition: e.value });
    }
    onSliceLabelsMappingChanged(event) {
        let e = event.target;
        let labelMapping = e.value;
        let legendMapping = labelMapping.includes("Ratio") ? "RatioAndName" : "ValueAndName";
        this.setState({ SliceLabelsMapping: labelMapping, SliceLegendMapping: legendMapping });
    }
    onSliceValuesMappingChanged(event) {
        let e = event.target;
        this.setState({ SliceValuesMapping: e.value });
    }
    onSliceSortByColumnChanged(event) {
        let e = event.target;
        let sliceSortOption = e.value;
        let oldData = this.state.DataSource;
        let newData = PieChartUIHelper_1.PieChartUIHelper.sortDataSource(sliceSortOption, oldData);
        this.setState({ DataSource: newData, SliceSortOption: sliceSortOption });
    }
}
function mapStateToProps(state, ownProps) {
    return {};
}
function mapDispatchToProps() {
    return {};
}
exports.PieChartPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(PieChartPopupComponent);
