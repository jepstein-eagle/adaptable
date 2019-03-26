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

import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { PieChartLabelPositions } from "../../Utilities/ChartEnums";
import { IPieChartDefinition } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ObjectFactory } from "../../Utilities/ObjectFactory";

interface PieChartPopupProps extends StrategyViewPopupProps<PieChartPopupComponent> {
}

interface PieChartPopupState {
    PieChartDefinition: IPieChartDefinition

    DataSource: any;
    // ShowVisibleRowsOnly: boolean;

    OthersCategoryType: PieChartOthersCategoryType;
    OthersCategoryThreshold: number;
    CurrentColumnCount: number;
    CurrentColumnValue: string;
    ShowAsDoughnut: boolean;

    SliceLabelsPosition: string;
    SliceLabelsMapping: string;
    SliceLegendMapping: string;
    SliceValuesMapping: string;
    SliceSortByColumn: string;
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
            DataSource: null,

            OthersCategoryType: PieChartOthersCategoryType.Percent,
            OthersCategoryThreshold: 2,
            CurrentColumnCount: 0,
            CurrentColumnValue: "",
            ShowAsDoughnut: false,

            SliceValuesMapping: "Value",
            SliceLabelsMapping: "Name",
            SliceLegendMapping: "ValueAndName",
            SliceSortByColumn: "Value Descending",
            SliceLabelsPosition: "OutsideEnd",
            SliceBrushes: this.brushesEven,
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
        // TODO we should get 2 columns: valueColumnId and groupColumnId from PopupParams
        const column = this.props.PopupParams;
        if (StringExtensions.IsNotNullOrEmpty(column)) {

            this.updateDataSource(null, column);
        }
    }

    getOptionsForLabelsPosition(): JSX.Element[] {
        let optionElements = EnumExtensions.getNames(PieChartLabelPositions).map((v) => {
            return <option key={v} value={v}>{v as PieChartLabelPositions}</option>
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

    renderDataSelectors(cssClassName: string): JSX.Element[] {
        const elements: JSX.Element[] = [];
        elements.push(
            <AdaptableBlotterForm key="DataGroupColumnSelector" horizontal>
                <FormGroup controlId="pieChartSettings" style={{ marginBottom: '10px' }}>
                    <Row>
                        <Col xs={1}>{' '}</Col>
                        <Col xs={4}>{' '}<ControlLabel>{' '}Label Column</ControlLabel></Col>
                        <Col xs={7} >
                            <ColumnSelector cssClassName={cssClassName}
                                SelectedColumnIds={[this.state.PieChartDefinition.PrimaryColumnId]}
                                SelectionMode={SelectionMode.Single}
                                placeHolder={"Select any column"}
                                ColumnList={this.props.Columns}
                                onColumnChange={columns => this.onDataGroupColumnChanged(columns)} />
                        </Col>
                    </Row>
                </FormGroup>
            </AdaptableBlotterForm>);
        elements.push(
            <AdaptableBlotterForm key="DataValueColumnSelector" horizontal>
                <FormGroup controlId="pieChartSettings" style={{ marginBottom: '0px' }}>
                    <Row>
                        <Col xs={1}>{' '}</Col>
                        <Col xs={4}>{' '}<ControlLabel>{' '} Value Column</ControlLabel></Col>
                        <Col xs={7} >
                            <ColumnSelector cssClassName={cssClassName}
                                SelectedColumnIds={[this.state.PieChartDefinition.SecondaryColumnId]}
                                SelectionMode={SelectionMode.Single}
                                placeHolder={"Select a numeric column"}
                                ColumnList={this.props.Columns}
                                onColumnChange={columns => this.onDataValueColumnChanged(columns)} />
                        </Col>
                    </Row>
                </FormGroup>
            </AdaptableBlotterForm>);
        return elements;
    }
    hasValidDataSelection(): boolean {
        return StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.SecondaryColumnId) ||
            StringExtensions.IsNotNullOrEmpty(this.state.PieChartDefinition.PrimaryColumnId);
    }

    public brushesEven: string[] = ["#7446B9", "#9FB328", "#F96232", "#2E9CA6", "#DC3F76", "#FF9800", "#3F51B5", "#439C47"];
    public brushesOdd: string[] = ["#7446B9", "#9FB328", "#F96232", "#2E9CA6", "#DC3F76", "#FF9800", "#3F51B5", "#439C47", "#795548"];

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
                // sliceClick={(s, e) => this.onSliceClick(e)}
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
                    radiusFactor={0.6} />
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
                radiusFactor={0.6}
                selectionMode="single"
                sliceClick={(s, e) => this.onSliceClick(e)}
            />}

            {/* UI for selected slice */}
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

                {/* TODO do we really need ShowVisibleRowsOnly? */}
                {/* <HelpBlock style={{ fontSize: 'small', margin: '0px' }}>
                    <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                        onChange={(e) => this.onRowVisibilityChanged(e)}
                        checked={this.state.ShowVisibleRowsOnly} >Visible Rows Only</Checkbox>
                </HelpBlock> */}

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
                    value={this.state.SliceSortByColumn}
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
                            {this.renderDataSelectors(cssClassName)}
                            {this.hasValidDataSelection() &&
                                <div>
                                    {chartBlock}
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

        let dataSource = this.props.Blotter.ChartService.BuildPieChartData(pieChartDefinition);

        dataSource = this.sortDataSource(this.state.SliceSortByColumn, dataSource);

        console.log("onDataChanged " + dataSource.length + " " + valueColumn + " " + labelColumn);
        this.setState({
            PieChartDefinition: pieChartDefinition,
            DataSource: dataSource,
            // making sure the first and last slice do not have the same brush
            SliceBrushes: dataSource.length % 2 == 0 ? this.brushesOdd : this.brushesEven
        });
    }

    public sortDataSource(sortByColumn: string, oldData: any[]): any[] {
        if (oldData == null || oldData.length == 0) {
            return [];
        }
        let newData = [...oldData];
        if (sortByColumn == "Value Descending") {
            newData.sort(this.sortByValueDescending);
        } else if (sortByColumn == "Value Ascending") {
            newData.sort(this.sortByValueAscending);
        } else if (sortByColumn == "Name Descending") {
            newData.sort(this.sortByNameDescending);
        } else if (sortByColumn == "Name Ascending") {
            newData.sort(this.sortByNameAscending);
        }
        return newData;
    }

    public sortByNameAscending(a: any, b: any): number {
        let nameA = a.Name.toLowerCase();
        let nameB = b.Name.toLowerCase();
        if (nameA > nameB) { return 1; }
        if (nameA < nameB) { return -1; }
        return 0;
    }
    public sortByNameDescending(a: any, b: any): number {
        let nameA = a.Name.toLowerCase();
        let nameB = b.Name.toLowerCase();
        if (nameA > nameB) { return -1; }
        if (nameA < nameB) { return 1; }
        return 0;
    }
    public sortByValueAscending(a: any, b: any): number {
        if (a.Value > b.Value) { return 1; }
        if (a.Value < b.Value) { return -1; }
        return 0;
    }
    public sortByValueDescending(a: any, b: any): number {
        if (a.Value > b.Value) { return -1; }
        if (a.Value < b.Value) { return 1; }
        return 0;
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
        this.setState({ ShowAsDoughnut: e.checked, CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartPopupState);
    }

    // private onRowVisibilityChanged(event: React.FormEvent<any>) {
    // let e = event.target as HTMLInputElement;
    // let data = this.getDataSource(this.state.DataValueColumnId, this.state.DataLabelColumnId, e.checked);
    // this.setState({ ShowVisibleRowsOnly: e.checked, DataSource: data, CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartPopupState);
    // }

    private onThresholdAsPercentChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let mode = (e.checked) ? PieChartOthersCategoryType.Percent : PieChartOthersCategoryType.Number;
        this.setState({ OthersCategoryType: mode } as PieChartPopupState);
    }

    public onSliceClick(e: SliceClickEventArgs): void {
        console.log("onSliceClick " + e);
        e.isExploded = !e.isExploded;
        e.isSelected = !e.isSelected
        const ds = e.dataContext;
        if (e.isExploded) {
            this.setState({ CurrentColumnCount: ds.Value, CurrentColumnValue: ds.Name } as PieChartPopupState);
        } else {
            this.setState({ CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartPopupState);
        }
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
        let sortColumn = e.value;
        let oldData = this.state.DataSource;
        let newData = this.sortDataSource(sortColumn, oldData);
        this.setState({ DataSource: newData, SliceSortByColumn: sortColumn });
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
