import * as React from 'react';
import { IgrItemLegendModule } from 'igniteui-react-charts/ES2015/igr-item-legend-module';
import { IgrItemLegend } from 'igniteui-react-charts/ES2015/igr-item-legend';
import { IgrDoughnutChartModule } from 'igniteui-react-charts/ES2015/igr-doughnut-chart-module';
import { IgrDoughnutChart } from 'igniteui-react-charts/ES2015/igr-doughnut-chart';
import { IgrRingSeriesModule } from 'igniteui-react-charts/ES2015/igr-ring-series-module';
import { IgrRingSeries } from 'igniteui-react-charts/ES2015/igr-ring-series';
import { IgrPieChart } from 'igniteui-react-charts/ES2015/igr-pie-chart';
import { IgrPieChartModule } from 'igniteui-react-charts/ES2015/igr-pie-chart-module';
import { SliceClickEventArgs } from 'igniteui-react-charts/ES2015/igr-slice-click-event-args';
import {
  ChartProperties,
  PieChartDefinition,
  PieChartProperties,
  ChartData,
  PieChartDataItem,
} from '../../../PredefinedConfig/RunTimeState/ChartState';
import { PieChartUIHelper } from './PieChartUIHelper';
import { PieChartComponentState } from './PieChartComponentState';
import { ButtonMaximise } from '../../Components/Buttons/ButtonMaximise';

import { ButtonMinimise } from '../../Components/Buttons/ButtonMinimise';
import { ButtonClose } from '../../Components/Buttons/ButtonClose';
import { ButtonGeneral } from '../../Components/Buttons/ButtonGeneral';
import { Helper } from '../../../Utilities/Helpers/Helper';
import { DefaultPieChartProperties } from '../../../Utilities/Defaults/DefaultPieChartProperties';

import { PanelWithTwoButtons } from '../../Components/Panels/PanelWithTwoButtons';
import { PanelWithButton } from '../../Components/Panels/PanelWithButton';

import {
  PieChartLabelPosition,
  SliceLabelOption,
  SliceSortOption,
  OthersCategoryType,
} from '../../../PredefinedConfig/Common/ChartEnums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { EnumExtensions } from '../../../Utilities/Extensions/EnumExtensions';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import FormLayout, { FormRow, FormLayoutColumn } from '../../../components/FormLayout';
import Dropdown from '../../../components/Dropdown';
import { Flex, Box, BoxProps } from 'rebass';
import Input from '../../../components/Input';
import HelpBlock from '../../../components/HelpBlock';
import Panel from '../../../components/Panel';
import Checkbox from '../../../components/CheckBox';

import SizedContainer from '../../../components/SizedContainer';
import ChartContainer from '../../../components/ChartContainer';

interface PieChartComponentProps {
  CurrentChartDefinition: PieChartDefinition;
  ChartData: ChartData;
  onUpdateChartProperties: (chartUuid: string, chartProperties: ChartProperties) => void;
}

const defaultButtonProps = {
  variant: 'text' as 'text',
};

const COLS: FormLayoutColumn[] = [{ name: 'label', style: { textAlign: 'start' } }, { name: '2' }];
/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
export class PieChartComponent extends React.Component<
  PieChartComponentProps,
  PieChartComponentState
> {
  public doughnutChart: IgrDoughnutChart;
  public doughnutLegend: IgrItemLegend;
  public pieChart: IgrPieChart;
  public pieChartLegend: IgrItemLegend;

  constructor(props: PieChartComponentProps) {
    super(props);

    this.state = PieChartUIHelper.setChartDisplayPopupState(
      this.props.CurrentChartDefinition,
      this.props.ChartData
    );

    IgrPieChartModule.register();
    IgrDoughnutChartModule.register();
    IgrRingSeriesModule.register();
    IgrItemLegendModule.register();

    this.onPieChartRef = this.onPieChartRef.bind(this);
    this.onDoughnutChartRef = this.onDoughnutChartRef.bind(this);
    this.onDoughnutLegendRef = this.onDoughnutLegendRef.bind(this);
    this.onPieChartLegendRef = this.onPieChartLegendRef.bind(this);
  }

  UNSAFE_componentWillReceiveProps(nextProps: PieChartComponentProps, nextContext: any) {
    this.setState(
      PieChartUIHelper.setChartDisplayPopupState(
        nextProps.CurrentChartDefinition,
        nextProps.ChartData
      )
    );
  }

  render() {
    let chartTitle: string = this.props.CurrentChartDefinition.Name;
    if (StringExtensions.IsNotNullOrEmpty(this.props.CurrentChartDefinition.Description)) {
      chartTitle += ' : ' + this.props.CurrentChartDefinition.Description;
    }

    let chartErrorMessage: string =
      this.props.ChartData != null &&
      StringExtensions.IsNotNullOrEmpty(this.props.ChartData.ErrorMessage)
        ? this.props.ChartData.ErrorMessage
        : null;

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

    let closeChartSettingsButton = (
      <ButtonClose
        {...defaultButtonProps}
        style={{ color: 'var(--ab-color-defaultbackground' }}
        onClick={() => this.onHideChartSettings()}
        tooltip={'Close Chart Settings'}
      />
    );

    let openChartSettingsButton = (
      <ButtonGeneral style={{ alignSelf: 'flex-end' }} onClick={() => this.onShowChartSettings()}>
        Show Chart Settings
      </ButtonGeneral>
    );

    let setDefaultsButton = (
      <ButtonGeneral
        style={{ color: 'var(--ab-color-defaultbackground' }}
        onClick={() => this.onSetPropertyDefaults()}
      >
        Reset
      </ButtonGeneral>
    );

    let chart = this.state.ChartProperties.ShowAsDoughnut ? (
      <IgrDoughnutChart
        width={'400px'}
        height={'400px'}
        allowSliceSelection="true"
        allowSliceExplosion="true"
        sliceClick={(s, e) => this.onSliceClick(e)}
        ref={this.onDoughnutChartRef}
      >
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
          radiusFactor={0.8}
        />
      </IgrDoughnutChart>
    ) : (
      <IgrPieChart
        ref={this.onPieChartRef}
        dataSource={this.state.DataSource}
        labelsPosition={this.state.ChartProperties.PieChartLabelPosition}
        width={'400px'}
        height={'400px'}
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
    );

    let chartElement =
      this.props.ChartData != null && chartErrorMessage == null ? (
        chart
      ) : (
        <HelpBlock>{chartErrorMessage}</HelpBlock>
      );

    let legendPanel = (
      <Panel variant="default">
        <FormLayout>
          <FormRow label="Sort by">
            <Dropdown
              placeholder="select"
              showEmptyItem={false}
              showClearButton={false}
              value={this.state.SliceSortOption}
              onChange={x => this.onSliceSortByColumnChanged(x)}
              options={this.getOptionsForSliceSortOrders()}
            />
          </FormRow>
        </FormLayout>

        {this.state.ChartProperties.ShowAsDoughnut ? (
          <div className="doughnutLegend">
            <IgrItemLegend ref={this.onDoughnutLegendRef} />
          </div>
        ) : (
          <div className="pieChartLegend">
            <IgrItemLegend ref={this.onPieChartLegendRef} />
          </div>
        )}
      </Panel>
    );

    let sidePanel = (
      <PanelWithTwoButtons
        headerText={'Chart Settings'}
        firstButton={closeChartSettingsButton}
        secondButton={setDefaultsButton}
        variant="primary"
      >
        <PanelWithButton
          variant="default"
          headerText={'General'}
          button={showGeneralPropertiesButton}
          style={{ marginTop: '2px' }}
        >
          {this.state.IsGeneralMinimised == false && (
            <FormLayout columns={COLS}>
              <FormRow
                label={
                  <Checkbox
                    style={{ fontSize: 'small', marginBottom: '0px', marginTop: '0px' }}
                    onChange={(checked: boolean) => this.onPieOrDoughnutViewChanged(checked)}
                    checked={this.state.ChartProperties.ShowAsDoughnut}
                  >
                    Show as 'Doughnut'
                  </Checkbox>
                }
              ></FormRow>

              <FormRow label="Others Band">
                <Flex alignItems="row">
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    placeholder={'Input'}
                    onChange={this.onOthersCategoryThresholdChanged}
                    value={this.state.ChartProperties.OthersCategoryThreshold}
                  />

                  <AdaptablePopover
                    headerText={'Pie Chart: Others Threshold'}
                    bodyText={[
                      'Items with value less than or equal to the Threshold will be assigned to the “Others” category.  Choose whether this will be interpreted as a percentage or as a value.',
                    ]}
                  />
                </Flex>
              </FormRow>

              <FormRow
                label={
                  <Checkbox
                    onChange={(checked: boolean) => this.onThresholdAsPercentChanged(checked)}
                    checked={
                      this.state.ChartProperties.OthersCategoryType == OthersCategoryType.Percent
                    }
                  >
                    Others Band As %
                  </Checkbox>
                }
              />

              <FormRow label="Labels Position">
                <Dropdown
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ChartProperties.PieChartLabelPosition}
                  onChange={x => this.onSliceLabelsPositionChanged(x)}
                  options={this.getOptionsForLabelsPosition()}
                ></Dropdown>
              </FormRow>
              <FormRow label="Labels Content">
                <Dropdown
                  placeholder="select"
                  showEmptyItem={false}
                  showClearButton={false}
                  value={this.state.ChartProperties.SliceLabelsMapping}
                  onChange={x => this.onSliceLabelsMappingChanged(x)}
                  options={this.getOptionsForSliceLabelsMapping()}
                ></Dropdown>
              </FormRow>
            </FormLayout>
          )}
        </PanelWithButton>

        {legendPanel}
      </PanelWithTwoButtons>
    );

    return this.props.ChartData != null ? (
      <ChartContainer
        button={!this.state.IsChartSettingsVisible ? openChartSettingsButton : null}
        chart={chartElement}
        title={chartTitle}
        settingsPanel={this.state.IsChartSettingsVisible ? sidePanel : null}
      />
    ) : null;
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
    this.setState({ IsGeneralMinimised: false } as PieChartComponentState);
  }

  onHidePropertiesGroup() {
    this.setState({ IsGeneralMinimised: true } as PieChartComponentState);
  }
  onShowChartSettings() {
    this.setState({ IsChartSettingsVisible: true } as PieChartComponentState);
  }

  onHideChartSettings() {
    this.setState({ IsChartSettingsVisible: false } as PieChartComponentState);
  }

  onSetPropertyDefaults() {
    // first update our state
    this.setState(PieChartUIHelper.setDefaultChartDisplayPopupState() as PieChartComponentState);
    // then update the properties
    let chartProperties: PieChartProperties = Helper.cloneObject(DefaultPieChartProperties);
    this.updateChartProperties(chartProperties);
  }

  private updateChartProperties(chartProperties: ChartProperties): void {
    this.setState({ ChartProperties: chartProperties } as PieChartComponentState);
    this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Uuid, chartProperties);
  }

  private onPieOrDoughnutViewChanged(checked: boolean) {
    let chartProperties: PieChartProperties = this.state.ChartProperties;
    chartProperties.ShowAsDoughnut = checked;
    this.updateChartProperties(chartProperties);
  }

  private onOthersCategoryThresholdChanged = (e: any) => {
    let chartProperties: PieChartProperties = this.state.ChartProperties;
    chartProperties.OthersCategoryThreshold = e.target.value;
    this.updateChartProperties(chartProperties);
  };

  private onThresholdAsPercentChanged(checked: boolean) {
    let chartProperties: PieChartProperties = this.state.ChartProperties;
    chartProperties.OthersCategoryType = checked
      ? OthersCategoryType.Percent
      : OthersCategoryType.Number;
    this.updateChartProperties(chartProperties);
  }

  private onSliceLabelsPositionChanged(value: PieChartLabelPosition) {
    let chartProperties: PieChartProperties = this.state.ChartProperties;
    chartProperties.PieChartLabelPosition = value;
    this.updateChartProperties(chartProperties);
  }

  onSliceLabelsMappingChanged(labelMapping: SliceLabelOption) {
    let legendMapping: SliceLabelOption = labelMapping.includes('Ratio')
      ? SliceLabelOption.RatioAndName
      : SliceLabelOption.ValueAndName;

    let chartProperties: PieChartProperties = this.state.ChartProperties;
    chartProperties.SliceLabelsMapping = labelMapping;
    chartProperties.SliceLegendMapping = legendMapping;
    this.updateChartProperties(chartProperties);
  }

  onSliceSortByColumnChanged(sliceSortOption: SliceSortOption) {
    let oldData: PieChartDataItem[] = this.state.DataSource;
    let newData: PieChartDataItem[] = PieChartUIHelper.sortDataSource(sliceSortOption, oldData);
    this.setState({
      SliceSortOption: sliceSortOption,
      DataSource: newData,
    } as PieChartComponentState);
  }

  onSliceClick(e: SliceClickEventArgs): void {
    //    console.log("onSliceClick " + e);
    e.isExploded = !e.isExploded;
    e.isSelected = !e.isSelected;
    if (e.isExploded) {
      //    this.setState({ CurrentColumnCount: ds.Value, CurrentColumnValue: ds.Name } as PieChartComponentState);
    } else {
      //    this.setState({ CurrentColumnCount: 0, CurrentColumnValue: '' } as PieChartComponentState);
    }
  }

  // want to move to helper - not sure why i cannot
  getOptionsForLabelsPosition(): { label: string; value: string }[] {
    return EnumExtensions.getNames(PieChartLabelPosition).map(v => {
      return { value: v, label: v };
    });
  }

  getOptionsForSliceLabelsMapping(): { label: string; value: string }[] {
    return EnumExtensions.getNames(SliceLabelOption).map(v => {
      return { value: v, label: v };
    });
  }

  getOptionsForSliceSortOrders(): { label: string; value: string }[] {
    return EnumExtensions.getNames(SliceSortOption).map(v => {
      return { value: v, label: v };
    });
  }
}
