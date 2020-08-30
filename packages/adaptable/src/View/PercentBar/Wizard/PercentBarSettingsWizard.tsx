import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
import { ColorPicker } from '../../ColorPicker';
import Checkbox from '../../../components/CheckBox';
import Panel from '../../../components/Panel';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import { getHexForName, GRAY } from '../../UIHelper';
import { Flex } from 'rebass';

export interface PercentBarSettingsWizardProps extends AdaptableWizardStepProps<PercentBar> {}

export interface PercentBarSettingsWizardState {
  ShowValue: PercentBar['ShowValue'];
  ShowToolTip: PercentBar['ShowToolTip'];
  DisplayRawValue: PercentBar['DisplayRawValue'];
  DisplayPercentageValue: PercentBar['DisplayPercentageValue'];
  BackColor: PercentBar['BackColor'];
}

export class PercentBarSettingsWizard
  extends React.Component<PercentBarSettingsWizardProps, PercentBarSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarSettingsWizardProps) {
    super(props);
    this.state = {
      ShowValue: this.props.data.ShowValue,
      ShowToolTip: this.props.data.ShowToolTip,
      DisplayRawValue: this.props.data.DisplayRawValue,
      DisplayPercentageValue: this.props.data.DisplayPercentageValue,
      BackColor: this.props.data.BackColor,
    };
  }

  render(): any {
    return (
      <Panel header={'Settings'} margin={2}>
        <FormLayout>
          <FormRow label="Value to Show: ">
            <Checkbox
              checked={this.state.DisplayRawValue}
              onChange={checked => this.setState({ DisplayRawValue: checked })}
              mr={2}
            >
              Cell Value
            </Checkbox>
            <Checkbox
              checked={this.state.DisplayPercentageValue}
              onChange={checked => this.setState({ DisplayPercentageValue: checked })}
              mr={2}
            >
              Percentage Value
            </Checkbox>
          </FormRow>
          <FormRow label="Show: ">
            <Checkbox
              checked={this.state.ShowValue}
              onChange={checked => this.setState({ ShowValue: checked })}
              mr={2}
            >
              Value In Cell
            </Checkbox>
            <Checkbox
              checked={this.state.ShowToolTip}
              onChange={checked => this.setState({ ShowToolTip: checked })}
              mr={2}
            >
              Tooltip
            </Checkbox>
          </FormRow>
          <FormRow label="Back Color">
            <Flex alignItems="center">
              <Checkbox
                checked={!!this.state.BackColor}
                onChange={checked =>
                  this.setState({ BackColor: checked ? getHexForName(GRAY) : undefined })
                }
                mr={2}
              ></Checkbox>
              {this.state.BackColor !== undefined && (
                <ColorPicker
                  Api={this.props.api}
                  value={this.state.BackColor}
                  onChange={(event: React.FormEvent) => {
                    const { value } = event.target as HTMLInputElement;
                    this.setState({ BackColor: value });
                  }}
                />
              )}
            </Flex>
          </FormRow>
        </FormLayout>
      </Panel>
    );
  }

  public canNext(): boolean {
    return true;
  }

  public canBack(): boolean {
    return true;
  }

  public next(): void {
    this.props.data.ShowValue = this.state.ShowValue;
    this.props.data.ShowToolTip = this.state.ShowToolTip;
    this.props.data.DisplayRawValue = this.state.DisplayRawValue;
    this.props.data.DisplayPercentageValue = this.state.DisplayPercentageValue;
    this.props.data.BackColor = this.state.BackColor;
  }

  public back(): void {
    //todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
