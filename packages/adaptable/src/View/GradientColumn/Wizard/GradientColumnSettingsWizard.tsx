import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Panel from '../../../components/Panel';
import { Flex, Text } from 'rebass';
import Input from '../../../components/Input';
import HelpBlock from '../../../components/HelpBlock';
import { ColorPicker } from '../../ColorPicker';
import { GradientColumnPositiveValuesWizardState } from './GradientColumnPositiveValuesWizard';
import { GradientColumnNegativeValuesWizardState } from './GradientColumnNegativeValuesWizard';

export interface GradientColumnSettingsWizardProps
  extends AdaptableWizardStepProps<GradientColumn> {}

export interface GradientColumnSettingsWizardState {
  BaseValue: number;
  PositiveValue: number;
  PositiveColor: string;
  NegativeValue: number;
  NegativeColor: string;
}

export class GradientColumnSettingsWizard
  extends React.Component<GradientColumnSettingsWizardProps, GradientColumnSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: GradientColumnSettingsWizardProps) {
    super(props);
    this.state = {
      BaseValue: this.props.data.BaseValue,
      PositiveValue: this.props.data.PositiveValue,
      PositiveColor: this.props.data.PositiveColor,
      NegativeValue: this.props.data.NegativeValue,
      NegativeColor: this.props.data.NegativeColor,
    };
  }

  render(): any {
    return (
      <div>
        <WizardPanel>
          <Panel header="Base Value" marginTop={2}>
            <HelpBlock marginBottom={1}>
              Set the 'start value' for the Gradient Column. The closer the cell value is to this
              value the 'whiter' it will be.
            </HelpBlock>{' '}
            <Flex flexDirection="row" alignItems="center" marginTop={2}>
              <Flex flex={7} alignItems="center">
                <Input
                  type="number"
                  placeholder="Enter Number"
                  onChange={this.onBaseValueChanged}
                  value={this.state.BaseValue}
                />
              </Flex>
            </Flex>
          </Panel>{' '}
          <Panel header="Positive Value and Colour" marginTop={2}>
            <HelpBlock marginBottom={1}>
              Set the Maximum Positive value and associated Colour.
            </HelpBlock>{' '}
            <Flex flexDirection="row" alignItems="left" marginTop={3}>
              <Text marginRight={2} marginTop={1}>
                Maximum Positive Value:
              </Text>{' '}
              <Input
                type="number"
                placeholder="Enter Number"
                onChange={this.onPositiveValueChanged}
                value={this.state.PositiveValue}
              />
              <Text textAlign="end" marginRight={2} marginLeft={4} marginTop={1}>
                Positive Colour:
              </Text>{' '}
              <ColorPicker
                api={this.props.api}
                value={this.state.PositiveColor}
                onChange={(x: any) => this.onPositiveColorSelectChanged(x)}
              />
            </Flex>
          </Panel>{' '}
          <Panel header={'Negative Value and Colour'} marginTop={2}>
            <HelpBlock marginBottom={1}>
              Set the Maximum Negative value and associated Colour (only reqd. if column has
              negative values).
            </HelpBlock>{' '}
            <Flex flexDirection="row" alignItems="left" marginTop={3}>
              <Text marginRight={2} marginTop={1}>
                Maximum Negative Value:
              </Text>{' '}
              <Input
                type="number"
                placeholder="Enter Number"
                onChange={this.onNegativeValueChanged}
                value={this.state.NegativeValue}
              />
              <Text textAlign="end" marginRight={2} marginLeft={4} marginTop={1}>
                Negative Colour:
              </Text>
              <Flex flex={3}>
                <ColorPicker
                  api={this.props.api}
                  value={this.state.NegativeColor}
                  onChange={(x: any) => this.onNegativeColorSelectChanged(x)}
                />
              </Flex>
            </Flex>
          </Panel>
        </WizardPanel>
      </div>
    );
  }

  private onBaseValueChanged = (e: any) => {
    this.setState({ BaseValue: e.target.value } as GradientColumnSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  };

  private onPositiveValueChanged = (e: any) => {
    this.setState(
      { PositiveValue: e.target.value } as GradientColumnPositiveValuesWizardState,
      () => this.props.updateGoBackState()
    );
  };

  private onPositiveColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ PositiveColor: e.value } as GradientColumnPositiveValuesWizardState, () =>
      this.props.updateGoBackState()
    );
  }
  private onNegativeValueChanged = (e: any) => {
    this.setState(
      { NegativeValue: e.target.value } as GradientColumnNegativeValuesWizardState,
      () => this.props.updateGoBackState()
    );
  };

  private onNegativeColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ NegativeColor: e.value } as GradientColumnNegativeValuesWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.data.ColumnId)) {
      return false;
    }

    if (StringExtensions.IsNullOrEmpty(this.props.data.ColumnId)) {
      return false;
    }

    if (StringExtensions.IsNullOrEmpty(this.state.PositiveColor) && this.state.PositiveValue) {
      return false;
    }

    // if a positive value is set they need a positive colour
    if (this.state.PositiveValue && StringExtensions.IsNullOrEmpty(this.state.PositiveColor)) {
      return false;
    }
    if (StringExtensions.IsNullOrEmpty(this.props.data.ColumnId)) {
      return false;
    }

    if (StringExtensions.IsNullOrEmpty(this.state.NegativeColor) && this.state.NegativeValue) {
      return false;
    }

    // if a negative value is set they need a negative colour
    if (this.state.NegativeValue && StringExtensions.IsNullOrEmpty(this.state.NegativeColor)) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data.BaseValue = this.state.BaseValue;
    this.props.data.PositiveValue = this.state.PositiveValue;

    this.props.data.PositiveColor = this.state.PositiveColor;
    this.props.data.NegativeValue = this.state.NegativeValue;
    this.props.data.NegativeColor = this.state.NegativeColor;
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
