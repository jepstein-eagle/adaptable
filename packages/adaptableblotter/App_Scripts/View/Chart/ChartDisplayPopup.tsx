import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { ChartDisplayPopupPropsBase } from '../Components/SharedProps/ChartDisplayPopupPropsBase'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IChartDefinition, IChartProperties } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ButtonClose } from "../Components/Buttons/ButtonClose";
import { PRIMARY_BSSTYLE, DEFAULT_BSSTYLE, INFO_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { Row, Col, ControlLabel, FormControl, Checkbox, Radio } from "react-bootstrap";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { ButtonMinimise } from "../Components/Buttons/ButtonMinimise";
import { ButtonMaximise } from "../Components/Buttons/ButtonMaximise";
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
// ig chart imports
import { IgrCategoryChart } from 'igniteui-react-charts/ES2015/igr-category-chart';
//import { IgrCategoryChartModule } from 'igniteui-react-charts/ES2015/igr-category-chart-module';
//import { IgrDataChartAnnotationModule } from 'igniteui-react-charts/ES2015/igr-data-chart-annotation-module';
import { ChartWizard } from "./Wizard/ChartWizard";
import { Helper } from "../../Utilities/Helpers/Helper";
import { ButtonEdit } from "../Components/Buttons/ButtonEdit";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";
import { PanelWithImageThreeButtons } from "../Components/Panels/PanelWithIImageThreeButtons";
import { ChartSize, ChartType, ChartCrosshairsMode, AxisLabelsLocation, HorizontalAlignment, LabelVisibility } from "../../Utilities/ChartEnums";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { ColorPicker } from "../ColorPicker";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { ButtonGeneral } from "../Components/Buttons/ButtonGeneral";
import { DefaultChartProperties } from "../../api/DefaultChartProperties";


interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
    ChartDefinitions: IChartDefinition[]
    CurrentChartDefinition: IChartDefinition
    ChartData: any
    onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionAddUpdateAction,
    onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => ChartRedux.ChartPropertiesUpdateAction,
    onSelectChartDefinition: (chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionSelectAction,
}

export interface ChartDisplayPopupWizardState {
    // Global
    IsChartMinimised: boolean;
    IsChartSettingsVisible: boolean;
    EditedChartDefinition: IChartDefinition;
    ChartProperties: IChartProperties

    // General
    ChartSize: ChartSize;
    IsGeneralMinimised: boolean;

    // Y Axis
    SetYAxisMinimumValue: boolean;
    SetYAxisLabelColor: boolean;
    SetYAxisTitleColor: boolean;
    IsYAxisMinimised: boolean;
    UseDefaultYAxisTitle: boolean;

    // X Axis
    IsXAxisMinimised: boolean;
    SetXAxisLabelColor: boolean;
    SetXAxisTitleColor: boolean;
    UseDefaultXAxisTitle: boolean;

    // Misc
    IsMiscMinimised: boolean;
    TitleMargin: number;
    SubTitleMargin: number;
}

class ChartDisplayPopupComponent extends React.Component<ChartDisplayPopupProps, ChartDisplayPopupWizardState> {

    constructor(props: ChartDisplayPopupProps) {
        super(props);

        this.state = {
            ChartProperties: this.props.CurrentChartDefinition.ChartProperties,
            EditedChartDefinition: null,
            IsChartSettingsVisible: false,
            IsChartMinimised: false,

            // General
            ChartSize: ChartSize.Medium,
            IsGeneralMinimised: false,

            // Y Axis
            IsYAxisMinimised: true,
            SetYAxisMinimumValue: this.props.CurrentChartDefinition.ChartProperties.YAxisMinimumValue != undefined,
            SetYAxisLabelColor: StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.YAxisLabelColor),
            SetYAxisTitleColor: StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.YAxisTitleColor),
            UseDefaultYAxisTitle: this.isDefaultYAxisTitle(), // StringExtensions.IsNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.YAxisTitle),

            // X Axis
            IsXAxisMinimised: true,
            SetXAxisLabelColor: StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.XAxisLabelColor),
            SetXAxisTitleColor: StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.XAxisTitleColor),
            UseDefaultXAxisTitle: this.isDefaultXAxisTitle(), // StringExtensions.IsNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.XAxisTitle),

            // Misc
            IsMiscMinimised: true,
            TitleMargin: (this.props.CurrentChartDefinition.ChartProperties.TitleAlignment == HorizontalAlignment.Right) ? 5 : 0,
            SubTitleMargin: (this.props.CurrentChartDefinition.ChartProperties.SubTitleAlignment == HorizontalAlignment.Right) ? 5 : 0

        }
   //     IgrCategoryChartModule.register();
   //     IgrDataChartAnnotationModule.register();
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__Charts";

        let closeButton = (this.props.showModal) ?
            null :
            <ButtonClose
                cssClassName={cssClassName}
                onClick={() => this.props.onClose()}
                bsStyle={PRIMARY_BSSTYLE}
                size={"small"}
                DisplayMode="Glyph"
                hideToolTip={true}
            />

        let editButton = (this.state.IsChartMinimised) ?
            null :
            <ButtonEdit
                cssClassName={cssClassName}
                style={{ marginRight: "5px" }}
                onClick={() => this.onEdit()}
                bsStyle={PRIMARY_BSSTYLE}
                size={"small"}
                DisplayMode="Glyph+Text"
                overrideText="Edit Chart"
                hideToolTip={true}
            />


        let minmaxButton = (this.props.showModal) ?
            null :
            this.state.IsChartMinimised ?
                <ButtonMaximise
                    cssClassName={cssClassName}
                    onClick={() => this.onChartMaximised()}
                    bsStyle={PRIMARY_BSSTYLE}
                    size={"small"}
                    DisplayMode="Glyph"
                    hideToolTip={true}
                />
                :
                <ButtonMinimise
                    cssClassName={cssClassName}
                    onClick={() => this.onChartMinimised()}
                    bsStyle={PRIMARY_BSSTYLE}
                    size={"small"}
                    DisplayMode="Glyph"
                    hideToolTip={true}
                />


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
                    onClick={() => this.onHideGeneralProperties()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Hide General Properties"}
                />

        let showYAxisPropertiesButton =
            this.state.IsYAxisMinimised ?
                <ButtonMaximise
                    cssClassName={cssClassName}
                    onClick={() => this.onShowYAxisProperties()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Show YAxis Properties"}
                />
                :
                <ButtonMinimise
                    cssClassName={cssClassName}
                    style={{ marginBottom: '10px' }}
                    onClick={() => this.onHideYAxisProperties()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Hide YAxis Properties"}
                />

        let showXAxisPropertiesButton =
            this.state.IsXAxisMinimised ?
                <ButtonMaximise
                    cssClassName={cssClassName}
                    onClick={() => this.onShowXAxisProperties()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Show XAxis Properties"}
                />
                :
                <ButtonMinimise
                    cssClassName={cssClassName}
                    onClick={() => this.onHideXAxisProperties()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Hide XAxis Properties"}
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
                    onClick={() => this.onHideMiscProperties()}
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

        let chartWidth: string = this.setChartWidth();
        let chartHeight: string = this.setChartHeight();
        let panelWidth: string = this.setPanelWidth();
        let chartColumnSize: number = this.setChartColumnSize();
        let legendColumnSize: number = this.setLegendColumnSize();
        let chartData = (this.state.IsChartMinimised == false && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?

            <IgrCategoryChart
                // datasource
                dataSource={this.props.ChartData}
                // chart type
                chartType={this.state.ChartProperties.ChartType}
                // size
                width={chartWidth}
                height={chartHeight}
                // titles
                chartTitle={this.props.CurrentChartDefinition.Title}
                subtitle={this.props.CurrentChartDefinition.SubTitle}
                // yAxis
                yAxisMinimumValue={this.state.ChartProperties.YAxisMinimumValue}
                yAxisTitle={this.getYAxisTitle(this.state.UseDefaultYAxisTitle)}
                yAxisLabelVisibility={this.state.ChartProperties.YAxisLabelVisibility}
                yAxisLabelLocation={this.state.ChartProperties.YAxisLabelLocation}
                yAxisLabelTextColor={this.state.ChartProperties.YAxisLabelColor}
                yAxisTitleTextColor={this.state.ChartProperties.YAxisTitleColor}
                // xAxis
                xAxisLabelVisibility={this.state.ChartProperties.XAxisLabelVisibility}
                xAxisTitle={this.getXAxisTitle(this.state.UseDefaultXAxisTitle)}
                xAxisTitleTextColor={this.state.ChartProperties.XAxisTitleColor}
                xAxisLabelTextColor={this.state.ChartProperties.XAxisLabelColor}

                // crosshairs
                crosshairsDisplayMode={this.state.ChartProperties.ChartCrosshairsMode}
                crosshairsSnapToData={this.state.ChartProperties.SpanCrossHairsToData}
                crosshairsAnnotationEnabled={this.state.ChartProperties.EnableCrosshairsAnnotations}
                // transitions
                isTransitionInEnabled={this.state.ChartProperties.EnableTransitions}
                // transitionInEasingFunction={EasingFunctions.cubicEase}
                transitionInDuration={this.state.ChartProperties.TransitionInDuration}
                finalValueAnnotationsVisible={this.state.ChartProperties.EnableFinalValueAnnotations}

                titleAlignment={this.state.ChartProperties.TitleAlignment}
                titleRightMargin={this.state.TitleMargin}
                titleTopMargin={this.state.TitleMargin}
                subtitleAlignment={this.state.ChartProperties.SubTitleAlignment}
                subtitleRightMargin={this.state.SubTitleMargin}
            //  subtitleRightMargin={this.state.TitleMargin}
            //subtitleTopMargin = {this.state.TitleMargin}

            // callouts - not doing yet as not sure how we can with dynamic data...
            // calloutsVisible={true}
            // calloutsXMemberPath="index"
            // calloutsYMemberPath="yValue"
            // calloutsLabelMemberPath="content"
            // calloutsContentMemberPath="yValue"


            // properties used in ig example
            //    xAxisFormatLabel={this.formatDateLabel}

            />
            :
            null;

        let optionChartTypes = EnumExtensions.getNames(ChartType).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartType}</option>
        })

        let optionCrossHairModeTypes = EnumExtensions.getNames(ChartCrosshairsMode).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartCrosshairsMode}</option>
        })

        let optionChartSizes = EnumExtensions.getNames(ChartSize).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as ChartSize}</option>
        })

        let optionAligments = EnumExtensions.getNames(HorizontalAlignment).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName as HorizontalAlignment}</option>
        })

        return <div className={cssClassName}>
            <PanelWithImageThreeButtons
                cssClassName={cssClassName}
                header={StrategyConstants.ChartStrategyName}
                style={{ width: panelWidth }}
                bsStyle={PRIMARY_BSSTYLE}
                glyphicon={StrategyConstants.ChartGlyph}
                secondButton={closeButton}
                firstButton={editButton}
                thirdButton={minmaxButton}
            >
                {this.state.IsChartMinimised == false &&
                    <div>
                        {this.state.IsChartSettingsVisible == false &&
                            <div>
                                <Row >
                                    <Col xs={12} >
                                        <div className="pull-right" >
                                            {openChartSettingsButton}
                                        </div>
                                    </Col>
                                </Row>

                            </div>
                        }
                        <Row>
                            <Col xs={chartColumnSize}>
                                {this.props.ChartData != null &&
                                    chartData
                                }
                            </Col>
                            {this.state.IsChartSettingsVisible &&
                                <Col xs={legendColumnSize}>
                                    <PanelWithButton bsSize={"xs"} bsStyle={INFO_BSSTYLE} headerText={"Chart Settings"} cssClassName={cssClassName} button={closeChartSettingsButton}>
                                        <AdaptableBlotterForm horizontal >
                                            <Row>
                                                <Col xs={12}>
                                                    <div className="pull-right" >
                                                        {setDefaultsButton}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </AdaptableBlotterForm>


                                        <PanelWithButton bsSize={"xs"} headerText={"General"} cssClassName={cssClassName} button={showGeneralPropertiesButton} style={{ marginTop: '10px' }}>
                                            {this.state.IsGeneralMinimised == false &&
                                                <div>
                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                        <Row>
                                                            <Col xs={5}>
                                                                <ControlLabel>Type</ControlLabel>
                                                            </Col>
                                                            <Col xs={7}>
                                                                <FormControl componentClass="select" placeholder="select" value={this.state.ChartProperties.ChartType} onChange={(x) => this.onChartTypeChange(x)} >
                                                                    {optionChartTypes}
                                                                </FormControl>
                                                            </Col>
                                                        </Row>
                                                    </AdaptableBlotterForm>
                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                        <Row>
                                                            <Col xs={5}>
                                                                <ControlLabel>Size</ControlLabel>
                                                            </Col>
                                                            <Col xs={7}>
                                                                <FormControl componentClass="select" placeholder="select" value={this.state.ChartSize} onChange={(x) => this.onChartSizeChange(x)} >
                                                                    {optionChartSizes}
                                                                </FormControl>
                                                            </Col>
                                                        </Row>
                                                    </AdaptableBlotterForm>
                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                        <Row>
                                                            <Col xs={5}>
                                                            </Col>
                                                            <Col xs={7}>
                                                                <Checkbox inline onChange={(e) => this.onEnableFinalValueAnnotationsOptionChanged(e)} checked={this.state.ChartProperties.EnableFinalValueAnnotations} >Show Annotations</Checkbox>
                                                            </Col>
                                                        </Row>
                                                    </AdaptableBlotterForm>

                                                    {this.state.ChartSize != ChartSize.XSmall &&
                                                        <div>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                <Row>
                                                                    <Col xs={5}>
                                                                        <ControlLabel>Crosshairs</ControlLabel>
                                                                    </Col>
                                                                    <Col xs={7}>
                                                                        <FormControl componentClass="select" placeholder="select" value={this.state.ChartProperties.ChartCrosshairsMode} onChange={(x) => this.onCrosshairsModeChange(x)} >
                                                                            {optionCrossHairModeTypes}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            {this.state.ChartProperties.ChartCrosshairsMode != ChartCrosshairsMode.None &&
                                                                <div>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                        <Row>
                                                                            <Col xs={5}>
                                                                            </Col>
                                                                            <Col xs={7}>
                                                                                <Checkbox onChange={(e) => this.onSpanCrossHairsToDataOptionChanged(e)} checked={this.state.ChartProperties.SpanCrossHairsToData} >Snap to Data</Checkbox>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col xs={5}>
                                                                            </Col>
                                                                            <Col xs={7}>
                                                                                <Checkbox inline onChange={(e) => this.onEnableCrosshairsAnnotationsOptionChanged(e)} checked={this.state.ChartProperties.EnableCrosshairsAnnotations} >Show Label</Checkbox>
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </div>
                                            }
                                        </PanelWithButton>

                                        {this.state.ChartSize != ChartSize.XSmall &&
                                            <div>
                                                <PanelWithButton bsSize={"xs"} headerText={"Y Axis"} cssClassName={cssClassName} button={showYAxisPropertiesButton} style={{ marginTop: '10px' }}>
                                                    {this.state.IsYAxisMinimised == false &&
                                                        <div>
                                                            <AdaptableBlotterForm horizontal>
                                                                <Row>
                                                                    <Col xs={5}>
                                                                        <ControlLabel>Min Value</ControlLabel>
                                                                    </Col>
                                                                    <Col xs={1}>
                                                                        <Checkbox onChange={(e) => this.onSetYAxisMinValueOptionChanged(e)} checked={this.state.SetYAxisMinimumValue} />
                                                                    </Col>
                                                                    <Col xs={5}>
                                                                        {this.state.SetYAxisMinimumValue &&
                                                                            <FormControl
                                                                                placeholder={"Enter number"}
                                                                                type="number"
                                                                                onChange={this.onYAxisMinValueChanged}
                                                                                value={this.state.ChartProperties.YAxisMinimumValue}
                                                                            />
                                                                        }
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                <Row>
                                                                    < Col xs={5}>
                                                                        <ControlLabel>Show Labels</ControlLabel>
                                                                    </Col>
                                                                    <Col xs={7} >
                                                                        <Checkbox onChange={(e) => this.onYAxisVisibilityOptionChanged(e)} checked={this.state.ChartProperties.YAxisLabelVisibility == LabelVisibility.Visible} />
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            {this.state.ChartProperties.YAxisLabelVisibility == LabelVisibility.Visible &&
                                                                <div>

                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                        <Row>
                                                                            <Col xs={5}><ControlLabel>Default Label</ControlLabel>
                                                                            </Col>
                                                                            <Col xs={7}>
                                                                                <Checkbox onChange={(e) => this.onUseDefaultYAxisTitleOptionChanged(e)} checked={this.state.UseDefaultYAxisTitle} />
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    {this.state.UseDefaultYAxisTitle == false &&
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                            <Row>
                                                                                <Col xs={5}>
                                                                                    <ControlLabel>Label</ControlLabel>
                                                                                </Col>
                                                                                <Col xs={7}>
                                                                                    <FormControl
                                                                                        placeholder={"Enter Label"}
                                                                                        type="text"
                                                                                        onChange={(e) => this.onYAxisTitleChanged(e)}
                                                                                        value={this.state.ChartProperties.YAxisTitle}
                                                                                    />
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                    }

                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                        <Row>
                                                                            <Col xs={5}>
                                                                                <ControlLabel>Position</ControlLabel>
                                                                            </Col>
                                                                            <Col xs={7} >
                                                                                <Radio inline value="left" checked={this.state.ChartProperties.YAxisLabelLocation == AxisLabelsLocation.OutsideLeft} onChange={(e) => this.onYAxisLabelLocationChange(e)}>Left</Radio>
                                                                                <Radio inline value="right" checked={this.state.ChartProperties.YAxisLabelLocation == AxisLabelsLocation.OutsideRight} onChange={(e) => this.onYAxisLabelLocationChange(e)}>Right</Radio>
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                        <Row>
                                                                            <Col xs={5}>
                                                                                <ControlLabel>Label Colour</ControlLabel>
                                                                            </Col>
                                                                            <Col xs={1}>
                                                                                <Checkbox onChange={(e) => this.onSetYAxisLabelColorOptionChanged(e)} checked={this.state.SetYAxisLabelColor} />
                                                                            </Col>
                                                                            <Col xs={5}>
                                                                                {this.state.SetYAxisLabelColor &&
                                                                                    <ColorPicker ColorPalette={this.props.ColorPalette} value={this.state.ChartProperties.YAxisLabelColor} onChange={(x) => this.onYAxisLabelColorChange(x)} />
                                                                                }
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                        <Row>
                                                                            <Col xs={5}>
                                                                                <ControlLabel>Title Colour</ControlLabel>
                                                                            </Col>
                                                                            <Col xs={1}>
                                                                                <Checkbox onChange={(e) => this.onSetYAxisTitleColorOptionChanged(e)} checked={this.state.SetYAxisTitleColor} />
                                                                            </Col>
                                                                            <Col xs={5}>
                                                                                {this.state.SetYAxisTitleColor &&
                                                                                    <ColorPicker ColorPalette={this.props.ColorPalette} value={this.state.ChartProperties.YAxisTitleColor} onChange={(x) => this.onYAxisTitleColorChange(x)} />
                                                                                }
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                </div>
                                                            }

                                                        </div>
                                                    }
                                                </PanelWithButton>
                                                <PanelWithButton bsSize={"xs"} headerText={"X Axis"} cssClassName={cssClassName} button={showXAxisPropertiesButton}>
                                                    {this.state.IsXAxisMinimised == false &&
                                                        <div>
                                                            <AdaptableBlotterForm horizontal >
                                                                <Row>
                                                                    <Col xs={5}>
                                                                        <ControlLabel>Show Labels</ControlLabel>
                                                                    </Col>
                                                                    <Col xs={7}>
                                                                        <Checkbox onChange={(e) => this.onXAxisVisibilityOptionChanged(e)} checked={this.state.ChartProperties.XAxisLabelVisibility == LabelVisibility.Visible} />
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            {this.state.ChartProperties.XAxisLabelVisibility == LabelVisibility.Visible &&
                                                                <div>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                        <Row>
                                                                            <Col xs={5}><ControlLabel>Default Label</ControlLabel>
                                                                            </Col>
                                                                            <Col xs={7}>
                                                                                <Checkbox onChange={(e) => this.onUseDefaultXAxisTitleOptionChanged(e)} checked={this.state.UseDefaultXAxisTitle} />
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    {this.state.UseDefaultXAxisTitle == false &&
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                            <Row>
                                                                                <Col xs={5}>
                                                                                    <ControlLabel>Label</ControlLabel>
                                                                                </Col>
                                                                                <Col xs={7}>
                                                                                    <FormControl
                                                                                        placeholder={"Enter Label"}
                                                                                        type="text"
                                                                                        onChange={(e) => this.onXAxisTitleChanged(e)}
                                                                                        value={this.state.ChartProperties.XAxisTitle}
                                                                                    />
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                    }
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                        <Row>
                                                                            <Col xs={5}>
                                                                                <ControlLabel>Label Colour</ControlLabel>
                                                                            </Col>
                                                                            <Col xs={1}>
                                                                                <Checkbox onChange={(e) => this.onSetXAxisLabelColorOptionChanged(e)} checked={this.state.SetXAxisLabelColor} />
                                                                            </Col>
                                                                            <Col xs={5}>
                                                                                {this.state.SetXAxisLabelColor &&
                                                                                    <ColorPicker ColorPalette={this.props.ColorPalette} value={this.state.ChartProperties.XAxisLabelColor} onChange={(x) => this.onXAxisLabelColorChange(x)} />
                                                                                }
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                        <Row>
                                                                            <Col xs={5}>
                                                                                <ControlLabel>Title Colour</ControlLabel>
                                                                            </Col>
                                                                            <Col xs={1}>
                                                                                <Checkbox onChange={(e) => this.onSetXAxisTitleColorOptionChanged(e)} checked={this.state.SetXAxisTitleColor} />
                                                                            </Col>
                                                                            <Col xs={5}>
                                                                                {this.state.SetXAxisTitleColor &&
                                                                                    <ColorPicker ColorPalette={this.props.ColorPalette} value={this.state.ChartProperties.XAxisTitleColor} onChange={(x) => this.onXAxisTitleColorChange(x)} />
                                                                                }
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </PanelWithButton>

                                                <PanelWithButton bsSize={"xs"} headerText={"Misc"} cssClassName={cssClassName} button={showMiscPropertiesButton}>
                                                    {this.state.IsMiscMinimised == false &&
                                                        <div>
                                                            <AdaptableBlotterForm horizontal >
                                                                <Row>
                                                                    <Col xs={5}>
                                                                        <ControlLabel>Title</ControlLabel>
                                                                    </Col>
                                                                    <Col xs={7}>
                                                                        <FormControl componentClass="select" placeholder="select" value={this.state.ChartProperties.TitleAlignment} onChange={(x) => this.onTitleAlignmentChange(x)} >
                                                                            {optionAligments}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                <Row>
                                                                    <Col xs={5}>
                                                                        <ControlLabel>Subtitle</ControlLabel>
                                                                    </Col>
                                                                    <Col xs={7}>
                                                                        <FormControl componentClass="select" placeholder="select" value={this.state.ChartProperties.SubTitleAlignment} onChange={(x) => this.onSubTitleAlignmentChange(x)} >
                                                                            {optionAligments}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                <Row>
                                                                    <Col xs={5}>
                                                                        <ControlLabel>Transitions</ControlLabel>
                                                                    </Col>
                                                                    <Col xs={6}>
                                                                        <Checkbox onChange={(e) => this.onEnableTransitionsOptionChanged(e)} checked={this.state.ChartProperties.EnableTransitions} />
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            {this.state.ChartProperties.EnableTransitions &&
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '10px' }}>
                                                                    <Row>
                                                                        <Col xs={5}>
                                                                            <ControlLabel>Duration</ControlLabel>
                                                                        </Col>
                                                                        <Col xs={7}>
                                                                            <FormControl
                                                                                placeholder={"Length (ms)"}
                                                                                type="number"
                                                                                onChange={this.onTransitionDurationChanged}
                                                                                value={this.state.ChartProperties.TransitionInDuration}
                                                                            />
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                            }
                                                        </div>
                                                    }
                                                </PanelWithButton>

                                            </div>
                                        }

                                    </PanelWithButton>
                                </Col>
                            }
                        </Row>
                    </div>
                }

            </PanelWithImageThreeButtons>

            {this.state.EditedChartDefinition &&
                <ChartWizard
                    cssClassName={cssClassName}
                    EditedAdaptableBlotterObject={this.state.EditedChartDefinition}
                    ConfigEntities={this.props.ChartDefinitions}
                    ModalContainer={this.props.ModalContainer}
                    Columns={this.props.Columns}
                    UserFilters={this.props.UserFilters}
                    SystemFilters={this.props.SystemFilters}
                    Blotter={this.props.Blotter}
                    WizardStartIndex={0}
                    onCloseWizard={() => this.onCloseWizard()}
                    onFinishWizard={() => this.onFinishWizard()}
                    canFinishWizard={() => this.canFinishWizard()}
                />
            }

        </div>
    }

    onEdit(): void {
        this.setState({ EditedChartDefinition: Helper.cloneObject(this.props.CurrentChartDefinition) });
    }

    onChartMinimised() {
        this.setState({ IsChartMinimised: true, } as ChartDisplayPopupWizardState)
    }

    onChartMaximised() {
        this.setState({ IsChartMinimised: false, } as ChartDisplayPopupWizardState)
    }

    onSetPropertyDefaults() {
        // first update our state
        this.setState({
            IsGeneralMinimised: false,
            IsYAxisMinimised: true,
            SetYAxisMinimumValue: false,
            SetYAxisLabelColor: false,
            SetYAxisTitleColor: false,
            IsXAxisMinimised: true,
            SetXAxisLabelColor: false,
            SetXAxisTitleColor: false,
            IsMiscMinimised: true,
            TitleMargin: 0,
            SubTitleMargin: 0,
            UseDefaultXAxisTitle: true
        } as ChartDisplayPopupWizardState)
        // then update the properties
        let chartProperties: IChartProperties = Helper.cloneObject(DefaultChartProperties);
        // do the titles 
        chartProperties.YAxisTitle = this.getYAxisTitle(true);
        chartProperties.XAxisTitle = this.getXAxisTitle(true);
        this.updateChartProperties(chartProperties);
    }

    onShowGeneralProperties() {
        this.setState({ IsGeneralMinimised: false, } as ChartDisplayPopupWizardState)
    }

    onHideGeneralProperties() {
        this.setState({ IsGeneralMinimised: true, } as ChartDisplayPopupWizardState)
    }

    onShowYAxisProperties() {
        this.setState({ IsYAxisMinimised: false, } as ChartDisplayPopupWizardState)
    }

    onHideYAxisProperties() {
        this.setState({ IsYAxisMinimised: true, } as ChartDisplayPopupWizardState)
    }

    onShowXAxisProperties() {
        this.setState({ IsXAxisMinimised: false, } as ChartDisplayPopupWizardState)
    }

    onHideXAxisProperties() {
        this.setState({ IsXAxisMinimised: true, } as ChartDisplayPopupWizardState)
    }

    onShowMiscProperties() {
        this.setState({ IsMiscMinimised: false, } as ChartDisplayPopupWizardState)
    }

    onHideMiscProperties() {
        this.setState({ IsMiscMinimised: true, } as ChartDisplayPopupWizardState)
    }

    onShowChartSettings() {
        this.setState({ IsChartSettingsVisible: true, } as ChartDisplayPopupWizardState)
    }

    onHideChartSettings() {
        this.setState({ IsChartSettingsVisible: false, } as ChartDisplayPopupWizardState)
    }

    onChartTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.ChartType = e.value as ChartType;
        this.updateChartProperties(chartProperties);
    }

    onChartSizeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.setState({ ChartSize: e.value, } as ChartDisplayPopupWizardState)
    }

    onYAxisLabelLocationChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelLocation = (e.value == "left") ? AxisLabelsLocation.OutsideLeft : AxisLabelsLocation.OutsideRight;
        this.updateChartProperties(chartProperties);
    }

    private onYAxisLabelColorChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelColor = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onXAxisLabelColorChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.XAxisLabelColor = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onYAxisTitleColorChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.YAxisTitleColor = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onXAxisTitleColorChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.XAxisTitleColor = e.value;
        this.updateChartProperties(chartProperties);
    }

    onCrosshairsModeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.ChartCrosshairsMode = e.value as ChartCrosshairsMode;
        this.updateChartProperties(chartProperties);
    }

    private onSpanCrossHairsToDataOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.SpanCrossHairsToData = e.checked
        this.updateChartProperties(chartProperties);
    }

    private onEnableCrosshairsAnnotationsOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.EnableCrosshairsAnnotations = e.checked
        this.updateChartProperties(chartProperties);
    }

    private onEnableFinalValueAnnotationsOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.EnableFinalValueAnnotations = e.checked;
        this.updateChartProperties(chartProperties);
    }

    private onEnableTransitionsOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.EnableTransitions = e.checked;
        if (e.checked == false) {
            chartProperties.TransitionInDuration = undefined;
        }
        this.updateChartProperties(chartProperties);
    }

    private onSetYAxisMinValueOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisMinimumValue: true } as ChartDisplayPopupWizardState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisMinimumValue: e.checked } as ChartDisplayPopupWizardState)
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.YAxisMinimumValue = undefined;
            this.updateChartProperties(chartProperties);
        }

    }

    private onSetYAxisLabelColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisLabelColor: true } as ChartDisplayPopupWizardState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisLabelColor: e.checked } as ChartDisplayPopupWizardState)
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.YAxisLabelColor = "";
            this.updateChartProperties(chartProperties);
        }

    }

    private onSetXAxisLabelColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetXAxisLabelColor: true } as ChartDisplayPopupWizardState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetXAxisLabelColor: e.checked } as ChartDisplayPopupWizardState)
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.XAxisLabelColor = "";
            this.updateChartProperties(chartProperties);
        }

    }

    private onSetYAxisTitleColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisTitleColor: true } as ChartDisplayPopupWizardState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisTitleColor: e.checked } as ChartDisplayPopupWizardState)
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.YAxisTitleColor = "";
            this.updateChartProperties(chartProperties);
        }

    }
    private onSetXAxisTitleColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetXAxisTitleColor: true } as ChartDisplayPopupWizardState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetXAxisTitleColor: e.checked } as ChartDisplayPopupWizardState)
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.XAxisTitleColor = "";
            this.updateChartProperties(chartProperties);
        }

    }

    onTitleAlignmentChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.TitleAlignment = e.value as HorizontalAlignment;
        this.updateChartProperties(chartProperties);
        let titleMargin: number = (e.value == HorizontalAlignment.Right) ? 5 : 0
        this.setState({ TitleMargin: titleMargin, } as ChartDisplayPopupWizardState)
    }

    onSubTitleAlignmentChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.SubTitleAlignment = e.value as HorizontalAlignment;
        this.updateChartProperties(chartProperties);
        let subtitleMargin: number = (e.value == HorizontalAlignment.Right) ? 5 : 0
        this.setState({ SubTitleMargin: subtitleMargin, } as ChartDisplayPopupWizardState)
    }

    private onYAxisMinValueChanged = (e: any) => {
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.YAxisMinimumValue = e.target.value;
        this.updateChartProperties(chartProperties);
    }

    private onTransitionDurationChanged = (e: any) => {
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.TransitionInDuration = e.target.value;
        this.updateChartProperties(chartProperties);
    }

    private updateChartProperties(chartProperties: IChartProperties): void {
        this.setState({ ChartProperties: chartProperties, } as ChartDisplayPopupWizardState)
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Title, chartProperties)
    }

    private onXAxisVisibilityOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.XAxisLabelVisibility = (e.checked) ? LabelVisibility.Visible : LabelVisibility.Collapsed;
        this.updateChartProperties(chartProperties);
    }

    private onYAxisVisibilityOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelVisibility = (e.checked) ? LabelVisibility.Visible : LabelVisibility.Collapsed;
        this.updateChartProperties(chartProperties);
    }

    private onYAxisTitleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.YAxisTitle = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onXAxisTitleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.XAxisTitle = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onUseDefaultYAxisTitleOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.YAxisTitle = "";
            this.updateChartProperties(chartProperties);
        }

        this.setState({ UseDefaultYAxisTitle: e.checked, } as ChartDisplayPopupWizardState)
    }

    private onUseDefaultXAxisTitleOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.XAxisTitle = "";
            this.updateChartProperties(chartProperties);
        }

        this.setState({ UseDefaultXAxisTitle: e.checked, } as ChartDisplayPopupWizardState)
    }

    private getYAxisTitle(useDefault: boolean): string {
        if (useDefault) {
            return this.createDefaultYAxisTitle();
        }
        return this.state.ChartProperties.YAxisTitle;
    }

    private getXAxisTitle(useDefault: boolean): string {
        if (useDefault) {
            return this.createDefaultXAxisTitle();
        }
        return this.state.ChartProperties.XAxisTitle;
    }

    private createDefaultYAxisTitle(): string {
        return this.props.CurrentChartDefinition.YAxisColumnIds.map(c => {
            return ColumnHelper.getFriendlyNameFromColumnId(c, this.props.Columns)
        }).join(', ')
    }

    private createDefaultXAxisTitle(): string {
        let returnString: string = ColumnHelper.getFriendlyNameFromColumnId(this.props.CurrentChartDefinition.XAxisColumnId, this.props.Columns);
        if (StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.AdditionalColumnId)) {
            returnString = returnString + " (by " + ColumnHelper.getFriendlyNameFromColumnId(this.props.CurrentChartDefinition.AdditionalColumnId, this.props.Columns) + ")"
        }
        return returnString;
    }

    private isDefaultYAxisTitle(): boolean {
        return StringExtensions.IsNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.YAxisTitle) ||
            this.props.CurrentChartDefinition.ChartProperties.YAxisTitle == this.createDefaultYAxisTitle();
    }

    private isDefaultXAxisTitle(): boolean {
        return StringExtensions.IsNullOrEmpty(this.props.CurrentChartDefinition.ChartProperties.XAxisTitle) ||
            this.props.CurrentChartDefinition.ChartProperties.XAxisTitle == this.createDefaultXAxisTitle();
    }

    onCloseWizard() {
        this.setState({ EditedChartDefinition: null });
    }

    onFinishWizard() {
        let clonedObject: IChartDefinition = Helper.cloneObject(this.state.EditedChartDefinition);
        let index: number = this.props.ChartDefinitions.findIndex(cd => cd.Title == this.state.EditedChartDefinition.Title);
        this.props.onAddUpdateChartDefinition(index, clonedObject);
        this.setState({ EditedChartDefinition: null });
        this.props.onSelectChartDefinition(clonedObject);
    }

    canFinishWizard() {
        return StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Title);
    }

    setChartHeight(): string {
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
                return '350px';
            case ChartSize.Small:
                return '450px';
            case ChartSize.Medium:
                return '600px';
            case ChartSize.Large:
                return '750px';
            case ChartSize.XLarge:
                return '850px';
        }
    }

    setChartWidth(): string {
        let chartWidth: number;
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
                chartWidth = (this.state.IsChartSettingsVisible) ? 375 : 600
                break;
            case ChartSize.Small:
                chartWidth = (this.state.IsChartSettingsVisible) ? 525 : 850
                break;
            case ChartSize.Medium:
                chartWidth = (this.state.IsChartSettingsVisible) ? 750 : 1100
                break;
            case ChartSize.Large:
                chartWidth = (this.state.IsChartSettingsVisible) ? 1050 : 1350
                break;
            case ChartSize.XLarge:
                chartWidth = (this.state.IsChartSettingsVisible) ? 1200 : 1600
                break;
        }
        chartWidth = (this.state.ChartProperties.XAxisLabelVisibility == LabelVisibility.Visible) ? chartWidth : chartWidth - 10;
        return chartWidth + 'px'
    }

    setPanelWidth(): string {
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
                return '650px';
            case ChartSize.Small:
                return '900px';
            case ChartSize.Medium:
                return '1150px';
            case ChartSize.Large:
                return '1400px';
            case ChartSize.XLarge:
                return '1650px';
        }
    }

    setChartColumnSize(): number {
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
            case ChartSize.Small:
                return 7;
            case ChartSize.Medium:
                return 8;
            case ChartSize.Large:
            case ChartSize.XLarge:
                return 9;
        }
    }

    setLegendColumnSize(): number {
        switch (this.state.ChartSize) {
            case ChartSize.XSmall:
            case ChartSize.Small:
                return 5;
            case ChartSize.Medium:
                return 4;
            case ChartSize.Large:
            case ChartSize.XLarge:
                return 3;
        }
    }

}

function mapStateToProps(state: AdaptableBlotterState) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.CurrentChartDefinition,
        ChartData: state.System.ChartData,

    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => dispatch(ChartRedux.ChartPropertiesUpdate(chartTitle, chartProperties)),
        onSelectChartDefinition: (chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
    };
}

export let ChartDisplayPopup = connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
