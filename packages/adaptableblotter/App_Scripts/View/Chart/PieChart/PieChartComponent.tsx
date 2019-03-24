import * as React from "react";
import { IgrPieChart } from "igniteui-react-charts/ES2015/igr-pie-chart";
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
    }

    componentWillReceiveProps(nextProps: PieChartComponentProps, nextContext: any) {
      //  if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
      //      this.state = CategoryChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition as ICategoryChartDefinition, this.props.Columns);
      //  }
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__CategoryCharts";



    

        let chartElement =  <IgrPieChart
       // ref={this.onPieChartRef}
        dataSource={this.props.ChartData}
       
        radiusFactor={0.6}
        selectionMode="single"
      //  sliceClick={(s, e) => this.onSliceClick(e)}
    />


        

        return <span className={cssClassName}>
            <div
            >
                <span>
                    In pie chart component
                            {this.props.ChartData != null &&
                                chartElement
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



