import * as React from "react";
import { FormGroup, FormControl, Row, Col, Panel, Checkbox, HelpBlock } from 'react-bootstrap';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { IgrLegend } from 'igniteui-react-charts/ES2015/igr-legend';
import { IgrPieChartModule } from 'igniteui-react-charts/ES2015/igr-pie-chart-module';

export interface PieChartComponentProps extends React.ClassAttributes<PieChartComponent> {
    PieData: any;
    LabelMember: string;
    ValueMember: string;
    Width: number;
    Height: number
}

export interface PieChartComponentState {

}

export class PieChartComponent extends React.Component<PieChartComponentProps, PieChartComponentState>  {

    constructor(props: PieChartComponentProps) {
        super(props)
        this.state = {
        }

        IgrPieChartModule.register();
    }

    render() {

        let cssClassName: string = 'todo'//this.props.cssClassName + PieChartConstants.PieChart_COMPONENT


        return <div className={cssClassName}>

            <IgrPieChart dataSource={this.props.PieData}
                labelMemberPath={this.props.LabelMember}
                valueMemberPath={this.props.ValueMember}
                width={this.props.Width + "px"}
                height={this.props.Height + "px"}
                legendLabelMemberPath="Label"
            />
            {/*
<IgrLegend ref={this.legend} />    
*/}
        </div>
    }




}


