import * as React from 'react';
import { AdaptableColumn } from '../../../PredefinedConfig/Common/AdaptableColumn';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { SelectionMode } from '../../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';

import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { ColumnSelector } from '../../Components/Selectors/ColumnSelector';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Panel from '../../../components/Panel';
import Radio from '../../../components/Radio';
import { Flex, Text, Box } from 'rebass';
import Input from '../../../components/Input';
import HelpBlock from '../../../components/HelpBlock';
import { ColorPicker } from '../../ColorPicker';

export interface GradientColumnValuesWizardProps extends AdaptableWizardStepProps<GradientColumn> {
  ColorPalette: Array<string>;
}

export interface GradientColumnValuesWizardState {
  NegativeValue: number;
  PositiveValue: number;
  BaseValue: number;
  PositiveColor: string;
  NegativeColor: string;
}

export class GradientColumnValuesWizard
  extends React.Component<GradientColumnValuesWizardProps, GradientColumnValuesWizardState>
  implements AdaptableWizardStep {
  constructor(props: GradientColumnValuesWizardProps) {
    super(props);
    this.state = {
      NegativeValue: this.props.Data.NegativeValue,
      PositiveValue: this.props.Data.PositiveValue,
      BaseValue: this.props.Data.BaseValue,
      PositiveColor: this.props.Data.PositiveColor,
      NegativeColor: this.props.Data.NegativeColor,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Panel header="Base Value" marginTop={2}>
          <HelpBlock marginBottom={1}>
            Set the 'start value' for the Gradient. The closer the cell value is to this value the
            'whiter' it will be.
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
            Set the Maximum Positive value and Colour for the Gradient. The closer the cell value is
            to Maximum Positive value, the closer it will be to the Colour you set.
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
          <Flex flexDirection="row" alignItems="left" marginTop={3}>
            <Text marginRight={2}>Positive Colour:</Text>{' '}
            <ColorPicker
              ColorPalette={this.props.ColorPalette}
              value={this.state.PositiveColor}
              onChange={x => this.onPositiveColorSelectChanged(x)}
            />
          </Flex>
        </Panel>{' '}
        <Panel header={'Max Negative Value'} marginTop={2}>
          <HelpBlock marginBottom={1}>
            Set the maximum negative value and colour for the Gradient. The closer the cell value is
            to maximum negative value, the closer it will be to the Colour you set.
          </HelpBlock>{' '}
          <Flex flexDirection="row" alignItems="left" marginTop={2}>
            <Text marginRight={2} marginTop={1}>
              Maximum Negative Value:
            </Text>{' '}
            <Input
              type="number"
              placeholder="Enter Number"
              onChange={this.onNegativeValueChanged}
              value={this.state.NegativeValue}
            />
          </Flex>
          <Flex flexDirection="row" alignItems="center" marginTop={3}>
            <Text textAlign="end" marginRight={2}>
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
        </Panel>
      </WizardPanel>
    );
  }

  private onNegativeValueChanged = (e: any) => {
    this.setState({ NegativeValue: e.target.value } as GradientColumnValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onPositiveValueChanged = (e: any) => {
    this.setState({ PositiveValue: e.target.value } as GradientColumnValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };
  private onBaseValueChanged = (e: any) => {
    this.setState({ BaseValue: e.target.value } as GradientColumnValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  private onPositiveColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ PositiveColor: e.value } as GradientColumnValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onNegativeColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ NegativeColor: e.value } as GradientColumnValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
      return false;
    }

    if (
      StringExtensions.IsNullOrEmpty(this.state.PositiveColor) &&
      StringExtensions.IsNullOrEmpty(this.state.NegativeColor)
    ) {
      return false;
    }

    if (!this.state.PositiveValue && !this.state.NegativeValue) {
      return false;
    }

    // if a positive value is set they need a positive colour
    if (this.state.PositiveValue && StringExtensions.IsNullOrEmpty(this.state.PositiveColor)) {
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
  public Next(): void {
    this.props.Data.NegativeValue = this.state.NegativeValue;
    this.props.Data.PositiveValue = this.state.PositiveValue;
    this.props.Data.PositiveColor = this.state.PositiveColor;
    this.props.Data.NegativeColor = this.state.NegativeColor;
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
