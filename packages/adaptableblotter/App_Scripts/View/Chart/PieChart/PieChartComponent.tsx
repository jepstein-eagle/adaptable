import * as React from "react";
import { IgrItemLegendModule } from 'igniteui-react-charts/ES2015/igr-item-legend-module';
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChartModule } from 'igniteui-react-charts/ES2015/igr-doughnut-chart-module';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrRingSeriesModule } from 'igniteui-react-charts/ES2015/igr-ring-series-module';
import { IgrRingSeries } from 'igniteui-react-charts/ES2015/igr-ring-series';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { IgrPieChartModule } from 'igniteui-react-charts/ES2015/igr-pie-chart-module';
import { SliceClickEventArgs } from "igniteui-react-charts/ES2015/igr-slice-click-event-args";
import { ICategoryChartDefinition, IChartProperties, IPieChartDefinition } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";

/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
interface PieChartComponentProps {
    cssClassName: string,
    CurrentChartDefinition: IPieChartDefinition;
    ChartData: any;
}

interface PieChartComponentState {
    cssClassName: string,
}


export class PieChartComponent extends React.Component<PieChartComponentProps, PieChartComponentState> {


    constructor(props: PieChartComponentProps) {
        super(props);


        //  this.state = CategoryChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition as ICategoryChartDefinition, this.props.Columns);

        IgrPieChartModule.register();
        IgrDoughnutChartModule.register();
        IgrRingSeriesModule.register();
        IgrItemLegendModule.register();

    }

    componentWillReceiveProps(nextProps: PieChartComponentProps, nextContext: any) {
        //  if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
        //      this.state = CategoryChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition as ICategoryChartDefinition, this.props.Columns);
        //  }
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__PieCharts";





        let chartElement = <IgrPieChart
            // ref={this.onPieChartRef}
            dataSource={this.props.ChartData}

            radiusFactor={0.6}
            labelMemberPath={"Name"}
            valueMemberPath={"Value"}
            // legendLabelMemberPath={this.state.SliceLegendMapping}
            width={'500px'}
            height={'500px'}
            selectionMode="single"
        //  sliceClick={(s, e) => this.onSliceClick(e)}
        />




        return <span className={cssClassName}>
            <div
            >
                <span>
                    {this.props.CurrentChartDefinition.Name}
                    {this.props.ChartData != null &&
                        <div>
                            {chartElement}
                        </div>
                    }

                </span>


            </div>



        </span>
    }





    private updateChartProperties(chartProperties: IChartProperties): void {
        //   this.setState({ ChartProperties: chartProperties, } as CategoryChartComponentState)
        //   this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Name, chartProperties)
    }









}



