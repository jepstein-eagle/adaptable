import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { ChartDisplayPopupPropsBase } from '../Components/SharedProps/ChartDisplayPopupPropsBase'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { IgrCategoryChart } from 'igniteui-react-charts/ES2015/igr-category-chart';
import { IgrCategoryChartModule } from 'igniteui-react-charts/ES2015/igr-category-chart-module';
import { IChartDefinition } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { IChartService } from "../../Core/Services/Interface/IChartService";

interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChartName: string
    ChartService: IChartService
 }

interface ChartDisplayState {
    chartDefinition: IChartDefinition
    chartData: any
}

class ChartDisplayPopupComponent extends React.Component<ChartDisplayPopupProps, ChartDisplayState> {

    constructor(props: ChartDisplayPopupProps) {
        super(props);

        // this line is commented out as we cannot run it otherwise...
        IgrCategoryChartModule.register();
       let currentChartDefinition: IChartDefinition = this.props.ChartDefinitions.find(cd => cd.Name == this.props.CurrentChartName);
        this.state = {
            chartDefinition: currentChartDefinition,
            chartData: this.props.ChartService.BuildChartData(currentChartDefinition, this.props.Columns)
        };
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__Charts";

        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.ChartStrategyName} bsStyle="primary" glyphicon={StrategyConstants.ChartGlyph}>
            {this.state.chartData != null &&
                    <IgrCategoryChart
                        yAxisMinimumValue={0}
                      //  chartType="area"
                        chartTitle={this.props.CurrentChartName}
                        yAxisTitle={this.state.chartDefinition.YAxisColumn}
                        xAxisTitle={this.state.chartDefinition.XAxisColumn}
                        width="700px"
                        height="500px"
                        dataSource={this.state.chartData} />
                }
            </PanelWithImage>
        </div>
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartName: state.Chart.CurrentChartName,
        ChartService: ownProps.ChartService
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
    
    };
}

export let ChartDisplayPopup = connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);

/*
 
*/