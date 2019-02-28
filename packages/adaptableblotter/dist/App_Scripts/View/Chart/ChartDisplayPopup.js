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
        this.seriesColors = new Map();
        this.onYAxisMinValueChanged = (e) => {
            let chartProps = this.state.ChartProperties;
            chartProps.YAxisMinimumValue = e.target.value;
            this.updateChartProperties(chartProps);
        };
        this.onYAxisMaxValueChanged = (e) => {
            let chartProps = this.state.ChartProperties;
            chartProps.YAxisMaximumValue = e.target.value;
            this.updateChartProperties(chartProps);
        };
        this.onTransitionDurationChanged = (e) => {
            let chartProperties = this.state.ChartProperties;
            chartProperties.TransitionInDuration = e.target.value;
            this.updateChartProperties(chartProperties);
        };
        // added for synchronizing color of series with colors of callouts:
        this.seriesAdded = this.seriesAdded.bind(this);
        this.calloutStyleUpdating = this.calloutStyleUpdating.bind(this);
        this.state = ChartUIHelper_1.ChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition, this.props.Columns);
        igr_category_chart_module_1.IgrCategoryChartModule.register();
        igr_data_chart_annotation_module_1.IgrDataChartAnnotationModule.register();
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
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, style: { marginBottom: '10px' }, onClick: () => this.onHidePropertiesGroup(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide General Properties" });
        let showYAxisPropertiesButton = this.state.IsYAxisMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowYAxisProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show YAxis Properties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, style: { marginBottom: '10px' }, onClick: () => this.onHidePropertiesGroup(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide YAxis Properties" });
        let showXAxisPropertiesButton = this.state.IsXAxisMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowXAxisProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show XAxis Properties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onHidePropertiesGroup(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide XAxis Properties" });
        let showHighlightsPropertiesButton = this.state.IsHighlightsMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowHighlightsProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show Highlights Properties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onHidePropertiesGroup(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide Highlights Properties" });
        let showMiscPropertiesButton = this.state.IsMiscMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowMiscProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show Misc Properties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onHidePropertiesGroup(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide XAxis Properties" });
        let closeChartSettingsButton = React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.onHideChartSettings(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Close Chart Settings" });
        let openChartSettingsButton = React.createElement(ButtonGeneral_1.ButtonGeneral, { cssClassName: cssClassName, style: { marginRight: '20px' }, onClick: () => this.onShowChartSettings(), bsStyle: StyleConstants_1.INFO_BSSTYLE, size: "small", DisplayMode: "Text", hideToolTip: true, overrideText: 'Show Chart Settings' });
        let setDefaultsButton = React.createElement(ButtonGeneral_1.ButtonGeneral, { cssClassName: cssClassName, onClick: () => this.onSetPropertyDefaults(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, DisplayMode: "Text", size: "small", hideToolTip: true, overrideText: 'Reset Defaults' });
        let chartElement = (this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?
            React.createElement(igr_category_chart_1.IgrCategoryChart
            // data source
            , { 
                // data source
                dataSource: this.props.ChartData, 
                // chart type
                chartType: this.state.ChartProperties.ChartType, markerTypes: ChartUIHelper_1.ChartUIHelper.getMarkerFromProps(this.state.ChartProperties), 
                // size
                width: '100%', height: '500px', 
                // titles (titles, alignment and margins)
                chartTitle: this.props.CurrentChartDefinition.Title, subtitle: this.props.CurrentChartDefinition.SubTitle, titleAlignment: this.state.ChartProperties.TitleAlignment, titleRightMargin: this.state.TitleMargin, titleTopMargin: this.state.TitleMargin, subtitleAlignment: this.state.ChartProperties.SubTitleAlignment, subtitleRightMargin: this.state.SubTitleMargin, 
                // yAxis
                yAxisMinimumValue: this.state.ChartProperties.YAxisMinimumValue, yAxisMaximumValue: this.state.ChartProperties.YAxisMaximumValue, yAxisTitle: this.getYAxisTitle(this.state.UseDefaultYAxisTitle), yAxisLabelVisibility: this.state.ChartProperties.YAxisLabelVisibility, yAxisLabelLocation: this.state.ChartProperties.YAxisLabelLocation, yAxisLabelTextColor: this.state.ChartProperties.YAxisLabelColor, yAxisTitleTextColor: this.state.ChartProperties.YAxisTitleColor, yAxisIsLogarithmic: this.getYAxisIsLogarithmic(this.state.ChartProperties.YAxisLabelScale), yAxisInverted: this.state.ChartProperties.YAxisInverted, 
                // xAxis
                xAxisLabelVisibility: this.state.ChartProperties.XAxisLabelVisibility, xAxisTitle: this.getXAxisTitle(this.state.UseDefaultXAxisTitle), xAxisTitleTextColor: this.state.ChartProperties.XAxisTitleColor, xAxisLabelTextColor: this.state.ChartProperties.XAxisLabelColor, xAxisGap: this.state.ChartProperties.XAxisGap, xAxisOverlap: this.state.ChartProperties.XAxisOverlap, xAxisInverted: this.state.ChartProperties.XAxisInverted, 
                // TODO we will add 'xAxisLabelLocation' in the next release (ETA middle of 2019)
                // xAxisLabelLocation={this.state.ChartProperties.XAxisLabelLocation}
                // tooltip
                toolTipType: this.state.ChartProperties.ToolTipType, 
                // crosshairs
                crosshairsDisplayMode: this.state.ChartProperties.CrosshairDisplayMode, crosshairsSnapToData: this.state.ChartProperties.CrosshairSnapToData, crosshairsAnnotationEnabled: this.state.ChartProperties.CrosshairAnnotationEnabled, 
                // transitions
                isTransitionInEnabled: this.state.ChartProperties.EnableTransitions, 
                // transitionInEasingFunction={EasingFunctions.cubicEase}
                transitionInDuration: this.state.ChartProperties.TransitionInDuration, finalValueAnnotationsVisible: this.state.ChartProperties.EnableFinalValueAnnotations, 
                // hightlights
                isSeriesHighlightingEnabled: this.state.ChartProperties.EnableSeriesHighlighting, isCategoryHighlightingEnabled: this.state.ChartProperties.EnableCategoryHighlighting, isItemHighlightingEnabled: this.state.ChartProperties.EnableItemHighlighting, 
                //transitionDuration
                // playing
                xAxisTickStroke: "gray", xAxisTickLength: 5, 
                //ubtitleRightMargin={this.state.TitleMargin}
                //subtitleTopMargin = {this.state.TitleMargin}
                // TODO consider adding this binding for Line, Spline, Area, Step ChartTypes
                // and showing controls for editing this value in Chart Settings UI under the General panel
                // thickness={this.state.ChartProperties.SeriesThickness}
                // callouts generated dynamiclly based on current data source and callout properties:
                calloutsDataSource: ChartUIHelper_1.ChartUIHelper.getCalloutsData(this.props.ChartData, this.state.ChartProperties), calloutsVisible: true, calloutsXMemberPath: "CalloutsIndex", calloutsYMemberPath: "CalloutsValue", calloutsLabelMemberPath: "CalloutsLabel", calloutsContentMemberPath: "MemberPath", calloutStyleUpdating: this.calloutStyleUpdating, calloutStyleUpdatingEventEnabled: true, seriesAdded: this.seriesAdded, 
                //xAxisInterval={1}
                xAxisLabelAngle: ChartUIHelper_1.ChartUIHelper.getAngleFromEnum(this.state.ChartProperties.XAxisAngle) })
            :
                null;
        return React.createElement("span", { className: cssClassName },
            React.createElement(PanelWithIImageThreeButtons_1.PanelWithImageThreeButtons, { cssClassName: cssClassName, header: StrategyConstants.ChartStrategyName, bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, style: { marginRight: '30px' }, glyphicon: StrategyConstants.ChartGlyph, secondButton: closeButton, firstButton: editButton, thirdButton: minmaxButton }, this.props.ChartVisibility == ChartEnums_1.ChartVisibility.Maximised &&
                React.createElement("span", null,
                    this.state.IsChartSettingsVisible == false &&
                        React.createElement("span", null,
                            React.createElement(react_bootstrap_1.Row, null,
                                React.createElement(react_bootstrap_1.Col, { xs: 12 },
                                    React.createElement("div", { className: "pull-right" }, openChartSettingsButton)))),
                    this.state.IsChartSettingsVisible ?
                        React.createElement(react_bootstrap_1.Row, null,
                            React.createElement(react_bootstrap_1.Table, null,
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null, this.props.ChartData != null &&
                                            chartElement),
                                        React.createElement("td", { style: { width: '350px', marginRight: '15px' } },
                                            React.createElement(PanelWithTwoButtons_1.PanelWithTwoButtons, { bsSize: "xs", bsStyle: StyleConstants_1.INFO_BSSTYLE, headerText: "Chart Settings", cssClassName: cssClassName, firstButton: closeChartSettingsButton, secondButton: setDefaultsButton },
                                                React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "wrench", bsSize: "xs", headerText: "General", cssClassName: cssClassName, button: showGeneralPropertiesButton, style: { marginTop: '2px' } }, this.state.IsGeneralMinimised == false &&
                                                    React.createElement("div", null,
                                                        React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                            React.createElement(react_bootstrap_1.Row, null,
                                                                React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                    React.createElement(react_bootstrap_1.ControlLabel, null, "Chart Type")),
                                                                React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                    React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.ChartType, onChange: (x) => this.onChartTypeChange(x) }, ChartUIHelper_1.ChartUIHelper.getChartTypeOptions())))),
                                                        React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                            React.createElement(react_bootstrap_1.Row, null,
                                                                React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                    React.createElement(react_bootstrap_1.ControlLabel, null, "Marker Type")),
                                                                React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                    React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.MarkerType, onChange: (x) => this.onMarkerTypeChange(x) }, ChartUIHelper_1.ChartUIHelper.getMarkerTypeOptions())))),
                                                        this.state.ChartProperties.ChartType == ChartEnums_1.ChartType.Column &&
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Column Gap")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.FormControl, { value: this.state.ChartProperties.XAxisGap, bsSize: "small", type: "number", min: "0", step: "0.1", max: "1", placeholder: "Enter", onChange: (e) => this.onXAxisGapChanged(e) })))),
                                                        this.state.ChartProperties.ChartType == ChartEnums_1.ChartType.Column &&
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Column Overlap")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.FormControl, { value: this.state.ChartProperties.XAxisOverlap, bsSize: "small", type: "number", min: "0", step: "0.1", max: "1", placeholder: "Enter", onChange: (e) => this.onXAxisOverlapChanged(e) })))))),
                                                React.createElement("div", null,
                                                    React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "resize-vertical", bsSize: "xs", headerText: "Y (Vertical) Axis", cssClassName: cssClassName, button: showYAxisPropertiesButton, style: { marginTop: '2px' } }, this.state.IsYAxisMinimised == false &&
                                                        React.createElement("div", null,
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Axis Visible")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onYAxisVisibilityOptionChanged(e), checked: this.state.ChartProperties.YAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible })))),
                                                            this.state.ChartProperties.YAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible &&
                                                                React.createElement("div", null,
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Axis Inverted")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onYAxisInvertedChanged(e), checked: this.state.ChartProperties.YAxisInverted })))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Axis Location")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.YAxisLabelLocation, onChange: (x) => this.onYAxisLabelLocationChange(x) }, ChartUIHelper_1.ChartUIHelper.getYAxisLabelsLocations())))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Labels Scale")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.YAxisLabelScale, onChange: (x) => this.onYAxisLabelScaleChanged(x) }, ChartUIHelper_1.ChartUIHelper.getAxisLabelScales())))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Labels Min")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetYAxisMinValueOptionChanged(e), checked: this.state.SetYAxisMinimumValue })),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 4 }, this.state.SetYAxisMinimumValue &&
                                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", type: "number", placeholder: "Input", onChange: this.onYAxisMinValueChanged, value: this.state.ChartProperties.YAxisMinimumValue })))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Labels Max")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetYAxisMaxValueOptionChanged(e), checked: this.state.SetYAxisMaximumValue })),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 4 }, this.state.SetYAxisMaximumValue &&
                                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", type: "number", placeholder: "Input", onChange: this.onYAxisMaxValueChanged, value: this.state.ChartProperties.YAxisMaximumValue })))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Labels Color")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetYAxisLabelColorOptionChanged(e), checked: this.state.SetYAxisLabelColor })),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.SetYAxisLabelColor &&
                                                                                React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.YAxisLabelColor, onChange: (x) => this.onYAxisLabelColorChange(x) })))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '5px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Title Default")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onUseDefaultYAxisTitleOptionChanged(e), checked: this.state.UseDefaultYAxisTitle })),
                                                                            this.state.UseDefaultYAxisTitle == false &&
                                                                                React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                    React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", type: "text", placeholder: "Enter Title", onChange: (e) => this.onYAxisTitleChanged(e), value: this.state.ChartProperties.YAxisTitle })))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Title Color")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetYAxisTitleColorOptionChanged(e), checked: this.state.SetYAxisTitleColor })),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.YAxisTitleColor, onChange: (x) => this.onYAxisTitleColorChange(x) }))))))),
                                                    React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "resize-horizontal", bsSize: "xs", headerText: "X (Horizontal) Axis", cssClassName: cssClassName, button: showXAxisPropertiesButton, style: { marginTop: '2px' } }, this.state.IsXAxisMinimised == false &&
                                                        React.createElement("div", null,
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Axis Visible")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onXAxisVisibilityOptionChanged(e), checked: this.state.ChartProperties.XAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible })))),
                                                            this.state.ChartProperties.XAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible &&
                                                                React.createElement("div", null,
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Axis Inverted")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onXAxisInvertedChanged(e), checked: this.state.ChartProperties.XAxisInverted })))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Labels Angle")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.XAxisAngle, onChange: (x) => this.onXAxisAngleChanged(x) }, ChartUIHelper_1.ChartUIHelper.getAxisAngleOptions())))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Labels Color")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetXAxisLabelColorOptionChanged(e), checked: this.state.SetXAxisLabelColor })),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.SetXAxisLabelColor &&
                                                                                React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.XAxisLabelColor, onChange: (x) => this.onXAxisLabelColorChange(x) })))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Title Default")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onUseDefaultXAxisTitleOptionChanged(e), checked: this.state.UseDefaultXAxisTitle })),
                                                                            this.state.UseDefaultXAxisTitle == false &&
                                                                                React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                    React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", type: "text", placeholder: "Enter Title", onChange: (e) => this.onXAxisTitleChanged(e), value: this.state.ChartProperties.XAxisTitle })))),
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 },
                                                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Title Color")),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onSetXAxisTitleColorOptionChanged(e), checked: this.state.SetXAxisTitleColor })),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 }, this.state.SetXAxisTitleColor &&
                                                                                React.createElement(ColorPicker_1.ColorPicker, { ColorPalette: this.props.ColorPalette, value: this.state.ChartProperties.XAxisTitleColor, onChange: (x) => this.onXAxisTitleColorChange(x) }))))))),
                                                    React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "asterisk", bsSize: "xs", headerText: "Annotations", cssClassName: cssClassName, button: showHighlightsPropertiesButton, style: { marginTop: '2px' } }, this.state.IsHighlightsMinimised == false &&
                                                        React.createElement("div", null,
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Final Values")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onEnableFinalValueAnnotationsOptionChanged(e), checked: this.state.ChartProperties.EnableFinalValueAnnotations })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Highlight Series")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onEnableSeriesHighlightingOptionChanged(e), checked: this.state.ChartProperties.EnableSeriesHighlighting })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Highlight Category")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onEnableCategoryHighlightingOptionChanged(e), checked: this.state.ChartProperties.EnableCategoryHighlighting })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Highlight Item")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 1 },
                                                                        React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onEnableItemHighlightingOptionChanged(e), checked: this.state.ChartProperties.EnableItemHighlighting })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Callout Type")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                        React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.CalloutsType, onChange: (x) => this.onChangedCalloutsType(x) }, ChartUIHelper_1.ChartUIHelper.getCalloutTypeOptions())))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '2px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Callout Interval")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                        React.createElement(react_bootstrap_1.FormControl, { value: this.state.ChartProperties.CalloutsInterval, bsSize: "small", type: "number", min: "1", step: "1", max: "20", placeholder: "Enter", onChange: (e) => this.onChangedCalloutsInterval(e) })))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Tooltips")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                        React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.ToolTipType, onChange: (x) => this.onToolTipTypeChange(x) }, ChartUIHelper_1.ChartUIHelper.getToolTipOptions())))),
                                                            React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                React.createElement(react_bootstrap_1.Row, null,
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                        React.createElement(react_bootstrap_1.ControlLabel, null, "Crosshairs")),
                                                                    React.createElement(react_bootstrap_1.Col, { xs: 6 },
                                                                        React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartProperties.CrosshairDisplayMode, onChange: (x) => this.onCrosshairsModeChange(x) }, ChartUIHelper_1.ChartUIHelper.getCrossHairModeOptions())))),
                                                            this.state.ChartProperties.CrosshairDisplayMode != ChartEnums_1.CrosshairDisplayMode.None &&
                                                                React.createElement("div", null,
                                                                    React.createElement(AdaptableBlotterForm_1.AdaptableBlotterForm, { horizontal: true, style: { marginTop: '10px' } },
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 }),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { onChange: (e) => this.onCrosshairSnapToDataOptionChanged(e), checked: this.state.ChartProperties.CrosshairSnapToData }, "Snap to Data"))),
                                                                        React.createElement(react_bootstrap_1.Row, null,
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 5 }),
                                                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                                                React.createElement(react_bootstrap_1.Checkbox, { inline: true, onChange: (e) => this.onCrosshairAnnotationEnabledOptionChanged(e), checked: this.state.ChartProperties.CrosshairAnnotationEnabled }, "Show Values"))))))),
                                                    React.createElement(PanelWithButton_1.PanelWithButton, { glyphicon: "briefcase", bsSize: "xs", headerText: "Misc", cssClassName: cssClassName, button: showMiscPropertiesButton, style: { marginTop: '2px' } }, this.state.IsMiscMinimised == false &&
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
                                                                            React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", placeholder: "Length (ms)", type: "number", onChange: this.onTransitionDurationChanged, value: this.state.ChartProperties.TransitionInDuration })))))))))))))
                        :
                            React.createElement("div", null, this.props.ChartData != null &&
                                chartElement))),
            this.state.EditedChartDefinition &&
                React.createElement(ChartWizard_1.ChartWizard, { cssClassName: cssClassName, EditedAdaptableBlotterObject: this.state.EditedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: 0, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    calloutStyleUpdating(sender, args) {
        if (args.item && this.seriesColors.has(args.item)) {
            let color = this.seriesColors.get(args.item);
            args.outline = color;
            args.background = color;
            args.leaderBrush = "#d8d8d8";
            args.textColor = "white";
            // console.log("calloutStyleUpdating "  + args.item);
        }
    }
    seriesAdded(sender, args) {
        const series = args.series;
        if (series.valueMemberPath &&
            series.valueMemberPath !== "") {
            this.seriesColors.set(series.valueMemberPath, args.series.actualBrush);
            // console.log("seriesAdded " + series.valueMemberPath);
        }
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
        let chartProps = Helper_1.Helper.cloneObject(DefaultChartProperties_1.DefaultChartProperties);
        // do the titles
        chartProps.YAxisTitle = this.getYAxisTitle(true);
        chartProps.XAxisTitle = this.getXAxisTitle(true);
        this.updateChartProperties(chartProps);
    }
    onShowGeneralProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: false, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true });
    }
    onShowYAxisProperties() {
        this.setState({ IsYAxisMinimised: false, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true });
    }
    onShowXAxisProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: false, IsHighlightsMinimised: true, IsMiscMinimised: true });
    }
    onShowHighlightsProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: false, IsMiscMinimised: true });
    }
    onShowMiscProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: false });
    }
    onHidePropertiesGroup() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true });
    }
    onShowChartSettings() {
        this.setState({ IsChartSettingsVisible: true, });
    }
    onHideChartSettings() {
        this.setState({ IsChartSettingsVisible: false, });
    }
    onChartTypeChange(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.ChartType = e.value;
        this.updateChartProperties(chartProps);
    }
    onMarkerTypeChange(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.MarkerType = e.value;
        this.updateChartProperties(chartProps);
    }
    onYAxisLabelLocationChange(event) {
        let e = event.target;
        let props = this.state.ChartProperties;
        let selected = e.value.toString();
        if (selected.indexOf("Left") > 0) {
            props.YAxisLabelLocation = ChartEnums_1.AxisLabelsLocation.OutsideLeft;
        }
        else {
            props.YAxisLabelLocation = ChartEnums_1.AxisLabelsLocation.OutsideRight;
        }
        this.updateChartProperties(props);
    }
    onXAxisLabelLocationChange(event) {
        let e = event.target;
        let props = this.state.ChartProperties;
        let selected = e.value.toString();
        if (selected.indexOf("Top") > 0) {
            props.XAxisLabelLocation = ChartEnums_1.AxisLabelsLocation.OutsideTop;
        }
        else {
            props.XAxisLabelLocation = ChartEnums_1.AxisLabelsLocation.OutsideBottom;
        }
        this.updateChartProperties(props);
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
    onChangedCalloutsType(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        // Note not changing to CalloutsType enum because a user might selected a da column name from data source
        chartProperties.CalloutsType = e.value;
        this.updateChartProperties(chartProperties);
    }
    onChangedCalloutsInterval(event) {
        let e = event.target;
        let value = Number(e.value);
        if (value >= 1000) {
            value = 1000;
        }
        if (value < 1) {
            value = 1;
        }
        let chartProps = this.state.ChartProperties;
        chartProps.CalloutsInterval = value;
        // chartProps.CalloutsInterval = e.target.value;
        this.updateChartProperties(chartProps);
    }
    onCrosshairsModeChange(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.CrosshairDisplayMode = e.value;
        this.updateChartProperties(chartProperties);
    }
    onCrosshairSnapToDataOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.CrosshairSnapToData = e.checked;
        this.updateChartProperties(chartProperties);
    }
    onCrosshairAnnotationEnabledOptionChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.CrosshairAnnotationEnabled = e.checked;
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
    onYAxisInvertedChanged(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.YAxisInverted = e.checked;
        this.updateChartProperties(chartProps);
    }
    onXAxisInvertedChanged(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.XAxisInverted = e.checked;
        this.updateChartProperties(chartProps);
    }
    onSetYAxisMinValueOptionChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.setState({ SetYAxisMinimumValue: true });
        }
        else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisMinimumValue: e.checked });
            let chartProps = this.state.ChartProperties;
            chartProps.YAxisMinimumValue = undefined;
            this.updateChartProperties(chartProps);
        }
    }
    onSetYAxisMaxValueOptionChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.setState({ SetYAxisMaximumValue: true });
        }
        else { // set YAxisMaxValue to undefined
            this.setState({ SetYAxisMaximumValue: e.checked });
            let chartProps = this.state.ChartProperties;
            chartProps.YAxisMaximumValue = undefined;
            this.updateChartProperties(chartProps);
        }
    }
    onSetYAxisLabelColorOptionChanged(event) {
        let e = event.target;
        if (e.checked) {
            this.setState({ SetYAxisLabelColor: true });
        }
        else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisLabelColor: e.checked });
            let chartProps = this.state.ChartProperties;
            chartProps.YAxisLabelColor = "";
            this.updateChartProperties(chartProps);
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
        let chartProps = this.state.ChartProperties;
        chartProps.TitleAlignment = e.value;
        this.updateChartProperties(chartProps);
        let titleMargin = (e.value == ChartEnums_1.HorizontalAlignment.Right) ? 5 : 0;
        this.setState({ TitleMargin: titleMargin, });
    }
    onSubTitleAlignmentChange(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.SubTitleAlignment = e.value;
        this.updateChartProperties(chartProps);
        let subtitleMargin = (e.value == ChartEnums_1.HorizontalAlignment.Right) ? 5 : 0;
        this.setState({ SubTitleMargin: subtitleMargin, });
    }
    updateChartProperties(chartProperties) {
        this.setState({ ChartProperties: chartProperties, });
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Title, chartProperties);
    }
    onXAxisVisibilityOptionChanged(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.XAxisLabelVisibility = (e.checked) ? ChartEnums_1.LabelVisibility.Visible : ChartEnums_1.LabelVisibility.Collapsed;
        this.updateChartProperties(chartProps);
    }
    onYAxisVisibilityOptionChanged(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.YAxisLabelVisibility = (e.checked) ? ChartEnums_1.LabelVisibility.Visible : ChartEnums_1.LabelVisibility.Collapsed;
        this.updateChartProperties(chartProps);
    }
    onYAxisTitleChanged(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.YAxisTitle = e.value;
        this.updateChartProperties(chartProps);
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
        let chartProps = this.state.ChartProperties;
        chartProps.XAxisGap = factor;
        this.updateChartProperties(chartProps);
    }
    onXAxisOverlapChanged(event) {
        let e = event.target;
        let factor = Number(e.value);
        if (factor > 1) {
            factor = 1;
        }
        if (factor < 0) {
            factor = 0;
        }
        let chartProps = this.state.ChartProperties;
        chartProps.XAxisOverlap = factor;
        this.updateChartProperties(chartProps);
    }
    onXAxisTitleChanged(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.XAxisTitle = e.value;
        this.updateChartProperties(chartProps);
    }
    onXAxisAngleChanged(event) {
        let e = event.target;
        let chartProps = this.state.ChartProperties;
        chartProps.XAxisAngle = e.value;
        this.updateChartProperties(chartProps);
    }
    onYAxisLabelScaleChanged(event) {
        let e = event.target;
        let scale = e.value;
        let chartProps = this.state.ChartProperties;
        // chartProps.YAxisIsLogarithmic = scale == AxisScale.Log;
        chartProps.YAxisLabelScale = scale;
        this.updateChartProperties(chartProps);
    }
    onUseDefaultYAxisTitleOptionChanged(event) {
        let e = event.target;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProps = this.state.ChartProperties;
            chartProps.YAxisTitle = "";
            this.updateChartProperties(chartProps);
        }
        // do we really need to update ChartDisplayPopupState?
        this.setState({ UseDefaultYAxisTitle: e.checked, });
    }
    onUseDefaultXAxisTitleOptionChanged(event) {
        let e = event.target;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProps = this.state.ChartProperties;
            chartProps.XAxisTitle = "";
            this.updateChartProperties(chartProps);
        }
        // do we really need to update ChartDisplayPopupState?
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
    getYAxisIsLogarithmic(scaleMode) {
        return scaleMode == ChartEnums_1.AxisScale.Log;
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
