"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ButtonClose_1 = require("../Components/Buttons/ButtonClose");
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
const StringExtensions_1 = require("../../Utilities/Extensions/StringExtensions");
const react_bootstrap_1 = require("react-bootstrap");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const ButtonMinimise_1 = require("../Components/Buttons/ButtonMinimise");
const ButtonMaximise_1 = require("../Components/Buttons/ButtonMaximise");
const ChartRedux = require("../../Redux/ActionsReducers/ChartRedux");
const ChartInternalRedux = require("../../Redux/ActionsReducers/ChartInternalRedux");
// ig chart imports
const igr_category_chart_1 = require("igniteui-react-charts/ES2015/igr-category-chart");
const igr_category_chart_module_1 = require("igniteui-react-charts/ES2015/igr-category-chart-module");
const igr_data_chart_annotation_module_1 = require("igniteui-react-charts/ES2015/igr-data-chart-annotation-module");
const ChartWizard_1 = require("./Wizard/ChartWizard");
const Helper_1 = require("../../Utilities/Helpers/Helper");
const ButtonEdit_1 = require("../Components/Buttons/ButtonEdit");
const CategoryChartType_1 = require("igniteui-react-charts/ES2015/CategoryChartType");
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
        this.state = {
            ChartType: Enums_1.ChartType.Column,
            ChartSize: Enums_1.ChartSize.Medium,
            SpanCrossHairsToData: false,
            EnableCrosshairsAnnotations: false,
            EnableFinalValueAnnotations: false,
            IsMinimised: false,
            ChartCrosshairsMode: Enums_1.ChartCrosshairsMode.None,
            EditedChartDefinition: null
        };
        igr_category_chart_module_1.IgrCategoryChartModule.register();
        igr_data_chart_annotation_module_1.IgrDataChartAnnotationModule.register();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Charts";
        let closeButton = (this.props.showModal) ?
            null :
            React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.props.onClose(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true });
        let editButton = React.createElement(ButtonEdit_1.ButtonEdit, { cssClassName: cssClassName, onClick: () => this.onEdit(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true });
        let minmaxButton = (this.props.showModal) ?
            null :
            this.state.IsChartMinimised ?
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
        let showMiscPropertiesButton = this.state.IsMiscMinimised ?
            React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onShowMiscProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Show Misc Properties" })
            :
                React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onHideMiscProperties(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Hide XAxis Properties" });
        let closeChartSettingsButton = React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.onHideChartSettings(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, size: "xs", DisplayMode: "Glyph", hideToolTip: false, overrideTooltip: "Close Chart Settings" });
        let openChartSettingsButton = React.createElement(ButtonGeneral_1.ButtonGeneral, { cssClassName: cssClassName, style: { marginRight: '20px' }, onClick: () => this.onShowChartSettings(), bsStyle: StyleConstants_1.INFO_BSSTYLE, size: "small", DisplayMode: "Text", hideToolTip: true, overrideText: 'Show Chart Settings' });
        let setDefaultsButton = React.createElement(ButtonGeneral_1.ButtonGeneral, { cssClassName: cssClassName, onClick: () => this.onSetPropertyDefaults(), bsStyle: StyleConstants_1.DEFAULT_BSSTYLE, DisplayMode: "Text", size: "small", hideToolTip: true, overrideText: 'Reset Defaults' });
        let chartWidth = this.setChartWidth();
        let chartHeight = this.setChartHeight();
        let panelWidth = this.setPanelWidth();
        let chartColumnSize = this.setChartColumnSize();
        let legendColumnSize = this.setLegendColumnSize();
        console.log(this.props.ChartData);
        let chartData = (this.state.IsMinimised == false && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?
            React.createElement(igr_category_chart_1.IgrCategoryChart
            // datasource
            , {
                // datasource
                dataSource: this.props.ChartData,
                // chart type
                chartType: CategoryChartType_1.CategoryChartType[this.state.ChartType],
                // size
                width: chartWidth, height: chartHeight,
                // titles
                chartTitle: this.props.CurrentChartDefinition.Title, subtitle: this.props.CurrentChartDefinition.SubTitle,
                // yAxis
                //yAxisMinimumValue={0}  // need this?
                yAxisTitle: this.props.CurrentChartDefinition.YAxisColumnIds[0],
                // xAxis
                xAxisTitle: this.props.CurrentChartDefinition.XAxisColumnId,
                // crosshairs
                // crosshairsDisplayMode={this.state.ChartCrosshairsMode}
                // crosshairsSnapToData={this.state.SpanCrossHairsToData}
                // crosshairsAnnotationEnabled={this.state.EnableCrosshairsAnnotations}
                // transitions
                isTransitionInEnabled: true,
                // transitionInEasingFunction={EasingFunctions.cubicEase}
                transitionInDuration: 1000 })
            :
                null;
        let optionChartTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.ChartType).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        let optionCrossHairModeTypes = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.ChartCrosshairsMode).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        let optionChartSizes = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.ChartSize).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        let optionAligments = EnumExtensions_1.EnumExtensions.getNames(ChartEnums_1.HorizontalAlignment).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithIImageTwoButtons_1.PanelWithImageTwoButtons, { cssClassName: cssClassName, header: StrategyConstants.ChartStrategyName, style: { width: panelWidth }, bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, glyphicon: StrategyConstants.ChartGlyph, secondButton: minmaxButton, firstButton: closeButton },
                editButton,
                this.state.IsMinimised == false &&
                    React.createElement(react_bootstrap_1.Row, null,
                        React.createElement(react_bootstrap_1.Col, { xs: chartColumnSize }, this.props.ChartData != null &&
                            chartData),
                        React.createElement(react_bootstrap_1.Col, { xs: legendColumnSize },
                            React.createElement(react_bootstrap_1.Panel, null,
                                React.createElement(react_bootstrap_1.Row, null,
                                    React.createElement(react_bootstrap_1.Col, { xs: 10 },
                                        React.createElement("h4", null, "Chart Settings"))),
                                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formChartType" },
                                    React.createElement(react_bootstrap_1.Row, null,
                                        React.createElement(react_bootstrap_1.Col, { xs: 4 },
                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Type")),
                                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                            React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.ChartType, onChange: (x) => this.onChartTypeChange(x) }, optionChartTypes)))),
                                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formSize" },
                                    React.createElement(react_bootstrap_1.Row, null,
                                        React.createElement(react_bootstrap_1.Col, { xs: 4 },
                                            React.createElement(react_bootstrap_1.ControlLabel, null, "Size")),
                                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                            React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.ChartSize, onChange: (x) => this.onChartSizeChange(x) }, optionChartSizes)))),
                                React.createElement(react_bootstrap_1.FormGroup, { controlId: "formFinalValueAnnotations" },
                                    React.createElement(react_bootstrap_1.Row, null,
                                        React.createElement(react_bootstrap_1.Col, { xs: 4 }),
                                        React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                            React.createElement(react_bootstrap_1.Checkbox, { inline: true, onChange: (e) => this.onEnableFinalValueAnnotationsOptionChanged(e), checked: this.state.EnableFinalValueAnnotations }, "Show Annotations")))),
                                this.state.ChartSize != Enums_1.ChartSize.XSmall &&
                                    React.createElement(react_bootstrap_1.FormGroup, { controlId: "formCrosshairs" },
                                        React.createElement(react_bootstrap_1.Row, null,
                                            React.createElement(react_bootstrap_1.Col, { xs: 4 },
                                                React.createElement(react_bootstrap_1.ControlLabel, null, "Crosshairs")),
                                            React.createElement(react_bootstrap_1.Col, { xs: 8 },
                                                React.createElement(react_bootstrap_1.FormControl, { componentClass: "select", placeholder: "select", value: this.state.ChartCrosshairsMode, onChange: (x) => this.onCrosshairsModeChange(x) }, optionCrossHairModeTypes))),
                                        React.createElement(react_bootstrap_1.Row, null,
                                            React.createElement(react_bootstrap_1.Col, { xs: 4 }),
                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                React.createElement(react_bootstrap_1.Checkbox, { disabled: this.state.ChartCrosshairsMode == Enums_1.ChartCrosshairsMode.None, onChange: (e) => this.onSpanCrossHairsToDataOptionChanged(e), checked: this.state.SpanCrossHairsToData }, "Snap to Data"))),
                                        React.createElement(react_bootstrap_1.Row, null,
                                            React.createElement(react_bootstrap_1.Col, { xs: 4 }),
                                            React.createElement(react_bootstrap_1.Col, { xs: 7 },
                                                React.createElement(react_bootstrap_1.Checkbox, { inline: true, disabled: this.state.ChartCrosshairsMode == Enums_1.ChartCrosshairsMode.None, onChange: (e) => this.onEnableCrosshairsAnnotationsOptionChanged(e), checked: this.state.EnableCrosshairsAnnotations }, "Crosshair Legend")))))))),
            this.state.EditedChartDefinition &&
                React.createElement(ChartWizard_1.ChartWizard, { cssClassName: cssClassName, EditedAdaptableBlotterObject: this.state.EditedChartDefinition, ConfigEntities: this.props.ChartDefinitions, ModalContainer: this.props.ModalContainer, Columns: this.props.Columns, UserFilters: this.props.UserFilters, SystemFilters: this.props.SystemFilters, Blotter: this.props.Blotter, WizardStartIndex: 0, onCloseWizard: () => this.onCloseWizard(), onFinishWizard: () => this.onFinishWizard(), canFinishWizard: () => this.canFinishWizard() }));
    }
    onEdit() {
        this.setState({ EditedChartDefinition: Helper_1.Helper.cloneObject(this.props.CurrentChartDefinition) });
    }
    onChartMinimised() {
        this.setState({ IsChartMinimised: true, });
    }
    onChartMaximised() {
        this.setState({ IsChartMinimised: false, });
    }
    onSetPropertyDefaults() {
        // first update our state
        this.setState({
            IsGeneralMinimised: false,
            IsYAxisMinimised: true,
            SetYAxisMinimumValue: false,
            SetYAxisLabelColor: false,
            SetYAxisTitleColor: false,
            IsXAxisMinimised: true,
            SetXAxisLabelColor: false,
            SetXAxisTitleColor: false,
            IsMiscMinimised: true,
            TitleMargin: 0,
            SubTitleMargin: 0,
            UseDefaultXAxisTitle: true
        });
        // then update the properties
        let chartProperties = Helper_1.Helper.cloneObject(DefaultChartProperties_1.DefaultChartProperties);
        // do the titles
        chartProperties.YAxisTitle = this.getYAxisTitle(true);
        chartProperties.XAxisTitle = this.getXAxisTitle(true);
        this.updateChartProperties(chartProperties);
    }
    onShowGeneralProperties() {
        this.setState({ IsGeneralMinimised: false, });
    }
    onHideGeneralProperties() {
        this.setState({ IsGeneralMinimised: true, });
    }
    onShowYAxisProperties() {
        this.setState({ IsYAxisMinimised: false, });
    }
    onHideYAxisProperties() {
        this.setState({ IsYAxisMinimised: true, });
    }
    onShowXAxisProperties() {
        this.setState({ IsXAxisMinimised: false, });
    }
    onHideXAxisProperties() {
        this.setState({ IsXAxisMinimised: true, });
    }
    onShowMiscProperties() {
        this.setState({ IsMiscMinimised: false, });
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
        this.setState({ ChartSize: e.value, });
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
    onXAxisTitleChanged(event) {
        let e = event.target;
        let chartProperties = this.state.ChartProperties;
        chartProperties.XAxisTitle = e.value;
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
            return this.createDefaultYAxisTitle();
        }
        return this.state.ChartProperties.YAxisTitle;
    }
    getXAxisTitle(useDefault) {
        if (useDefault) {
            return this.createDefaultXAxisTitle();
        }
        return this.state.ChartProperties.XAxisTitle;
    }
    createDefaultYAxisTitle() {
        return this.props.CurrentChartDefinition.YAxisColumnIds.map(c => {
            return ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(c, this.props.Columns);
        }).join(', ');
    }
    createDefaultXAxisTitle() {
        let returnString = ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.CurrentChartDefinition.XAxisColumnId, this.props.Columns);
        if (StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.AdditionalColumnId)) {
            returnString = returnString + " (by " + ColumnHelper_1.ColumnHelper.getFriendlyNameFromColumnId(this.props.CurrentChartDefinition.AdditionalColumnId, this.props.Columns) + ")";
        }
        return returnString;
    }
    isDefaultYAxisTitle() {
        return StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.YAxisTitle) ||
            this.props.CurrentChartDefinition.ChartProperties.YAxisTitle == this.createDefaultYAxisTitle();
    }
    isDefaultXAxisTitle() {
        return StringExtensions_1.StringExtensions.IsNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.XAxisTitle) ||
            this.props.CurrentChartDefinition.ChartProperties.XAxisTitle == this.createDefaultXAxisTitle();
    }
    onCloseWizard() {
        this.setState({ EditedChartDefinition: null });
    }
    onFinishWizard() {
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedChartDefinition);
        let index = this.props.ChartDefinitions.findIndex(cd => cd.Title == this.state.EditedChartDefinition.Title);
        this.props.onAddUpdateChartDefinition(index, clonedObject);
        this.setState({ EditedChartDefinition: null });
        this.props.onSelectChartDefinition(clonedObject);
    }
    canFinishWizard() {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Title);
    }
    onCloseWizard() {
        this.setState({ EditedChartDefinition: null });
    }
    onFinishWizard() {
        let clonedObject = Helper_1.Helper.cloneObject(this.state.EditedChartDefinition);
        let index = this.props.ChartDefinitions.findIndex(cd => cd.Title == this.state.EditedChartDefinition.Title);
        this.props.onAddUpdateChartDefinition(index, clonedObject);
        this.setState({ EditedChartDefinition: null });
        this.props.onSelectChartDefinition(clonedObject);
    }
    canFinishWizard() {
        return StringExtensions_1.StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Title);
    }
    setChartHeight() {
        switch (this.state.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
                return '350px';
            case ChartEnums_1.ChartSize.Small:
                return '450px';
            case ChartEnums_1.ChartSize.Medium:
                return '600px';
            case ChartEnums_1.ChartSize.Large:
                return '750px';
            case ChartEnums_1.ChartSize.XLarge:
                return '850px';
        }
    }
    setChartWidth() {
        let chartWidth;
        switch (this.state.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
                chartWidth = (this.state.IsChartSettingsVisible) ? 375 : 600;
                break;
            case ChartEnums_1.ChartSize.Small:
                chartWidth = (this.state.IsChartSettingsVisible) ? 525 : 850;
                break;
            case ChartEnums_1.ChartSize.Medium:
                chartWidth = (this.state.IsChartSettingsVisible) ? 750 : 1100;
                break;
            case ChartEnums_1.ChartSize.Large:
                chartWidth = (this.state.IsChartSettingsVisible) ? 1050 : 1350;
                break;
            case ChartEnums_1.ChartSize.XLarge:
                chartWidth = (this.state.IsChartSettingsVisible) ? 1200 : 1600;
                break;
        }
        chartWidth = (this.state.ChartProperties.XAxisLabelVisibility == ChartEnums_1.LabelVisibility.Visible) ? chartWidth : chartWidth - 10;
        return chartWidth + 'px';
    }
    setPanelWidth() {
        switch (this.state.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
                return '650px';
            case ChartEnums_1.ChartSize.Small:
                return '900px';
            case ChartEnums_1.ChartSize.Medium:
                return '1150px';
            case ChartEnums_1.ChartSize.Large:
                return '1400px';
            case ChartEnums_1.ChartSize.XLarge:
                return '1650px';
        }
    }
    setChartColumnSize() {
        switch (this.state.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
            case ChartEnums_1.ChartSize.Small:
                return 7;
            case ChartEnums_1.ChartSize.Medium:
                return 8;
            case ChartEnums_1.ChartSize.Large:
            case ChartEnums_1.ChartSize.XLarge:
                return 9;
        }
    }
    setLegendColumnSize() {
        switch (this.state.ChartSize) {
            case ChartEnums_1.ChartSize.XSmall:
            case ChartEnums_1.ChartSize.Small:
                return 5;
            case ChartEnums_1.ChartSize.Medium:
                return 4;
            case ChartEnums_1.ChartSize.Large:
            case ChartEnums_1.ChartSize.XLarge:
                return 3;
        }
    }
}
function mapStateToProps(state) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.ChartInternal.CurrentChartDefinition,
        ChartData: state.ChartInternal.ChartData,
    };
}
function mapDispatchToProps(dispatch) {
    return {
        onAddUpdateChartDefinition: (index, chartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onSelectChartDefinition: (chartDefinition) => dispatch(ChartInternalRedux.ChartDefinitionSelect(chartDefinition)),
    };
}
exports.ChartDisplayPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
