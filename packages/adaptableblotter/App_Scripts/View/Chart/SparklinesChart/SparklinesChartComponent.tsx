import * as React from 'react';

import { ButtonClose } from '../../Components/Buttons/ButtonClose';

import { Helper } from '../../../Utilities/Helpers/Helper';

import { ButtonGeneral } from '../../Components/Buttons/ButtonGeneral';
import { DefaultSparklinesChartProperties } from '../../../Utilities/Defaults/DefaultSparklinesChartProperties';
import { PanelWithTwoButtons } from '../../Components/Panels/PanelWithTwoButtons';
import {
  SparklinesChartDefinition,
  SparklinesChartProperties,
  ChartProperties,
  ChartData,
} from '../../../PredefinedConfig/RunTimeState/ChartState';
import { SparklinesChartUIHelper } from './SparklinesChartUIHelper';
import { SparklinesChartComponentState } from './SparklinesChartComponentState';

import ChartContainer from '../../../components/ChartContainer';
import SparklineChart from '../../../components/SparklineChart';
import { SparklineTypeEnum } from '../../../PredefinedConfig/DesignTimeState/SparklineColumnState';

/*
This is really only going to be for Category Charts.
As we add other chart types we will need to rethink this and some of the assumptions
*/
interface SparklinesChartComponentProps {
  CurrentChartDefinition: SparklinesChartDefinition;
  ChartData: ChartData;
  onUpdateChartProperties: (chartUuid: string, chartProperties: ChartProperties) => void;
}

const defaultButtonProps = {
  variant: 'text' as 'text',
};
export class SparklinesChartComponent extends React.Component<
  SparklinesChartComponentProps,
  SparklinesChartComponentState
> {
  public seriesColors: Map<string, string> = new Map<string, string>();

  constructor(props: SparklinesChartComponentProps) {
    super(props);

    this.state = SparklinesChartUIHelper.setChartDisplayPopupState(this.props
      .CurrentChartDefinition as SparklinesChartDefinition);
  }

  UNSAFE_componentWillReceiveProps(nextProps: SparklinesChartComponentProps, nextContext: any) {
    if (nextProps.CurrentChartDefinition.Name != this.props.CurrentChartDefinition.Name) {
      this.setState(SparklinesChartUIHelper.setChartDisplayPopupState(
        nextProps.CurrentChartDefinition as SparklinesChartDefinition
      ) as SparklinesChartComponentState);
    }
  }

  render() {
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
      <SparklineChart
        // data source
        values={this.props.ChartData.Data}
        // chart type
        type={this.state.ChartProperties.DisplayType}
        // titles (titles, alignment and margins)
        // chartTitle={this.props.CurrentChartDefinition.Name}
        // subtitle={this.props.CurrentChartDefinition.Description}
      />
    );

    const settingsPanel = (
      <PanelWithTwoButtons
        marginBottom={2}
        headerText={'Chart Settings'}
        variant="primary"
        firstButton={closeChartSettingsButton}
        secondButton={setDefaultsButton}
      ></PanelWithTwoButtons>
    );

    return this.props.ChartData.Data != null ? (
      <ChartContainer
        flexDirection={'column-reverse'}
        sizeAsString={false}
        button={!this.state.IsChartSettingsVisible ? openChartSettingsButton : null}
        chart={chartElement}
        settingsPanel={this.state.IsChartSettingsVisible ? settingsPanel : null}
      />
    ) : null;
  }

  onSetPropertyDefaults() {
    // this overrides what has been set in predefined config with defaults - is that right?
    // or should it just override what has been changed ?
    // first update our state
    // this.setState(
    //   SparklinesChartUIHelper.setChartDisplayPopupState() as SparklinesChartComponentState
    // );
    // then update the properties
    let chartProperties: SparklinesChartProperties = Helper.cloneObject(
      DefaultSparklinesChartProperties
    );
    this.updateChartProperties(chartProperties);
  }

  onShowChartSettings() {
    this.setState({ IsChartSettingsVisible: true } as SparklinesChartComponentState);
  }

  onHideChartSettings() {
    this.setState({ IsChartSettingsVisible: false } as SparklinesChartComponentState);
  }

  onChartTypeChange(value: SparklineTypeEnum) {
    let chartProperties: SparklinesChartProperties = this.state.ChartProperties;
    chartProperties.DisplayType = value as SparklineTypeEnum;
    this.updateChartProperties(chartProperties);
  }

  private updateChartProperties(chartProperties: SparklinesChartProperties): void {
    this.setState({ ChartProperties: chartProperties } as SparklinesChartComponentState);
    this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Uuid, chartProperties);
  }
}
