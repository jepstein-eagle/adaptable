"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_redux_1 = require("react-redux");
const StrategyNames = require("../../Core/Constants/StrategyNames");
const StrategyGlyphs = require("../../Core/Constants/StrategyGlyphs");
const PanelWithImage_1 = require("../Components/Panels/PanelWithImage");
class ChartDisplayPopupComponent extends React.Component {
    constructor(props) {
        super(props);
        // this line is commented out as we cannot run it otherwise...
        //  IgrCategoryChartModule.register();
        let currentChartDefinition = this.props.ChartDefinitions.find(cd => cd.Name == this.props.CurrentChartName);
        this.state = {
        //      chartData: this.props.ChartService.BuildChartData(currentChartDefinition, this.props.Columns)
        };
    }
    render() {
        let cssClassName = this.props.cssClassName + "__Charts";
        return React.createElement("div", { className: cssClassName },
            React.createElement(PanelWithImage_1.PanelWithImage, { cssClassName: cssClassName, header: StrategyNames.ChartStrategyName, bsStyle: "primary", glyphicon: StrategyGlyphs.ChartGlyph }, "}"));
    }
}
function mapStateToProps(state, ownProps) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartName: state.Chart.CurrentChartName,
        ChartService: ownProps.ChartService
    };
}
function mapDispatchToProps(dispatch) {
    return {};
}
exports.ChartDisplayPopup = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
/*
 {this.state.chartData != null &&
                    <IgrCategoryChart
                        yAxisMinimumValue={0}
                        chartTitle={this.props.CurrentChartName}
                        yAxisTitle="Notional"
                        xAxisTitle="Counterparty"
                        width="700px"
                        height="500px"
                        dataSource={this.state.chartData} />
*/ 
