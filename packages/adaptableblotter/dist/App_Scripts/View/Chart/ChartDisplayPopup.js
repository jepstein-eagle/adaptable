"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const StrategyConstants = require("../../Utilities/Constants/StrategyConstants");
const ButtonClose_1 = require("../Components/Buttons/ButtonClose");
const StyleConstants_1 = require("../../Utilities/Constants/StyleConstants");
const react_bootstrap_1 = require("react-bootstrap");
const EnumExtensions_1 = require("../../Utilities/Extensions/EnumExtensions");
const Enums_1 = require("../../Utilities/Enums");
const PanelWithIImageTwoButtons_1 = require("../Components/Panels/PanelWithIImageTwoButtons");
const ButtonMinimise_1 = require("../Components/Buttons/ButtonMinimise");
const ButtonMaximise_1 = require("../Components/Buttons/ButtonMaximise");
class ChartDisplayPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ChartType: Enums_1.ChartType.Column,
            ChartSize: Enums_1.ChartSize.Medium,
            SpanCrossHairsToData: false,
            EnableCrosshairsAnnotations: false,
            EnableFinalValueAnnotations: false,
            IsMinimised: false,
            ChartCrosshairsMode: Enums_1.ChartCrosshairsMode.None
        };
        //    IgrCategoryChartModule.register();
        //    IgrDataChartAnnotationModule.register();
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Charts";
        let closeButton = (this.props.showModal) ?
            null :
            React.createElement(ButtonClose_1.ButtonClose, { cssClassName: cssClassName, onClick: () => this.props.onClose(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true });
        let minmaxButton = (this.props.showModal) ?
            null :
            this.state.IsMinimised ?
                React.createElement(ButtonMaximise_1.ButtonMaximise, { cssClassName: cssClassName, onClick: () => this.onChartMaximised(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true })
                :
                    React.createElement(ButtonMinimise_1.ButtonMinimise, { cssClassName: cssClassName, onClick: () => this.onChartMinimised(), bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, size: "small", DisplayMode: "Glyph", hideToolTip: true });
        let chartWidth = this.setChartWidth();
        let chartHeight = this.setChartHeight();
        let panelWidth = this.setPanelWidth();
        let chartColumnSize = this.setChartColumnSize();
        let legendColumnSize = this.setLegendColumnSize();
        let chartData = null; // (this.state.IsMinimised == false && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?
        //  null
        /*
        <IgrCategoryChart
                // datasource
                dataSource={this.props.ChartData}
                // chart type
                chartType={this.state.ChartType}
                // size
                width={chartWidth}
                height={chartHeight}
                // titles
                chartTitle={this.props.CurrentChartDefinition.Title}
                subtitle={this.props.CurrentChartDefinition.SubTitle}
                // yAxis
                // yAxisMinimumValue={0}  // need this?
                yAxisTitle={this.props.CurrentChartDefinition.YAxisColumnId}
                // xAxis
                xAxisTitle={this.props.CurrentChartDefinition.XAxisColumnId}
                // crosshairs
                crosshairsDisplayMode={this.state.ChartCrosshairsMode}
                crosshairsSnapToData={this.state.SpanCrossHairsToData}
                crosshairsAnnotationEnabled={this.state.EnableCrosshairsAnnotations}
                // transitions
                isTransitionInEnabled={true}
               // transitionInEasingFunction={EasingFunctions.cubicEase}
                transitionInDuration={1000}
                finalValueAnnotationsVisible={this.state.EnableFinalValueAnnotations}

            // callouts - not doing yet as not sure how we can with dynamic data...
            // calloutsVisible={true}
            // calloutsXMemberPath="index"
            // calloutsYMemberPath="yValue"
            // calloutsLabelMemberPath="content"
            // calloutsContentMemberPath="yValue"


            // properties used in ig example
            //    xAxisFormatLabel={this.formatDateLabel}

            />
            */
        //   :
        //   null;
        let optionChartTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.ChartType).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        let optionCrossHairModeTypes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.ChartCrosshairsMode).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        let optionChartSizes = EnumExtensions_1.EnumExtensions.getNames(Enums_1.ChartSize).map((enumName) => {
            return React.createElement("option", { key: enumName, value: enumName }, enumName);
        });
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithIImageTwoButtons_1.PanelWithImageTwoButtons, { cssClassName: cssClassName, header: StrategyConstants.ChartStrategyName, style: { width: panelWidth }, bsStyle: StyleConstants_1.PRIMARY_BSSTYLE, glyphicon: StrategyConstants.ChartGlyph, secondButton: minmaxButton, firstButton: closeButton }, this.state.IsMinimised == false &&
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
                                        React.createElement(react_bootstrap_1.FormControl, { bsSize: "small", componentClass: "select", placeholder: "select", value: this.state.ChartSize, onChange: (x) => this.onChartSizeChange(x) }, optionChartSizes)))),
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
                                            React.createElement(react_bootstrap_1.Checkbox, { inline: true, disabled: this.state.ChartCrosshairsMode == Enums_1.ChartCrosshairsMode.None, onChange: (e) => this.onEnableCrosshairsAnnotationsOptionChanged(e), checked: this.state.EnableCrosshairsAnnotations }, "Crosshair Legend")))))))));
    }
    onChartMinimised() {
        this.setState({ IsMinimised: true, });
    }
    onChartMaximised() {
        this.setState({ IsMinimised: false, });
    }
    onChartTypeChange(event) {
        let e = event.target;
        this.setState({ ChartType: e.value, });
    }
    onChartSizeChange(event) {
        let e = event.target;
        this.setState({ ChartSize: e.value, });
    }
    onCrosshairsModeChange(event) {
        let e = event.target;
        this.setState({ ChartCrosshairsMode: e.value, });
    }
    onSpanCrossHairsToDataOptionChanged(event) {
        let e = event.target;
        this.setState({ SpanCrossHairsToData: e.checked });
    }
    onEnableCrosshairsAnnotationsOptionChanged(event) {
        let e = event.target;
        this.setState({ EnableCrosshairsAnnotations: e.checked });
    }
    onEnableFinalValueAnnotationsOptionChanged(event) {
        let e = event.target;
        this.setState({ EnableFinalValueAnnotations: e.checked });
    }
    setChartHeight() {
        switch (this.state.ChartSize) {
            case Enums_1.ChartSize.XSmall:
                return '350px';
            case Enums_1.ChartSize.Small:
                return '450px';
            case Enums_1.ChartSize.Medium:
                return '600px';
            case Enums_1.ChartSize.Large:
                return '750px';
            case Enums_1.ChartSize.XLarge:
                return '850px';
        }
    }
    setChartWidth() {
        switch (this.state.ChartSize) {
            case Enums_1.ChartSize.XSmall:
                return '350px';
            case Enums_1.ChartSize.Small:
                return '600px';
            case Enums_1.ChartSize.Medium:
                return '800px';
            case Enums_1.ChartSize.Large:
                return '1000px';
            case Enums_1.ChartSize.XLarge:
                return '1100px';
        }
    }
    setPanelWidth() {
        switch (this.state.ChartSize) {
            case Enums_1.ChartSize.XSmall:
                return '600px';
            case Enums_1.ChartSize.Small:
                return '900px';
            case Enums_1.ChartSize.Medium:
                return '1200px';
            case Enums_1.ChartSize.Large:
                return '1350px';
            case Enums_1.ChartSize.XLarge:
                return '1500px';
        }
    }
    setChartColumnSize() {
        switch (this.state.ChartSize) {
            case Enums_1.ChartSize.XSmall:
                return 7;
            case Enums_1.ChartSize.Small:
            case Enums_1.ChartSize.Medium:
                return 8;
            case Enums_1.ChartSize.Large:
            case Enums_1.ChartSize.XLarge:
                return 9;
        }
    }
    setLegendColumnSize() {
        switch (this.state.ChartSize) {
            case Enums_1.ChartSize.XSmall:
                return 5;
            case Enums_1.ChartSize.Small:
            case Enums_1.ChartSize.Medium:
                return 4;
            case Enums_1.ChartSize.Large:
            case Enums_1.ChartSize.XLarge:
                return 3;
        }
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.ChartInternal.CurrentChartDefinition,
        ChartService: ownProps.ChartService,
        ChartData: state.ChartInternal.ChartData
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.ChartDisplayPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
