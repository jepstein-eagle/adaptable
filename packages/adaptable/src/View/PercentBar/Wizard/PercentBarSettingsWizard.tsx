import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';

import { AdaptablePopover } from '../../AdaptablePopover';

import { PercentBar } from '../../../PredefinedConfig/PercentBarState';
import { ColorPicker } from '../../ColorPicker';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Checkbox from '../../../components/CheckBox';
import { Flex, Text, Box } from 'rebass';

export interface PercentBarSettingsWizardProps extends AdaptableWizardStepProps<PercentBar> {
  ColorPalette: Array<string>;
}
export interface PercentBarSettingsWizardState {
  PositiveColor: string;
  NegativeColor: string;
  ShowValue: boolean;
  ShowTooltip: boolean;
}

export class PercentBarSettingsWizard
  extends React.Component<PercentBarSettingsWizardProps, PercentBarSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: PercentBarSettingsWizardProps) {
    super(props);
    this.state = {
      PositiveColor: this.props.Data.PositiveColor,
      NegativeColor: this.props.Data.NegativeColor,
      ShowValue: this.props.Data.ShowValue,
      ShowTooltip: this.props.Data.ShowToolTip,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Positive Colour:
          </Text>
          <Flex flex={3}>
            <ColorPicker
              ColorPalette={this.props.ColorPalette}
              value={this.state.PositiveColor}
              onChange={x => this.onPositiveColorSelectChanged(x)}
            />
          </Flex>
        </Flex>

        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Negative Colour:
          </Text>

          <Flex flex={3}>
            <ColorPicker
              ColorPalette={this.props.ColorPalette}
              value={this.state.NegativeColor}
              onChange={x => this.onNegativeColorSelectChanged(x)}
            />
          </Flex>
        </Flex>

        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Show Cell Value:
          </Text>

          <Flex flex={3} alignItems="center" flexDirection="row">
            <Checkbox
              marginLeft={2}
              marginRight={2}
              onChange={(checked: boolean) => this.onShowValueChanged(checked)}
              checked={this.state.ShowValue}
            />

            <AdaptablePopover
              headerText={'Percent Bar: Show Value'}
              bodyText={['Whether to show additionally the value of the cell in the bar.']}
            />
          </Flex>
        </Flex>

        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Show Tooltip:
          </Text>
          <Flex flex={3} alignItems="center" flexDirection="row">
            <Checkbox
              marginLeft={2}
              marginRight={2}
              onChange={(checked: boolean) => this.onShowTooltipChanged(checked)}
              checked={this.state.ShowTooltip}
            />

            <AdaptablePopover
              headerText={'Percent Bar: Show Tooltip'}
              bodyText={[
                'Whether to display a tooltip that shows the value of the cell when you hover in the Column.',
              ]}
            />
          </Flex>
        </Flex>
      </WizardPanel>
    );
  }

  private onPositiveColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ PositiveColor: e.value } as PercentBarSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onNegativeColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ NegativeColor: e.value } as PercentBarSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onShowValueChanged(checked: boolean) {
    this.setState({ ShowValue: checked } as PercentBarSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onShowTooltipChanged(checked: boolean) {
    this.setState({ ShowTooltip: checked } as PercentBarSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (
      StringExtensions.IsNullOrEmpty(this.state.PositiveColor) ||
      StringExtensions.IsNullOrEmpty(this.state.NegativeColor)
    ) {
      return false;
    }
    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.PositiveColor = this.state.PositiveColor;
    this.props.Data.NegativeColor = this.state.NegativeColor;
    this.props.Data.ShowValue = this.state.ShowValue;
    this.props.Data.ShowToolTip = this.state.ShowTooltip;
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
