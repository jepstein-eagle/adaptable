import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Panel from '../../../components/Panel';
import Radio from '../../../components/Radio';
import Input from '../../../components/Input';
import { SparklineColumn } from '../../../PredefinedConfig/DesignTimeState/SparklineColumnState';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import Dropdown, { DropdownProps } from '../../../components/Dropdown';
import CheckBox from '../../../components/CheckBox';
import { ColorPicker } from '../../ColorPicker';
import { DefaultSparklinesChartProperties } from '../../../Utilities/Defaults/DefaultSparklinesChartProperties';
import { SparklineTypeEnum } from '../../../PredefinedConfig/Common/ChartEnums';

export interface SparklinesColumnSettingsWizardProps
  extends AdaptableWizardStepProps<SparklineColumn> {
  ColorPalette: string[];
}

export interface SparklinesColumnSettingsWizardState {
  MinimumValue: number;
  MaximumValue: number;
  SparklineType: SparklineTypeEnum;

  UseMinStaticValue: boolean;
  UseMaxStaticValue: boolean;
  UseMinCurrentValue: boolean;
  UseMaxCurrentValue: boolean;
  ShowToolTip: boolean;

  LineColor: string;
}

export const SparklineTypeDropdown = ({
  value,
  onChange,
  ...props
}: {
  value: SparklineTypeEnum;
  onChange: (sparklineType: SparklineTypeEnum) => void;
} & Partial<Exclude<DropdownProps, 'value' | 'onChange'>>) => {
  return (
    <Dropdown
      {...props}
      value={value}
      placeholder="Select sparkline type"
      showClearButton={false}
      showEmptyItem={false}
      onChange={onChange}
      options={[
        {
          label: SparklineTypeEnum.Line,
          value: SparklineTypeEnum.Line,
        },
        {
          label: SparklineTypeEnum.Column,
          value: SparklineTypeEnum.Column,
        },
        {
          label: SparklineTypeEnum.Area,
          value: SparklineTypeEnum.Area,
        },
      ]}
    />
  );
};

export class SparklinesColumnSettingsWizard
  extends React.Component<SparklinesColumnSettingsWizardProps, SparklinesColumnSettingsWizardState>
  implements AdaptableWizardStep {
  private _prefix: string;
  constructor(props: SparklinesColumnSettingsWizardProps) {
    super(props);
    this._prefix = `${Date.now()}`;
    this.state = {
      MinimumValue: this.props.Data!.MinimumValue,
      MaximumValue: this.props.Data!.MaximumValue,
      SparklineType:
        (this.props.Data!.SparklineType as SparklineTypeEnum) || SparklineTypeEnum.Line,
      UseMinStaticValue: this.props.Data!.MinimumValue != null,
      UseMinCurrentValue: this.props.Data!.MinimumValue == null,
      UseMaxStaticValue: this.props.Data!.MaximumValue != null,
      UseMaxCurrentValue: this.props.Data!.MaximumValue == null,
      ShowToolTip: this.props.Data!.ShowToolTip,

      LineColor: this.props.Data!.LineColor
        ? this.props.Data!.LineColor
        : DefaultSparklinesChartProperties.Brush,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <FormLayout>
          <FormRow label="Sparkline type">
            <SparklineTypeDropdown
              value={this.state.SparklineType}
              onChange={this.onSparklineTypeChange}
            />
          </FormRow>
        </FormLayout>
        <Panel header={'Minimum Value'} marginTop={2}>
          <FormLayout columns={[1, 2, 3]} sizes={['auto', 'auto', '1fr']}>
            <FormRow>
              <Radio
                id={`${this._prefix}_min_cell_value`}
                marginRight={2}
                value="current"
                checked={this.state.UseMinCurrentValue}
                onChange={(_, e: any) => this.onUseMinChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_min_cell_value`}>
                Use current cell minimum value
              </label>
            </FormRow>
            <FormRow>
              <Radio
                id={`${this._prefix}_min_value`}
                marginRight={2}
                value="value"
                checked={this.state.UseMinStaticValue}
                onChange={(_, e: any) => this.onUseMinChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_min_value`}>Use static value</label>
              {this.state.UseMinStaticValue ? (
                <Input
                  type="number"
                  placeholder="Enter Number"
                  disabled={this.state.UseMinCurrentValue}
                  onChange={this.onMinValueChanged}
                  value={this.state.UseMinCurrentValue ? '' : this.state.MinimumValue}
                />
              ) : null}
            </FormRow>
          </FormLayout>
        </Panel>
        <Panel header="Maximum Value" marginTop={2}>
          <FormLayout columns={[1, 2, 3]} sizes={['auto', 'auto', '1fr']}>
            <FormRow>
              <Radio
                id={`${this._prefix}_max_cell_value`}
                marginRight={2}
                value="current"
                checked={this.state.UseMaxCurrentValue}
                onChange={(_, e: any) => this.onUseMaxChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_max_cell_value`}>
                Use current cell maximum value
              </label>
            </FormRow>
            <FormRow>
              <Radio
                marginRight={2}
                id={`${this._prefix}_max_value`}
                value="value"
                checked={this.state.UseMaxStaticValue}
                onChange={(_, e: any) => this.onUseMaxChanged(e)}
              ></Radio>
              <label htmlFor={`${this._prefix}_max_value`}>Use static value</label>
              {this.state.UseMaxStaticValue ? (
                <Input
                  type="number"
                  placeholder="Enter Number"
                  disabled={this.state.UseMaxCurrentValue}
                  onChange={this.onMaxValueChanged}
                  value={this.state.UseMaxCurrentValue ? '' : this.state.MaximumValue}
                />
              ) : null}
            </FormRow>
          </FormLayout>
        </Panel>
        <Panel header="Colous" marginTop={2}>
          <FormLayout columns={[1, 2, 3]} sizes={['auto', 'auto', '1fr']}>
            <FormRow>
              <label htmlFor={`${this._prefix}_brush`}>Line Color</label>
              <ColorPicker
                id={`${this._prefix}_brush`}
                ColorPalette={this.props.ColorPalette}
                value={this.state.LineColor}
                onChange={x => this.onBrushColorChange(x)}
              />
            </FormRow>
          </FormLayout>
        </Panel>
        <Panel header="Tooltip" marginTop={2}>
          <FormLayout columns={[1, 2, 3]} sizes={['auto', 'auto', '1fr']}>
            <FormRow>
              <CheckBox
                id={`${this._prefix}_show_tooltip`}
                marginRight={2}
                value="current"
                checked={this.state.ShowToolTip}
                onChange={(checked: boolean) => this.onShowTooltipChanged(checked)}
              ></CheckBox>
              <label htmlFor={`${this._prefix}_show_tooltip`}>Show Tool Tip</label>
            </FormRow>
          </FormLayout>
        </Panel>
      </WizardPanel>
    );
  }

  private onUseMinChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    const UseMinCurrentValue = e.value == 'current';

    const UseMinStaticValue = e.value == 'value';

    this.setState(
      {
        UseMinCurrentValue,

        UseMinStaticValue,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  private onSparklineTypeChange = (SparklineType: SparklineTypeEnum) => {
    this.setState({ SparklineType }, () => this.props.UpdateGoBackState());
  };

  private onBrushColorChange(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ LineColor: e.value }, () => this.props.UpdateGoBackState());
  }

  private onShowTooltipChanged(checked: boolean) {
    this.setState({ ShowToolTip: checked }, () => this.props.UpdateGoBackState());
  }

  private onUseMaxChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    const UseMaxCurrentValue = e.value == 'current';

    const UseMaxStaticValue = e.value == 'value';

    this.setState(
      {
        UseMaxCurrentValue,

        UseMaxStaticValue,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  private onMinValueChanged = (e: any) => {
    let value = e.target.value;
    if (!isNaN(Number(value))) {
      value = Number(value);
    }
    this.setState({ MinimumValue: value } as SparklinesColumnSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onMaxValueChanged = (e: any) => {
    let value = e.target.value;
    if (!isNaN(Number(value))) {
      value = Number(value);
    }

    this.setState({ MaximumValue: value } as SparklinesColumnSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data!.ColumnId)) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data!.SparklineType = this.state.SparklineType;
    this.props.Data!.MinimumValue = this.state.UseMinCurrentValue
      ? undefined
      : this.state.MinimumValue;

    this.props.Data!.MaximumValue = this.state.UseMaxCurrentValue
      ? undefined
      : this.state.MaximumValue;
    this.props.Data!.LineColor = this.state.LineColor;
    this.props.Data!.ShowToolTip = this.state.ShowToolTip;
  }

  public Back(): void {
    //todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
