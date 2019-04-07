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
import { IChartProperties, IPieChartDefinition, IPieChartProperties, IPieChartDataItem } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { PieChartUIHelper } from "./PieChartUIHelper";
import { PieChartComponentState } from "./PieChartComponentState";
import { ButtonMaximise } from "../../Components/Buttons/ButtonMaximise";
import { DEFAULT_BSSTYLE, INFO_BSSTYLE } from "../../../Utilities/Constants/StyleConstants";
import { ButtonMinimise } from "../../Components/Buttons/ButtonMinimise";
import { ButtonClose } from "../../Components/Buttons/ButtonClose";
import { ButtonGeneral } from "../../Components/Buttons/ButtonGeneral";
import { Helper } from "../../../Utilities/Helpers/Helper";
import { DefaultPieChartProperties } from "../../../Utilities/Defaults/DefaultPieChartProperties";
import { Row, Col, Table, HelpBlock, FormControl, Checkbox, Panel } from "react-bootstrap";
import { PanelWithTwoButtons } from "../../Components/Panels/PanelWithTwoButtons";
import { PanelWithButton } from "../../Components/Panels/PanelWithButton";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { PieChartLabelPosition, SliceLabelOption, SliceSortOption, PieChartOthersCategoryType } from "../../../Utilities/ChartEnums";
import { AdaptablePopover } from "../../AdaptablePopover";
import { EnumExtensions } from "../../../Utilities/Extensions/EnumExtensions";
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";


/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
interface PieChartComponentProps {
    cssClassName: string,
    CurrentChartDefinition: IPieChartDefinition;
    ChartData: IPieChartDataItem[];
    onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => void;
}



export class PieChartComponent extends React.Component<PieChartComponentProps, PieChartComponentState> {

    public doughnutChart: IgrDoughnutChart;
    public doughnutLegend: IgrItemLegend;
    public pieChart: IgrPieChart;
    public pieChartLegend: IgrItemLegend;

    constructor(props: PieChartComponentProps) {
        super(props);


        this.state = PieChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition, this.props.ChartData);

        IgrPieChartModule.register();
        IgrDoughnutChartModule.register();
        IgrRingSeriesModule.register();
        IgrItemLegendModule.register();

        this.onPieChartRef = this.onPieChartRef.bind(this);
        this.onDoughnutChartRef = this.onDoughnutChartRef.bind(this);
        this.onDoughnutLegendRef = this.onDoughnutLegendRef.bind(this);
        this.onPieChartLegendRef = this.onPieChartLegendRef.bind(this);
    }

    componentWillReceiveProps(nextProps: PieChartComponentProps, nextContext: any) {
        this.setState(PieChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition, nextProps.ChartData));
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__PieCharts";

        let chartTitle: string = this.props.CurrentChartDefinition.Name;
        if (StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.Description)) {
            chartTitle += ' : ' + this.props.CurrentChartDefinition.Description;
        }

        let chartErrorMessage: string = (this.props.ChartData != null && StringExtensions.IsNotNullOrEmpty(this.props.ChartData[0].ErrorMessage)) ?
            this.props.ChartData[0].ErrorMessage :
            null

        let showGeneralPropertiesButton =
            this.state.IsGeneralMinimised ?
                <ButtonMaximise
                    cssClassName={cssClassName}
                    onClick={() => this.onShowGeneralProperties()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Show GeneralProperties"}
                />
                :
                <ButtonMinimise
                    cssClassName={cssClassName}
                    style={{ marginBottom: '10px' }}
                    onClick={() => this.onHidePropertiesGroup()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Hide General Properties"}
                />


        let closeChartSettingsButton =
            <ButtonClose
                cssClassName={cssClassName}
                onClick={() => this.onHideChartSettings()}
                bsStyle={DEFAULT_BSSTYLE}
                size={"xs"}
                DisplayMode="Glyph"
                hideToolTip={false}
                overrideTooltip={"Close Chart Settings"}
            />

        let openChartSettingsButton =
            <ButtonGeneral
                cssClassName={cssClassName}
                style={{ marginRight: '20px' }}
                onClick={() => this.onShowChartSettings()}
                bsStyle={INFO_BSSTYLE}
                size={"small"}
                DisplayMode="Text"
                hideToolTip={true}
                overrideText={'Show Chart Settings'}
            />

        let setDefaultsButton =
            <ButtonGeneral
                cssClassName={cssClassName}
                onClick={() => this.onSetPropertyDefaults()}
                bsStyle={DEFAULT_BSSTYLE}
                DisplayMode="Text"
                size={"small"}
                hideToolTip={true}
                overrideText={'Reset Defaults'}
            />



        let chart = (this.state.ChartProperties.ShowAsDoughnut) ?
            <IgrDoughnutChart
                width={'100%'}
                height={'100%'}
                allowSliceSelection="true"
                allowSliceExplosion="true"
                sliceClick={(s, e) => this.onSliceClick(e)}
                ref={this.onDoughnutChartRef}>
                <IgrRingSeries
                    name="ring1"
                    dataSource={this.state.DataSource}
                    labelMemberPath={this.state.ChartProperties.SliceLabelsMapping}
                    labelsPosition={this.state.ChartProperties.PieChartLabelPosition}
                    valueMemberPath={this.state.ChartProperties.SliceValuesMapping}
                    legendLabelMemberPath={this.state.ChartProperties.SliceLegendMapping}
                    othersCategoryThreshold={this.state.ChartProperties.OthersCategoryThreshold}
                    othersCategoryType={this.state.ChartProperties.OthersCategoryType}
                    othersCategoryText="Others"
                    brushes={this.state.SliceBrushes}
                    outlines={this.state.SliceBrushes}
                    radiusFactor={0.8} />
            </IgrDoughnutChart>
            :
            <IgrPieChart
                ref={this.onPieChartRef}
                dataSource={this.state.DataSource}
                labelsPosition={this.state.ChartProperties.PieChartLabelPosition}
                width={'100%'}
                height={'100%'}
                radiusFactor={0.8}
                labelMemberPath={this.state.ChartProperties.SliceLabelsMapping}
                valueMemberPath={this.state.ChartProperties.SliceValuesMapping}
                legendLabelMemberPath={this.state.ChartProperties.SliceLegendMapping}
                othersCategoryThreshold={this.state.ChartProperties.OthersCategoryThreshold}
                othersCategoryType={this.state.ChartProperties.OthersCategoryType}
                othersCategoryText="Others"
                othersCategoryFill="#9A9A9A"
                othersCategoryStroke="#9A9A9A"
                brushes={this.state.SliceBrushes}
                outlines={this.state.SliceBrushes}
                selectionMode="single"
                sliceClick={(s, e) => this.onSliceClick(e)}
            />


        let chartElement = (this.props.ChartData != null && chartErrorMessage == null) ?
            chart
            :
            <span>{chartErrorMessage}</span>


        let legendPanel = <Panel
            bsSize={"xs"}
            header={"Legend"}
            style={{ marginTop: '2px' }}>
            <div className="pieChartLegend">
                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                    <Row>
                        <Col xs={5}>
                            <HelpBlock>Sort by</HelpBlock>
                        </Col>
                        <Col xs={7}>
                            <FormControl
                                bsSize={"small"} componentClass="select" placeholder="select"
                                value={this.state.SliceSortOption}
                                onChange={(x) => this.onSliceSortByColumnChanged(x)} >
                                {this.getOptionsForSliceSortOrders()}
                            </FormControl>
                        </Col>
                    </Row>
                </AdaptableBlotterForm>

                {this.state.ChartProperties.ShowAsDoughnut ?
                    <div className="doughnutLegend">
                        <IgrItemLegend ref={this.onDoughnutLegendRef} />
                    </div>
                    :
                    <div className="pieChartLegend">
                        <IgrItemLegend ref={this.onPieChartLegendRef} />
                    </div>
                }
            </div>
        </Panel>


        let sidePanel = <PanelWithTwoButtons bsSize={"xs"} bsStyle={INFO_BSSTYLE} headerText={"Chart Settings"} cssClassName={cssClassName}
            firstButton={closeChartSettingsButton} secondButton={setDefaultsButton}
            style={{
                'overflowY': 'auto',
                'overflowX': 'hidden',
                maxHeight: '700px',
                padding: '0px',
                margin: '0px',
                marginTop: '0px',
                marginBottom: '0px',
                marginRight: '0px',
                fontSize: 'small'
            }}>

            <PanelWithButton glyphicon={"wrench"} bsSize={"xs"} headerText={"General"} cssClassName={cssClassName} button={showGeneralPropertiesButton} style={{ marginTop: '2px' }}>
                {this.state.IsGeneralMinimised == false &&
                    <span>
                        <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                            <Row>
                                <Col xs={12}>
                                    <HelpBlock style={{ fontSize: 'small', margin: '0px' }}>
                                        <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                                            onChange={(e) => this.onPieOrDoughnutViewChanged(e)}
                                            checked={this.state.ChartProperties.ShowAsDoughnut} >Show as 'Doughnut'</Checkbox>
                                    </HelpBlock>
                                </Col>
                            </Row>
                        </AdaptableBlotterForm>


                        <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                            <Row>
                                <Col xs={5}>
                                    <HelpBlock>Others Band</HelpBlock>
                                </Col>
                                <Col xs={5}>
                                    <FormControl
                                        bsSize={"small"} type="number" min="0" step="1"
                                        placeholder={"Input"}
                                        onChange={this.onOthersCategoryThresholdChanged}
                                        value={this.state.ChartProperties.OthersCategoryThreshold} />
                                </Col>
                                <Col xs={2}>
                                    <AdaptablePopover cssClassName={cssClassName} headerText={"Pie Chart: Others Threshold"} bodyText={["Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value."]} />
                                </Col>
                            </Row>
                        </AdaptableBlotterForm>


                        <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                            <Row>
                                <Col xs={12}>
                                    <HelpBlock>
                                        <Checkbox style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                                            onChange={(e) => this.onThresholdAsPercentChanged(e)}
                                            checked={this.state.ChartProperties.OthersCategoryType == PieChartOthersCategoryType.Percent} >Others Band As %
                            </Checkbox>
                                    </HelpBlock>
                                </Col>
                            </Row>
                        </AdaptableBlotterForm>


                        <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                            <Row>
                                <Col xs={5}>
                                    <HelpBlock>Labels Position</HelpBlock>
                                </Col>
                                <Col xs={7}>
                                    <FormControl
                                        bsSize={"small"} componentClass="select" placeholder="select"
                                        value={this.state.ChartProperties.PieChartLabelPosition}
                                        onChange={(x) => this.onSliceLabelsPositionChanged(x)} >
                                        {this.getOptionsForLabelsPosition()}
                                    </FormControl>
                                </Col>
                            </Row>
                        </AdaptableBlotterForm>
                        <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                            <Row>
                                <Col xs={5}>
                                    <HelpBlock>Labels Content</HelpBlock>
                                </Col>
                                <Col xs={7}>
                                    <FormControl
                                        bsSize={"small"} componentClass="select" placeholder="select"
                                        value={this.state.ChartProperties.SliceLabelsMapping}
                                        onChange={(x) => this.onSliceLabelsMappingChanged(x)} >
                                        {this.getOptionsForSliceLabelsMapping()}
                                    </FormControl>
                                </Col>
                            </Row>
                        </AdaptableBlotterForm>
                    </span>
                }
            </PanelWithButton>

            {legendPanel}
        </PanelWithTwoButtons>

        return <span className={cssClassName}>


            {this.props.ChartData != null &&
                <div>
                    {this.state.IsChartSettingsVisible ?
                        <Table style={{ height: '670px', border: 'none', borderCollapse: 'separate' }}>
                            <thead>
                                <tr>
                                    <th>{chartTitle}</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td>{chartElement}</td>
                                    <td style={{ width: '340px', marginRight: '10px' }}>
                                        {sidePanel}
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                        :
                        <Table style={{ height: '670px', border: 'none', borderCollapse: 'separate' }}>
                            <thead>
                                <tr>
                                    <th>{this.props.CurrentChartDefinition.Name}</th>
                                    <th> <div className="pull-right" >
                                        {openChartSettingsButton}
                                    </div></th>
                                </tr>
                            </thead>
                            <tbody >
                                <tr>
                                    <td colSpan={2}>{chartElement}</td>
                                </tr>
                            </tbody>
                        </Table>
                    }
                </div>



            }
        </span>

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




    onShowGeneralProperties() {
        this.setState({ IsGeneralMinimised: false, } as PieChartComponentState)
    }

    onHidePropertiesGroup() {
        this.setState({ IsGeneralMinimised: true } as PieChartComponentState)
    }
    onShowChartSettings() {
        this.setState({ IsChartSettingsVisible: true, } as PieChartComponentState)
    }

    onHideChartSettings() {
        this.setState({ IsChartSettingsVisible: false, } as PieChartComponentState)
    }

    onSetPropertyDefaults() {
        // first update our state
        this.setState(PieChartUIHelper.setDefaultChartDisplayPopupState() as PieChartComponentState);
        // then update the properties
        let chartProperties: IPieChartProperties = Helper.cloneObject(DefaultPieChartProperties);
        this.updateChartProperties(chartProperties);
    }


    private updateChartProperties(chartProperties: IChartProperties): void {
        this.setState({ ChartProperties: chartProperties, } as PieChartComponentState)
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Name, chartProperties)
    }

    private onPieOrDoughnutViewChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.ShowAsDoughnut = e.checked;
        this.updateChartProperties(chartProperties);
    }



    private onOthersCategoryThresholdChanged = (e: any) => {
        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.OthersCategoryThreshold = e.target.value;
        this.updateChartProperties(chartProperties);
    }

    private onThresholdAsPercentChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.OthersCategoryType = (e.checked) ? PieChartOthersCategoryType.Percent : PieChartOthersCategoryType.Number;
        this.updateChartProperties(chartProperties);
    }

    private onSliceLabelsPositionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.PieChartLabelPosition = e.value as PieChartLabelPosition
        this.updateChartProperties(chartProperties);
    }

    onSliceLabelsMappingChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let labelMapping = e.value;
        let legendMapping: SliceLabelOption = labelMapping.includes("Ratio") ? SliceLabelOption.RatioAndName : SliceLabelOption.ValueAndName;

        let chartProperties: IPieChartProperties = this.state.ChartProperties;
        chartProperties.SliceLabelsMapping = labelMapping as SliceLabelOption;
        chartProperties.SliceLegendMapping = legendMapping;
        this.updateChartProperties(chartProperties);
    }

    onSliceSortByColumnChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let sliceSortOption = e.value as SliceSortOption;
        let oldData: IPieChartDataItem[] = this.state.DataSource;
        let newData: IPieChartDataItem[] = PieChartUIHelper.sortDataSource(sliceSortOption, oldData);
        this.setState({ SliceSortOption: sliceSortOption, DataSource: newData } as PieChartComponentState)
    }

    onSliceClick(e: SliceClickEventArgs): void {
        console.log("onSliceClick " + e);
        e.isExploded = !e.isExploded;
        e.isSelected = !e.isSelected
        if (e.isExploded) {
            //    this.setState({ CurrentColumnCount: ds.Value, CurrentColumnValue: ds.Name } as PieChartComponentState);
        } else {
            //    this.setState({ CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartComponentState);
        }
    }

    // want to move to helper - not sure why i cannot
    getOptionsForLabelsPosition(): JSX.Element[] {
        return EnumExtensions.getNames(PieChartLabelPosition).map((v) => {
            return <option key={v} value={v}>{v as PieChartLabelPosition}</option>
        })
    }

    getOptionsForSliceLabelsMapping(): JSX.Element[] {
        return EnumExtensions.getNames(SliceLabelOption).map((v) => {
            return <option key={v} value={v}>{v as SliceLabelOption}</option>
        })
    }

    getOptionsForSliceSortOrders(): JSX.Element[] {
        return EnumExtensions.getNames(SliceSortOption).map((v) => {
            return <option key={v} value={v}>{v as SliceSortOption}</option>
        })
    }

}
