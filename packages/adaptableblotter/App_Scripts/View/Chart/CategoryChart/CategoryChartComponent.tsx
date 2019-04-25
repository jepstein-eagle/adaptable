import * as React from "react";
import { ChartDisplayPopupPropsBase } from '../../Components/SharedProps/ChartDisplayPopupPropsBase'
import { ButtonClose } from "../../Components/Buttons/ButtonClose";
import { DEFAULT_BSSTYLE, INFO_BSSTYLE } from "../../../Utilities/Constants/StyleConstants";
import { Row, Col, FormControl, Checkbox, Table, HelpBlock } from "react-bootstrap";
import { ButtonMinimise } from "../../Components/Buttons/ButtonMinimise";
import { ButtonMaximise } from "../../Components/Buttons/ButtonMaximise";
// ig chart imports
import { IgrCategoryChart } from 'igniteui-react-charts/ES2015/igr-category-chart';
import { IgrCategoryChartModule } from 'igniteui-react-charts/ES2015/igr-category-chart-module';
import { IgrDataChartAnnotationModule } from 'igniteui-react-charts/ES2015/igr-data-chart-annotation-module';
import { Helper } from "../../../Utilities/Helpers/Helper";
import {
    CategoryChartType, CrosshairDisplayMode,
    AxisLabelsLocation, HorizontalAlignment, LabelVisibility, ToolTipType, AxisAngle, AxisScale
} from "../../../Utilities/ChartEnums";
import { PanelWithButton } from "../../Components/Panels/PanelWithButton";
import { ColorPicker } from "../../ColorPicker";
import { AdaptableBlotterForm } from "../../Components/Forms/AdaptableBlotterForm";
import { ButtonGeneral } from "../../Components/Buttons/ButtonGeneral";
import { DefaultCategoryChartProperties } from "../../../Utilities/Defaults/DefaultCategoryChartProperties";
import { PanelWithTwoButtons } from "../../Components/Panels/PanelWithTwoButtons";
import { ICategoryChartDefinition, ICategoryChartProperties, IChartProperties } from "../../../Utilities/Interface/BlotterObjects/Charting/IChartDefinition";
import { IChartData } from "../../../Utilities/Interface/BlotterObjects/Charting/IChartData";
import { CategoryChartUIHelper } from "./CategoryChartUIHelper";
import { CategoryChartComponentState } from "./CategoryChartComponentState";
import { IColumn } from "../../../Utilities/Interface/IColumn";


/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
interface CategoryChartComponentProps {
    CurrentChartDefinition: ICategoryChartDefinition;
    ChartData: IChartData;
    Columns: IColumn[],
    cssClassName: string,
    ColorPalette: string[],
    onUpdateChartProperties: (chartTitle: string, chartProperties: IChartProperties) => void;
}

export class CategoryChartComponent extends React.Component<CategoryChartComponentProps, CategoryChartComponentState> {

    public seriesColors: Map<string, string> = new Map<string, string>();

    constructor(props: CategoryChartComponentProps) {
        super(props);

        // added for synchronizing color of series with colors of callouts:
        this.seriesAdded = this.seriesAdded.bind(this);
        this.calloutStyleUpdating = this.calloutStyleUpdating.bind(this);

        this.state = CategoryChartUIHelper.setChartDisplayPopupState(this.props.CurrentChartDefinition as ICategoryChartDefinition, this.props.Columns);
        IgrCategoryChartModule.register();
        IgrDataChartAnnotationModule.register();
    }

    componentWillReceiveProps(nextProps: CategoryChartComponentProps, nextContext: any) {
        if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
            this.setState(CategoryChartUIHelper.setChartDisplayPopupState(nextProps.CurrentChartDefinition as ICategoryChartDefinition, this.props.Columns) as CategoryChartComponentState);
       
        }
    }

    render() {

        let cssClassName: string = this.props.cssClassName + "__CategoryCharts";

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

        let chartElement = <IgrCategoryChart
            // data source
            dataSource={this.props.ChartData.Data}
            // chart type
            chartType={this.state.ChartProperties.CategoryChartType}
            markerTypes={CategoryChartUIHelper.getMarkerFromProps(this.state.ChartProperties)}
            // size
            width={'100%'}
            height={'500px'}
            // titles (titles, alignment and margins)
            chartTitle={this.props.CurrentChartDefinition.Name}
            subtitle={this.props.CurrentChartDefinition.Description}
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
            yAxisInterval={this.state.ChartProperties.YAxisIntervalValue}
            // xAxis
            xAxisLabelVisibility={this.state.ChartProperties.XAxisLabelVisibility}
            xAxisTitle={this.getXAxisTitle(this.state.UseDefaultXAxisTitle)}
            xAxisTitleTextColor={this.state.ChartProperties.XAxisTitleColor}
            xAxisLabelTextColor={this.state.ChartProperties.XAxisLabelColor}
            xAxisGap={this.state.ChartProperties.XAxisGap}
            xAxisOverlap={this.state.ChartProperties.XAxisOverlap}
            xAxisInverted={this.state.ChartProperties.XAxisInverted}
            xAxisInterval={this.state.ChartProperties.XAxisIntervalValue}
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
            calloutsDataSource={CategoryChartUIHelper.getCalloutsData(this.props.ChartData.Data, this.state.ChartProperties)}
            calloutsVisible={true}
            calloutsXMemberPath="CalloutsIndex"
            calloutsYMemberPath="CalloutsValue"
            calloutsLabelMemberPath="CalloutsLabel"
            calloutsContentMemberPath="MemberPath"
            calloutStyleUpdating={this.calloutStyleUpdating}
            calloutStyleUpdatingEventEnabled={true}
            seriesAdded={this.seriesAdded}

            //xAxisInterval={1}
            xAxisLabelAngle={CategoryChartUIHelper.getAngleFromEnum(this.state.ChartProperties.XAxisAngle)}
        // properties used in ig example
        //    xAxisFormatLabel={this.formatDateLabel}

        // properties not doing
        // tick length seems to be space between the legend and the points - doubt worth setting for V1.
        //   yAxisTickLength={0}
        //  xAxisTickLength={15}
        //  xAxisTickStrokeThickness={1} // not sure what it does but looks minor!
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
                                            {this.props.ChartData.Data != null &&
                                                chartElement
                                            }
                                        </td>
                                        <td style={{ width: '350px', marginRight: '15px' }}>
                                            <PanelWithTwoButtons bsSize={"xs"} bsStyle={INFO_BSSTYLE} headerText={"Chart Settings"} cssClassName={cssClassName}
                                                firstButton={closeChartSettingsButton} secondButton={setDefaultsButton}>

                                                <PanelWithButton glyphicon={"wrench"} bsSize={"xs"} headerText={"General"} cssClassName={cssClassName} button={showGeneralPropertiesButton} style={{ marginTop: '2px' }}>
                                                    {this.state.IsGeneralMinimised == false &&
                                                        <div>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={6}><HelpBlock>Chart Type</HelpBlock></Col>
                                                                    <Col xs={6}>
                                                                        <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                            value={this.state.ChartProperties.CategoryChartType}
                                                                            onChange={(x) => this.onChartTypeChange(x)} >
                                                                            {CategoryChartUIHelper.getChartTypeOptions()}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={6}><HelpBlock>Marker Type</HelpBlock></Col>
                                                                    <Col xs={6}>
                                                                        <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                            value={this.state.ChartProperties.MarkerType}
                                                                            onChange={(x) => this.onMarkerTypeChange(x)} >
                                                                            {CategoryChartUIHelper.getMarkerTypeOptions()}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>

                                                            {this.state.ChartProperties.CategoryChartType == CategoryChartType.Column &&
                                                                <div>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={6}><HelpBlock>Column Gap</HelpBlock></Col>
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

                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={6}><HelpBlock>Column Overlap</HelpBlock></Col>
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
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>

                                                                    <Col xs={12} >
                                                                        {/* TODO move this Checkbox next to showYAxisPropertiesButton since it applies to all Y-Axis properties  */}
                                                                        <HelpBlock>
                                                                            <Checkbox onChange={(e) => this.onYAxisVisibilityOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.YAxisLabelVisibility == LabelVisibility.Visible}>Axis Visible</Checkbox>
                                                                        </HelpBlock>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>

                                                            {this.state.ChartProperties.YAxisLabelVisibility == LabelVisibility.Visible &&
                                                                <div>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={12}>
                                                                                <HelpBlock>
                                                                                    <Checkbox onChange={(e) => this.onYAxisInvertedChanged(e)}
                                                                                        checked={this.state.ChartProperties.YAxisInverted}>Axis Inverted</Checkbox>
                                                                                </HelpBlock>
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={6}><HelpBlock>Axis Location</HelpBlock></Col>
                                                                            <Col xs={6}>
                                                                                <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                    value={this.state.ChartProperties.YAxisLabelLocation}
                                                                                    onChange={(x) => this.onYAxisLabelLocationChange(x)} >
                                                                                    {CategoryChartUIHelper.getYAxisLabelsLocations()}
                                                                                </FormControl>
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={6}><HelpBlock>Labels Scale</HelpBlock></Col>
                                                                            <Col xs={6}>
                                                                                <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                    value={this.state.ChartProperties.YAxisLabelScale}
                                                                                    onChange={(x) => this.onYAxisLabelScaleChanged(x)} >
                                                                                    {CategoryChartUIHelper.getAxisLabelScales()}
                                                                                </FormControl>
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <HelpBlock>
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
                                                                        </HelpBlock>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <HelpBlock>
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
                                                                        </HelpBlock>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <HelpBlock>
                                                                            <Row>
                                                                                <Col xs={6}>

                                                                                    <Checkbox onChange={(e) => this.onSetYAxisIntervalValueOptionChanged(e)}
                                                                                        checked={this.state.ChartProperties.YAxisIntervalCustom} >Labels Interval</Checkbox>

                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    {this.state.ChartProperties.YAxisIntervalCustom &&
                                                                                        <FormControl
                                                                                            bsSize={"small"} type="number"
                                                                                            placeholder={"Input"}
                                                                                            onChange={this.onYAxisIntervalValueChanged}
                                                                                            value={this.state.ChartProperties.YAxisIntervalValue} />
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </HelpBlock>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <HelpBlock>
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
                                                                        </HelpBlock>
                                                                    </AdaptableBlotterForm>

                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={6}>
                                                                                <HelpBlock>
                                                                                    <Checkbox onChange={(e) => this.onUseDefaultYAxisTitleOptionChanged(e)}
                                                                                        checked={this.state.UseDefaultYAxisTitle} >Title Default</Checkbox>
                                                                                </HelpBlock>
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
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <HelpBlock>
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
                                                                        </HelpBlock>
                                                                    </AdaptableBlotterForm>
                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </PanelWithButton>

                                                <PanelWithButton glyphicon={"resize-horizontal"} bsSize={"xs"} headerText={"X (Horizontal) Axis"} cssClassName={cssClassName} button={showXAxisPropertiesButton} style={{ marginTop: '2px' }}>
                                                    {this.state.IsXAxisMinimised == false &&
                                                        <div>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={12}>
                                                                        <HelpBlock>
                                                                            {/* TODO move this Checkbox next to showXAxisPropertiesButton since it applies to all X-Axis properties  */}
                                                                            <Checkbox onChange={(e) => this.onXAxisVisibilityOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.XAxisLabelVisibility == LabelVisibility.Visible} >Axis Visible</Checkbox>
                                                                        </HelpBlock>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            {this.state.ChartProperties.XAxisLabelVisibility == LabelVisibility.Visible &&
                                                                <div>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={12}>
                                                                                <HelpBlock>
                                                                                    <Checkbox onChange={(e) => this.onXAxisInvertedChanged(e)}
                                                                                        checked={this.state.ChartProperties.XAxisInverted} >Axis Inverted</Checkbox>
                                                                                </HelpBlock>
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    {/* TODO uncomment when ChategoryChart has 'xAxisLabelLocation' property */}
                                                                    {/* <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={6}><ControlLabel>Axis Location</ControlLabel></Col>
                                                                            <Col xs={5}>
                                                                              <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                                  value={this.state.ChartProperties.XAxisLabelLocation}
                                                                                  onChange={(x) => this.onXAxisLabelLocationChange(x)} >
                                                                                  {CategoryChartUIHelper.getXAxisLabelsLocations()}
                                                                              </FormControl>
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm> */}
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>

                                                                        <Row>
                                                                            <Col xs={6}>
                                                                                <HelpBlock>Labels Angle</HelpBlock>
                                                                            </Col>
                                                                            <Col xs={6}>
                                                                                <FormControl bsSize="small" componentClass="select" placeholder="select"
                                                                                    value={this.state.ChartProperties.XAxisAngle}
                                                                                    onChange={(x) => this.onXAxisAngleChanged(x)} >
                                                                                    {CategoryChartUIHelper.getAxisAngleOptions()}
                                                                                </FormControl>
                                                                            </Col>
                                                                        </Row>
                                                                    </AdaptableBlotterForm>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <HelpBlock>
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
                                                                        </HelpBlock>
                                                                    </AdaptableBlotterForm>

                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <HelpBlock>
                                                                            <Row>
                                                                                <Col xs={6}>
                                                                                    <Checkbox onChange={(e) => this.onSetXAxisIntervalValueOptionChanged(e)}
                                                                                        checked={this.state.ChartProperties.XAxisIntervalCustom} >Labels Interval</Checkbox>
                                                                                </Col>
                                                                                <Col xs={6}>
                                                                                    {this.state.ChartProperties.XAxisIntervalCustom &&
                                                                                        <FormControl
                                                                                            bsSize={"small"} type="number"
                                                                                            placeholder={"Input"}
                                                                                            onChange={this.onXAxisIntervalValueChanged}
                                                                                            value={this.state.ChartProperties.XAxisIntervalValue} />
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                        </HelpBlock>
                                                                    </AdaptableBlotterForm>

                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={6}>
                                                                                <HelpBlock>
                                                                                    <Checkbox onChange={(e) => this.onUseDefaultXAxisTitleOptionChanged(e)}
                                                                                        checked={this.state.UseDefaultXAxisTitle} >Title Default</Checkbox>
                                                                                </HelpBlock>
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
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <HelpBlock>
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
                                                                        </HelpBlock>
                                                                    </AdaptableBlotterForm>

                                                                </div>
                                                            }
                                                        </div>
                                                    }
                                                </PanelWithButton>

                                                <PanelWithButton glyphicon={"asterisk"} bsSize={"xs"} headerText={"Annotations"} cssClassName={cssClassName} button={showHighlightsPropertiesButton} style={{ marginTop: '2px' }}>
                                                    {this.state.IsHighlightsMinimised == false &&
                                                        <div>

                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={12}>
                                                                        <HelpBlock>
                                                                            <Checkbox
                                                                                onChange={(e) => this.onEnableFinalValueAnnotationsOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.EnableFinalValueAnnotations} >Final Values</Checkbox>
                                                                        </HelpBlock>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={12}>
                                                                        <HelpBlock>
                                                                            <Checkbox
                                                                                onChange={(e) => this.onEnableSeriesHighlightingOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.EnableSeriesHighlighting} >Highlight Series</Checkbox>
                                                                        </HelpBlock>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={12}>
                                                                        <HelpBlock>
                                                                            <Checkbox
                                                                                onChange={(e) => this.onEnableCategoryHighlightingOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.EnableCategoryHighlighting} >Highlight Category</Checkbox>
                                                                        </HelpBlock>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={12}>
                                                                        <HelpBlock>
                                                                            <Checkbox
                                                                                onChange={(e) => this.onEnableItemHighlightingOptionChanged(e)}
                                                                                checked={this.state.ChartProperties.EnableItemHighlighting} >Highlight Item</Checkbox>
                                                                        </HelpBlock>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={6}><HelpBlock>Callout Type</HelpBlock></Col>
                                                                    <Col xs={6}>
                                                                        <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                            value={this.state.ChartProperties.CalloutsType}
                                                                            onChange={(x) => this.onChangedCalloutsType(x)} >
                                                                            {CategoryChartUIHelper.getCalloutTypeOptions()}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>

                                                            {/* {this.state.ChartProperties.CalloutsType == "Data Points" && */}
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={6}><HelpBlock>Callout Interval</HelpBlock></Col>
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

                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={6}><HelpBlock>Tooltips</HelpBlock></Col>
                                                                    <Col xs={6}>
                                                                        <FormControl bsSize={"small"} componentClass="select" placeholder="select"
                                                                            value={this.state.ChartProperties.ToolTipType}
                                                                            onChange={(x) => this.onToolTipTypeChange(x)} >
                                                                            {CategoryChartUIHelper.getToolTipOptions()}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={6}><HelpBlock>Crosshairs</HelpBlock></Col>
                                                                    <Col xs={6}>
                                                                        <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={this.state.ChartProperties.CrosshairDisplayMode} onChange={(x) => this.onCrosshairsModeChange(x)} >
                                                                            {CategoryChartUIHelper.getCrossHairModeOptions()}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            {this.state.ChartProperties.CrosshairDisplayMode != CrosshairDisplayMode.None &&
                                                                <div>
                                                                    <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                        <Row>
                                                                            <Col xs={6}></Col>
                                                                            <Col xs={6}>
                                                                                <HelpBlock>
                                                                                    <Checkbox
                                                                                        onChange={(e) => this.onCrosshairSnapToDataOptionChanged(e)}
                                                                                        checked={this.state.ChartProperties.CrosshairSnapToData} >Snap to Data</Checkbox>
                                                                                </HelpBlock>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col xs={6}></Col>
                                                                            <Col xs={6}>
                                                                                <HelpBlock>
                                                                                    <Checkbox inline
                                                                                        onChange={(e) => this.onCrosshairAnnotationEnabledOptionChanged(e)}
                                                                                        checked={this.state.ChartProperties.CrosshairAnnotationEnabled} >Show Values</Checkbox>
                                                                                </HelpBlock>
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
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={6}>
                                                                        <HelpBlock>Title</HelpBlock>
                                                                    </Col>
                                                                    <Col xs={6}>
                                                                        <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={this.state.ChartProperties.TitleAlignment} onChange={(x) => this.onTitleAlignmentChange(x)} >
                                                                            {CategoryChartUIHelper.getAlignmentOptions()}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={6}>
                                                                        <HelpBlock>Subtitle</HelpBlock>
                                                                    </Col>
                                                                    <Col xs={6}>
                                                                        <FormControl bsSize={"small"} componentClass="select" placeholder="select" value={this.state.ChartProperties.SubTitleAlignment} onChange={(x) => this.onSubTitleAlignmentChange(x)} >
                                                                            {CategoryChartUIHelper.getAlignmentOptions()}
                                                                        </FormControl>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                <Row>
                                                                    <Col xs={12}>
                                                                        <HelpBlock>
                                                                            <Checkbox onChange={(e) => this.onEnableTransitionsOptionChanged(e)} checked={this.state.ChartProperties.EnableTransitions} >Enable Transitions</Checkbox>
                                                                        </HelpBlock>
                                                                    </Col>
                                                                </Row>
                                                            </AdaptableBlotterForm>
                                                            {this.state.ChartProperties.EnableTransitions &&
                                                                <AdaptableBlotterForm horizontal style={{ marginTop: '0px' }}>
                                                                    <Row>
                                                                        <Col xs={6}>
                                                                            <HelpBlock>Duration</HelpBlock>
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
                            {this.props.ChartData.Data != null &&
                                chartElement
                            }
                        </div>
                    }
                </span>


            </div>



        </span>
    }

    public calloutStyleUpdating(args: any) {
        if (args.item && this.seriesColors.has(args.item)) {
            let color = this.seriesColors.get(args.item)!;
            args.outline = color;
            args.background = color;
            args.leaderBrush = "#d8d8d8";
            args.textColor = "white";
        }
    }

    public seriesAdded(args: any) {
        const series = (args.series as any);
        if (series && series.valueMemberPath &&
            series.valueMemberPath !== "") {
            this.seriesColors.set(series.valueMemberPath, args.series.actualBrush);
        }
    }



    onSetPropertyDefaults() {
        // first update our state
        this.setState(CategoryChartUIHelper.setDefaultChartDisplayPopupState() as CategoryChartComponentState);
        // then update the properties
        let chartProperties: ICategoryChartProperties = Helper.cloneObject(DefaultCategoryChartProperties);
        // do the titles
        chartProperties.YAxisTitle = this.getYAxisTitle(true);
        chartProperties.XAxisTitle = this.getXAxisTitle(true);
        this.updateChartProperties(chartProperties);
    }

    onShowGeneralProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: false, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true } as CategoryChartComponentState)
    }

    onShowYAxisProperties() {
        this.setState({ IsYAxisMinimised: false, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true } as CategoryChartComponentState);
    }

    onShowXAxisProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: false, IsHighlightsMinimised: true, IsMiscMinimised: true } as CategoryChartComponentState)
    }

    onShowHighlightsProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: false, IsMiscMinimised: true } as CategoryChartComponentState)
    }

    onShowMiscProperties() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: false } as CategoryChartComponentState)
    }

    onHidePropertiesGroup() {
        this.setState({ IsYAxisMinimised: true, IsGeneralMinimised: true, IsXAxisMinimised: true, IsHighlightsMinimised: true, IsMiscMinimised: true } as CategoryChartComponentState)
    }



    onShowChartSettings() {
        this.setState({ IsChartSettingsVisible: true, } as CategoryChartComponentState)
    }

    onHideChartSettings() {
        this.setState({ IsChartSettingsVisible: false, } as CategoryChartComponentState)
    }

    onChartTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.CategoryChartType = e.value as CategoryChartType;
        this.updateChartProperties(chartProperties);
    }

    onMarkerTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.MarkerType = e.value;
        this.updateChartProperties(chartProperties);
    }

    onYAxisLabelLocationChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        let selected = e.value.toString();
        if (selected.indexOf("Left") > 0) {
            chartProperties.YAxisLabelLocation = AxisLabelsLocation.OutsideLeft;
        }
        else {
            chartProperties.YAxisLabelLocation = AxisLabelsLocation.OutsideRight;
        }
        this.updateChartProperties(chartProperties);
    }
    onXAxisLabelLocationChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        let selected = e.value.toString();
        if (selected.indexOf("Top") > 0) {
            chartProperties.XAxisLabelLocation = AxisLabelsLocation.OutsideTop;
        }
        else {
            chartProperties.XAxisLabelLocation = AxisLabelsLocation.OutsideBottom;
        }
        this.updateChartProperties(chartProperties);
    }

    private onYAxisLabelColorChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelColor = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onXAxisLabelColorChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisLabelColor = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onYAxisTitleColorChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.YAxisTitleColor = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onXAxisTitleColorChange(event: React.FormEvent<ColorPicker>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisTitleColor = e.value;
        this.updateChartProperties(chartProperties);
    }

    onToolTipTypeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.ToolTipType = e.value as ToolTipType;
        this.updateChartProperties(chartProperties);
    }

    onChangedCalloutsType(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
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
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.CalloutsInterval = value;
        // chartProperties.CalloutsInterval = e.target.value;
        this.updateChartProperties(chartProperties);
    }

    onCrosshairsModeChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.CrosshairDisplayMode = e.value as CrosshairDisplayMode;
        this.updateChartProperties(chartProperties);
    }

    private onCrosshairSnapToDataOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.CrosshairSnapToData = e.checked
        this.updateChartProperties(chartProperties);
    }

    private onCrosshairAnnotationEnabledOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.CrosshairAnnotationEnabled = e.checked
        this.updateChartProperties(chartProperties);
    }

    private onEnableFinalValueAnnotationsOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.EnableFinalValueAnnotations = e.checked;
        this.updateChartProperties(chartProperties);
    }

    private onEnableSeriesHighlightingOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.EnableSeriesHighlighting = e.checked;
        this.updateChartProperties(chartProperties);
    }

    private onEnableCategoryHighlightingOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.EnableCategoryHighlighting = e.checked;
        this.updateChartProperties(chartProperties);
    }

    private onEnableItemHighlightingOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.EnableItemHighlighting = e.checked;
        this.updateChartProperties(chartProperties);
    }

    private onEnableTransitionsOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.EnableTransitions = e.checked;
        if (e.checked == false) {
            chartProperties.TransitionInDuration = undefined;
        }
        this.updateChartProperties(chartProperties);
    }

    private onYAxisInvertedChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.YAxisInverted = e.checked;
        this.updateChartProperties(chartProperties);
    }
    private onXAxisInvertedChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisInverted = e.checked;
        this.updateChartProperties(chartProperties);
    }

    private onSetYAxisMinValueOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisMinimumValue: true } as CategoryChartComponentState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisMinimumValue: e.checked } as CategoryChartComponentState)
            let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
            chartProperties.YAxisMinimumValue = undefined;
            this.updateChartProperties(chartProperties);
        }
    }

    private onSetYAxisMaxValueOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisMaximumValue: true } as CategoryChartComponentState)
        } else { // set YAxisMaxValue to undefined
            this.setState({ SetYAxisMaximumValue: e.checked } as CategoryChartComponentState)
            let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
            chartProperties.YAxisMaximumValue = undefined;
            this.updateChartProperties(chartProperties);
        }
    }

    private onSetYAxisIntervalValueOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.YAxisIntervalCustom = e.checked;
        if (!e.checked) {
            // set YAxisIntervalValue to undefined so it is auto calculated by the chart
            chartProperties.YAxisIntervalValue = undefined;
        }
        this.updateChartProperties(chartProperties);
    }
    private onSetXAxisIntervalValueOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisIntervalCustom = e.checked;
        if (!e.checked) {
            // set XAxisIntervalValue to undefined so it is auto calculated by the chart
            chartProperties.XAxisIntervalValue = undefined;
        }
        this.updateChartProperties(chartProperties);
    }

    private onSetYAxisLabelColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisLabelColor: true } as CategoryChartComponentState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisLabelColor: e.checked } as CategoryChartComponentState)
            let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
            chartProperties.YAxisLabelColor = "";
            this.updateChartProperties(chartProperties);
        }

    }

    private onSetXAxisLabelColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetXAxisLabelColor: true } as CategoryChartComponentState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetXAxisLabelColor: e.checked } as CategoryChartComponentState)
            let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
            chartProperties.XAxisLabelColor = "";
            this.updateChartProperties(chartProperties);
        }

    }

    private onSetYAxisTitleColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetYAxisTitleColor: true } as CategoryChartComponentState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetYAxisTitleColor: e.checked } as CategoryChartComponentState)
            let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
            chartProperties.YAxisTitleColor = "";
            this.updateChartProperties(chartProperties);
        }
    }

    private onSetXAxisTitleColorOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) {
            this.setState({ SetXAxisTitleColor: true } as CategoryChartComponentState)
        } else { // set YAxisMinValue to undefined
            this.setState({ SetXAxisTitleColor: e.checked } as CategoryChartComponentState)
            let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
            chartProperties.XAxisTitleColor = "";
            this.updateChartProperties(chartProperties);
        }

    }

    onTitleAlignmentChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.TitleAlignment = e.value as HorizontalAlignment;
        this.updateChartProperties(chartProperties);
        let titleMargin: number = (e.value == HorizontalAlignment.Right) ? 5 : 0
        this.setState({ TitleMargin: titleMargin, } as CategoryChartComponentState)
    }

    onSubTitleAlignmentChange(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.SubTitleAlignment = e.value as HorizontalAlignment;
        this.updateChartProperties(chartProperties);
        let subtitleMargin: number = (e.value == HorizontalAlignment.Right) ? 5 : 0
        this.setState({ SubTitleMargin: subtitleMargin, } as CategoryChartComponentState)
    }

    private onYAxisMinValueChanged = (e: any) => {
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.YAxisMinimumValue = e.target.value;
        this.updateChartProperties(chartProperties);
    }
    private onYAxisMaxValueChanged = (e: any) => {
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.YAxisMaximumValue = e.target.value;
        this.updateChartProperties(chartProperties);
    }
    private onYAxisIntervalValueChanged = (e: any) => {
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.YAxisIntervalValue = e.target.value;
        this.updateChartProperties(chartProperties);
    }
    private onXAxisIntervalValueChanged = (e: any) => {
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisIntervalValue = e.target.value;
        this.updateChartProperties(chartProperties);
    }


    private onTransitionDurationChanged = (e: any) => {
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.TransitionInDuration = e.target.value;
        this.updateChartProperties(chartProperties);
    }

    private updateChartProperties(chartProperties: ICategoryChartProperties): void {
        this.setState({ ChartProperties: chartProperties, } as CategoryChartComponentState)
        this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Name, chartProperties)
    }

    private onXAxisVisibilityOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisLabelVisibility = (e.checked) ? LabelVisibility.Visible : LabelVisibility.Collapsed;
        this.updateChartProperties(chartProperties);
    }

    private onYAxisVisibilityOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.YAxisLabelVisibility = (e.checked) ? LabelVisibility.Visible : LabelVisibility.Collapsed;
        this.updateChartProperties(chartProperties);
    }

    private onYAxisTitleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.YAxisTitle = e.value;
        this.updateChartProperties(chartProperties);
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
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisGap = factor;
        this.updateChartProperties(chartProperties);
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
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisOverlap = factor;
        this.updateChartProperties(chartProperties);
    }

    private onXAxisTitleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisTitle = e.value;
        this.updateChartProperties(chartProperties);
    }

    private onXAxisAngleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        chartProperties.XAxisAngle = e.value as AxisAngle;
        this.updateChartProperties(chartProperties);
    }

    private onYAxisLabelScaleChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        let scale = e.value as AxisScale;
        let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
        // chartProperties.YAxisIsLogarithmic = scale == AxisScale.Log;
        chartProperties.YAxisLabelScale = scale;
        this.updateChartProperties(chartProperties);
    }

    private onUseDefaultYAxisTitleOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
            chartProperties.YAxisTitle = "";
            this.updateChartProperties(chartProperties);
        }
        // do we really need to update ChartDisplayPopupState?
        this.setState({ UseDefaultYAxisTitle: e.checked, } as CategoryChartComponentState)
    }

    private onUseDefaultXAxisTitleOptionChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        if (e.checked) { // if its not checked then we need to clear the title
            let chartProperties: ICategoryChartProperties = this.state.ChartProperties;
            chartProperties.XAxisTitle = "";
            this.updateChartProperties(chartProperties);
        }
        // do we really need to update ChartDisplayPopupState?
        this.setState({ UseDefaultXAxisTitle: e.checked, } as CategoryChartComponentState)
    }

    private getYAxisTitle(useDefault: boolean): string {
        if (useDefault) {
            return CategoryChartUIHelper.createDefaultYAxisTitle(this.props.CurrentChartDefinition, this.props.Columns);
        }
        return this.state.ChartProperties.YAxisTitle;
    }

    private getXAxisTitle(useDefault: boolean): string {
        if (useDefault) {
            return CategoryChartUIHelper.createDefaultXAxisTitle(this.props.CurrentChartDefinition, this.props.Columns);
        }
        return this.state.ChartProperties.XAxisTitle;
    }

    private getYAxisIsLogarithmic(scaleMode: AxisScale): boolean {
        return scaleMode == AxisScale.Log;
    }


}



