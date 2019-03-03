import * as React from "react";
import * as Redux from "redux";
import { connect } from 'react-redux';
import { ChartDisplayPopupPropsBase } from '../Components/SharedProps/ChartDisplayPopupPropsBase'
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore'
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { IChartProperties } from "../../Utilities/Interface/IChartProperties";
import { IChartDefinition } from "../../Utilities/Interface/BlotterObjects/IChartDefinition";
import { ButtonClose } from "../Components/Buttons/ButtonClose";
import { PRIMARY_BSSTYLE, DEFAULT_BSSTYLE, INFO_BSSTYLE } from "../../Utilities/Constants/StyleConstants";
import { StringExtensions } from "../../Utilities/Extensions/StringExtensions";
import { Row, Col, ControlLabel, FormControl, Checkbox, Radio, Table } from "react-bootstrap";
import { ButtonMinimise } from "../Components/Buttons/ButtonMinimise";
import { ButtonMaximise } from "../Components/Buttons/ButtonMaximise";
import * as ChartRedux from '../../Redux/ActionsReducers/ChartRedux'
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux'
// ig chart imports
import { IgrCategoryChart } from 'igniteui-react-charts/ES2015/igr-category-chart';
import { IgrCategoryChartModule } from 'igniteui-react-charts/ES2015/igr-category-chart-module';
import { IgrDataChartAnnotationModule } from 'igniteui-react-charts/ES2015/igr-data-chart-annotation-module';
import { ChartWizard } from "./Wizard/ChartWizard";
import { Helper } from "../../Utilities/Helpers/Helper";
import { ButtonEdit } from "../Components/Buttons/ButtonEdit";
import { PanelWithImageThreeButtons } from "../Components/Panels/PanelWithIImageThreeButtons";
import {
    ChartType, CrosshairDisplayMode,
    AxisLabelsLocation, HorizontalAlignment, LabelVisibility, ToolTipType, ChartVisibility,
    AxisAngle, AxisScale
} from "../../Utilities/ChartEnums";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { ColorPicker } from "../ColorPicker";
import { AdaptableBlotterForm } from "../Components/Forms/AdaptableBlotterForm";
import { ButtonGeneral } from "../Components/Buttons/ButtonGeneral";
import { DefaultChartProperties } from "../../Utilities/Defaults/DefaultChartProperties";
import { PanelWithTwoButtons } from "../Components/Panels/PanelWithTwoButtons";
import { ChartDisplayPopupState } from "./ChartDisplayPopupState";
import { ChartUIHelper } from "./ChartUIHelper";

interface ChartDisplayPopupProps extends ChartDisplayPopupPropsBase<ChartDisplayPopupComponent> {
    ChartDefinitions: IChartDefinition[];
    CurrentChartDefinition: IChartDefinition;
    ChartData: any;
    CalloutsData: any;
    ChartVisibility: ChartVisibility;

    onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => ChartRedux.ChartDefinitionAddUpdateAction,
    onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => ChartRedux.ChartPropertiesUpdateAction,
    onSelectChartDefinition: (chartDefinition: string) => ChartRedux.ChartDefinitionSelectAction,
    onSetChartVisibility: (chartVisibility: ChartVisibility) => SystemRedux.ChartSetChartVisibiityAction
}

class ChartDisplayPopupComponent extends React.Component<ChartDisplayPopupProps, ChartDisplayPopupState> {

    public seriesColors: Map<string, string> = new Map<string, string>();

    constructor(props: ChartDisplayPopupProps) {
        super(props);

        // added for synchronizing color of series with colors of callouts:
        this.seriesAdded = this.seriesAdded.bind(this);
        this.calloutStyleUpdating = this.calloutStyleUpdating.bind(this);

        this.state = ChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition, this.props.Columns);
        IgrCategoryChartModule.register();
        IgrDataChartAnnotationModule.register();
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__Charts";

        let closeButton = (this.props.ShowModal) ?
            null :
            <ButtonClose
                cssClassName={cssClassName}
                onClick={() => this.props.onClose()}
                bsStyle={PRIMARY_BSSTYLE}
                size={"small"}
                DisplayMode="Glyph"
                hideToolTip={true}
            />

        let editButton = (this.props.ChartVisibility == ChartVisibility.Minimised) ?
            null :
            <ButtonEdit
                cssClassName={cssClassName}
                style={{ marginRight: "5px" }}
                onClick={() => this.onEditChart()}
                bsStyle={PRIMARY_BSSTYLE}
                size={"small"}
                DisplayMode="Glyph+Text"
                overrideText="Edit Chart"
                hideToolTip={true}
            />


        let minmaxButton = (this.props.ShowModal) ?
            null :
            this.props.ChartVisibility == ChartVisibility.Minimised ?
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
                    onClick={() => this.onHidePropertiesGroup()}
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
                    onClick={() => this.onHidePropertiesGroup()}
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
                    onClick={() => this.onHidePropertiesGroup()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Hide XAxis Properties"}
                />

        let showHighlightsPropertiesButton =
            this.state.IsHighlightsMinimised ?
                <ButtonMaximise
                    cssClassName={cssClassName}
                    onClick={() => this.onShowHighlightsProperties()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Show Highlights Properties"}
                />
                :
                <ButtonMinimise
                    cssClassName={cssClassName}
                    onClick={() => this.onHidePropertiesGroup()}
                    bsStyle={DEFAULT_BSSTYLE}
                    size={"xs"}
                    DisplayMode="Glyph"
                    hideToolTip={false}
                    overrideTooltip={"Hide Highlights Properties"}
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

        let chartElement = (this.props.ChartVisibility == ChartVisibility.Maximised && this.props.ChartData != null && this.props.CurrentChartDefinition != null) ?

            <IgrCategoryChart
                // data source
                dataSource={this.props.ChartData}
                // chart type
                chartType={this.state.ChartProperties.ChartType}
                markerTypes={ChartUIHelper.getMarkerFromProps(this.state.ChartProperties)}
                // size
                width={'100%'}
                height={'500px'}
                // titles (titles, alignment and margins)
                chartTitle={this.props.CurrentChartDefinition.Title}
                subtitle={this.props.CurrentChartDefinition.SubTitle}
                titleAlignment={this.state.ChartProperties.TitleAlignment}
                titleRightMargin={this.state.TitleMargin}
                titleTopMargin={this.state.TitleMargin}
                subtitleAlignment={this.state.ChartProperties.SubTitleAlignment}
                subtitleRightMargin={this.state.SubTitleMargin}
                // yAxis
                yAxisMinimumValue={this.state.ChartProperties.YAxisMinimumValue}
                yAxisMaximumValue={this.state.ChartProperties.YAxisMaximumValue}
                yAxisTitle={this.getYAxisTitle(this.state.UseDefaultYAxisTitle)}
                yAxisLabelVisibility={this.state.ChartProperties.YAxisLabelVisibility}
                yAxisLabelLocation={this.state.ChartProperties.YAxisLabelLocation}
                yAxisLabelTextColor={this.state.ChartProperties.YAxisLabelColor}
                yAxisTitleTextColor={this.state.ChartProperties.YAxisTitleColor}
                yAxisIsLogarithmic={this.getYAxisIsLogarithmic(this.state.ChartProperties.YAxisLabelScale)}
                yAxisInverted={this.state.ChartProperties.YAxisInverted}
                // xAxis
                xAxisLabelVisibility={this.state.ChartProperties.XAxisLabelVisibility}
                xAxisTitle={this.getXAxisTitle(this.state.UseDefaultXAxisTitle)}
                xAxisTitleTextColor={this.state.ChartProperties.XAxisTitleColor}
                xAxisLabelTextColor={this.state.ChartProperties.XAxisLabelColor}
                xAxisGap={this.state.ChartProperties.XAxisGap}
                xAxisOverlap={this.state.ChartProperties.XAxisOverlap}
                xAxisInverted={this.state.ChartProperties.XAxisInverted}
                // TODO we will add 'xAxisLabelLocation' in the next release (ETA middle of 2019)
                // xAxisLabelLocation={this.state.ChartProperties.XAxisLabelLocation}

                // tooltip
                toolTipType={this.state.ChartProperties.ToolTipType}
                // crosshairs
                crosshairsDisplayMode={this.state.ChartProperties.CrosshairDisplayMode}
                crosshairsSnapToData={this.state.ChartProperties.CrosshairSnapToData}
                crosshairsAnnotationEnabled={this.state.ChartProperties.CrosshairAnnotationEnabled}
                // transitions
                isTransitionInEnabled={this.state.ChartProperties.EnableTransitions}
                // transitionInEasingFunction={EasingFunctions.cubicEase}
                transitionInDuration={this.state.ChartProperties.TransitionInDuration}
                finalValueAnnotationsVisible={this.state.ChartProperties.EnableFinalValueAnnotations}
                // hightlights
                isSeriesHighlightingEnabled={this.state.ChartProperties.EnableSeriesHighlighting}
                isCategoryHighlightingEnabled={this.state.ChartProperties.EnableCategoryHighlighting}
                isItemHighlightingEnabled={this.state.ChartProperties.EnableItemHighlighting}
                //transitionDuration


                // playing
                //  xAxisTickStroke="gray"
                //  xAxisTickLength={5}

                //ubtitleRightMargin={this.state.TitleMargin}
                //subtitleTopMargin = {this.state.TitleMargin}

                // TODO consider adding this binding for Line, Spline, Area, Step ChartTypes
                // and showing controls for editing this value in Chart Settings UI under the General panel
                // thickness={this.state.ChartProperties.SeriesThickness}

                // callouts generated dynamiclly based on current data source and callout properties:
                calloutsDataSource={ChartUIHelper.getCalloutsData(this.props.ChartData, this.state.ChartProperties)}
                calloutsVisible={true}
                calloutsXMemberPath="CalloutsIndex"
                calloutsYMemberPath="CalloutsValue"
                calloutsLabelMemberPath="CalloutsLabel"
                calloutsContentMemberPath="MemberPath"
                calloutStyleUpdating={this.calloutStyleUpdating}
                calloutStyleUpdatingEventEnabled={true}
                seriesAdded={this.seriesAdded}

                //xAxisInterval={1}
                xAxisLabelAngle={ChartUIHelper.getAngleFromEnum(this.state.ChartProperties.XAxisAngle)}
            // properties used in ig example
            //    xAxisFormatLabel={this.formatDateLabel}

            // properties not doing
            // tick length seems to be space between the legend and the points - doubt worth setting for V1.
            //   yAxisTickLength={0}
            //  xAxisTickLength={15}
            //  xAxisTickStrokeThickness={1} // not sure what it does but looks minor!
            />
            :
            null;

        return <span className={cssClassName}>
            <PanelWithImageThreeButtons
                cssClassName={cssClassName}
                header={StrategyConstants.ChartStrategyName}
                bsStyle={PRIMARY_BSSTYLE}
                style={{ marginRight: '30px' }}
                glyphicon={StrategyConstants.ChartGlyph}
                secondButton={closeButton}
                firstButton={editButton}
                thirdButton={minmaxButton}
            >
                {this.props.ChartVisibility == ChartVisibility.Maximised &&
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

                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '2px' }}>
                                                                    <Row>
                                                                        <Col xs={6}><ControlLabel>Chart Type</ControlLabel></Col>
                                                                        <Col xs={6}>
                                                                            <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                value={this.state.ChartProperties.ChartType}
                                                                                onChange={(x) => this.onChartTypeChange(x)} >
                                                                                {ChartUIHelper.getChartTypeOptions()}
                                                                            </FormControl>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={6}><ControlLabel>Marker Type</ControlLabel></Col>
                                                                        <Col xs={6}>
                                                                            <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                value={this.state.ChartProperties.MarkerType}
                                                                                onChange={(x) => this.onMarkerTypeChange(x)} >
                                                                                {ChartUIHelper.getMarkerTypeOptions()}
                                                                            </FormControl>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>

                                                                {this.state.ChartProperties.ChartType == ChartType.Column &&
                                                                    <div>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}><ControlLabel>Column Gap</ControlLabel></Col>
                                                                                <Col xs={6}>
                                                                                    <FormControl
                                                                                        value={this.state.ChartProperties.XAxisGap}
                                                                                        bsSize={"small"} type="number"
                                                                                        min="0" step="0.1" max="1"
                                                                                        placeholder="Enter"
                                                                                        onChange={(e) => this.onXAxisGapChanged(e)} />
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>

                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}><ControlLabel>Column Overlap</ControlLabel></Col>
                                                                                <Col xs={6}>
                                                                                    <FormControl
                                                                                        value={this.state.ChartProperties.XAxisOverlap}
                                                                                        bsSize={"small"} type="number"
                                                                                        min="0" step="0.1" max="1"
                                                                                        placeholder="Enter"
                                                                                        onChange={(e) => this.onXAxisOverlapChanged(e)} />
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                    </div>
                                                                }

                                                            </div>
                                                        }
                                                    </PanelWithButton>

                                                    <PanelWithButton glyphicon={"resize-vertical"} bsSize={"xs"} headerText={"Y (Vertical) Axis"} cssClassName={cssClassName} button={showYAxisPropertiesButton} style={{ marginTop: '2px' }}>
                                                        {this.state.IsYAxisMinimised == false &&
                                                            <div>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '2px' }}>
                                                                    <Row>
                                                                        <Col xs={12} >
                                                                            {/* TODO move this Checkbox next to showYAxisPropertiesButton since it applies to all Y-Axis properties  */}
                                                                            <Checkbox onChange={(e) => this.onYAxisVisibilityOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.YAxisLabelVisibility == LabelVisibility.Visible}>Axis Visible</Checkbox>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>

                                                                {this.state.ChartProperties.YAxisLabelVisibility == LabelVisibility.Visible &&
                                                                    <div>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={12}>
                                                                                    <Checkbox onChange={(e) => this.onYAxisInvertedChanged(e)}
                                                                                        checked={this.state.ChartProperties.YAxisInverted}>Axis Inverted</Checkbox>
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}><ControlLabel>Axis Location</ControlLabel></Col>
                                                                                <Col xs={6}>
                                                                                    <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                        value={this.state.ChartProperties.YAxisLabelLocation}
                                                                                        onChange={(x) => this.onYAxisLabelLocationChange(x)} >
                                                                                        {ChartUIHelper.getYAxisLabelsLocations()}
                                                                                    </FormControl>
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}><ControlLabel>Labels Scale</ControlLabel></Col>
                                                                                <Col xs={6}>
                                                                                    <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                        value={this.state.ChartProperties.YAxisLabelScale}
                                                                                        onChange={(x) => this.onYAxisLabelScaleChanged(x)} >
                                                                                        {ChartUIHelper.getAxisLabelScales()}
                                                                                    </FormControl>
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <Checkbox onChange={(e) => this.onSetYAxisMinValueOptionChanged(e)}
                                                                                        checked={this.state.SetYAxisMinimumValue} >Labels Min</Checkbox>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    {this.state.SetYAxisMinimumValue &&
                                                                                        <FormControl
                                                                                            bsSize={"small"} type="number"
                                                                                            placeholder={"Input"}
                                                                                            onChange={this.onYAxisMinValueChanged}
                                                                                            value={this.state.ChartProperties.YAxisMinimumValue} />
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <Checkbox onChange={(e) => this.onSetYAxisMaxValueOptionChanged(e)}
                                                                                        checked={this.state.SetYAxisMaximumValue} >Labels Max</Checkbox>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    {this.state.SetYAxisMaximumValue &&
                                                                                        <FormControl
                                                                                            bsSize={"small"} type="number"
                                                                                            placeholder={"Input"}
                                                                                            onChange={this.onYAxisMaxValueChanged}
                                                                                            value={this.state.ChartProperties.YAxisMaximumValue} />
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <Checkbox onChange={(e) => this.onSetYAxisLabelColorOptionChanged(e)}
                                                                                        checked={this.state.SetYAxisLabelColor} >Labels Color</Checkbox>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    {this.state.SetYAxisLabelColor &&
                                                                                        <ColorPicker ColorPalette={this.props.ColorPalette}
                                                                                            value={this.state.ChartProperties.YAxisLabelColor}
                                                                                            onChange={(x) => this.onYAxisLabelColorChange(x)} />
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>

                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '5px' }}>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <Checkbox onChange={(e) => this.onUseDefaultYAxisTitleOptionChanged(e)}
                                                                                        checked={this.state.UseDefaultYAxisTitle} >Title Default</Checkbox>
                                                                                </Col>
                                                                                {this.state.UseDefaultYAxisTitle == false &&
                                                                                    <Col xs={6}>
                                                                                        <FormControl
                                                                                            bsSize={"small"} type="text"
                                                                                            placeholder={"Enter Title"}
                                                                                            onChange={(e) => this.onYAxisTitleChanged(e)}
                                                                                            value={this.state.ChartProperties.YAxisTitle} />
                                                                                    </Col>}
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <Checkbox onChange={(e) => this.onSetYAxisTitleColorOptionChanged(e)}
                                                                                        checked={this.state.SetYAxisTitleColor} >Title Color</Checkbox>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    {this.state.SetYAxisTitleColor &&
                                                                                        <ColorPicker ColorPalette={this.props.ColorPalette}
                                                                                            value={this.state.ChartProperties.YAxisTitleColor}
                                                                                            onChange={(x) => this.onYAxisTitleColorChange(x)} />
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                    </div>
                                                                }
                                                            </div>
                                                        }
                                                    </PanelWithButton>

                                                    <PanelWithButton glyphicon={"resize-horizontal"} bsSize={"xs"} headerText={"X (Horizontal) Axis"} cssClassName={cssClassName} button={showXAxisPropertiesButton} style={{ marginTop: '2px' }}>
                                                        {this.state.IsXAxisMinimised == false &&
                                                            <div>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '2px' }}>
                                                                    <Row>
                                                                        <Col xs={12}>
                                                                            {/* TODO move this Checkbox next to showXAxisPropertiesButton since it applies to all X-Axis properties  */}
                                                                            <Checkbox onChange={(e) => this.onXAxisVisibilityOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.XAxisLabelVisibility == LabelVisibility.Visible} >Axis Visible</Checkbox>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                {this.state.ChartProperties.XAxisLabelVisibility == LabelVisibility.Visible &&
                                                                    <div>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={12}>
                                                                                    <Checkbox onChange={(e) => this.onXAxisInvertedChanged(e)}
                                                                                        checked={this.state.ChartProperties.XAxisInverted} >Axis Inverted</Checkbox>
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                        {/* TODO uncomment when ChategoryChart has 'xAxisLabelLocation' property */}
                                                                        {/* <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                        <Row>
                                                                            <Col xs={6}><ControlLabel>Axis Location</ControlLabel></Col>
                                                                            <Col xs={5}>
                                                                              <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                  value={this.state.ChartProperties.XAxisLabelLocation}
                                                                                  onChange={(x) => this.onXAxisLabelLocationChange(x)} >
                                                                                  {ChartUIHelper.getXAxisLabelsLocations()}
                                                                              </FormControl>
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm> */}
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <ControlLabel>Labels Angle</ControlLabel>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    <FormControl bsSize="small" componentClass="select" placeholder="select"
                                                                                        value={this.state.ChartProperties.XAxisAngle}
                                                                                        onChange={(x) => this.onXAxisAngleChanged(x)} >
                                                                                        {ChartUIHelper.getAxisAngleOptions()}
                                                                                    </FormControl>
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <Checkbox onChange={(e) => this.onSetXAxisLabelColorOptionChanged(e)}
                                                                                        checked={this.state.SetXAxisLabelColor} >Labels Color</Checkbox>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    {this.state.SetXAxisLabelColor &&
                                                                                        <ColorPicker ColorPalette={this.props.ColorPalette}
                                                                                            value={this.state.ChartProperties.XAxisLabelColor}
                                                                                            onChange={(x) => this.onXAxisLabelColorChange(x)} />
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>

                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <Checkbox onChange={(e) => this.onUseDefaultXAxisTitleOptionChanged(e)}
                                                                                        checked={this.state.UseDefaultXAxisTitle} >Title Default</Checkbox>
                                                                                </Col>
                                                                                {this.state.UseDefaultXAxisTitle == false &&
                                                                                    <Col xs={6}>
                                                                                        <FormControl
                                                                                            bsSize={"small"} type="text"
                                                                                            placeholder={"Enter Title"}
                                                                                            onChange={(e) => this.onXAxisTitleChanged(e)}
                                                                                            value={this.state.ChartProperties.XAxisTitle} />
                                                                                    </Col>}
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <Checkbox onChange={(e) => this.onSetXAxisTitleColorOptionChanged(e)} checked={this.state.SetXAxisTitleColor} >Title Color</Checkbox>
                                                                                </Col>
                                                                                <Col xs={6}>
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

                                                    <PanelWithButton glyphicon={"asterisk"} bsSize={"xs"} headerText={"Annotations"} cssClassName={cssClassName} button={showHighlightsPropertiesButton} style={{ marginTop: '2px' }}>
                                                        {this.state.IsHighlightsMinimised == false &&
                                                            <div>

                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '2px' }}>
                                                                    <Row>
                                                                        <Col xs={12}>
                                                                            <Checkbox
                                                                                onChange={(e) => this.onEnableFinalValueAnnotationsOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.EnableFinalValueAnnotations} >Final Values</Checkbox>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={12}>
                                                                            <Checkbox
                                                                                onChange={(e) => this.onEnableSeriesHighlightingOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.EnableSeriesHighlighting} >Highlight Series</Checkbox>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={12}>
                                                                            <Checkbox
                                                                                onChange={(e) => this.onEnableCategoryHighlightingOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.EnableCategoryHighlighting} >Highlight Category</Checkbox>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={12}>
                                                                            <Checkbox
                                                                                onChange={(e) => this.onEnableItemHighlightingOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.EnableItemHighlighting} >Highlight Item</Checkbox>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={6}><ControlLabel>Callout Type</ControlLabel></Col>
                                                                        <Col xs={6}>
                                                                            <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                value={this.state.ChartProperties.CalloutsType}
                                                                                onChange={(x) => this.onChangedCalloutsType(x)} >
                                                                                {ChartUIHelper.getCalloutTypeOptions()}
                                                                            </FormControl>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>

                                                                {/* {this.state.ChartProperties.CalloutsType == "Data Points" && */}
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={6}><ControlLabel>Callout Interval</ControlLabel></Col>
                                                                        <Col xs={6}>
                                                                            <FormControl
                                                                                value={this.state.ChartProperties.CalloutsInterval}
                                                                                bsSize={"small"} type="number"
                                                                                min="1" step="1" max="20"
                                                                                placeholder="Enter"
                                                                                onChange={(e) => this.onChangedCalloutsInterval(e)} />
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>

                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={6}><ControlLabel>Tooltips</ControlLabel></Col>
                                                                        <Col xs={6}>
                                                                            <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                value={this.state.ChartProperties.ToolTipType}
                                                                                onChange={(x) => this.onToolTipTypeChange(x)} >
                                                                                {ChartUIHelper.getToolTipOptions()}
                                                                            </FormControl>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={6}><ControlLabel>Crosshairs</ControlLabel></Col>
                                                                        <Col xs={6}>
                                                                            <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={this.state.ChartProperties.CrosshairDisplayMode} onChange={(x) => this.onCrosshairsModeChange(x)} >
                                                                                {ChartUIHelper.getCrossHairModeOptions()}
                                                                            </FormControl>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                {this.state.ChartProperties.CrosshairDisplayMode != CrosshairDisplayMode.None &&
                                                                    <div>
                                                                        <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                            <Row>
                                                                                <Col xs={6}></Col>
                                                                                <Col xs={6}>
                                                                                    <Checkbox
                                                                                        onChange={(e) => this.onCrosshairSnapToDataOptionChanged(e)}
                                                                                        checked={this.state.ChartProperties.CrosshairSnapToData} >Snap to Data</Checkbox>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col xs={6}></Col>
                                                                                <Col xs={6}>
                                                                                    <Checkbox inline
                                                                                        onChange={(e) => this.onCrosshairAnnotationEnabledOptionChanged(e)}
                                                                                        checked={this.state.ChartProperties.CrosshairAnnotationEnabled} >Show Values</Checkbox>
                                                                                </Col>
                                                                            </Row>
                                                                        </AdaptableBlotterForm>
                                                                    </div>
                                                                }

                                                            </div>
                                                        }
                                                    </PanelWithButton>

                                                    <PanelWithButton glyphicon={"briefcase"} bsSize={"xs"} headerText={"Misc"} cssClassName={cssClassName} button={showMiscPropertiesButton} style={{ marginTop: '2px' }}>
                                                        {this.state.IsMiscMinimised == false &&
                                                            <div>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '2px' }}>
                                                                    <Row>
                                                                        <Col xs={6}>
                                                                            <ControlLabel>Title</ControlLabel>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={this.state.ChartProperties.TitleAlignment} onChange={(x) => this.onTitleAlignmentChange(x)} >
                                                                                {ChartUIHelper.getAlignmentOptions()}
                                                                            </FormControl>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={6}>
                                                                            <ControlLabel>Subtitle</ControlLabel>
                                                                        </Col>
                                                                        <Col xs={6}>
                                                                            <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={this.state.ChartProperties.SubTitleAlignment} onChange={(x) => this.onSubTitleAlignmentChange(x)} >
                                                                                {ChartUIHelper.getAlignmentOptions()}
                                                                            </FormControl>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                    <Row>
                                                                        <Col xs={12}>
                                                                            <Checkbox onChange={(e) => this.onEnableTransitionsOptionChanged(e)} checked={this.state.ChartProperties.EnableTransitions} >Enable Transitions</Checkbox>
                                                                        </Col>
                                                                    </Row>
                                                                </AdaptableBlotterForm>
                                                                {this.state.ChartProperties.EnableTransitions &&
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '6px' }}>
                                                                        <Row>
                                                                            <Col xs={6}>
                                                                                <ControlLabel>Duration</ControlLabel>
                                                                            </Col>
                                                                            <Col xs={6}>
                                                                                <FormControl
                                                                                    bsSize={"small"}
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

        </span>
    }

    public calloutStyleUpdating(sender: any, args: any) {
        if (args.item && this.seriesColors.has(args.item)) {
            let color = this.seriesColors.get(args.item)!;
            args.outline = color;
            args.background = color;
            args.leaderBrush = "#d8d8d8";
            args.textColor = "white";
            // console.log("calloutStyleUpdating "  + args.item);
        }
    }

    public seriesAdded(sender: any, args: any) {
        const series = (args.series as any);
        if (series.valueMemberPath &&
            series.valueMemberPath !== "") {
            this.seriesColors.set(series.valueMemberPath, args.series.actualBrush);
            // console.log("seriesAdded " + series.valueMemberPath);
        }
    }

    onEditChart(): void {
        this.setState({ EditedChartDefinition: Helper.cloneObject(this.props.CurrentChartDefinition) });
    }

    onChartMinimised() {
        this.props.onSetChartVisibility(ChartVisibility.Minimised);
    }

    onChartMaximised() {
        this.props.onSetChartVisibility(ChartVisibility.Maximised);
    }

    onSetPropertyDefaults() {
        // first update our state
        this.setState(ChartUIHelper.setDefaultChartDisplayPopupState() as ChartDisplayPopupState);
        // then update the properties
        let chartProps: IChartProperties = Helper.cloneObject(DefaultChartProperties);
        // do the titles
        chartProps.YAxisTitle = this.getYAxisTitle(true);
        chartProps.XAxisTitle = this.getXAxisTitle(true);
        this.updateChartProperties(chartProps);
    }

    onShowGeneralProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: false, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true } as ChartDisplayPopupState)
    }

    onShowYAxisProperties() {
        this.setState({ IsYAxisMinimised: false, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true } as ChartDisplayPopupState);
    }

    onShowXAxisProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: false, IsHighlightsMinimised: true, IsMiscMinimised: true } as ChartDisplayPopupState)
    }

    onShowHighlightsProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: false, IsMiscMinimised: true } as ChartDisplayPopupState)
    }

    onShowMiscProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: false } as ChartDisplayPopupState)
    }

    onHidePropertiesGroup() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true } as ChartDisplayPopupState)
    }



    onShowChartSettings() {
        this.setState({ IsChartSettingsVisible: true, } as ChartDisplayPopupState)
    }

    onHideChartSettings() {
        this.setState({ IsChartSettingsVisible: false, } as ChartDisplayPopupState)
    }

    onChartTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.ChartType = e.value as ChartType;
        this.updateChartProperties(chartProps);
    }

    onMarkerTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.MarkerType = e.value;
        this.updateChartProperties(chartProps);
    }

    onYAxisLabelLocationChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let props: IChartProperties = this.state.ChartProperties;
        let selected = e.value.toString();
        if (selected.indexOf("Left") > 0) {
            props.YAxisLabelLocation = AxisLabelsLocation.OutsideLeft;
        }
        else {
            props.YAxisLabelLocation = AxisLabelsLocation.OutsideRight;
        }
        this.updateChartProperties(props);
    }
    onXAxisLabelLocationChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let props: IChartProperties = this.state.ChartProperties;
        let selected = e.value.toString();
        if (selected.indexOf("Top") > 0) {
            props.XAxisLabelLocation = AxisLabelsLocation.OutsideTop;
        }
        else {
            props.XAxisLabelLocation = AxisLabelsLocation.OutsideBottom;
        }
        this.updateChartProperties(props);
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

    onToolTipTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.ToolTipType = e.value as ToolTipType;
        this.updateChartProperties(chartProperties);
    }

    onChangedCalloutsType(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        // Note not changing to CalloutsType enum because a user might selected a da column name from data source
        chartProperties.CalloutsType = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onChangedCalloutsInterval(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let value = Number(e.value)
        if (value >= 1000) {
            value = 1000;
        }
        if (value < 1) {
            value = 1;
        }
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.CalloutsInterval = value;
        // chartProps.CalloutsInterval = e.target.value;
        this.updateChartProperties(chartProps);
    }

    onCrosshairsModeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.CrosshairDisplayMode = e.value as CrosshairDisplayMode;
        this.updateChartProperties(chartProperties);
    }

    private onCrosshairSnapToDataOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.CrosshairSnapToData = e.checked
        this.updateChartProperties(chartProperties);
    }

    private onCrosshairAnnotationEnabledOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.CrosshairAnnotationEnabled = e.checked
        this.updateChartProperties(chartProperties);
    }

    private onEnableFinalValueAnnotationsOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.EnableFinalValueAnnotations = e.checked;
        this.updateChartProperties(chartProperties);
    }

    private onEnableSeriesHighlightingOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.EnableSeriesHighlighting = e.checked;
        this.updateChartProperties(chartProperties);
    }

    private onEnableCategoryHighlightingOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.EnableCategoryHighlighting = e.checked;
        this.updateChartProperties(chartProperties);
    }

    private onEnableItemHighlightingOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.EnableItemHighlighting = e.checked;
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

    private onYAxisInvertedChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.YAxisInverted = e.checked;
        this.updateChartProperties(chartProps);
    }
    private onXAxisInvertedChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.XAxisInverted = e.checked;
        this.updateChartProperties(chartProps);
    }

    private onSetYAxisMinValueOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisMinimumValue: true } as ChartDisplayPopupState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisMinimumValue: e.checked } as ChartDisplayPopupState)
            let chartProps: IChartProperties = this.state.ChartProperties;
            chartProps.YAxisMinimumValue = undefined;
            this.updateChartProperties(chartProps);
        }
    }

    private onSetYAxisMaxValueOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisMaximumValue: true } as ChartDisplayPopupState)
        } else { // set YAxisMaxValue to undefined
            this.setState({ SetYAxisMaximumValue: e.checked } as ChartDisplayPopupState)
            let chartProps: IChartProperties = this.state.ChartProperties;
            chartProps.YAxisMaximumValue = undefined;
            this.updateChartProperties(chartProps);
        }
    }


    private onSetYAxisLabelColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisLabelColor: true } as ChartDisplayPopupState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisLabelColor: e.checked } as ChartDisplayPopupState)
            let chartProps: IChartProperties = this.state.ChartProperties;
            chartProps.YAxisLabelColor = "";
            this.updateChartProperties(chartProps);
        }

    }

    private onSetXAxisLabelColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetXAxisLabelColor: true } as ChartDisplayPopupState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetXAxisLabelColor: e.checked } as ChartDisplayPopupState)
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.XAxisLabelColor = "";
            this.updateChartProperties(chartProperties);
        }

    }

    private onSetYAxisTitleColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisTitleColor: true } as ChartDisplayPopupState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisTitleColor: e.checked } as ChartDisplayPopupState)
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.YAxisTitleColor = "";
            this.updateChartProperties(chartProperties);
        }
    }

    private onSetXAxisTitleColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetXAxisTitleColor: true } as ChartDisplayPopupState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetXAxisTitleColor: e.checked } as ChartDisplayPopupState)
            let chartProperties: IChartProperties = this.state.ChartProperties;
            chartProperties.XAxisTitleColor = "";
            this.updateChartProperties(chartProperties);
        }

    }

    onTitleAlignmentChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.TitleAlignment = e.value as HorizontalAlignment;
        this.updateChartProperties(chartProps);
        let titleMargin: number = (e.value == HorizontalAlignment.Right) ? 5 : 0
        this.setState({ TitleMargin: titleMargin, } as ChartDisplayPopupState)
    }

    onSubTitleAlignmentChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.SubTitleAlignment = e.value as HorizontalAlignment;
        this.updateChartProperties(chartProps);
        let subtitleMargin: number = (e.value == HorizontalAlignment.Right) ? 5 : 0
        this.setState({ SubTitleMargin: subtitleMargin, } as ChartDisplayPopupState)
    }

    private onYAxisMinValueChanged = (e: any) => {
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.YAxisMinimumValue = e.target.value;
        this.updateChartProperties(chartProps);
    }
    private onYAxisMaxValueChanged = (e: any) => {
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.YAxisMaximumValue = e.target.value;
        this.updateChartProperties(chartProps);
    }


    private onTransitionDurationChanged = (e: any) => {
        let chartProperties: IChartProperties = this.state.ChartProperties;
        chartProperties.TransitionInDuration = e.target.value;
        this.updateChartProperties(chartProperties);
    }

    private updateChartProperties(chartProperties: IChartProperties): void {
        this.setState({ ChartProperties: chartProperties, } as ChartDisplayPopupState)
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Title, chartProperties)
    }

    private onXAxisVisibilityOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.XAxisLabelVisibility = (e.checked) ? LabelVisibility.Visible : LabelVisibility.Collapsed;
        this.updateChartProperties(chartProps);
    }

    private onYAxisVisibilityOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.YAxisLabelVisibility = (e.checked) ? LabelVisibility.Visible : LabelVisibility.Collapsed;
        this.updateChartProperties(chartProps);
    }

    private onYAxisTitleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.YAxisTitle = e.value;
        this.updateChartProperties(chartProps);
    }

    private onXAxisGapChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let factor = Number(e.value)
        if (factor > 1) {
            factor = 1;
        }
        if (factor < 0) {
            factor = 0;
        }
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.XAxisGap = factor;
        this.updateChartProperties(chartProps);
    }
    private onXAxisOverlapChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let factor = Number(e.value)
        if (factor > 1) {
            factor = 1;
        }
        if (factor < 0) {
            factor = 0;
        }
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.XAxisOverlap = factor;
        this.updateChartProperties(chartProps);
    }

    private onXAxisTitleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.XAxisTitle = e.value;
        this.updateChartProperties(chartProps);
    }

    private onXAxisAngleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProps: IChartProperties = this.state.ChartProperties;
        chartProps.XAxisAngle = e.value as AxisAngle;
        this.updateChartProperties(chartProps);
    }

    private onYAxisLabelScaleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let scale = e.value as AxisScale;
        let chartProps: IChartProperties = this.state.ChartProperties;
        // chartProps.YAxisIsLogarithmic = scale == AxisScale.Log;
        chartProps.YAxisLabelScale = scale;
        this.updateChartProperties(chartProps);
    }

    private onUseDefaultYAxisTitleOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProps: IChartProperties = this.state.ChartProperties;
            chartProps.YAxisTitle = "";
            this.updateChartProperties(chartProps);
        }
        // do we really need to update ChartDisplayPopupState?
        this.setState({ UseDefaultYAxisTitle: e.checked, } as ChartDisplayPopupState)
    }

    private onUseDefaultXAxisTitleOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProps: IChartProperties = this.state.ChartProperties;
            chartProps.XAxisTitle = "";
            this.updateChartProperties(chartProps);
        }
        // do we really need to update ChartDisplayPopupState?
        this.setState({ UseDefaultXAxisTitle: e.checked, } as ChartDisplayPopupState)
    }

    private getYAxisTitle(useDefault: boolean): string {
        if (useDefault) {
            return ChartUIHelper.createDefaultYAxisTitle(this.props.CurrentChartDefinition, this.props.Columns);
        }
        return this.state.ChartProperties.YAxisTitle;
    }

    private getXAxisTitle(useDefault: boolean): string {
        if (useDefault) {
            return ChartUIHelper.createDefaultXAxisTitle(this.props.CurrentChartDefinition, this.props.Columns);
        }
        return this.state.ChartProperties.XAxisTitle;
    }

    private getYAxisIsLogarithmic(scaleMode: AxisScale): boolean {
        return scaleMode == AxisScale.Log;
    }

    onCloseWizard() {
        this.setState({ EditedChartDefinition: null });
    }

    onFinishWizard() {
        let clonedObject: IChartDefinition = Helper.cloneObject(this.state.EditedChartDefinition);
        let index: number = this.props.ChartDefinitions.findIndex(cd => cd.Title == this.state.EditedChartDefinition.Title);
        this.props.onAddUpdateChartDefinition(index, clonedObject);
        this.setState({ EditedChartDefinition: null });
        this.props.onSelectChartDefinition(clonedObject.Title);
    }

    canFinishWizard() {
        return StringExtensions.IsNotNullOrEmpty(this.state.EditedChartDefinition.Title);
    }

}

function mapStateToProps(state: AdaptableBlotterState) {
    return {
        ChartDefinitions: state.Chart.ChartDefinitions,
        CurrentChartDefinition: state.Chart.ChartDefinitions.find(c => c.Title == state.Chart.CurrentChartDefinition),
        ChartData: state.System.ChartData,
        ChartVisibility: state.System.ChartVisibility,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddUpdateChartDefinition: (index: number, chartDefinition: IChartDefinition) => dispatch(ChartRedux.ChartDefinitionAddUpdate(index, chartDefinition)),
        onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => dispatch(ChartRedux.ChartPropertiesUpdate(chartTitle, chartProperties)),
        onSelectChartDefinition: (chartDefinition: string) => dispatch(ChartRedux.ChartDefinitionSelect(chartDefinition)),
        onSetChartVisibility: (chartVisibility: ChartVisibility) => dispatch(SystemRedux.ChartSetChartVisibility(chartVisibility)),
    };
}

export let ChartDisplayPopup = connect(mapStateToProps, mapDispatchToProps)(ChartDisplayPopupComponent);
