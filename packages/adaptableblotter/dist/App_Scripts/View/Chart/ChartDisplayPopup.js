"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ButtonClose_1 = require("../Components/Buttons/ButtonClose");
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const react_bootstrap_1 = require("react-bootstrap");
const ButtonMinimise_1 = require("../Components/Buttons/ButtonMinimise");
const ButtonMaximise_1 = require("../Components/Buttons/ButtonMaximise");
const ChartRedux = require("../../Redux/ActionsReducers/ChartRedux");
const SystemRedux = require("../../Redux/ActionsReducers/SystemRedux");
// ig chart imports
const igr_category_chart_1 = require("igniteui-react-charts/ES2015/igr-category-chart");
const igr_category_chart_module_1 = require("igniteui-react-charts/ES2015/igr-category-chart-module");
const igr_data_chart_annotation_module_1 = require("igniteui-react-charts/ES2015/igr-data-chart-annotation-module");
const ChartWizard_1 = require("./Wizard/ChartWizard");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
const PanelWithIImageThreeButtons_1 = require("../Components/Panels/PanelWithIImageThreeButtons");
const ChartEnums_1 = require("../../Utilities/ChartEnums");
const PanelWithButton_1 = require("../Components/Panels/PanelWithButton");
const ColorPicker_1 = require("../ColorPicker");
const AdaptableBlotterForm_1 = require("../Components/Forms/AdaptableBlotterForm");
const ButtonGeneral_1 = require("../Components/Buttons/ButtonGeneral");
const DefaultChartProperties_1 = require("../../Utilities/Defaults/DefaultChartProperties");
const PanelWithTwoButtons_1 = require("../Components/Panels/PanelWithTwoButtons");
const ChartUIHelper_1 = require("./ChartUIHelper");
class ChartDisplayPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.onYAxisMinValueChanged = (e) => {
            let chartProperties = this.state.ChartProperties;
            chartProperties.YAxisMinimumValue = e.target.value;
            this.updateChartProperties(chartProperties);
        };
        this.onTransitionDurationChanged = (e) => {
            let chartProperties = this.state.ChartProperties;
            chartProperties.TransitionInDuration = e.target.value;
            this.updateChartProperties(chartProperties);
        };
        this.state = ChartUIHelper_1.ChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition, this.props.Columns);
        igr_category_chart_module_1.IgrCategoryChartModule.register();
        igr_data_chart_annotation_module_1.IgrDataChartAnnotationModule.register();
    }
    componentDidMount() {
        // if showing modal, we only display a small size chart with no ability to change
        if (this.props.ShowModal && this.state.ChartProperties.ChartSize != ChartEnums_1.ChartSize.Small) {
            let chartProperties = this.state.ChartProperties;
            chartProperties.ChartSize = ChartEnums_1.ChartSize.Small;
            this.updateChartProperties(chartProperties);
        }
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Charts";
        let closeButton = (this.props.ShowModal) ?
            null :
            React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.props.onClose(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true });
        let editButton = (this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Minimised) ?
            null :
            React.createElement(ButtonEdit_1.ButtonEdit, { cssClassName: cssClassName, style: { marginRight: "5px" }, onClick: () => this.onEditChart(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph+Text", overrideText: "Edit Chart", hideToolTip: true });
        let minmaxButton = (this.props.ShowModal) ?
            null :
            this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Minimised ?
                React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onChartMaximised(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true })
                :
                    React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onChartMinimised(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true });
        let showGeneralPropertiesButton = this.state.IsGeneralMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowGeneralProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show GeneralProperties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, style: { marginBottom: '10px' }, onClick: () => this.onHideGeneralProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide General Properties" });
        let showYAxisPropertiesButton = this.state.IsYAxisMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowYAxisProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show YAxis Properties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, style: { marginBottom: '10px' }, onClick: () => this.onHideYAxisProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide YAxis Properties" });
        let showXAxisPropertiesButton = this.state.IsXAxisMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowXAxisProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show XAxis Properties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onHideXAxisProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide XAxis Properties" });
        let showHighlightsPropertiesButton = this.state.IsHighlightsMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowHighlightsProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show Highlights Properties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onHideHighlightsProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide Highlights Properties" });
        let showMiscPropertiesButton = this.state.IsMiscMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowMiscProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show Misc Properties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onHideMiscProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide XAxis Properties" });
        let closeChartSettingsButton = React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.onHideChartSettings(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Close Chart Settings" });
        let openChartSettingsButton = React.createElement(ButtonGeneral_1.ButtonGeneral, { cssClassName: cssClassName, style: { marginRight: '20px' }, onClick: () => this.onShowChartSettings(), bsStyle: StyleConstants_1.INFO_BSSTYLE, size: "small", DisplayMode: "Text", hideToolTip: true, overrideText: 'Show Chart Settings' });
        let setDefaultsButton = React.createElement(ButtonGeneral_1.ButtonGeneral, { cssClassName: cssClassName, onClick: () => this.onSetPropertyDefaults(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, DisplayMode: "Text", size: "small", hideToolTip: true, overrideText: 'Reset Defaults' });
        let chartWidth = ChartUIHelper_1.ChartUIHelper.setChartWidth(this.state.ChartProperties, this.state.IsChartSettingsVisible);
        let chartHeight = ChartUIHelper_1.ChartUIHelper.setChartHeight(this.state.ChartProperties);
        let panelWidth = ChartUIHelper_1.ChartUIHelper.setPanelWidth(this.state.ChartProperties);
        let chartColumnSize = ChartUIHelper_1.ChartUIHelper.setChartColumnSize(this.state.ChartProperties);
        let legendColumnSize = ChartUIHelper_1.ChartUIHelper.setLegendColumnSize(this.state.ChartProperties);
        let chartData = (this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?
            React.createElement(igr_category_chart_1.IgrCategoryChart
            // datasource
            , { 
                // datasource
                dataSource: this.props.ChartData, 
                // chart type
                chartType: this.state.ChartProperties.ChartType, 
                // tooltip
                toolTipType: this.state.ChartProperties.ToolTipType, 
                // size
                width: chartWidth, height: chartHeight, 
                // titles (titles, alignment and margins)
                chartTitle: this.props.CurrentChartDefinition.Title, subtitle: this.props.CurrentChartDefinition.SubTitle, titleAlignment: this.state.ChartProperties.TitleAlignment, titleRightMargin: this.state.TitleMargin, titleTopMargin: this.state.TitleMargin, subtitleAlignment: this.state.ChartProperties.SubTitleAlignment, subtitleRightMargin: this.state.SubTitleMargin, 
                // yAxis
                yAxisMinimumValue: this.state.ChartProperties.YAxisMinimumValue, yAxisTitle: this.getYAxisTitle(this.state.UseDefaultYAxisTitle), yAxisLabelVisibility: this.state.ChartProperties.YAxisLabelVisibility, yAxisLabelLocation: this.state.ChartProperties.YAxisLabelLocation, yAxisLabelTextColor: this.state.ChartProperties.YAxisLabelColor, yAxisTitleTextColor: this.state.ChartProperties.YAxisTitleColor, 
                // xAxis
                xAxisLabelVisibility: this.state.ChartProperties.XAxisLabelVisibility, xAxisTitle: this.getXAxisTitle(this.state.UseDefaultXAxisTitle), xAxisTitleTextColor: this.state.ChartProperties.XAxisTitleColor, xAxisLabelTextColor: this.state.ChartProperties.XAxisLabelColor, xAxisGap: this.state.ChartProperties.XAxisGap, 
                // crosshairs
                crosshairsDisplayMode: this.state.ChartProperties.ChartCrosshairsMode, crosshairsSnapToData: this.state.ChartProperties.SpanCrossHairsToData, crosshairsAnnotationEnabled: this.state.ChartProperties.EnableCrosshairsAnnotations, 
                // transitions
                isTransitionInEnabled: this.state.ChartProperties.EnableTransitions, 
                // transitionInEasingFunction={EasingFunctions.cubicEase}
                transitionInDuration: this.state.ChartProperties.TransitionInDuration, finalValueAnnotationsVisible: this.state.ChartProperties.EnableFinalValueAnnotations, 
                // hightlights
                isSeriesHighlightingEnabled: this.state.ChartProperties.EnableSeriesHighlighting, isCategoryHighlightingEnabled: this.state.ChartProperties.EnableCategoryHighlighting, isItemHighlightingEnabled: this.state.ChartProperties.EnableItemHighlighting, 
                //transitionDuration
                // playing
                xAxisTickStroke: "yellow", 
                //  subtitleRightMargin={this.state.TitleMargin}
                //subtitleTopMargin = {this.state.TitleMargin}
                // callouts - not doing yet as not sure how we can with dynamic data...
                calloutsVisible: true, 
                // calloutsXMemberPath="index"
                // calloutsYMemberPath="yValue"
                // calloutsLabelMemberPath="content"
                // calloutsContentMemberPath="yValue"
                //xAxisInterval={1}
                xAxisLabelAngle: ChartUIHelper_1.ChartUIHelper.getAngleFromEnum(this.state.ChartProperties.XAxisAngle) })
            :
                null;
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithIImageThreeButtons_1.PanelWithImageThreeButtons, { cssClassName: cssClassName, header: StrategyConstants.ChartStrategyName, style: { width: panelWidth }, bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, glyphicon: StrategyConstants.ChartGlyph, secondButton: closeButton, firstButton: editButton, thirdButton: minmaxButton }, this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised &&
                React.createElement("div", null,
                    this.state.IsChartSettingsVisible == false &&
                        React.createElement("div", null,
                            React.createElement(react_bootstrap_1.Row, null,
                                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                    React.createElement("div", { className: "pull-right" }, openChartSettingsButton)))),
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: chartColumnSize }, this.props.ChartData != null &&
                            chartData),
                        this.state.IsChartSettingsVisible &&
                            React.createElement(react_bootstrap_1.Col, { xs: legendColumnSize },
                                React.createElement(PanelWithTwoButtons_1.PanelWithTwoButtons, { bsSize: "xs", bsStyle: StyleConstants_1.INFO_BSSTYLE, headerText: "Chart Settings", cssClassName: cssClassName, firstButton: closeChartSettingsButton, secondButton: setDefaultsButton },
                                    React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "wrench", bsSize: "xs", headerText: "General", cssClassName: cssClassName, button: showGeneralPropertiesButton, style: { marginTop: '10px' } }, this.state.IsGeneralMinimised == false &&
                                        React.createElement("div", null,
                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                React.createElement(react_bootstrap_1.Row, null,
                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Type")),
                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                        React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.ChartType, onChange: (x) => this.onChartTypeChange(x) }, ChartUIHelper_1.ChartUIHelper.getChartTypeOptions())))),
                                            this.props.ShowModal == false &&
                                                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                    React.createElement(react_bootstrap_1.Row, null,
                                                        React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Size")),
                                                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                            React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.ChartSize, onChange: (x) => this.onChartSizeChange(x) }, ChartUIHelper_1.ChartUIHelper.getChartSizeOptions())))),
                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                React.createElement(react_bootstrap_1.Row, null,
                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 }),
                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                        React.createElement(react_bootstrap_1.Checkbox, { inline: true, onChange: (e) => this.onEnableFinalValueAnnotationsOptionChanged(e), checked: this.state.ChartProperties.EnableFinalValueAnnotations }, "Show Annotations")))),
                                            this.state.ChartProperties.ChartSize != ChartEnums_1.ChartSize.XSmall &&
                                                React.createElement("div", null,
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Tooltip")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.ToolTipType, onChange: (x) => this.onToolTipTypeChange(x) }, ChartUIHelper_1.ChartUIHelper.getToolTipOptions())))),
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Crosshairs")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.ChartCrosshairsMode, onChange: (x) => this.onCrosshairsModeChange(x) }, ChartUIHelper_1.ChartUIHelper.getCrossHairModeOptions())))),
                                                    this.state.ChartProperties.ChartCrosshairsMode != ChartEnums_1.ChartCrosshairsMode.None &&
                                                        React.createElement("div", null,
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 }),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSpanCrossHairsToDataOptionChanged(e), checked: this.state.ChartProperties.SpanCrossHairsToData }, "Snap to Data"))),
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 }),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { inline: true, onChange: (e) => this.onEnableCrosshairsAnnotationsOptionChanged(e), checked: this.state.ChartProperties.EnableCrosshairsAnnotations }, "Show Label")))))))),
                                    this.state.ChartProperties.ChartSize != ChartEnums_1.ChartSize.XSmall &&
                                        React.createElement("div", null,
                                            React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "resize-vertical", bsSize: "xs", headerText: "Y (Vertical) Axis", cssClassName: cssClassName, button: showYAxisPropertiesButton, style: { marginTop: '10px' } }, this.state.IsYAxisMinimised == false &&
                                                React.createElement("div", null,
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Min Value")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetYAxisMinValueOptionChanged(e), checked: this.state.SetYAxisMinimumValue })),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.SetYAxisMinimumValue &&
                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", placeholder: "Enter number", type: "number", onChange: this.onYAxisMinValueChanged, value: this.state.ChartProperties.YAxisMinimumValue })))),
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Show Labels")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onYAxisVisibilityOptionChanged(e), checked: this.state.ChartProperties.YAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible })))),
                                                    this.state.ChartProperties.YAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible &&
                                                        React.createElement("div", null,
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Default Label")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onUseDefaultYAxisTitleOptionChanged(e), checked: this.state.UseDefaultYAxisTitle })))),
                                                            this.state.UseDefaultYAxisTitle == false &&
                                                                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                    React.createElement(react_bootstrap_1.Row, null,
                                                                        React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Label")),
                                                                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                            React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", placeholder: "Enter Label", type: "text", onChange: (e) => this.onYAxisTitleChanged(e), value: this.state.ChartProperties.YAxisTitle })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Position")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "left", checked: this.state.ChartProperties.YAxisLabelLocation == ChartEnums_1.AxisLabelsLocation.OutsideLeft, onChange: (e) => this.onYAxisLabelLocationChange(e) }, "Left"),
                                                                        React.createElement(react_bootstrap_1.Radio, { inline: true, value: "right", checked: this.state.ChartProperties.YAxisLabelLocation == ChartEnums_1.AxisLabelsLocation.OutsideRight, onChange: (e) => this.onYAxisLabelLocationChange(e) }, "Right")))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Label Colour")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetYAxisLabelColorOptionChanged(e), checked: this.state.SetYAxisLabelColor })),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.SetYAxisLabelColor &&
                                                                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.YAxisLabelColor, onChange: (x) => this.onYAxisLabelColorChange(x) })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Title Colour")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetYAxisTitleColorOptionChanged(e), checked: this.state.SetYAxisTitleColor })),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.SetYAxisTitleColor &&
                                                                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.YAxisTitleColor, onChange: (x) => this.onYAxisTitleColorChange(x) }))))))),
                                            React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "resize-horizontal", bsSize: "xs", headerText: "X (Horizontal) Axis", cssClassName: cssClassName, button: showXAxisPropertiesButton }, this.state.IsXAxisMinimised == false &&
                                                React.createElement("div", null,
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Show Labels")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onXAxisVisibilityOptionChanged(e), checked: this.state.ChartProperties.XAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible })))),
                                                    this.state.ChartProperties.XAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible &&
                                                        React.createElement("div", null,
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Default Label")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onUseDefaultXAxisTitleOptionChanged(e), checked: this.state.UseDefaultXAxisTitle })))),
                                                            this.state.UseDefaultXAxisTitle == false &&
                                                                React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                    React.createElement(react_bootstrap_1.Row, null,
                                                                        React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Label")),
                                                                        React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                            React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", placeholder: "Enter Label", type: "text", onChange: (e) => this.onXAxisTitleChanged(e), value: this.state.ChartProperties.XAxisTitle })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Label Colour")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetXAxisLabelColorOptionChanged(e), checked: this.state.SetXAxisLabelColor })),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.SetXAxisLabelColor &&
                                                                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.XAxisLabelColor, onChange: (x) => this.onXAxisLabelColorChange(x) })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Title Colour")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetXAxisTitleColorOptionChanged(e), checked: this.state.SetXAxisTitleColor })),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.SetXAxisTitleColor &&
                                                                        React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.XAxisTitleColor, onChange: (x) => this.onXAxisTitleColorChange(x) })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Angle")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                        React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.XAxisAngle, onChange: (x) => this.onXAxisAngleChanged(x) }, ChartUIHelper_1.ChartUIHelper.getAxisAngleOptions())))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Axis Gap")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                        React.createElement(react_bootstrap_1.FormControl, { value: this.state.ChartProperties.XAxisGap, bsSize: "small", type: "number", min: "0", step: "0.1", max: "1", placeholder: "Enter Number", onChange: (e) => this.onXAxisGapChanged(e) }))))))),
                                            React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "asterisk", bsSize: "xs", headerText: "Highlights", cssClassName: cssClassName, button: showHighlightsPropertiesButton }, this.state.IsHighlightsMinimised == false &&
                                                React.createElement("div", null,
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Series")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onEnableSeriesHighlightingOptionChanged(e), checked: this.state.ChartProperties.EnableSeriesHighlighting })))),
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Category")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onEnableCategoryHighlightingOptionChanged(e), checked: this.state.ChartProperties.EnableCategoryHighlighting })))),
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Item")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onEnableItemHighlightingOptionChanged(e), checked: this.state.ChartProperties.EnableItemHighlighting })))))),
                                            React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "briefcase", bsSize: "xs", headerText: "Misc", cssClassName: cssClassName, button: showMiscPropertiesButton }, this.state.IsMiscMinimised == false &&
                                                React.createElement("div", null,
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Title")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.TitleAlignment, onChange: (x) => this.onTitleAlignmentChange(x) }, ChartUIHelper_1.ChartUIHelper.getAlignmentOptions())))),
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Subtitle")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.SubTitleAlignment, onChange: (x) => this.onSubTitleAlignmentChange(x) }, ChartUIHelper_1.ChartUIHelper.getAlignmentOptions())))),
                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                        React.createElement(react_bootstrap_1.Row, null,
                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Transitions")),
                                                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onEnableTransitionsOptionChanged(e), checked: this.state.ChartProperties.EnableTransitions })))),
                                                    this.state.ChartProperties.EnableTransitions &&
                                                        React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                            React.createElement(react_bootstrap_1.Row, null,
                                                                React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                    React.createElement(react_bootstrap_1.ControlLabel, null, "Duration")),
                                                                React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                    React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", placeholder: "Length (ms)", type: "number", onChange: this.onTransitionDurationChanged, value: this.state.ChartProperties.TransitionInDuration })))))))))))),
            this.state.EditedChartDefinition &&
                React.createElement(ChartWizard_1.ChartWizard, { cssClassName: cssClassName, EditedAdaptableBlotterObject: this.state.EditedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: 0, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onEditChart() {
        this.setState({ EditedChartDefinition: Helper_1.Helper.cloneObject(this.props.CurrentChartDefinition) });
    }
    onChartMinimised() {
        this.props.onSetChartVisibility(ChartEnums_1.ChartVisibility.Minimised);
    }
    onChartMaximised() {
        this.props.onSetChartVisibility(ChartEnums_1.ChartVisibility.Maximised);
    }
    onSetPropertyDefaults() {
        // first update our state
        this.setState(ChartUIHelper_1.ChartUIHelper.setDefaultChartDisplayPopupState());
        // then update the properties
        let chartProperties = Helper_1.Helper.cloneObject(DefaultChartProperties_1.DefaultChartProperties);
        // do the titles 
        chartProperties.YAxisTitle = this.getYAxisTitle(true);
        chartProperties.XAxisTitle = this.getXAxisTitle(true);
        this.updateChartProperties(chartProperties);
    }
    onShowGeneralProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: false, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true });
    }
    onHideGeneralProperties() {
        this.setState({ IsGeneralMinimised: true, });
    }
    onShowYAxisProperties() {
        this.setState({ IsYAxisMinimised: false, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true });
    }
    onHideYAxisProperties() {
        this.setState({ IsYAxisMinimised: true, });
    }
    onShowXAxisProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: false, IsHighlightsMinimised: true, IsMiscMinimised: true });
    }
    onHideXAxisProperties() {
        this.setState({ IsXAxisMinimised: true, });
    }
    onShowHighlightsProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: false, IsMiscMinimised: true });
    }
    onHideHighlightsProperties() {
        this.setState({ IsHighlightsMinimised: true, });
    }
    onShowMiscProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: false });
    }
    onHideMiscProperties() {
        this.setState({ IsMiscMinimised: true, });
    }
    onShowChartSettings() {
        this.setState({ IsChartSettingsVisible: true, });
    }
    onHideChartSettings() {
        this.setState({ IsChartSettingsVisible: false, });
    }
    onChartTypeChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.ChartType = e.value;
        this.updateChartProperties(chartProperties);
    }
    onChartSizeChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.ChartSize = e.value;
        this.updateChartProperties(chartProperties);
    }
    onYAxisLabelLocationChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelLocation = (e.value == "left") ? ChartEnums_1.AxisLabelsLocation.OutsideLeft : ChartEnums_1.AxisLabelsLocation.OutsideRight;
        this.updateChartProperties(chartProperties);
    }
    onYAxisLabelColorChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelColor = e.value;
        this.updateChartProperties(chartProperties);
    }
    onXAxisLabelColorChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.XAxisLabelColor = e.value;
        this.updateChartProperties(chartProperties);
    }
    onYAxisTitleColorChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.YAxisTitleColor = e.value;
        this.updateChartProperties(chartProperties);
    }
    onXAxisTitleColorChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.XAxisTitleColor = e.value;
        this.updateChartProperties(chartProperties);
    }
    onToolTipTypeChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.ToolTipType = e.value;
        this.updateChartProperties(chartProperties);
    }
    onCrosshairsModeChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.ChartCrosshairsMode = e.value;
        this.updateChartProperties(chartProperties);
    }
    onSpanCrossHairsToDataOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.SpanCrossHairsToData = e.checked;
        this.updateChartProperties(chartProperties);
    }
    onEnableCrosshairsAnnotationsOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.EnableCrosshairsAnnotations = e.checked;
        this.updateChartProperties(chartProperties);
    }
    onEnableFinalValueAnnotationsOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.EnableFinalValueAnnotations = e.checked;
        this.updateChartProperties(chartProperties);
    }
    onEnableSeriesHighlightingOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.EnableSeriesHighlighting = e.checked;
        this.updateChartProperties(chartProperties);
    }
    onEnableCategoryHighlightingOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.EnableCategoryHighlighting = e.checked;
        this.updateChartProperties(chartProperties);
    }
    onEnableItemHighlightingOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.EnableItemHighlighting = e.checked;
        this.updateChartProperties(chartProperties);
    }
    onEnableTransitionsOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.EnableTransitions = e.checked;
        if (e.checked == false) {
            chartProperties.TransitionInDuration = undefined;
        }
        this.updateChartProperties(chartProperties);
    }
    onSetYAxisMinValueOptionChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.setState({ SetYAxisMinimumValue: true });
        }
        else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisMinimumValue: e.checked });
            let chartProperties = this.state.ChartProperties;
            chartProperties.YAxisMinimumValue = undefined;
            this.updateChartProperties(chartProperties);
        }
    }
    onSetYAxisLabelColorOptionChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.setState({ SetYAxisLabelColor: true });
        }
        else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisLabelColor: e.checked });
            let chartProperties = this.state.ChartProperties;
            chartProperties.YAxisLabelColor = "";
            this.updateChartProperties(chartProperties);
        }
    }
    onSetXAxisLabelColorOptionChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.setState({ SetXAxisLabelColor: true });
        }
        else { // set YAxisMinValue to undefined
            this.setState({ SetXAxisLabelColor: e.checked });
            let chartProperties = this.state.ChartProperties;
            chartProperties.XAxisLabelColor = "";
            this.updateChartProperties(chartProperties);
        }
    }
    onSetYAxisTitleColorOptionChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.setState({ SetYAxisTitleColor: true });
        }
        else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisTitleColor: e.checked });
            let chartProperties = this.state.ChartProperties;
            chartProperties.YAxisTitleColor = "";
            this.updateChartProperties(chartProperties);
        }
    }
    onSetXAxisTitleColorOptionChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.setState({ SetXAxisTitleColor: true });
        }
        else { // set YAxisMinValue to undefined
            this.setState({ SetXAxisTitleColor: e.checked });
            let chartProperties = this.state.ChartProperties;
            chartProperties.XAxisTitleColor = "";
            this.updateChartProperties(chartProperties);
        }
    }
    onTitleAlignmentChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.TitleAlignment = e.value;
        this.updateChartProperties(chartProperties);
        let titleMargin = (e.value == ChartEnums_1.HorizontalAlignment.Right) ? 5 : 0;
        this.setState({ TitleMargin: titleMargin, });
    }
    onSubTitleAlignmentChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.SubTitleAlignment = e.value;
        this.updateChartProperties(chartProperties);
        let subtitleMargin = (e.value == ChartEnums_1.HorizontalAlignment.Right) ? 5 : 0;
        this.setState({ SubTitleMargin: subtitleMargin, });
    }
    updateChartProperties(chartProperties) {
        this.setState({ ChartProperties: chartProperties, });
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Title, chartProperties);
    }
    onXAxisVisibilityOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.XAxisLabelVisibility = (e.checked) ? ChartEnums_1.LabelVisibility.Visible : ChartEnums_1.LabelVisibility.Collapsed;
        this.updateChartProperties(chartProperties);
    }
    onYAxisVisibilityOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelVisibility = (e.checked) ? ChartEnums_1.LabelVisibility.Visible : ChartEnums_1.LabelVisibility.Collapsed;
        this.updateChartProperties(chartProperties);
    }
    onYAxisTitleChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.YAxisTitle = e.value;
        this.updateChartProperties(chartProperties);
    }
    onXAxisGapChanged(event) {
        let e = event.target;
        let factor = Number(e.value);
        if (factor > 1) {
            factor = 1;
        }
        if (factor < 0) {
            factor = 0;
        }
        let chartProperties = this.state.ChartProperties;
        chartProperties.XAxisGap = factor;
        this.updateChartProperties(chartProperties);
    }
    onXAxisTitleChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.XAxisTitle = e.value;
        this.updateChartProperties(chartProperties);
    }
    onXAxisAngleChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.XAxisAngle = e.value;
        this.updateChartProperties(chartProperties);
    }
    onUseDefaultYAxisTitleOptionChanged(event) {
        let e = event.target;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProperties = this.state.ChartProperties;
            chartProperties.YAxisTitle = "";
            this.updateChartProperties(chartProperties);
        }
        this.setState({ UseDefaultYAxisTitle: e.checked, });
    }
    onUseDefaultXAxisTitleOptionChanged(event) {
        let e = event.target;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProperties = this.state.ChartProperties;
            chartProperties.XAxisTitle = "";
            this.updateChartProperties(chartProperties);
        }
        this.setState({ UseDefaultXAxisTitle: e.checked, });
    }
    getYAxisTitle(useDefault) {
        if (useDefault) {
            return ChartUIHelper_1.ChartUIHelper.createDefaultYAxisTitle(this.props.CurrentChartDefinition, this.props.Columns);
        }
        return this.state.ChartProperties.YAxisTitle;
    }
    getXAxisTitle(useDefault) {
        if (useDefault) {
            return ChartUIHelper_1.ChartUIHelper.createDefaultXAxisTitle(this.props.CurrentChartDefinition, this.props.Columns);
        }
        return this.state.ChartProperties.XAxisTitle;
    }
    onCloseWizard() {
        this.setState({ EditedChartDefinition: null });
    }
    onFinishWizard() {
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedChartDefinition);
        let index = this.props.ChartDefinitions.findIndex(cd => cd.Title == this.state.EditedChartDefinition.Title);
        this.props.onAddUpdateChartDefinition(index, clonedObject);
        this.setState({ EditedChartDefinition: null });
        this.props.onSelectChartDefinition(clonedObject.Title);
    }
    canFinishWizard() {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Title);
    }
}
function mapStateToProps(state) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(c => c.Title == state.Chart.CurrentChartDefinition),
        ChartData: state.System.ChartData,
        ChartVisibility: state.System.ChartVisibility,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateChartDefinition: (index, chartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onUpdateChartProperties: (chartTitle, chartProperties) => dispatch(ChartRedux.ChartPropertiesUpdate(chartTitle, chartProperties)),
        onSelectChartDefinition: (chartDefinition) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
        onSetChartVisibility: (chartVisibility) => dispatch(SystemRedux.ChartSetChartVisibility(chartVisibility)),
    };
}
exports.ChartDisplayPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
