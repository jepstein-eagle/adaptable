import * as React from 'react';

import { ButtonClose } from '../../Components/Buttons/ButtonClose';

import { Helper } from '../../../Utilities/Helpers/Helper';

import { ButtonGeneral } from '../../Components/Buttons/ButtonGeneral';
import { DefaultSparklinesChartProperties } from '../../../Utilities/Defaults/DefaultSparklinesChartProperties';
import { PanelWithTwoButtons } from '../../Components/Panels/PanelWithTwoButtons';
import {
  SparklinesChartDefinition,
  ChartProperties,
  ChartData,
  SparklineChartProperties,
} from '../../../PredefinedConfig/RunTimeState/ChartState';
import { SparklinesChartUIHelper } from './SparklinesChartUIHelper';
import { SparklinesChartComponentState } from './SparklinesChartComponentState';

import ChartContainer from '../../../components/ChartContainer';
import SparklineChart from '../../../components/SparklineChart';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import Radio from '../../../components/Radio';
import Input from '../../../components/Input';
import CheckBox from '../../../components/CheckBox';
import { SparklineTypeEnum } from '../../../PredefinedConfig/Common/ChartEnums';

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
        min={
          this.state.ChartProperties.UseMinStaticValue
            ? this.state.ChartProperties.Minimum
            : undefined
        }
        max={
          this.state.ChartProperties.UseMaxStaticValue
            ? this.state.ChartProperties.Maximum
            : undefined
        }
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
      >
        <FormLayout>
          <FormRow label={<b>Sparkline Type</b>}>
            <Radio
              checked={this.state.ChartProperties.DisplayType === SparklineTypeEnum.Line}
              onChange={checked => {
                this.updateChartProperties({
                  DisplayType: checked ? SparklineTypeEnum.Line : SparklineTypeEnum.Column,
                });
              }}
            >
              Line
            </Radio>
            <Radio
              marginLeft={2}
              checked={this.state.ChartProperties.DisplayType === SparklineTypeEnum.Column}
              onChange={checked => {
                this.updateChartProperties({
                  DisplayType: checked ? SparklineTypeEnum.Column : SparklineTypeEnum.Line,
                });
              }}
            >
              Column
            </Radio>
            <Radio
              marginLeft={2}
              checked={this.state.ChartProperties.DisplayType === SparklineTypeEnum.Area}
              onChange={checked => {
                this.updateChartProperties({
                  DisplayType: checked ? SparklineTypeEnum.Area : SparklineTypeEnum.Line,
                });
              }}
            >
              Area
            </Radio>
          </FormRow>
          <FormRow label={<b>Minimum Value</b>}>
            <>
              <CheckBox
                checked={this.state.ChartProperties.UseMinStaticValue}
                marginRight={2}
                onChange={UseMinStaticValue => this.updateChartProperties({ UseMinStaticValue })}
              >
                Use static minimum value
              </CheckBox>
              {this.state.ChartProperties.UseMinStaticValue ? (
                <Input
                  type={'number'}
                  style={{ width: '10rem' }}
                  placeholder="Min Value"
                  onChange={(e: any) => this.onMinMaxValueChange('Minimum', Number(e.target.value))}
                  value={this.state.ChartProperties.Minimum}
                />
              ) : null}
            </>
          </FormRow>

          <FormRow label={<b>Maximum Value</b>}>
            <>
              <CheckBox
                checked={this.state.ChartProperties.UseMaxStaticValue}
                marginRight={2}
                onChange={UseMaxStaticValue => this.updateChartProperties({ UseMaxStaticValue })}
              >
                Use static maximum value
              </CheckBox>
              {this.state.ChartProperties.UseMaxStaticValue ? (
                <Input
                  type={'number'}
                  style={{ width: '10rem' }}
                  placeholder="Min Value"
                  onChange={(e: any) => this.onMinMaxValueChange('Maximum', Number(e.target.value))}
                  value={this.state.ChartProperties.Maximum}
                />
              ) : null}
            </>
          </FormRow>
        </FormLayout>
      </PanelWithTwoButtons>
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

  onMinMaxValueChange = (minOrMax: 'Minimum' | 'Maximum', value: number) => {
    if (isNaN(value)) {
      value = undefined;
    }

    this.updateChartProperties({
      [minOrMax]: value,
    });
  };

  onSetPropertyDefaults() {
    let chartProperties: SparklineChartProperties = Helper.cloneObject(
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

  updateChartProperties(chartProperties: Partial<SparklineChartProperties>): void {
    this.setState({
      ChartProperties: { ...this.state.ChartProperties, ...chartProperties },
    } as SparklinesChartComponentState);
    this.props.onUpdateChartProperties(this.props.CurrentChartDefinition.Uuid, chartProperties);
  }
}
