import * as React from 'react';

import { ButtonClose } from '../../Components/Buttons/ButtonClose';

import { ButtonMinimise } from '../../Components/Buttons/ButtonMinimise';
import { ButtonMaximise } from '../../Components/Buttons/ButtonMaximise';
// ig chart imports
import { IgrCategoryChart } from 'igniteui-react-charts/ES2015/igr-category-chart';
import { IgrCategoryChartModule } from 'igniteui-react-charts/ES2015/igr-category-chart-module';
import { IgrDataChartAnnotationModule } from 'igniteui-react-charts/ES2015/igr-data-chart-annotation-module';
import { Helper } from '../../../Utilities/Helpers/Helper';
import {
  CategoryChartType,
  CrosshairDisplayMode,
  AxisLabelsLocation,
  HorizontalAlignment,
  LabelVisibility,
  ToolTipType,
  AxisAngle,
  AxisScale,
} from '../../../PredefinedConfig/Common/ChartEnums';
import { PanelWithButton } from '../../Components/Panels/PanelWithButton';
import { ColorPicker } from '../../ColorPicker';

import { ButtonGeneral } from '../../Components/Buttons/ButtonGeneral';
import { DefaultCategoryChartProperties } from '../../../Utilities/Defaults/DefaultCategoryChartProperties';
import { PanelWithTwoButtons } from '../../Components/Panels/PanelWithTwoButtons';
import {
  CategoryChartDefinition,
  CategoryChartProperties,
  ChartProperties,
  ChartData,
} from '../../../PredefinedConfig/ChartState';
import { CategoryChartUIHelper } from './CategoryChartUIHelper';
import { CategoryChartComponentState } from './CategoryChartComponentState';
import { AdaptableBlotterColumn } from '../../../Utilities/Interface/AdaptableBlotterColumn';

import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';

import Checkbox from '../../../components/CheckBox';
import FormLayout, { FormRow, FormLayoutColumn } from '../../../components/FormLayout';
import ChartContainer from '../../../components/ChartContainer';

/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
interface CategoryChartComponentProps {
  CurrentChartDefinition: CategoryChartDefinition;
  ChartData: ChartData;
  Columns: AdaptableBlotterColumn[];
  ColorPalette: string[];
  onUpdateChartProperties: (chartUuid: string, chartProperties: ChartProperties) => void;
}

const COLS: FormLayoutColumn[] = [{ name: 'label', style: { textAlign: 'start' } }, { name: '2' }];

const defaultButtonProps = {
  variant: 'text' as 'text',
};
export class CategoryChartComponent extends React.Component<
  CategoryChartComponentProps,
  CategoryChartComponentState
> {
  public seriesColors: Map<string, string> = new Map<string, string>();

  constructor(props: CategoryChartComponentProps) {
    super(props);

    // added for synchronizing color of series with colors of callouts:
    this.seriesAdded = this.seriesAdded.bind(this);
    this.calloutStyleUpdating = this.calloutStyleUpdating.bind(this);

    this.state = CategoryChartUIHelper.setChartDisplayPopupState(
      this.props.CurrentChartDefinition as CategoryChartDefinition,
      this.props.Columns
    );
    IgrCategoryChartModule.register();
    IgrDataChartAnnotationModule.register();
  }

  UNSAFE_componentWillReceiveProps(nextProps: CategoryChartComponentProps, nextContext: any) {
    if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
      this.setState(CategoryChartUIHelper.setChartDisplayPopupState(
        nextProps.CurrentChartDefinition as CategoryChartDefinition,
        this.props.Columns
      ) as CategoryChartComponentState);
    }
  }

  render() {
    let showGeneralPropertiesButton = this.state.IsGeneralMinimised ? (
      <ButtonMaximise
        {...defaultButtonProps}
        onClick={() => this.onShowGeneralProperties()}
        tooltip={'Show GeneralProperties'}
      />
    ) : (
      <ButtonMinimise
        {...defaultButtonProps}
        onClick={() => this.onHidePropertiesGroup()}
        tooltip={'Hide General Properties'}
      />
    );

    let showYAxisPropertiesButton = this.state.IsYAxisMinimised ? (
      <ButtonMaximise
        {...defaultButtonProps}
        onClick={() => this.onShowYAxisProperties()}
        tooltip={'Show YAxis Properties'}
      />
    ) : (
      <ButtonMinimise
        {...defaultButtonProps}
        onClick={() => this.onHidePropertiesGroup()}
        tooltip={'Hide YAxis Properties'}
      />
    );

    let showXAxisPropertiesButton = this.state.IsXAxisMinimised ? (
      <ButtonMaximise
        {...defaultButtonProps}
        onClick={() => this.onShowXAxisProperties()}
        tooltip={'Show XAxis Properties'}
      />
    ) : (
      <ButtonMinimise
        {...defaultButtonProps}
        onClick={() => this.onHidePropertiesGroup()}
        tooltip={'Hide XAxis Properties'}
      />
    );

    let showHighlightsPropertiesButton = this.state.IsHighlightsMinimised ? (
      <ButtonMaximise
        {...defaultButtonProps}
        onClick={() => this.onShowHighlightsProperties()}
        tooltip={'Show Highlights Properties'}
      />
    ) : (
      <ButtonMinimise
        {...defaultButtonProps}
        onClick={() => this.onHidePropertiesGroup()}
        tooltip={'Hide Highlights Properties'}
      />
    );

    let showMiscPropertiesButton = this.state.IsMiscMinimised ? (
      <ButtonMaximise
        {...defaultButtonProps}
        onClick={() => this.onShowMiscProperties()}
        tooltip={'Show Misc Properties'}
      />
    ) : (
      <ButtonMinimise
        {...defaultButtonProps}
        onClick={() => this.onHidePropertiesGroup()}
        tooltip={'Hide XAxis Properties'}
      />
    );

    let closeChartSettingsButton = (
      <ButtonClose
        {...defaultButtonProps}
        style={{ color: 'var(--ab-color-defaultbackground)' }}
        onClick={() => this.onHideChartSettings()}
        tooltip={'Close Chart Settings'}
      />
    );

    let openChartSettingsButton = (
      <ButtonGeneral
        style={{ alignSelf: 'flex-end' }}
        onClick={() => this.onShowChartSettings()}
        variant="text"
        tooltip={null}
      >
        Show Chart Settings
      </ButtonGeneral>
    );

    let setDefaultsButton = (
      <ButtonGeneral
        {...defaultButtonProps}
        style={{ color: 'var(--ab-color-defaultbackground)' }}
        onClick={() => this.onSetPropertyDefaults()}
        tooltip={null}
      >
        Reset
      </ButtonGeneral>
    );

    let chartElement = (
      <IgrCategoryChart
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
        calloutsDataSource={CategoryChartUIHelper.getCalloutsData(
          this.props.ChartData.Data,
          this.state.ChartProperties
        )}
        calloutsVisible={true}
        calloutsXMemberPath="CalloutsIndex"
        calloutsYMemberPath="CalloutsValue"
        calloutsLabelMemberPath="CalloutsLabel"
        calloutsContentMemberPath="MemberPath"
        calloutStyleUpdating={this.calloutStyleUpdating}
        calloutStyleUpdatingEventEnabled={true}
        seriesAdded={this.seriesAdded}
        //xAxisInterval={1}
        xAxisLabelAngle={CategoryChartUIHelper.getAngleFromEnum(
          this.state.ChartProperties.XAxisAngle
        )}
        // properties used in ig example
        //    xAxisFormatLabel={this.formatDateLabel}

        // properties not doing
        // tick length seems to be space between the legend and the points - doubt worth setting for V1.
        //   yAxisTickLength={0}
        //  xAxisTickLength={15}
        //  xAxisTickStrokeThickness={1} // not sure what it does but looks minor!
      />
    );

    const settingsPanel = (
      <PanelWithTwoButtons
        headerText={'Chart Settings'}
        variant="primary"
        firstButton={closeChartSettingsButton}
        secondButton={setDefaultsButton}
      >
        <PanelWithButton
          headerText={'General'}
          variant="default"
          button={showGeneralPropertiesButton}
        >
          {this.state.IsGeneralMinimised == false && (
            <FormLayout>
              <FormRow label="Chart Type">
                <Dropdown
                  style={{ maxWidth: 'inherit', width: '100%' }}
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ChartProperties.CategoryChartType}
                  onChange={x => this.onChartTypeChange(x)}
                  options={CategoryChartUIHelper.getChartTypeOptions()}
                />
              </FormRow>
              <FormRow label="Marker Type">
                <Dropdown
                  style={{ maxWidth: 'inherit', width: '100%' }}
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ChartProperties.MarkerType}
                  onChange={x => this.onMarkerTypeChange(x)}
                  options={CategoryChartUIHelper.getMarkerTypeOptions()}
                />
              </FormRow>

              {this.state.ChartProperties.CategoryChartType == CategoryChartType.Column && (
                <>
                  <FormRow label="Column Gap">
                    <Input
                      value={this.state.ChartProperties.XAxisGap}
                      width="100%"
                      type="number"
                      min="0"
                      step="0.1"
                      max="1"
                      placeholder="Enter"
                      onChange={(e: React.SyntheticEvent) => this.onXAxisGapChanged(e)}
                    />
                  </FormRow>

                  <FormRow label="Column Overlap">
                    <Input
                      width="100%"
                      value={this.state.ChartProperties.XAxisOverlap}
                      type="number"
                      min="0"
                      step="0.1"
                      max="1"
                      placeholder="Enter"
                      onChange={(e: React.SyntheticEvent) => this.onXAxisOverlapChanged(e)}
                    />
                  </FormRow>
                </>
              )}
            </FormLayout>
          )}
        </PanelWithButton>

        <PanelWithButton
          variant="default"
          headerText={'Y (Vertical) Axis'}
          style={{ marginTop: '2px' }}
          button={showYAxisPropertiesButton}
        >
          {this.state.IsYAxisMinimised == false && (
            <FormLayout columns={COLS}>
              <FormRow>
                <Checkbox
                  onChange={(checked: boolean) => this.onYAxisVisibilityOptionChanged(checked)}
                  checked={
                    this.state.ChartProperties.YAxisLabelVisibility == LabelVisibility.Visible
                  }
                >
                  Axis Visible
                </Checkbox>
              </FormRow>

              {this.state.ChartProperties.YAxisLabelVisibility == LabelVisibility.Visible && (
                <>
                  <FormRow>
                    <Checkbox
                      marginTop={2}
                      onChange={(checked: boolean) => this.onYAxisInvertedChanged(checked)}
                      checked={this.state.ChartProperties.YAxisInverted}
                    >
                      Axis Inverted
                    </Checkbox>
                  </FormRow>

                  <FormRow label="Axis Location">
                    <Dropdown
                      style={{ maxWidth: 'inherit', width: '100%' }}
                      placeholder="select"
                      showEmptyItem={false}
                      showClearButton={false}
                      value={this.state.ChartProperties.YAxisLabelLocation}
                      onChange={(x: string) => this.onYAxisLabelLocationChange(x)}
                      options={CategoryChartUIHelper.getYAxisLabelsLocations()}
                    />
                  </FormRow>

                  <FormRow label="Labels Scale">
                    <Dropdown
                      style={{ maxWidth: 'inherit', width: '100%' }}
                      placeholder="select"
                      showEmptyItem={false}
                      showClearButton={false}
                      value={this.state.ChartProperties.YAxisLabelScale}
                      onChange={x => this.onYAxisLabelScaleChanged(x)}
                      options={CategoryChartUIHelper.getAxisLabelScales()}
                    />
                  </FormRow>

                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onSetYAxisMinValueOptionChanged(checked)
                        }
                        checked={this.state.SetYAxisMinimumValue}
                      >
                        Labels Min
                      </Checkbox>
                    }
                  >
                    {this.state.SetYAxisMinimumValue && (
                      <Input
                        type="number"
                        placeholder={'Input'}
                        width="100%"
                        onChange={this.onYAxisMinValueChanged}
                        value={this.state.ChartProperties.YAxisMinimumValue}
                      />
                    )}
                  </FormRow>

                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onSetYAxisMaxValueOptionChanged(checked)
                        }
                        checked={this.state.SetYAxisMinimumValue}
                      >
                        Labels Max
                      </Checkbox>
                    }
                  >
                    {this.state.SetYAxisMinimumValue && (
                      <Input
                        type="number"
                        placeholder={'Input'}
                        width="100%"
                        onChange={this.onYAxisMaxValueChanged}
                        value={this.state.ChartProperties.YAxisMaximumValue}
                      />
                    )}
                  </FormRow>

                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onSetYAxisIntervalValueOptionChanged(checked)
                        }
                        checked={this.state.ChartProperties.YAxisIntervalCustom}
                      >
                        Labels Interval
                      </Checkbox>
                    }
                  >
                    {this.state.ChartProperties.YAxisIntervalCustom && (
                      <Input
                        type="number"
                        placeholder={'Input'}
                        onChange={this.onYAxisIntervalValueChanged}
                        value={this.state.ChartProperties.YAxisIntervalValue}
                      />
                    )}
                  </FormRow>

                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onSetYAxisLabelColorOptionChanged(checked)
                        }
                        checked={this.state.SetYAxisLabelColor}
                      >
                        Labels Color
                      </Checkbox>
                    }
                  >
                    {this.state.SetYAxisLabelColor && (
                      <ColorPicker
                        ColorPalette={this.props.ColorPalette}
                        value={this.state.ChartProperties.YAxisLabelColor}
                        onChange={x => this.onYAxisLabelColorChange(x)}
                      />
                    )}
                  </FormRow>

                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onUseDefaultYAxisTitleOptionChanged(checked)
                        }
                        checked={this.state.UseDefaultYAxisTitle}
                      >
                        Title Default
                      </Checkbox>
                    }
                  >
                    {this.state.UseDefaultYAxisTitle == false && (
                      <Input
                        type="text"
                        placeholder={'Enter Title'}
                        onChange={(e: React.SyntheticEvent) => this.onYAxisTitleChanged(e)}
                        value={this.state.ChartProperties.YAxisTitle}
                      />
                    )}
                  </FormRow>
                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onSetYAxisTitleColorOptionChanged(checked)
                        }
                        checked={this.state.SetYAxisTitleColor}
                      >
                        Title Color
                      </Checkbox>
                    }
                  >
                    {this.state.SetYAxisTitleColor && (
                      <ColorPicker
                        ColorPalette={this.props.ColorPalette}
                        value={this.state.ChartProperties.YAxisTitleColor}
                        onChange={x => this.onYAxisTitleColorChange(x)}
                      />
                    )}
                  </FormRow>
                </>
              )}
            </FormLayout>
          )}
        </PanelWithButton>

        <PanelWithButton
          variant="default"
          headerText={'X (Horizontal) Axis'}
          button={showXAxisPropertiesButton}
          style={{ marginTop: '2px' }}
        >
          {this.state.IsXAxisMinimised == false && (
            <FormLayout columns={COLS}>
              <FormRow
                label={
                  <Checkbox
                    onChange={(checked: boolean) => this.onXAxisVisibilityOptionChanged(checked)}
                    checked={
                      this.state.ChartProperties.XAxisLabelVisibility == LabelVisibility.Visible
                    }
                  >
                    Axis Visible
                  </Checkbox>
                }
              ></FormRow>

              {this.state.ChartProperties.XAxisLabelVisibility == LabelVisibility.Visible && (
                <>
                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) => this.onXAxisInvertedChanged(checked)}
                        checked={this.state.ChartProperties.XAxisInverted}
                      >
                        Axis Inverted
                      </Checkbox>
                    }
                  ></FormRow>
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
                  <FormRow label="Labels Angle">
                    <Dropdown
                      placeholder="select"
                      showEmptyItem={false}
                      showClearButton={false}
                      value={this.state.ChartProperties.XAxisAngle}
                      onChange={x => this.onXAxisAngleChanged(x)}
                      options={CategoryChartUIHelper.getAxisAngleOptions()}
                    ></Dropdown>
                  </FormRow>
                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onSetXAxisLabelColorOptionChanged(checked)
                        }
                        checked={this.state.SetXAxisLabelColor}
                      >
                        Labels Color
                      </Checkbox>
                    }
                  >
                    {this.state.SetXAxisLabelColor && (
                      <ColorPicker
                        ColorPalette={this.props.ColorPalette}
                        value={this.state.ChartProperties.XAxisLabelColor}
                        onChange={x => this.onXAxisLabelColorChange(x)}
                      />
                    )}
                  </FormRow>
                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onSetXAxisIntervalValueOptionChanged(checked)
                        }
                        checked={this.state.ChartProperties.XAxisIntervalCustom}
                      >
                        Labels Interval
                      </Checkbox>
                    }
                  >
                    {this.state.ChartProperties.XAxisIntervalCustom && (
                      <Input
                        type="number"
                        placeholder={'Input'}
                        onChange={this.onXAxisIntervalValueChanged}
                        value={this.state.ChartProperties.XAxisIntervalValue}
                      />
                    )}
                  </FormRow>
                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onUseDefaultXAxisTitleOptionChanged(checked)
                        }
                        checked={this.state.UseDefaultXAxisTitle}
                      >
                        Title Default
                      </Checkbox>
                    }
                  >
                    {this.state.UseDefaultXAxisTitle == false && (
                      <Input
                        type="text"
                        placeholder={'Enter Title'}
                        onChange={(e: React.SyntheticEvent) => this.onXAxisTitleChanged(e)}
                        value={this.state.ChartProperties.XAxisTitle}
                      />
                    )}
                  </FormRow>
                  <FormRow
                    label={
                      <Checkbox
                        onChange={(checked: boolean) =>
                          this.onSetXAxisTitleColorOptionChanged(checked)
                        }
                        checked={this.state.SetXAxisTitleColor}
                      >
                        Title Color
                      </Checkbox>
                    }
                  >
                    {this.state.SetXAxisTitleColor && (
                      <ColorPicker
                        ColorPalette={this.props.ColorPalette}
                        value={this.state.ChartProperties.XAxisTitleColor}
                        onChange={x => this.onXAxisTitleColorChange(x)}
                      />
                    )}
                  </FormRow>
                </>
              )}
            </FormLayout>
          )}
        </PanelWithButton>

        <PanelWithButton
          variant="default"
          headerText={'Annotations'}
          button={showHighlightsPropertiesButton}
          style={{ marginTop: '2px' }}
        >
          {this.state.IsHighlightsMinimised == false && (
            <FormLayout columns={COLS}>
              <FormRow
                label={
                  <Checkbox
                    onChange={(checked: boolean) =>
                      this.onEnableFinalValueAnnotationsOptionChanged(checked)
                    }
                    checked={this.state.ChartProperties.EnableFinalValueAnnotations}
                  >
                    Final Values
                  </Checkbox>
                }
              />
              <FormRow
                label={
                  <Checkbox
                    onChange={e => this.onEnableSeriesHighlightingOptionChanged(e)}
                    checked={this.state.ChartProperties.EnableSeriesHighlighting}
                  >
                    Highlight Series
                  </Checkbox>
                }
              />
              <FormRow
                label={
                  <Checkbox
                    onChange={(checked: boolean) =>
                      this.onEnableCategoryHighlightingOptionChanged(checked)
                    }
                    checked={this.state.ChartProperties.EnableCategoryHighlighting}
                  >
                    Highlight Category
                  </Checkbox>
                }
              />
              <FormRow
                label={
                  <Checkbox
                    onChange={(checked: boolean) =>
                      this.onEnableItemHighlightingOptionChanged(checked)
                    }
                    checked={this.state.ChartProperties.EnableItemHighlighting}
                  >
                    Highlight Item
                  </Checkbox>
                }
              />
              <FormRow label={'Callout Type'}>
                <Dropdown
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ChartProperties.CalloutsType}
                  onChange={x => this.onChangedCalloutsType(x)}
                  options={CategoryChartUIHelper.getCalloutTypeOptions()}
                ></Dropdown>
              </FormRow>

              {/* {this.state.ChartProperties.CalloutsType == "Data Points" && */}
              <FormRow label={'Callout Interval'}>
                <Input
                  value={this.state.ChartProperties.CalloutsInterval}
                  type="number"
                  min="1"
                  step="1"
                  max="20"
                  placeholder="Enter"
                  onChange={(e: React.SyntheticEvent) => this.onChangedCalloutsInterval(e)}
                />
              </FormRow>

              <FormRow label="Tooltips">
                <Dropdown
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ChartProperties.ToolTipType}
                  onChange={x => this.onToolTipTypeChange(x)}
                  options={CategoryChartUIHelper.getToolTipOptions()}
                ></Dropdown>
              </FormRow>
              <FormRow label="Crosshairs">
                <Dropdown
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ChartProperties.CrosshairDisplayMode}
                  onChange={x => this.onCrosshairsModeChange(x)}
                  options={CategoryChartUIHelper.getCrossHairModeOptions()}
                ></Dropdown>
              </FormRow>
              {this.state.ChartProperties.CrosshairDisplayMode != CrosshairDisplayMode.None && (
                <>
                  <FormRow>
                    <div />
                    <Checkbox
                      onChange={(checked: boolean) =>
                        this.onCrosshairSnapToDataOptionChanged(checked)
                      }
                      checked={this.state.ChartProperties.CrosshairSnapToData}
                    >
                      Snap to Data
                    </Checkbox>
                  </FormRow>
                  <FormRow>
                    <div />
                    <Checkbox
                      onChange={(checked: boolean) =>
                        this.onCrosshairAnnotationEnabledOptionChanged(checked)
                      }
                      checked={this.state.ChartProperties.CrosshairAnnotationEnabled}
                    >
                      Show Values
                    </Checkbox>
                  </FormRow>
                </>
              )}
            </FormLayout>
          )}
        </PanelWithButton>

        <PanelWithButton
          variant="default"
          headerText={'Misc'}
          button={showMiscPropertiesButton}
          style={{ marginTop: '2px' }}
        >
          {this.state.IsMiscMinimised == false && (
            <FormLayout columns={COLS}>
              <FormRow label="Title">
                <Dropdown
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ChartProperties.TitleAlignment}
                  onChange={x => this.onTitleAlignmentChange(x)}
                  options={CategoryChartUIHelper.getAlignmentOptions()}
                ></Dropdown>
              </FormRow>
              <FormRow label="Subtitle">
                <Dropdown
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ChartProperties.SubTitleAlignment}
                  onChange={x => this.onSubTitleAlignmentChange(x)}
                  options={CategoryChartUIHelper.getAlignmentOptions()}
                ></Dropdown>
              </FormRow>
              <FormRow
                label={
                  <Checkbox
                    onChange={e => this.onEnableTransitionsOptionChanged(e)}
                    checked={this.state.ChartProperties.EnableTransitions}
                  >
                    Enable Transitions
                  </Checkbox>
                }
              />
              {this.state.ChartProperties.EnableTransitions && (
                <FormRow label="Duration">
                  <Input
                    placeholder={'Length (ms)'}
                    type="number"
                    onChange={this.onTransitionDurationChanged}
                    value={this.state.ChartProperties.TransitionInDuration}
                  />
                </FormRow>
              )}
            </FormLayout>
          )}
        </PanelWithButton>
      </PanelWithTwoButtons>
    );

    return this.props.ChartData.Data != null ? (
      <ChartContainer
        button={!this.state.IsChartSettingsVisible ? openChartSettingsButton : null}
        chart={chartElement}
        settingsPanel={this.state.IsChartSettingsVisible ? settingsPanel : null}
      />
    ) : null;
  }

  public calloutStyleUpdating(args: any) {
    if (args.item && this.seriesColors.has(args.item)) {
      let color = this.seriesColors.get(args.item)!;
      args.outline = color;
      args.background = color;
      args.leaderBrush = '#d8d8d8';
      args.textColor = 'white';
    }
  }

  public seriesAdded(args: any) {
    const series = args.series as any;
    if (series && series.valueMemberPath && series.valueMemberPath !== '') {
      this.seriesColors.set(series.valueMemberPath, args.series.actualBrush);
    }
  }

  onSetPropertyDefaults() {
    // this overrides what has been set in predefined config with defaults - is that right?
    // or should it just override what has been changed ?
    // first update our state
    this.setState(
      CategoryChartUIHelper.setDefaultChartDisplayPopupState() as CategoryChartComponentState
    );
    // then update the properties
    let chartProperties: CategoryChartProperties = Helper.cloneObject(
      DefaultCategoryChartProperties
    );
    // do the titles
    chartProperties.YAxisTitle = this.getYAxisTitle(true);
    chartProperties.XAxisTitle = this.getXAxisTitle(true);
    this.updateChartProperties(chartProperties);
  }

  onShowGeneralProperties() {
    this.setState({
      IsYAxisMinimised: true,
      IsGeneralMinimised: false,
      IsXAxisMinimised: true,
      IsHighlightsMinimised: true,
      IsMiscMinimised: true,
    } as CategoryChartComponentState);
  }

  onShowYAxisProperties() {
    this.setState({
      IsYAxisMinimised: false,
      IsGeneralMinimised: true,
      IsXAxisMinimised: true,
      IsHighlightsMinimised: true,
      IsMiscMinimised: true,
    } as CategoryChartComponentState);
  }

  onShowXAxisProperties() {
    this.setState({
      IsYAxisMinimised: true,
      IsGeneralMinimised: true,
      IsXAxisMinimised: false,
      IsHighlightsMinimised: true,
      IsMiscMinimised: true,
    } as CategoryChartComponentState);
  }

  onShowHighlightsProperties() {
    this.setState({
      IsYAxisMinimised: true,
      IsGeneralMinimised: true,
      IsXAxisMinimised: true,
      IsHighlightsMinimised: false,
      IsMiscMinimised: true,
    } as CategoryChartComponentState);
  }

  onShowMiscProperties() {
    this.setState({
      IsYAxisMinimised: true,
      IsGeneralMinimised: true,
      IsXAxisMinimised: true,
      IsHighlightsMinimised: true,
      IsMiscMinimised: false,
    } as CategoryChartComponentState);
  }

  onHidePropertiesGroup() {
    this.setState({
      IsYAxisMinimised: true,
      IsGeneralMinimised: true,
      IsXAxisMinimised: true,
      IsHighlightsMinimised: true,
      IsMiscMinimised: true,
    } as CategoryChartComponentState);
  }

  onShowChartSettings() {
    this.setState({ IsChartSettingsVisible: true } as CategoryChartComponentState);
  }

  onHideChartSettings() {
    this.setState({ IsChartSettingsVisible: false } as CategoryChartComponentState);
  }

  onChartTypeChange(value: CategoryChartType) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.CategoryChartType = value as CategoryChartType;
    this.updateChartProperties(chartProperties);
  }

  onMarkerTypeChange(value: string) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.MarkerType = value;
    this.updateChartProperties(chartProperties);
  }

  onYAxisLabelLocationChange(value: string) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    let selected = value;
    if (selected.indexOf('Left') > 0) {
      chartProperties.YAxisLabelLocation = AxisLabelsLocation.OutsideLeft;
    } else {
      chartProperties.YAxisLabelLocation = AxisLabelsLocation.OutsideRight;
    }
    this.updateChartProperties(chartProperties);
  }
  onXAxisLabelLocationChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    let selected = e.value.toString();
    if (selected.indexOf('Top') > 0) {
      chartProperties.XAxisLabelLocation = AxisLabelsLocation.OutsideTop;
    } else {
      chartProperties.XAxisLabelLocation = AxisLabelsLocation.OutsideBottom;
    }
    this.updateChartProperties(chartProperties);
  }

  private onYAxisLabelColorChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.YAxisLabelColor = e.value;
    this.updateChartProperties(chartProperties);
  }

  private onXAxisLabelColorChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisLabelColor = e.value;
    this.updateChartProperties(chartProperties);
  }

  private onYAxisTitleColorChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.YAxisTitleColor = e.value;
    this.updateChartProperties(chartProperties);
  }

  private onXAxisTitleColorChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisTitleColor = e.value;
    this.updateChartProperties(chartProperties);
  }

  onToolTipTypeChange(value: ToolTipType) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.ToolTipType = value as ToolTipType;
    this.updateChartProperties(chartProperties);
  }

  onChangedCalloutsType(value: any) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    // Note not changing to CalloutsType enum because a user might selected a da column name from data source
    chartProperties.CalloutsType = value;
    this.updateChartProperties(chartProperties);
  }

  private onChangedCalloutsInterval(event: React.SyntheticEvent) {
    let e = event.target as HTMLInputElement;
    let value = Number(e.value);
    if (value >= 1000) {
      value = 1000;
    }
    if (value < 1) {
      value = 1;
    }
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.CalloutsInterval = value;
    // chartProperties.CalloutsInterval = e.target.value;
    this.updateChartProperties(chartProperties);
  }

  onCrosshairsModeChange(value: CrosshairDisplayMode) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.CrosshairDisplayMode = value;
    this.updateChartProperties(chartProperties);
  }

  private onCrosshairSnapToDataOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.CrosshairSnapToData = checked;
    this.updateChartProperties(chartProperties);
  }

  private onCrosshairAnnotationEnabledOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.CrosshairAnnotationEnabled = checked;
    this.updateChartProperties(chartProperties);
  }

  private onEnableFinalValueAnnotationsOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.EnableFinalValueAnnotations = checked;
    this.updateChartProperties(chartProperties);
  }

  private onEnableSeriesHighlightingOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.EnableSeriesHighlighting = checked;
    this.updateChartProperties(chartProperties);
  }

  private onEnableCategoryHighlightingOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.EnableCategoryHighlighting = checked;
    this.updateChartProperties(chartProperties);
  }

  private onEnableItemHighlightingOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.EnableItemHighlighting = checked;
    this.updateChartProperties(chartProperties);
  }

  private onEnableTransitionsOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.EnableTransitions = checked;
    if (checked == false) {
      chartProperties.TransitionInDuration = undefined;
    }
    this.updateChartProperties(chartProperties);
  }

  private onYAxisInvertedChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.YAxisInverted = checked;
    this.updateChartProperties(chartProperties);
  }
  private onXAxisInvertedChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisInverted = checked;
    this.updateChartProperties(chartProperties);
  }

  private onSetYAxisMinValueOptionChanged(checked: boolean) {
    if (checked) {
      this.setState({ SetYAxisMinimumValue: true } as CategoryChartComponentState);
    } else {
      // set YAxisMinValue to undefined
      this.setState({ SetYAxisMinimumValue: checked } as CategoryChartComponentState);
      let chartProperties: CategoryChartProperties = this.state.ChartProperties;
      chartProperties.YAxisMinimumValue = undefined;
      this.updateChartProperties(chartProperties);
    }
  }

  private onSetYAxisMaxValueOptionChanged(checked: boolean) {
    if (checked) {
      this.setState({ SetYAxisMaximumValue: true } as CategoryChartComponentState);
    } else {
      // set YAxisMaxValue to undefined
      this.setState({ SetYAxisMaximumValue: checked } as CategoryChartComponentState);
      let chartProperties: CategoryChartProperties = this.state.ChartProperties;
      chartProperties.YAxisMaximumValue = undefined;
      this.updateChartProperties(chartProperties);
    }
  }

  private onSetYAxisIntervalValueOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.YAxisIntervalCustom = checked;
    if (!checked) {
      // set YAxisIntervalValue to undefined so it is auto calculated by the chart
      chartProperties.YAxisIntervalValue = undefined;
    }
    this.updateChartProperties(chartProperties);
  }
  private onSetXAxisIntervalValueOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisIntervalCustom = checked;
    if (!checked) {
      // set XAxisIntervalValue to undefined so it is auto calculated by the chart
      chartProperties.XAxisIntervalValue = undefined;
    }
    this.updateChartProperties(chartProperties);
  }

  private onSetYAxisLabelColorOptionChanged(checked: boolean) {
    let e = event.target as HTMLInputElement;
    if (checked) {
      this.setState({ SetYAxisLabelColor: true } as CategoryChartComponentState);
    } else {
      // set YAxisMinValue to undefined
      this.setState({ SetYAxisLabelColor: checked } as CategoryChartComponentState);
      let chartProperties: CategoryChartProperties = this.state.ChartProperties;
      chartProperties.YAxisLabelColor = '';
      this.updateChartProperties(chartProperties);
    }
  }

  private onSetXAxisLabelColorOptionChanged(checked: boolean) {
    if (checked) {
      this.setState({ SetXAxisLabelColor: true } as CategoryChartComponentState);
    } else {
      // set YAxisMinValue to undefined
      this.setState({ SetXAxisLabelColor: checked } as CategoryChartComponentState);
      let chartProperties: CategoryChartProperties = this.state.ChartProperties;
      chartProperties.XAxisLabelColor = '';
      this.updateChartProperties(chartProperties);
    }
  }

  private onSetYAxisTitleColorOptionChanged(checked: boolean) {
    if (checked) {
      this.setState({ SetYAxisTitleColor: true } as CategoryChartComponentState);
    } else {
      // set YAxisMinValue to undefined
      this.setState({ SetYAxisTitleColor: checked } as CategoryChartComponentState);
      let chartProperties: CategoryChartProperties = this.state.ChartProperties;
      chartProperties.YAxisTitleColor = '';
      this.updateChartProperties(chartProperties);
    }
  }

  private onSetXAxisTitleColorOptionChanged(checked: boolean) {
    if (checked) {
      this.setState({ SetXAxisTitleColor: true } as CategoryChartComponentState);
    } else {
      // set YAxisMinValue to undefined
      this.setState({ SetXAxisTitleColor: checked } as CategoryChartComponentState);
      let chartProperties: CategoryChartProperties = this.state.ChartProperties;
      chartProperties.XAxisTitleColor = '';
      this.updateChartProperties(chartProperties);
    }
  }

  onTitleAlignmentChange(value: HorizontalAlignment) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.TitleAlignment = value as HorizontalAlignment;
    this.updateChartProperties(chartProperties);
    let titleMargin: number = value == HorizontalAlignment.Right ? 5 : 0;
    this.setState({ TitleMargin: titleMargin } as CategoryChartComponentState);
  }

  onSubTitleAlignmentChange(value: HorizontalAlignment) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.SubTitleAlignment = value as HorizontalAlignment;
    this.updateChartProperties(chartProperties);
    let subtitleMargin: number = value == HorizontalAlignment.Right ? 5 : 0;
    this.setState({ SubTitleMargin: subtitleMargin } as CategoryChartComponentState);
  }

  private onYAxisMinValueChanged = (e: any) => {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.YAxisMinimumValue = e.target.value;
    this.updateChartProperties(chartProperties);
  };
  private onYAxisMaxValueChanged = (e: any) => {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.YAxisMaximumValue = e.target.value;
    this.updateChartProperties(chartProperties);
  };
  private onYAxisIntervalValueChanged = (e: any) => {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.YAxisIntervalValue = e.target.value;
    this.updateChartProperties(chartProperties);
  };
  private onXAxisIntervalValueChanged = (e: any) => {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisIntervalValue = e.target.value;
    this.updateChartProperties(chartProperties);
  };

  private onTransitionDurationChanged = (e: any) => {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.TransitionInDuration = e.target.value;
    this.updateChartProperties(chartProperties);
  };

  private updateChartProperties(chartProperties: CategoryChartProperties): void {
    this.setState({ ChartProperties: chartProperties } as CategoryChartComponentState);
    this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Uuid, chartProperties);
  }

  private onXAxisVisibilityOptionChanged(checked: boolean) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisLabelVisibility = checked
      ? LabelVisibility.Visible
      : LabelVisibility.Collapsed;
    this.updateChartProperties(chartProperties);
  }

  private onYAxisVisibilityOptionChanged(checked: boolean) {
    let e = event.target as HTMLInputElement;
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.YAxisLabelVisibility = checked
      ? LabelVisibility.Visible
      : LabelVisibility.Collapsed;
    this.updateChartProperties(chartProperties);
  }

  private onYAxisTitleChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.YAxisTitle = e.value;
    this.updateChartProperties(chartProperties);
  }

  private onXAxisGapChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let factor = Number(e.value);
    if (factor > 1) {
      factor = 1;
    }
    if (factor < 0) {
      factor = 0;
    }
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisGap = factor;
    this.updateChartProperties(chartProperties);
  }
  private onXAxisOverlapChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let factor = Number(e.value);
    if (factor > 1) {
      factor = 1;
    }
    if (factor < 0) {
      factor = 0;
    }
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisOverlap = factor;
    this.updateChartProperties(chartProperties);
  }

  private onXAxisTitleChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisTitle = e.value;
    this.updateChartProperties(chartProperties);
  }

  private onXAxisAngleChanged(value: AxisAngle) {
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    chartProperties.XAxisAngle = value;
    this.updateChartProperties(chartProperties);
  }

  private onYAxisLabelScaleChanged(value: AxisScale) {
    let scale = value as AxisScale;
    let chartProperties: CategoryChartProperties = this.state.ChartProperties;
    // chartProperties.YAxisIsLogarithmic = scale == AxisScale.Log;
    chartProperties.YAxisLabelScale = scale;
    this.updateChartProperties(chartProperties);
  }

  private onUseDefaultYAxisTitleOptionChanged(checked: boolean) {
    if (checked) {
      // if its not checked then we need to clear the title
      let chartProperties: CategoryChartProperties = this.state.ChartProperties;
      chartProperties.YAxisTitle = '';
      this.updateChartProperties(chartProperties);
    }
    // do we really need to update ChartDisplayPopupState?
    this.setState({ UseDefaultYAxisTitle: checked } as CategoryChartComponentState);
  }

  private onUseDefaultXAxisTitleOptionChanged(checked: boolean) {
    if (checked) {
      // if its not checked then we need to clear the title
      let chartProperties: CategoryChartProperties = this.state.ChartProperties;
      chartProperties.XAxisTitle = '';
      this.updateChartProperties(chartProperties);
    }
    // do we really need to update ChartDisplayPopupState?
    this.setState({ UseDefaultXAxisTitle: checked } as CategoryChartComponentState);
  }

  private getYAxisTitle(useDefault: boolean): string {
    if (useDefault) {
      return CategoryChartUIHelper.createDefaultYAxisTitle(
        this.props.CurrentChartDefinition,
        this.props.Columns
      );
    }
    return this.state.ChartProperties.YAxisTitle;
  }

  private getXAxisTitle(useDefault: boolean): string {
    if (useDefault) {
      return CategoryChartUIHelper.createDefaultXAxisTitle(
        this.props.CurrentChartDefinition,
        this.props.Columns
      );
    }
    return this.state.ChartProperties.XAxisTitle;
  }

  private getYAxisIsLogarithmic(scaleMode: AxisScale): boolean {
    return scaleMode == AxisScale.Log;
  }
}
