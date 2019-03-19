import * as React from "react";
import { connect } from 'react-redux';
import { ControlLabel, FormGroup, Col, Row, Panel, HelpBlock, Checkbox, FormControl } from 'react-bootstrap';
import { SelectionMode, PieChartOthersCategoryType } from '../../Utilities/Enums'
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps'
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { IColumn } from "../../Utilities/Interface/IColumn";
import { IgrItemLegendModule } from 'igniteui-react-charts/ES2015/igr-item-legend-module';
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChartModule } from 'igniteui-react-charts/ES2015/igr-doughnut-chart-module';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrRingSeriesModule } from 'igniteui-react-charts/ES2015/igr-ring-series-module';
import { IgrRingSeries } from 'igniteui-react-charts/ES2015/igr-ring-series';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { IgrPieChartModule } from 'igniteui-react-charts/ES2015/igr-pie-chart-module';
import { SliceClickEventArgs } from "igniteui-react-charts/ES2015/igr-slice-click-event-args";
import { DEFAULT_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { AdaptablePopover } from "../AdaptablePopover";
import { AdaptableBlotterState } from "../../Redux/Store/Interface/IAdaptableStore";


interface PieChartPopupProps extends StrategyViewPopupProps<PieChartPopupComponent> {
    PieChartText: string;
}

interface PieChartPopupState {
    SelectedColumnId: string;
    PieChartData: any;
    ShowVisibleRowsOnly: boolean;

    PieChartOthersCategoryType: PieChartOthersCategoryType;
    OthersCategoryThreshold: number;
    CurrentColumnCount: number;
    CurrentColumnValue: string;
    ShowAsDoughnut: boolean;
}

class PieChartPopupComponent extends React.Component<PieChartPopupProps, PieChartPopupState> {

    public doughnutChart: IgrDoughnutChart;
    public pieChart: IgrPieChart;
    public doughnutlegend: IgrItemLegend;
    public pieChartlegend: IgrItemLegend;


    constructor(props: PieChartPopupProps) {
        super(props);
        this.state = {
            SelectedColumnId: "",
            PieChartData: null,
            ShowVisibleRowsOnly: false,
            PieChartOthersCategoryType: PieChartOthersCategoryType.Number,
            OthersCategoryThreshold: 0,
            CurrentColumnCount: 0,
            CurrentColumnValue: "",
            ShowAsDoughnut: false,
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


    componentDidMount() {
        if (StringExtensions.IsNotNullOrEmpty(this.props.PopupParams)) {
            let pieChartData: any[] = this.props.Blotter.ChartService.BuildPieChartData(this.props.PopupParams, false);
            this.setState({ SelectedColumnId: this.props.PopupParams, PieChartData: pieChartData })
        }
    }

    render() {
        let cssClassName: string = this.props.cssClassName + "__PieChart";

        let infoBody: any[] = ["See the count for each distinct value in the column as pie chart.", <br />, <br />, "There is an option to view as doughnut and to set the 'Others' threshold."]

        let chartSize: string = '450px'


        let chartBlock = <div>{this.state.ShowAsDoughnut ?
            <IgrDoughnutChart
                height={chartSize}
                width={chartSize}
                allowSliceSelection="true"
                allowSliceExplosion="true"
                sliceClick={(s, e) => this.onSliceClick(e)}
                ref={this.onDoughnutChartRef}
            >
                <IgrRingSeries
                    name="ring1"
                    dataSource={this.state.PieChartData}
                    labelMemberPath={"ColumnValue"}
                    valueMemberPath={"ColumnCount"}
                    othersCategoryThreshold={this.state.OthersCategoryThreshold}
                    othersCategoryType={this.state.PieChartOthersCategoryType}
                    othersCategoryText="Others"

                />
            </IgrDoughnutChart>
            :
            <IgrPieChart
                ref={this.onPieChartRef}
                dataSource={this.state.PieChartData}
                labelMemberPath={"ColumnValue"}
                valueMemberPath={"ColumnCount"}
                width={chartSize}
                height={chartSize}
                legendLabelMemberPath="Value"
                othersCategoryThreshold={this.state.OthersCategoryThreshold}
                othersCategoryType={this.state.PieChartOthersCategoryType}
                othersCategoryText="Others"
                selectionMode="single"
                sliceClick={(s, e) => this.onSliceClick(e)}
            />
        }
            {StringExtensions.IsNotNullOrEmpty(this.state.CurrentColumnValue) &&
                <Row style={{ marginLeft: '0px', marginRight: '0px', marginBottom: '0px' }} >
                    <FormGroup controlId="formSelectedColumnValue" >
                        <ControlLabel style={{ fontSize: 'small' }}>{this.state.CurrentColumnValue} ({this.state.CurrentColumnCount})</ControlLabel>
                    </FormGroup>
                </Row>
            }
        </div>


        let settingsBlock = <Panel bsSize={"xs"} bsStyle={DEFAULT_BSSTYLE} header={"Settings"} style={{
            'overflowY': 'auto',
            'overflowX': 'hidden',
            height: '465px',
            padding: '0px',
            margin: '0px',
            marginTop: '20px',
            marginRight: '0px',
            fontSize: 'small'
        }}>
            <Row style={{ marginLeft: '0px', marginRight: '0px', marginBottom: '0px', marginTop: '0px', padding: '0px' }} >
                <HelpBlock style={{ fontSize: 'small', margin: '0px' }}>
                    <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                        onChange={(e) => this.onShowDoughnutChanged(e)}
                        checked={this.state.ShowAsDoughnut} >Doughnut View</Checkbox>
                </HelpBlock>
                <HelpBlock style={{ fontSize: 'small', margin: '0px' }}>
                    <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                        onChange={(e) => this.onRowVisibilityChanged(e)}
                        checked={this.state.ShowVisibleRowsOnly} >Visible Rows Only</Checkbox>
                </HelpBlock>
                <HelpBlock style={{ fontSize: 'small' }}>Others Threshold
                        {' '}
                    <AdaptablePopover cssClassName={cssClassName} headerText={"Pie Chart: Others Threshold"} bodyText={["Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value."]} />
                </HelpBlock>
                <FormControl
                    bsSize={"small"} type="number"
                    placeholder={"Input"}
                    onChange={this.onOthersCategoryThresholdChanged}
                    value={this.state.OthersCategoryThreshold} />

                <HelpBlock style={{ fontSize: 'small' }}>
                    <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                        onChange={(e) => this.onThresholdAsPercentChanged(e)}
                        checked={this.state.PieChartOthersCategoryType == PieChartOthersCategoryType.Percent} >'Others' Threshold as %
                   </Checkbox>
                </HelpBlock>
            </Row>

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


        return <div className={cssClassName}>
            <PanelWithImage cssClassName={cssClassName} header={StrategyConstants.PieChartStrategyName} bsStyle="primary" glyphicon={StrategyConstants.PieChartGlyph} infoBody={infoBody}>

                <AdaptableBlotterForm horizontal>
                    <FormGroup controlId="pieChartSettings" style={{ marginBottom: '0px' }}>
                        <Row>
                            <Col xs={1}>{' '} </Col>
                            <Col xs={3}><ControlLabel>Selected Column</ControlLabel></Col>
                            <Col xs={5} >
                                <ColumnSelector cssClassName={cssClassName} SelectedColumnIds={[this.state.SelectedColumnId]}
                                    ColumnList={this.props.Columns}
                                    onColumnChange={columns => this.onColumnSelectedChanged(columns)}
                                    SelectionMode={SelectionMode.Single} />
                            </Col>
                            <Col xs={3}>
                            </Col>
                        </Row>

                    </FormGroup>

                </AdaptableBlotterForm>
                {StringExtensions.IsNotNullOrEmpty(this.state.SelectedColumnId) &&
                    <div>
                        <Row>
                            <Col xs={8} >
                                {chartBlock}
                            </Col>
                            <Col xs={4} >
                                {settingsBlock}
                            </Col>
                        </Row>
                    </div>
                }
            </PanelWithImage>
        </div>
    }

    private onColumnSelectedChanged(columns: IColumn[]) {

        let pieChartData: any[] = (columns.length > 0) ?
            this.props.Blotter.ChartService.BuildPieChartData(columns[0].ColumnId, this.state.ShowVisibleRowsOnly)
            :
            []

        this.setState({ SelectedColumnId: columns.length > 0 ? columns[0].ColumnId : null, PieChartData: pieChartData })
    }



    public onDoughnutChartRef(doughnutChart: IgrDoughnutChart) {
        this.doughnutChart = doughnutChart;
        if (this.doughnutlegend && this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutlegend;
        }
    }

    public onPieChartRef(pieChart: IgrPieChart) {
        this.pieChart = pieChart;
        if (this.pieChartlegend && this.pieChart) {
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


    private onOthersCategoryThresholdChanged = (e: any) => {
        this.setState({ OthersCategoryThreshold: e.target.value } as PieChartPopupState)
    }

    private onShowDoughnutChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShowAsDoughnut: e.checked, CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartPopupState);
    }

    private onRowVisibilityChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let pieChartData: any[] = this.props.Blotter.ChartService.BuildPieChartData(this.state.SelectedColumnId, e.checked);
        this.setState({ ShowVisibleRowsOnly: e.checked, PieChartData: pieChartData, CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartPopupState);
    }

    private onThresholdAsPercentChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let pieChartOthersCategoryType: PieChartOthersCategoryType = (e.checked) ? PieChartOthersCategoryType.Percent : PieChartOthersCategoryType.Number;
        this.setState({ PieChartOthersCategoryType: pieChartOthersCategoryType } as PieChartPopupState);
    }

    public onSliceClick(e: SliceClickEventArgs): void {

        e.isExploded = !e.isExploded;
        e.isSelected = !e.isSelected
        if (e.isExploded) {
            this.setState({ CurrentColumnCount: e.dataContext.ColumnCount, CurrentColumnValue: e.dataContext.ColumnValue } as PieChartPopupState);
        } else {
            this.setState({ CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartPopupState);

        }
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
    };
}

function mapDispatchToProps() {
    return {
    };
}

export let PieChartPopup = connect(mapStateToProps, mapDispatchToProps)(PieChartPopupComponent);
