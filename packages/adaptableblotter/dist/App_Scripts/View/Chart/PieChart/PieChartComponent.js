"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const igr_item_legend_module_1 = require("igniteui-react-charts/ES2015/igr-item-legend-module");
const igr_item_legend_1 = require("igniteui-react-charts/ES2015/igr-item-legend");
const igr_doughnut_chart_module_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart-module");
const igr_doughnut_chart_1 = require("igniteui-react-charts/ES2015/igr-doughnut-chart");
const igr_ring_series_module_1 = require("igniteui-react-charts/ES2015/igr-ring-series-module");
const igr_ring_series_1 = require("igniteui-react-charts/ES2015/igr-ring-series");
const igr_pie_chart_1 = require("igniteui-react-charts/ES2015/igr-pie-chart");
const igr_pie_chart_module_1 = require("igniteui-react-charts/ES2015/igr-pie-chart-module");
const PieChartUIHelper_1 = require("./PieChartUIHelper");
const ButtonMaximise_1 = require("../../Components/Buttons/ButtonMaximise");
const StyleConstants_1 = require("../../../Utilities/Constants/StyleConstants");
const ButtonMinimise_1 = require("../../Components/Buttons/ButtonMinimise");
const ButtonClose_1 = require("../../Components/Buttons/ButtonClose");
const ButtonGeneral_1 = require("../../Components/Buttons/ButtonGeneral");
const Helper_1 = require("../../../Utilities/Helpers/Helper");
const DefaultPieChartProperties_1 = require("../../../Utilities/Defaults/DefaultPieChartProperties");
const react_bootstrap_1 = require("react-bootstrap");
const PanelWithTwoButtons_1 = require("../../Components/Panels/PanelWithTwoButtons");
const PanelWithButton_1 = require("../../Components/Panels/PanelWithButton");
const AdaptableBlotterForm_1 = require("../../Components/Forms/AdaptableBlotterForm");
const ChartEnums_1 = require("../../../Utilities/ChartEnums");
const AdaptablePopover_1 = require("../../AdaptablePopover");
const EnumExtensions_1 = require("../../../Utilities/Extensions/EnumExtensions");
const StringExtensions_1 = require("../../../Utilities/Extensions/StringExtensions");
class PieChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onOthersCategoryThresholdChanged = (e) => {
            let chartProperties = this.state.ChartProperties;
            chartProperties.OthersCategoryThreshold = e.target.value;
            this.updateChartProperties(chartProperties);
        };
        this.state = PieChartUIHelper_1.PieChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition, this.props.ChartData);
        igr_pie_chart_module_1.IgrPieChartModule.register();
        igr_doughnut_chart_module_1.IgrDoughnutChartModule.register();
        igr_ring_series_module_1.IgrRingSeriesModule.register();
        igr_item_legend_module_1.IgrItemLegendModule.register();
        this.onPieChartRef = this.onPieChartRef.bind(this);
        this.onDoughnutChartRef = this.onDoughnutChartRef.bind(this);
        this.onDoughnutLegendRef = this.onDoughnutLegendRef.bind(this);
        this.onPieChartLegendRef = this.onPieChartLegendRef.bind(this);
    }
    componentWillReceiveProps(nextProps, nextContext) {
        this.setState(PieChartUIHelper_1.PieChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition, nextProps.ChartData));
    }
    render() {
        let cssClassName = this.props.cssClassName + "__PieCharts";
        let chartTitle = this.props.CurrentChartDefinition.Name;
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.Description)) {
            chartTitle += ' : ' + this.props.CurrentChartDefinition.Description;
        }
        let chartErrorMessage = (this.props.ChartData != null && StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.ChartData.ErrorMessage)) ?
            this.props.ChartData.ErrorMessage :
            null;
        let showGeneralPropertiesButton = this.state.IsGeneralMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowGeneralProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show GeneralProperties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, style: { marginBottom: '10px' }, onClick: () => this.onHidePropertiesGroup(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide General Properties" });
        let closeChartSettingsButton = React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.onHideChartSettings(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Close Chart Settings" });
        let openChartSettingsButton = React.createElement(ButtonGeneral_1.ButtonGeneral, { cssClassName: cssClassName, style: { marginRight: '20px' }, onClick: () => this.onShowChartSettings(), bsStyle: StyleConstants_1.INFO_BSSTYLE, size: "small", DisplayMode: "Text", hideToolTip: true, overrideText: 'Show Chart Settings' });
        let setDefaultsButton = React.createElement(ButtonGeneral_1.ButtonGeneral, { cssClassName: cssClassName, onClick: () => this.onSetPropertyDefaults(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, DisplayMode: "Text", size: "small", hideToolTip: true, overrideText: 'Reset Defaults' });
        let chart = (this.state.ChartProperties.ShowAsDoughnut) ?
            React.createElement(igr_doughnut_chart_1.IgrDoughnutChart, { width: '100%', height: '100%', allowSliceSelection: "true", allowSliceExplosion: "true", sliceClick: (s, e) => this.onSliceClick(e), ref: this.onDoughnutChartRef },
                React.createElement(igr_ring_series_1.IgrRingSeries, { name: "ring1", dataSource: this.state.DataSource, labelMemberPath: this.state.ChartProperties.SliceLabelsMapping, labelsPosition: this.state.ChartProperties.PieChartLabelPosition, valueMemberPath: this.state.ChartProperties.SliceValuesMapping, legendLabelMemberPath: this.state.ChartProperties.SliceLegendMapping, othersCategoryThreshold: this.state.ChartProperties.OthersCategoryThreshold, othersCategoryType: this.state.ChartProperties.OthersCategoryType, othersCategoryText: "Others", brushes: this.state.SliceBrushes, outlines: this.state.SliceBrushes, radiusFactor: 0.8 }))
            :
                React.createElement(igr_pie_chart_1.IgrPieChart, { ref: this.onPieChartRef, dataSource: this.state.DataSource, labelsPosition: this.state.ChartProperties.PieChartLabelPosition, width: '100%', height: '100%', radiusFactor: 0.8, labelMemberPath: this.state.ChartProperties.SliceLabelsMapping, valueMemberPath: this.state.ChartProperties.SliceValuesMapping, legendLabelMemberPath: this.state.ChartProperties.SliceLegendMapping, othersCategoryThreshold: this.state.ChartProperties.OthersCategoryThreshold, othersCategoryType: this.state.ChartProperties.OthersCategoryType, othersCategoryText: "Others", othersCategoryFill: "#9A9A9A", othersCategoryStroke: "#9A9A9A", brushes: this.state.SliceBrushes, outlines: this.state.SliceBrushes, selectionMode: "single", sliceClick: (s, e) => this.onSliceClick(e) });
        let chartElement = (this.props.ChartData != null && chartErrorMessage == null) ?
            chart
            :
                React.createElement(react_bootstrap_1.HelpBlock, null, chartErrorMessage);
        let legendPanel = React.createElement(react_bootstrap_1.Panel, { bsSize: "xs", header: "Legend", style: { marginTop: '2px' } },
            React.createElement("div", { className: "pieChartLegend" },
                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '0px' } },
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: 5 },
                            React.createElement(react_bootstrap_1.HelpBlock, null, "Sort by")),
                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                            React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.SliceSortOption, onChange: (x) => this.onSliceSortByColumnChanged(x) }, this.getOptionsForSliceSortOrders())))),
                this.state.ChartProperties.ShowAsDoughnut ?
                    React.createElement("div", { className: "doughnutLegend" },
                        React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onDoughnutLegendRef }))
                    :
                        React.createElement("div", { className: "pieChartLegend" },
                            React.createElement(igr_item_legend_1.IgrItemLegend, { ref: this.onPieChartLegendRef }))));
        let sidePanel = React.createElement(PanelWithTwoButtons_1.PanelWithTwoButtons, { bsSize: "xs", bsStyle: StyleConstants_1.INFO_BSSTYLE, headerText: "Chart Settings", cssClassName: cssClassName, firstButton: closeChartSettingsButton, secondButton: setDefaultsButton, style: {
                'overflowY': 'auto',
                'overflowX': 'hidden',
                maxHeight: '700px',
                padding: '0px',
                margin: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                marginRight: '0px',
                fontSize: 'small'
            } },
            React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "wrench", bsSize: "xs", headerText: "General", cssClassName: cssClassName, button: showGeneralPropertiesButton, style: { marginTop: '2px' } }, this.state.IsGeneralMinimised == false &&
                React.createElement("span", null,
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '0px' } },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                React.createElement(react_bootstrap_1.HelpBlock, { style: { fontSize: 'small', margin: '0px' } },
                                    React.createElement(react_bootstrap_1.Checkbox, { style: { fontSize: 'small', marginBottom: '0px', marginTop: '0px' }, onChange: (e) => this.onPieOrDoughnutViewChanged(e), checked: this.state.ChartProperties.ShowAsDoughnut }, "Show as 'Doughnut'"))))),
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '0px' } },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                React.createElement(react_bootstrap_1.HelpBlock, null, "Others Band")),
                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", type: "number", min: "0", step: "1", placeholder: "Input", onChange: this.onOthersCategoryThresholdChanged, value: this.state.ChartProperties.OthersCategoryThreshold })),
                            React.createElement(react_bootstrap_1.Col, { xs: 2 },
                                React.createElement(AdaptablePopover_1.AdaptablePopover, { cssClassName: cssClassName, headerText: "Pie Chart: Others Threshold", bodyText: ["Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value."] })))),
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '0px' } },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                React.createElement(react_bootstrap_1.HelpBlock, null,
                                    React.createElement(react_bootstrap_1.Checkbox, { style: { fontSize: 'small', marginBottom: '0px', marginTop: '0px' }, onChange: (e) => this.onThresholdAsPercentChanged(e), checked: this.state.ChartProperties.OthersCategoryType == ChartEnums_1.OthersCategoryType.Percent }, "Others Band As %"))))),
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '0px' } },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                React.createElement(react_bootstrap_1.HelpBlock, null, "Labels Position")),
                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.PieChartLabelPosition, onChange: (x) => this.onSliceLabelsPositionChanged(x) }, this.getOptionsForLabelsPosition())))),
                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '0px' } },
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                React.createElement(react_bootstrap_1.HelpBlock, null, "Labels Content")),
                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.SliceLabelsMapping, onChange: (x) => this.onSliceLabelsMappingChanged(x) }, this.getOptionsForSliceLabelsMapping())))))),
            legendPanel);
        return React.createElement("span", { className: cssClassName }, this.props.ChartData != null &&
            React.createElement("div", null, this.state.IsChartSettingsVisible ?
                React.createElement(react_bootstrap_1.Table, { style: { height: '670px', border: 'none', borderCollapse: 'separate' } },
                    React.createElement("thead", null,
                        React.createElement("tr", null,
                            React.createElement("th", null, chartTitle),
                            React.createElement("th", null))),
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null, chartElement),
                            React.createElement("td", { style: { width: '340px', marginRight: '10px' } }, sidePanel))))
                :
                    React.createElement(react_bootstrap_1.Table, { style: { height: '670px', border: 'none', borderCollapse: 'separate' } },
                        React.createElement("thead", null,
                            React.createElement("tr", null,
                                React.createElement("th", null, this.props.CurrentChartDefinition.Name),
                                React.createElement("th", null,
                                    " ",
                                    React.createElement("div", { className: "pull-right" }, openChartSettingsButton)))),
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { colSpan: 2 }, chartElement))))));
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
    onShowGeneralProperties() {
        this.setState({ IsGeneralMinimised: false, });
    }
    onHidePropertiesGroup() {
        this.setState({ IsGeneralMinimised: true });
    }
    onShowChartSettings() {
        this.setState({ IsChartSettingsVisible: true, });
    }
    onHideChartSettings() {
        this.setState({ IsChartSettingsVisible: false, });
    }
    onSetPropertyDefaults() {
        // first update our state
        this.setState(PieChartUIHelper_1.PieChartUIHelper.setDefaultChartDisplayPopupState());
        // then update the properties
        let chartProperties = Helper_1.Helper.cloneObject(DefaultPieChartProperties_1.DefaultPieChartProperties);
        this.updateChartProperties(chartProperties);
    }
    updateChartProperties(chartProperties) {
        this.setState({ ChartProperties: chartProperties, });
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Name, chartProperties);
    }
    onPieOrDoughnutViewChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.ShowAsDoughnut = e.checked;
        this.updateChartProperties(chartProperties);
    }
    onThresholdAsPercentChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.OthersCategoryType = (e.checked) ? ChartEnums_1.OthersCategoryType.Percent : ChartEnums_1.OthersCategoryType.Number;
        this.updateChartProperties(chartProperties);
    }
    onSliceLabelsPositionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.PieChartLabelPosition = e.value;
        this.updateChartProperties(chartProperties);
    }
    onSliceLabelsMappingChanged(event) {
        let e = event.target;
        let labelMapping = e.value;
        let legendMapping = labelMapping.includes("Ratio") ? ChartEnums_1.SliceLabelOption.RatioAndName : ChartEnums_1.SliceLabelOption.ValueAndName;
        let chartProperties = this.state.ChartProperties;
        chartProperties.SliceLabelsMapping = labelMapping;
        chartProperties.SliceLegendMapping = legendMapping;
        this.updateChartProperties(chartProperties);
    }
    onSliceSortByColumnChanged(event) {
        let e = event.target;
        let sliceSortOption = e.value;
        let oldData = this.state.DataSource;
        let newData = PieChartUIHelper_1.PieChartUIHelper.sortDataSource(sliceSortOption, oldData);
        this.setState({ SliceSortOption: sliceSortOption, DataSource: newData });
    }
    onSliceClick(e) {
        //    console.log("onSliceClick " + e);
        e.isExploded = !e.isExploded;
        e.isSelected = !e.isSelected;
        if (e.isExploded) {
            //    this.setState({ CurrentColumnCount: ds.Value, CurrentColumnValue: ds.Name } as PieChartComponentState);
        }
        else {
            //    this.setState({ CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartComponentState);
        }
    }
    // want to move to helper - not sure why i cannot
    getOptionsForLabelsPosition() {
        return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.PieChartLabelPosition).map((v) => {
            return React.createElement("option", { key: v, value: v }, v);
        });
    }
    getOptionsForSliceLabelsMapping() {
        return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.SliceLabelOption).map((v) => {
            return React.createElement("option", { key: v, value: v }, v);
        });
    }
    getOptionsForSliceSortOrders() {
        return EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.SliceSortOption).map((v) => {
            return React.createElement("option", { key: v, value: v }, v);
        });
    }
}
exports.PieChartComponent = PieChartComponent;
