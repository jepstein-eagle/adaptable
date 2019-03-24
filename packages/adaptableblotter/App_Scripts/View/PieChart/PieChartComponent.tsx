

/*
import * as React from "react";
import { FormGroup, FormControl, Row, Col, Panel, Checkbox, HelpBlock, ControlLabel, Form } from 'react-bootstrap';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { IgrPieChartModule } from 'igniteui-react-charts/ES2015/igr-pie-chart-module';
import { PieChartOthersCategoryType } from "../../Utilities/Enums";
import { IgrPieChartBase, IIgrPieChartBaseProps } from "igniteui-react-charts/ES2015/igr-pie-chart-base";
import { IgrItemLegendModule } from 'igniteui-react-charts/ES2015/igr-item-legend-module';
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChartModule } from 'igniteui-react-charts/ES2015/igr-doughnut-chart-module';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrRingSeriesModule } from 'igniteui-react-charts/ES2015/igr-ring-series-module';
import { IgrRingSeries } from 'igniteui-react-charts/ES2015/igr-ring-series';

import { SliceClickEventArgs } from "igniteui-react-charts/ES2015/igr-slice-click-event-args";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { AdaptablePopover } from "../AdaptablePopover";
import { ButtonGeneral } from "../Components/Buttons/ButtonGeneral";
import { INFO_BSSTYLE, DEFAULT_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { ButtonClose } from "../Components/Buttons/ButtonClose";

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
    IsPieChartSettingsVisible: boolean
}

export class PieChartComponent extends React.Component<PieChartProps, PieChartState>  {

    public doughnutChart: IgrDoughnutChart;
    public pieChart: IgrPieChart;
    public doughnutlegend: IgrItemLegend;
    public pieChartlegend: IgrItemLegend;

    constructor(props: PieChartProps) {
        super(props)
        this.state = {
            ShowVisibleRowsOnly: this.props.ShowVisibleRows,
            PieChartOthersCategoryType: PieChartOthersCategoryType.Number,
            OthersCategoryThreshold: 0,
            CurrentColumnCount: 0,
            CurrentColumnValue: "",
            ShowAsDoughnut: false,
            IsPieChartSettingsVisible: false
        }
        IgrPieChartModule.register();
        IgrDoughnutChartModule.register();
        IgrRingSeriesModule.register();
        IgrItemLegendModule.register();

        this.onPieChartRef = this.onPieChartRef.bind(this);
        this.onDoughnutChartRef = this.onDoughnutChartRef.bind(this);
        this.onDoughnutLegendRef = this.onDoughnutLegendRef.bind(this);
        this.onPieChartLegendRef = this.onPieChartLegendRef.bind(this);
    }

    render() {

        let cssClassName: string = 'todo'//this.props.cssClassName + PieChartConstants.PieChart_COMPONENT

        let chartSize: string = (this.state.IsPieChartSettingsVisible) ? '300px' : '500px'


        let openChartSettingsButton =
            <ButtonGeneral
                cssClassName={cssClassName}
                style={{ marginRight: '20px' }}
                onClick={() => this.onShowPieChartSettings()}
                bsStyle={INFO_BSSTYLE}
                size={"small"}
                DisplayMode="Text"
                hideToolTip={true}
                overrideText={'Show Chart Settings'}
            />

        let closeChartSettingsButton =
            <ButtonClose
                cssClassName={cssClassName}
                onClick={() => this.onHidePieChartSettings()}
                bsStyle={DEFAULT_BSSTYLE}
                size={"xs"}
                DisplayMode="Glyph"
                hideToolTip={false}
                overrideTooltip={"Close Chart Settings"}
            />

        let legendBlock = <div>
            <Panel style={{
                'overflowY': 'auto',
                'overflowX': 'hidden',
                'height': '450px'
            }}>
                {this.state.ShowAsDoughnut ?
                    <div className="doughnutLegend">
                        <IgrItemLegend ref={this.onDoughnutLegendRef} />
                    </div>
                    :
                    <div className="pieChartLegend">
                        <IgrItemLegend ref={this.onPieChartLegendRef} />
                    </div>
                }
            </Panel>
        </div>

        let chartBlock = <div>{this.state.ShowAsDoughnut ?
            <IgrDoughnutChart
                height={chartSize}
                width={chartSize}
                allowSliceSelection="true"
                allowSliceExplosion="true"
                sliceClick={(s, e) => this.onSliceClick(s, e)}
                ref={this.onDoughnutChartRef}
            >
                <IgrRingSeries
                    name="ring1"
                    dataSource={this.props.PieData}
                    labelMemberPath={this.props.LabelMember}
                    valueMemberPath={this.props.ValueMember}
                    othersCategoryThreshold={this.state.OthersCategoryThreshold}
                    othersCategoryType={this.state.PieChartOthersCategoryType}
                    othersCategoryText="Others"

                />
            </IgrDoughnutChart>
            :
            <IgrPieChart
                ref={this.onPieChartRef}
                dataSource={this.props.PieData}
                labelMemberPath={this.props.LabelMember}
                valueMemberPath={this.props.ValueMember}
                width={chartSize}
                height={chartSize}
                legendLabelMemberPath="Value"
                othersCategoryThreshold={this.state.OthersCategoryThreshold}
                othersCategoryType={this.state.PieChartOthersCategoryType}
                othersCategoryText="Others"
                selectionMode="single"
                sliceClick={(s, e) => this.onSliceClick(s, e)}
            />
        }
        </div>

        let settingsBlock = <PanelWithButton bsSize={"xs"} bsStyle={INFO_BSSTYLE} headerText={"Settings"} cssClassName={cssClassName}
            button={closeChartSettingsButton} style={{ marginRight: '30px' }} >
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
                        checked={this.state.ShowVisibleRowsOnly} >Visible Rows</Checkbox>
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
            <Row style={{ marginLeft: '10px', marginRight: '20px', marginBottom: '0px' }} >
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
        </PanelWithButton>

        return <div className={cssClassName} style={{ marginBottom: '0px', marginLeft: '5px' }}>

            {this.state.IsPieChartSettingsVisible == false &&
                <Row style={{ marginTop: '5px' }}>
                    <Col xs={12} >
                        <div className="pull-right" >
                            {openChartSettingsButton}
                        </div>
                    </Col>
                </Row>

            }

            {this.state.IsPieChartSettingsVisible ?

                <Row style={{ marginLeft: '10px' }}>
                    <Col xs={3} style={{ marginTop: '20px' }} >
                        {legendBlock}
                    </Col>
                    <Col xs={5} >
                        {chartBlock}
                    </Col>
                    <Col xs={4} style={{ marginTop: '20px' }} >
                        {settingsBlock}
                    </Col>
                </Row>
                :
                <Row style={{ marginLeft: '10px' }}>
                    <Col xs={3} style={{ marginTop: '20px' }} >
                        {legendBlock}
                    </Col>
                    <Col xs={9} >
                        {chartBlock}
                    </Col>

                </Row>
            }

        </div>
    }

    onShowPieChartSettings() {
        this.setState({ IsPieChartSettingsVisible: true, } as PieChartState)
    }

    onHidePieChartSettings() {
        this.setState({ IsPieChartSettingsVisible: false, } as PieChartState)
    }

    public onDoughnutChartRef(doughnutChart: IgrDoughnutChart) {
        this.doughnutChart = doughnutChart;
        if (this.doughnutlegend) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutlegend;
        }
    }

    public onPieChartRef(pieChart: IgrPieChart) {
        this.pieChart = pieChart;
        if (this.pieChartlegend) {
            this.pieChart.legend = this.pieChartlegend;
        }
    }

    public onDoughnutLegendRef(legend: IgrItemLegend) {
        this.doughnutlegend = legend;
        if (this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutlegend;
        }
    }

    public onPieChartLegendRef(legend: IgrItemLegend) {
        this.pieChartlegend = legend;
        if (this.pieChart) {
            this.pieChart.legend = this.pieChartlegend;
        }
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



*/