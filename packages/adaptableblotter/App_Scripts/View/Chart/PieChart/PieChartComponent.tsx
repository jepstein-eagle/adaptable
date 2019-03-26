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
import { Row, Col, Table, HelpBlock, FormControl, Checkbox } from "react-bootstrap";
import { PanelWithTwoButtons } from "../../Components/Panels/PanelWithTwoButtons";
import { PanelWithButton } from "../../Components/Panels/PanelWithButton";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { CategoryChartUIHelper } from "../CategoryChart/CategoryChartUIHelper";
import { CategoryChartType, LabelVisibility, CrosshairDisplayMode } from "../../../Utilities/ChartEnums";
import { ColorPicker } from "../../ColorPicker";

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


    constructor(props: PieChartComponentProps) {
        super(props);


          this.state = PieChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition as IPieChartDefinition);

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
                    {this.state.IsChartSettingsVisible == false &&
                        <span>
                            <Row >
                                <Col xs={12} >
                                    <div className="pull-right" >
                                        {openChartSettingsButton}
                                    </div>
                                </Col>
                            </Row>

                        </span>
                    }
                    {this.state.IsChartSettingsVisible ?
                        <Row>
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
                                                firstButton={closeChartSettingsButton} secondButton={setDefaultsButton}>

                                                <PanelWithButton glyphicon={"wrench"} bsSize={"xs"} headerText={"General"} cssClassName={cssClassName} button={showGeneralPropertiesButton} style={{ marginTop: '2px' }}>
                                                    {this.state.IsGeneralMinimised == false &&
                                                        <div>
                                                            
                                                            General Stuff
                                                           

                                                           
                                                        </div>
                                                    }
                                                </PanelWithButton>

                                                 <PanelWithButton glyphicon={"briefcase"} bsSize={"xs"} headerText={"Misc"} cssClassName={cssClassName} button={showMiscPropertiesButton} style={{ marginTop: '2px' }}>
                                                    {this.state.IsMiscMinimised == false &&
                                                        <div>
                                                           
                                                        Misc
                                                          
                                                        </div>
                                                    }
                                                </PanelWithButton>

                                            </PanelWithTwoButtons>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                        :
                        <div>
                            {this.props.ChartData != null &&
                                chartElement
                            }
                        </div>
                    }
                </span>


            </div>



        </span>
    }

    onShowGeneralProperties() {
        this.setState({ IsGeneralMinimised: false, IsMiscMinimised: true } as PieChartComponentState)
    }

       onShowMiscProperties() {
        this.setState({ IsGeneralMinimised: true,  IsMiscMinimised: false } as PieChartComponentState)
    }

    onHidePropertiesGroup() {
        this.setState({  IsGeneralMinimised: true,  IsMiscMinimised: true } as PieChartComponentState)
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









}



