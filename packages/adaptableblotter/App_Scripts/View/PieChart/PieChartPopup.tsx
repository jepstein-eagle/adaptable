import * as React from "react";
import { connect } from 'react-redux';
import { ControlLabel, FormGroup, Col, Row, Panel, HelpBlock, Checkbox, FormControl } from 'react-bootstrap';
import { SelectionMode } from '../../Utilities/Enums'
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

import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { IPieChartDefinition, IPieChartDataItem, IChartData } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ObjectFactory } from "../../Utilities/ObjectFactory";
import { PieChartLabelPosition, SliceSortOption, PieChartOthersCategoryType } from "../../Utilities/ChartEnums";
import { PieChartUIHelper } from "../Chart/PieChart/PieChartUIHelper";

interface PieChartPopupProps extends StrategyViewPopupProps<PieChartPopupComponent> {
}

interface PieChartPopupState {
    PieChartDefinition: IPieChartDefinition

    ErrorMessage: string;
    DataSource: IPieChartDataItem[];
    OthersCategoryType: PieChartOthersCategoryType;
    OthersCategoryThreshold: number;
    ShowAsDoughnut: boolean;

    SliceLabelsPosition: string;
    SliceLabelsMapping: string;
    SliceLegendMapping: string;
    SliceValuesMapping: string;
    SliceSortOption: SliceSortOption;
    SliceBrushes: string[];
}

class PieChartPopupComponent extends React.Component<PieChartPopupProps, PieChartPopupState> {

    public doughnutChart: IgrDoughnutChart;
    public doughnutLegend: IgrItemLegend;
    public pieChart: IgrPieChart;
    public pieChartLegend: IgrItemLegend;

    constructor(props: PieChartPopupProps) {
        super(props);
        this.state = {
            PieChartDefinition: ObjectFactory.CreateEmptyPieChartDefinition(),
            ErrorMessage: null,
            DataSource: null,

            OthersCategoryType: PieChartOthersCategoryType.Percent,
            OthersCategoryThreshold: 2,
            ShowAsDoughnut: false,

            SliceValuesMapping: "Value",
            SliceLabelsMapping: "Name",
            SliceLegendMapping: "ValueAndName",
            SliceSortOption: SliceSortOption.ValueDescending,
            SliceLabelsPosition: PieChartLabelPosition.BestFit,
            SliceBrushes: PieChartUIHelper.getBrushesEven(),
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
        const column = this.props.PopupParams;
        if (StringExtensions.IsNotNullOrEmpty(column)) {
            this.updateDataSource(null, column);
        }
    }

    getOptionsForLabelsPosition(): JSX.Element[] {
        let optionElements = EnumExtensions.getNames(PieChartLabelPosition).map((v) => {
            return <option key={v} value={v}>{v as PieChartLabelPosition}</option>
        })
        return optionElements;
    }

    public SliceValueOptions: string[] = ["Value", "Ratio"];
    public SliceLabelOptions: string[] = ["Value", "ValueAndName",
        "Ratio", "RatioAndName", "Name",];
    getOptionsForSliceLabelsMapping(): JSX.Element[] {
        let optionElements = this.SliceLabelOptions.map((v) => {
            return <option key={v} value={v}>{v}</option>
        })
        return optionElements;
    }
    getOptionsForSliceValuesMapping(): JSX.Element[] {
        let optionElements = this.SliceValueOptions.map((v) => {
            return <option key={v} value={v}>{v}</option>
        })
        return optionElements;
    }

    public SliceSorByOptions: string[] = ["Value Descending", "Value Ascending", "Name Descending", "Name Ascending",];
    getOptionsForSliceSortOrders(): JSX.Element[] {
        let optionElements = this.SliceSorByOptions.map((v) => {
            return <option key={v} value={v}>{v}</option>
        })
        return optionElements;
    }



    hasValidDataSelection(): boolean {
        return StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.SecondaryColumnId) ||
            StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.PrimaryColumnId);
    }


    render() {
        let cssClassName: string = this.props.cssClassName + "__PieChart";
        let infoBody: any[] = ["See the count for each distinct visible value in the column as pie chart.", <br />, "There are options to view as doughnut, set the 'Others' threshold (and type) and manage labels."]
        let chartSize: string = '450px'
        let radiusFactor: number = 0.8



        let chartBlock = <div>{this.state.ShowAsDoughnut ?
            <IgrDoughnutChart
                height={chartSize}
                width={chartSize}
                allowSliceSelection="true"
                allowSliceExplosion="true"
                ref={this.onDoughnutChartRef}>
                <IgrRingSeries
                    name="ring1"
                    dataSource={this.state.DataSource}
                    labelsPosition={this.state.SliceLabelsPosition}
                    labelMemberPath={this.state.SliceLabelsMapping}
                    valueMemberPath={this.state.SliceValuesMapping}
                    legendLabelMemberPath={this.state.SliceLegendMapping}
                    othersCategoryThreshold={this.state.OthersCategoryThreshold}
                    othersCategoryType={this.state.OthersCategoryType}
                    othersCategoryText="Others"
                    brushes={this.state.SliceBrushes}
                    outlines={this.state.SliceBrushes}
                    radiusFactor={radiusFactor} />
            </IgrDoughnutChart>
            :
            <IgrPieChart
                ref={this.onPieChartRef}
                dataSource={this.state.DataSource}
                labelsPosition={this.state.SliceLabelsPosition}
                labelMemberPath={this.state.SliceLabelsMapping}
                valueMemberPath={this.state.SliceValuesMapping}
                legendLabelMemberPath={this.state.SliceLegendMapping}
                width={chartSize}
                height={chartSize}
                othersCategoryThreshold={this.state.OthersCategoryThreshold}
                othersCategoryType={this.state.OthersCategoryType}
                othersCategoryText="Others"
                othersCategoryFill="#9A9A9A"
                othersCategoryStroke="#9A9A9A"
                brushes={this.state.SliceBrushes}
                outlines={this.state.SliceBrushes}
                radiusFactor={radiusFactor}
                selectionMode="single"
            //sliceClick={(s, e) => this.onSliceClick(e)}
            />}


        </div>

        let settingsBlock = <Panel bsSize={"xs"} bsStyle={DEFAULT_BSSTYLE} header={"Settings"} style={{
            'overflowY': 'auto',
            'overflowX': 'hidden',
            height: '520px',
            padding: '0px',
            margin: '0px',
            marginTop: '0px',
            marginRight: '0px',
            fontSize: 'small'
        }}>
            <Row style={{ marginLeft: '0px', marginRight: '0px', marginBottom: '0px', marginTop: '0px', padding: '0px' }} >
                <HelpBlock style={{ fontSize: 'small', margin: '0px' }}>
                    <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                        onChange={(e) => this.onShowDoughnutChanged(e)}
                        checked={this.state.ShowAsDoughnut} >Doughnut View</Checkbox>
                </HelpBlock>


                <HelpBlock style={{ fontSize: 'small' }}>Others Threshold
                        {' '}
                    <AdaptablePopover cssClassName={cssClassName} headerText={"Pie Chart: Others Threshold"} bodyText={["Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value."]} />
                </HelpBlock>
                <FormControl
                    bsSize={"small"} type="number" min="0" step="1"
                    placeholder={"Input"}
                    onChange={this.onOthersCategoryThresholdChanged}
                    value={this.state.OthersCategoryThreshold} />

                <HelpBlock style={{ fontSize: 'small' }}>
                    <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                        onChange={(e) => this.onThresholdAsPercentChanged(e)}
                        checked={this.state.OthersCategoryType == PieChartOthersCategoryType.Percent} >Others Threshold %
                   </Checkbox>
                </HelpBlock>

                <HelpBlock style={{ fontSize: 'small' }}>Labels Position:{' '}</HelpBlock>
                <FormControl
                    bsSize={"small"} componentClass="select" placeholder="select"
                    value={this.state.SliceLabelsPosition}
                    onChange={(x) => this.onSliceLabelsPositionChanged(x)} >
                    {this.getOptionsForLabelsPosition()}
                </FormControl>

                <HelpBlock style={{ fontSize: 'small' }}>Labels Content:{' '}</HelpBlock>
                <FormControl
                    bsSize={"small"} componentClass="select" placeholder="select"
                    value={this.state.SliceLabelsMapping}
                    onChange={(x) => this.onSliceLabelsMappingChanged(x)} >
                    {this.getOptionsForSliceLabelsMapping()}
                </FormControl>

                <HelpBlock style={{ fontSize: 'small' }}>Slices Sort By:{' '}</HelpBlock>
                <FormControl
                    bsSize={"small"} componentClass="select" placeholder="select"
                    value={this.state.SliceSortOption}
                    onChange={(x) => this.onSliceSortByColumnChanged(x)} >
                    {this.getOptionsForSliceSortOrders()}
                </FormControl>

                {/* this is not really needed unless we add calculation of
                 some new numeric columns in ChartService */}
                {/* <HelpBlock style={{ fontSize: 'small' }}>Slice Mapping:{' '}</HelpBlock>
                <FormControl
                  bsSize={"small"} componentClass="select" placeholder="select"
                  value={this.state.SliceValuesMapping}
                  onChange={(x) => this.onSliceValuesMappingChanged(x)} >
                  {this.getOptionsForSliceValuesMapping()}
                </FormControl> */}

                <HelpBlock style={{ fontSize: 'small' }}> {' '}</HelpBlock>

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
            <PanelWithImage cssClassName={cssClassName}
                header={StrategyConstants.PieChartStrategyName}
                glyphicon={StrategyConstants.PieChartGlyph}
                infoBody={infoBody}
                bsStyle="primary" >

                <div>
                    <Row>
                        <Col xs={8} >
                            <AdaptableBlotterForm key="DataGroupColumnSelector" horizontal>
                                <FormGroup controlId="pieChartSettings" style={{ marginBottom: '10px' }}>
                                    <Row>
                                        <Col xs={1}>{' '}</Col>
                                        <Col xs={4}>{' '}<ControlLabel>{' '}Selected Column</ControlLabel></Col>
                                        <Col xs={7} >
                                            <ColumnSelector cssClassName={cssClassName}
                                                SelectedColumnIds={[this.state.PieChartDefinition.PrimaryColumnId]}
                                                SelectionMode={SelectionMode.Single}
                                                ColumnList={this.props.Columns}
                                                onColumnChange={columns => this.onDataGroupColumnChanged(columns)} />
                                        </Col>
                                    </Row>
                                </FormGroup>
                            </AdaptableBlotterForm>
                            {this.hasValidDataSelection() &&
                                <div>
                                    {this.state.ErrorMessage == null ?
                                        <span>{chartBlock}</span>
                                        :
                                        <HelpBlock>{this.state.ErrorMessage}</HelpBlock>
                                    }
                                </div>
                            }
                        </Col>
                        <Col xs={4} >
                            {this.hasValidDataSelection() &&
                                <div>
                                    {settingsBlock}
                                </div>
                            }
                        </Col>
                    </Row>
                </div>

            </PanelWithImage>
        </div>
    }

    private onDataValueColumnChanged(columns: IColumn[]) {
        let valueColumn: string = null;
        let labelColumn = this.state.PieChartDefinition.PrimaryColumnId;
        if (columns.length > 0) {
            valueColumn = columns[0].ColumnId;
        }
        this.updateDataSource(valueColumn, labelColumn);
    }

    private onDataGroupColumnChanged(columns: IColumn[]) {
        let valueColumn = this.state.PieChartDefinition.SecondaryColumnId;
        let labelColumn: string = null;
        if (columns.length > 0) {
            labelColumn = columns[0].ColumnId;
        }
        this.updateDataSource(valueColumn, labelColumn);
    }

    private updateDataSource(valueColumn: string, labelColumn: string) {
        let pieChartDefinition: IPieChartDefinition = this.state.PieChartDefinition;
        pieChartDefinition.PrimaryColumnId = labelColumn;
        pieChartDefinition.SecondaryColumnId = valueColumn;

      let chartData:IChartData=   this.props.Blotter.ChartService.BuildPieChartData(pieChartDefinition);
         let dataSource: IPieChartDataItem[] =chartData.Data;
         let errorMessage: string = chartData.ErrorMessage;
        dataSource = PieChartUIHelper.sortDataSource(this.state.SliceSortOption, dataSource);
       
        this.setState({
            PieChartDefinition: pieChartDefinition,
            DataSource: dataSource,
            ErrorMessage: errorMessage,
            // making sure the first and last slice do not have the same brush
            SliceBrushes: dataSource.length % 2 == 0 ? PieChartUIHelper.getBrushesOdd() : PieChartUIHelper.getBrushesEven()
        });
    }



    public onDoughnutChartRef(doughnutChart: IgrDoughnutChart) {
        this.doughnutChart = doughnutChart;
        if (this.doughnutLegend && this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    }

    public onPieChartRef(pieChart: IgrPieChart) {
        this.pieChart = pieChart;
        if (this.pieChartLegend && this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    }

    public onDoughnutLegendRef(legend: IgrItemLegend) {
        this.doughnutLegend = legend;
        if (this.doughnutChart) {
            this.doughnutChart.actualSeries[0].legend = this.doughnutLegend;
        }
    }

    public onPieChartLegendRef(legend: IgrItemLegend) {
        this.pieChartLegend = legend;
        if (this.pieChart) {
            this.pieChart.legend = this.pieChartLegend;
        }
    }

    private onOthersCategoryThresholdChanged = (e: any) => {
        this.setState({ OthersCategoryThreshold: e.target.value } as PieChartPopupState)
    }

    private onShowDoughnutChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ShowAsDoughnut: e.checked } as PieChartPopupState);
    }

    private onThresholdAsPercentChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let othersCategoryType: PieChartOthersCategoryType = (e.checked) ? PieChartOthersCategoryType.Percent : PieChartOthersCategoryType.Number;
        this.setState({ OthersCategoryType: othersCategoryType } as PieChartPopupState);
    }

    onSliceLabelsPositionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ SliceLabelsPosition: e.value } as PieChartPopupState);
    }
    onSliceLabelsMappingChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let labelMapping = e.value;
        let legendMapping = labelMapping.includes("Ratio") ? "RatioAndName" : "ValueAndName";
        this.setState({ SliceLabelsMapping: labelMapping, SliceLegendMapping: legendMapping } as PieChartPopupState);
    }

    onSliceValuesMappingChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ SliceValuesMapping: e.value } as PieChartPopupState);
    }

    onSliceSortByColumnChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let sliceSortOption: SliceSortOption = e.value as SliceSortOption;
        let oldData = this.state.DataSource;
        let newData: IPieChartDataItem[] =PieChartUIHelper.sortDataSource(sliceSortOption, oldData)
           
        this.setState({ DataSource: newData, SliceSortOption: sliceSortOption });
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
