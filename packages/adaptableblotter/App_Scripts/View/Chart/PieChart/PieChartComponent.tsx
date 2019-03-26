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
import { ICategoryChartDefinition, IChartProperties, IPieChartDefinition, IPieChartProperties } from "../../../Utilities/Interface/BlotterObjects/IChartDefinition";
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
import { CategoryChartUIHelper } from "../CategoryChart/CategoryChartUIHelper";
import { CategoryChartType, LabelVisibility, CrosshairDisplayMode, PieChartLabelPositions } from "../../../Utilities/ChartEnums";
import { ColorPicker } from "../../ColorPicker";
import { AdaptablePopover } from "../../AdaptablePopover";
import { PieChartOthersCategoryType } from "../../../Utilities/Enums";
import { EnumExtensions } from "../../../Utilities/Extensions/EnumExtensions";

/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
interface PieChartComponentProps {
    cssClassName: string,
    CurrentChartDefinition: IPieChartDefinition;
    ChartData: any;
    onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => void;
}



export class PieChartComponent extends React.Component<PieChartComponentProps, PieChartComponentState> {

    public doughnutChart: IgrDoughnutChart;
    public doughnutLegend: IgrItemLegend;
    public pieChart: IgrPieChart;
    public pieChartLegend: IgrItemLegend;

    constructor(props: PieChartComponentProps) {
        super(props);


        this.state = PieChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition as IPieChartDefinition);

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
        //  if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
        //      this.state = CategoryChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition as ICategoryChartDefinition, this.props.Columns);
        //  }
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__PieCharts";

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

        let showMiscPropertiesButton =
            this.state.IsMiscMinimised ?
                <ButtonMaximise
                    cssClassName={cssClassName}
                    onClick={() => this.onShowMiscProperties()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Show Misc Properties"}
                />
                :
                <ButtonMinimise
                    cssClassName={cssClassName}
                    onClick={() => this.onHidePropertiesGroup()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Hide XAxis Properties"}
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



        let chartElement = <IgrPieChart
            ref={this.onPieChartRef}
            dataSource={this.props.ChartData}
            labelsPosition={this.state.SliceLabelsPosition}
            radiusFactor={0.6}
            labelMemberPath={this.state.SliceLabelsMapping}
            valueMemberPath={this.state.SliceValuesMapping}
            legendLabelMemberPath={this.state.SliceLegendMapping}
            width={'800px'}
            height={'800px'}
            selectionMode="single"
            othersCategoryThreshold={this.state.OthersCategoryThreshold}
            othersCategoryType={this.state.OthersCategoryType}
            othersCategoryText="Others"
            othersCategoryFill="#9A9A9A"
            othersCategoryStroke="#9A9A9A"
        //  sliceClick={(s, e) => this.onSliceClick(e)}
        />

        let legendPanel = <Panel
            bsSize={"xs"}
            header={"Legend"}
            style={{ marginTop: '2px' }}>
            <div className="pieChartLegend">
                <IgrItemLegend ref={this.onPieChartLegendRef} />
            </div>
        </Panel>


        return <div className={cssClassName}>
            {this.state.IsChartSettingsVisible == false &&
                <Row >
                    <Col xs={12} >
                        <div className="pull-right" >
                            {openChartSettingsButton}
                        </div>
                    </Col>
                </Row>

            }
            {this.state.IsChartSettingsVisible ?
                <Table>
                    <tbody>
                        <tr>
                            <td>
                                {this.props.ChartData != null &&
                                    chartElement
                                }
                            </td>
                            <td style={{ width: '350px', marginRight: '15px' }}>
                                <PanelWithTwoButtons bsSize={"xs"} bsStyle={INFO_BSSTYLE} headerText={"Chart Settings"} cssClassName={cssClassName}
                                    firstButton={closeChartSettingsButton} secondButton={setDefaultsButton}
                                    style={{
                                        'overflowY': 'auto',
                                        'overflowX': 'hidden',
                                        padding: '0px',
                                        margin: '0px',
                                        marginTop: '0px',
                                        marginRight: '0px',
                                        fontSize: 'small'
                                    }}>

                                    <PanelWithButton glyphicon={"wrench"} bsSize={"xs"} headerText={"General"} cssClassName={cssClassName} button={showGeneralPropertiesButton} style={{ marginTop: '2px' }}>
                                        {this.state.IsGeneralMinimised == false &&
                                            <div>
                                                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>

                                                    <Row>
                                                        <Col xs={6}>
                                                            <HelpBlock>Others Threshold</HelpBlock>
                                                        </Col>
                                                        <Col xs={4}>
                                                            <FormControl
                                                                bsSize={"small"} type="number" min="0" step="1"
                                                                placeholder={"Input"}
                                                                onChange={this.onOthersCategoryThresholdChanged}
                                                                value={this.state.OthersCategoryThreshold} />
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
                                                                    checked={this.state.OthersCategoryType == PieChartOthersCategoryType.Percent} >Others Threshold As %
                                                                </Checkbox>
                                                            </HelpBlock>
                                                        </Col>
                                                    </Row>
                                                </AdaptableBlotterForm>


                                                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                    <Row>
                                                        <Col xs={6}>
                                                            <HelpBlock>Labels Position</HelpBlock>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <FormControl
                                                                bsSize={"small"} componentClass="select" placeholder="select"
                                                                value={this.state.SliceLabelsPosition}
                                                                onChange={(x) => this.onSliceLabelsPositionChanged(x)} >
                                                                {this.getOptionsForLabelsPosition()}
                                                            </FormControl>
                                                        </Col>
                                                    </Row>
                                                </AdaptableBlotterForm>
                                                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                    <Row>
                                                        <Col xs={6}>
                                                            <HelpBlock>Labels Content</HelpBlock>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <FormControl
                                                                bsSize={"small"} componentClass="select" placeholder="select"
                                                                value={this.state.SliceLabelsMapping}
                                                                onChange={(x) => this.onSliceLabelsMappingChanged(x)} >
                                                                {this.getOptionsForSliceLabelsMapping()}
                                                            </FormControl>
                                                        </Col>
                                                    </Row>
                                                </AdaptableBlotterForm>





                                            </div>
                                        }
                                    </PanelWithButton>

                                    <PanelWithButton glyphicon={"briefcase"} bsSize={"xs"} headerText={"Misc"} cssClassName={cssClassName} button={showMiscPropertiesButton} style={{ marginTop: '2px' }}>
                                        {this.state.IsMiscMinimised == false &&
                                            <div>



                                            </div>
                                        }
                                    </PanelWithButton>

                                    {legendPanel}
                                </PanelWithTwoButtons>
                            </td>
                        </tr>
                    </tbody>
                </Table>
                :
                <div>
                    {this.props.ChartData != null &&
                        chartElement
                    }
                </div>

            }
        </div>

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

    // want to move to helper - not sure why i cannot
    getOptionsForLabelsPosition(): JSX.Element[] {
        let optionElements = EnumExtensions.getNames(PieChartLabelPositions).map((v) => {
            return <option key={v} value={v}>{v as PieChartLabelPositions}</option>
        })
        return optionElements;
    }


    onShowGeneralProperties() {
        this.setState({ IsGeneralMinimised: false, IsMiscMinimised: true } as PieChartComponentState)
    }

    onShowMiscProperties() {
        this.setState({ IsGeneralMinimised: true, IsMiscMinimised: false } as PieChartComponentState)
    }

    onHidePropertiesGroup() {
        this.setState({ IsGeneralMinimised: true, IsMiscMinimised: true } as PieChartComponentState)
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
        //   this.setState({ ChartProperties: chartProperties, } as CategoryChartComponentState)
        //   this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Name, chartProperties)
    }


    private onOthersCategoryThresholdChanged = (e: any) => {
        this.setState({ OthersCategoryThreshold: e.target.value } as PieChartComponentState)
    }

    private onThresholdAsPercentChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let mode = (e.checked) ? PieChartOthersCategoryType.Percent : PieChartOthersCategoryType.Number;
        //   chartProperties.
        this.setState({ OthersCategoryType: mode } as PieChartComponentState);
    }

    private onSliceLabelsPositionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ SliceLabelsPosition: e.value } as PieChartComponentState);
    }

    onSliceLabelsMappingChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let labelMapping = e.value;
        let legendMapping = labelMapping.includes("Ratio") ? "RatioAndName" : "ValueAndName";
        this.setState({ SliceLabelsMapping: labelMapping, SliceLegendMapping: legendMapping } as PieChartComponentState);
    }

    public SliceLabelOptions: string[] = ["Value", "ValueAndName", "Ratio", "RatioAndName", "Name",];  // enum surely????
    getOptionsForSliceLabelsMapping(): JSX.Element[] {
        let optionElements = this.SliceLabelOptions.map((v) => {
            return <option key={v} value={v}>{v}</option>
        })
        return optionElements;
    }

}
