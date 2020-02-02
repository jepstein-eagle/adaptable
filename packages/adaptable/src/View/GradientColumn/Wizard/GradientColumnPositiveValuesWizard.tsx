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

export interface GradientColumnPositiveValuesWizardProps
  extends AdaptableWizardStepProps<GradientColumn> {
  ColorPalette: Array<string>;
}

export interface GradientColumnPositiveValuesWizardState {
  PositiveValue: number;
  PositiveColor: string;
}

export class GradientColumnPositiveValuesWizard
  extends React.Component<
    GradientColumnPositiveValuesWizardProps,
    GradientColumnPositiveValuesWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: GradientColumnPositiveValuesWizardProps) {
    super(props);
    this.state = {
      PositiveValue: this.props.Data.PositiveValue,
      PositiveColor: this.props.Data.PositiveColor,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Panel header="Positive Value and Colour" marginTop={2}>
          <HelpBlock marginBottom={1}>
            Set the Maximum Positive value for the Gradient Column.
          </HelpBlock>{' '}
          <Flex flexDirection="row" alignItems="left" marginTop={2}>
            <Text marginRight={2} marginTop={1}>
              Maximum Positive Value:
            </Text>{' '}
            <Input
              type="number"
              placeholder="Enter Number"
              onChange={this.onPositiveValueChanged}
              value={this.state.PositiveValue}
            />
          </Flex>
          <HelpBlock marginTop={3}>
            Select a Colour - the closer the cell value is to Maximum Positive value, the closer it
            will be to the Colour set here.
          </HelpBlock>{' '}
          <Flex flexDirection="row" alignItems="left" marginTop={3}>
            <Text marginRight={2}>Positive Colour:</Text>{' '}
            <ColorPicker
              ColorPalette={this.props.ColorPalette}
              value={this.state.PositiveColor}
              onChange={x => this.onPositiveColorSelectChanged(x)}
            />
          </Flex>
        </Panel>{' '}
      </WizardPanel>
    );
  }

  private onPositiveValueChanged = (e: any) => {
    this.setState(
      { PositiveValue: e.target.value } as GradientColumnPositiveValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  };

  private onPositiveColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ PositiveColor: e.value } as GradientColumnPositiveValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
      return false;
    }

    if (StringExtensions.IsNullOrEmpty(this.state.PositiveColor) && this.state.PositiveValue) {
      return false;
    }

    // if a positive value is set they need a positive colour
    if (this.state.PositiveValue && StringExtensions.IsNullOrEmpty(this.state.PositiveColor)) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.PositiveValue = this.state.PositiveValue;

    this.props.Data.PositiveColor = this.state.PositiveValue ? this.state.PositiveColor : undefined;
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
