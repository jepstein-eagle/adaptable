import * as React from "react";
import { FormGroup, FormControl, Row, Col, Panel, Checkbox, HelpBlock, ControlLabel, Form } from 'react-bootstrap';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { IgrPieChartModule } from 'igniteui-react-charts/ES2015/igr-pie-chart-module';
import { PieChartOthersCategoryType } from "../../Utilities/Enums";
import { IgrPieChartBase, IIgrPieChartBaseProps } from "igniteui-react-charts/ES2015/igr-pie-chart-base";

import { IgrDoughnutChartModule } from 'igniteui-react-charts/ES2015/igr-doughnut-chart-module';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrRingSeriesModule } from 'igniteui-react-charts/ES2015/igr-ring-series-module';
import { IgrRingSeries } from 'igniteui-react-charts/ES2015/igr-ring-series';

import { SliceClickEventArgs } from "igniteui-react-charts/ES2015/igr-slice-click-event-args";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { AdaptablePopover } from "../AdaptablePopover";

export interface PieChartProps extends React.ClassAttributes<PieChartComponent> {
    PieData: any;
    LabelMember: string;
    ValueMember: string;
    Width: number;
    Height: number
    showVisibleClick: () => void;
    showAllClick: () => void;
    ShowVisibleRows: boolean
}

export interface PieChartState {
    ShowVisibleRowsOnly: boolean;
    PieChartOthersCategoryType: PieChartOthersCategoryType;
    OthersCategoryThreshold: number;
    CurrentColumnCount: number;
    CurrentColumnValue: string;
    ShowAsDoughnut: boolean;
}

export class PieChartComponent extends React.Component<PieChartProps, PieChartState>  {

    private chart: IgrPieChart

    constructor(props: PieChartProps) {
        super(props)
        this.state = {
            ShowVisibleRowsOnly: this.props.ShowVisibleRows,
            PieChartOthersCategoryType: PieChartOthersCategoryType.Number,
            OthersCategoryThreshold: 0,
            CurrentColumnCount: 0,
            CurrentColumnValue: "",
            ShowAsDoughnut: false
        }
        IgrPieChartModule.register();
        IgrDoughnutChartModule.register();
        IgrRingSeriesModule.register();
    }

    render() {

        let cssClassName: string = 'todo'//this.props.cssClassName + PieChartConstants.PieChart_COMPONENT

        return <div className={cssClassName} style={{ marginBottom: '0px', marginLeft: '5px' }}>
            <Row style={{ marginLeft: '10px' }}>
                <Col xs={8} >
                    {this.state.ShowAsDoughnut == false ?
                        <IgrPieChart
                            dataSource={this.props.PieData}
                            labelMemberPath={this.props.LabelMember}
                            valueMemberPath={this.props.ValueMember}
                            width={this.props.Width + "px"}
                            height={this.props.Height + "px"}
                            legendLabelMemberPath="Label"
                            othersCategoryThreshold={this.state.OthersCategoryThreshold}
                            othersCategoryType={this.state.PieChartOthersCategoryType}
                            othersCategoryText="Others"
                            //  ref={this.onPieRef}
                            selectionMode="single"
                            sliceClick={(s, e) => this.onSliceClick(s, e)}
                        />
                        :
                        <IgrDoughnutChart
                            height={this.props.Height + "px"}
                            allowSliceSelection="true"
                            allowSliceExplosion="true"
                            sliceClick={(s, e) => this.onSliceClick(s, e)}
                        >
                            <IgrRingSeries
                                name="ring1"
                                dataSource={this.props.PieData}
                                labelMemberPath={this.props.LabelMember}
                                valueMemberPath={this.props.ValueMember}
                                othersCategoryThreshold={this.state.OthersCategoryThreshold}
                                othersCategoryType={this.state.PieChartOthersCategoryType}
                                othersCategoryText="Others"
                            //  ref={this.onPieRef}
                            />
                        </IgrDoughnutChart>

                    }
                </Col>
                <Col xs={4} >
                    <Panel style={{ marginRight: '35px', marginTop: '40px' }} header={"Pie Chart Settings"}>
                        <Row style={{ marginLeft: '0px', marginRight: '10px', marginBottom: '0px', marginTop: '0px' }} >
                            <HelpBlock style={{ fontSize: 'small', marginBottom: '0px' }}>
                                <Checkbox
                                    onChange={(e) => this.onShowDoughnutChanged(e)}
                                    checked={this.state.ShowAsDoughnut} >Doughnut View</Checkbox>
                            </HelpBlock>
                        </Row>
                        <Row style={{ marginLeft: '0px', marginRight: '10px', marginBottom: '0px' }} >
                            <HelpBlock style={{ fontSize: 'small', marginBottom: '10px' }}>
                                <Checkbox
                                    onChange={(e) => this.onRowVisibilityChanged(e)}
                                    checked={this.state.ShowVisibleRowsOnly} >Visible Rows Only</Checkbox>
                            </HelpBlock>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '0px' }} >
                            <FormGroup controlId="formOthersThreshold" >
                                <HelpBlock style={{ fontSize: 'small' }}>'Others' Threshold
                                {' '}
                                    <AdaptablePopover cssClassName={cssClassName} headerText={"Pie Chart: Others Threshold"} bodyText={["Items with value less than or equal to the Threshold will be assigned to the “Others” category."]} />
                                </HelpBlock>
                                <FormControl
                                    bsSize={"small"} type="number"
                                    placeholder={"Input"}
                                    onChange={this.onOthersCategoryThresholdChanged}
                                    value={this.state.OthersCategoryThreshold} />
                            </FormGroup>
                        </Row>
                        <Row style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '0px' }} >
                            <FormGroup controlId="formOthersType" >
                                <HelpBlock style={{ fontSize: 'small' }}>'Others' Type
                                    {' '}
                                    <AdaptablePopover cssClassName={cssClassName} headerText={"Pie Chart: Others Type"} bodyText={["Choose whether the 'Others' threshold will be interpreted as a percentage or as a value."]} />
                                </HelpBlock>
                                <FormControl
                                    bsSize={"small"}
                                    componentClass="select"
                                    placeholder="select"
                                    value={this.state.PieChartOthersCategoryType}
                                    onChange={(x) => this.onOthersCategoryTypeChanged(x)} >
                                    {this.getPieChartOthersCategoryTypeOptions()}
                                </FormControl>
                            </FormGroup>
                        </Row>
                        {StringExtensions.IsNotNullOrEmpty(this.state.CurrentColumnValue) &&
                            <Row style={{ marginLeft: '10px', marginRight: '10px', marginBottom: '0px' }} >
                                <FormGroup controlId="formSelectedColumnValue" >
                                    <ControlLabel style={{ fontSize: 'small' }}>{this.state.CurrentColumnValue} ({this.state.CurrentColumnCount})</ControlLabel>
                                </FormGroup>
                            </Row>
                        }
                    </Panel>
                </Col>
            </Row>
            {/*
<IgrLegend ref={this.legend} />    
*/}
        </div>
    }

    private getPieChartOthersCategoryTypeOptions(): JSX.Element[] {
        let options = EnumExtensions.getNames(PieChartOthersCategoryType).map((enumName) => {
            let name = enumName.toString();
            return <option key={name} value={name}>{name}</option>
        })
        return options;
    }

    private onOthersCategoryThresholdChanged = (e: any) => {
        this.setState({ OthersCategoryThreshold: e.target.value } as PieChartState)
    }

    private onShowDoughnutChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShowAsDoughnut: e.checked, CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartState);
    }

    private onRowVisibilityChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.props.showVisibleClick();
        } else {
            this.props.showAllClick();
        }
        this.setState({ ShowVisibleRowsOnly: e.checked, CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartState);
    }

    private onOthersCategoryTypeChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ PieChartOthersCategoryType: e.value } as PieChartState)
    }


    public onSliceClick(s: any, e: SliceClickEventArgs): void {

        e.isExploded = !e.isExploded;
        e.isSelected = !e.isSelected
        if (e.isExploded) {
            this.setState({ CurrentColumnCount: e.dataContext.ColumnCount, CurrentColumnValue: e.dataContext.ColumnValue } as PieChartState);
        } else {
            this.setState({ CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartState);

        }
    }


    //  public onSliceClick = (s: IgrDoughnutChart, e: SliceClickEventArgs) => {
    //      e.isExploded = !e.isExploded;
    //      e.isSelected = false;
    //  }
}


