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

export interface GradientColumnNegativeValuesWizardProps
  extends AdaptableWizardStepProps<GradientColumn> {
  ColorPalette: Array<string>;
}

export interface GradientColumnNegativeValuesWizardState {
  NegativeValue: number;
  NegativeColor: string;
}

export class GradientColumnNegativeValuesWizard
  extends React.Component<
    GradientColumnNegativeValuesWizardProps,
    GradientColumnNegativeValuesWizardState
  >
  implements AdaptableWizardStep {
  constructor(props: GradientColumnNegativeValuesWizardProps) {
    super(props);
    this.state = {
      NegativeValue: this.props.Data.NegativeValue,
      NegativeColor: this.props.Data.NegativeColor,
    };
  }

  render(): any {
    return (
      <WizardPanel>
        <Panel header={'Negative Value and Colour'} marginTop={2}>
          <HelpBlock marginBottom={1}>
            Set the Maximum Negative value for the Gradient Column.
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
          <HelpBlock marginTop={3}>
            Select a Colour - the closer the cell value is to Maximum Negative value, the closer it
            will be to the Colour set here.
          </HelpBlock>{' '}
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
    this.setState(
      { NegativeValue: e.target.value } as GradientColumnNegativeValuesWizardState,
      () => this.props.UpdateGoBackState()
    );
  };

  private onNegativeColorSelectChanged(event: React.FormEvent<ColorPicker>) {
    let e = event.target as HTMLInputElement;
    this.setState({ NegativeColor: e.value } as GradientColumnNegativeValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
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
  public Next(): void {
    this.props.Data.NegativeValue = this.state.NegativeValue;
    this.props.Data.NegativeColor = this.state.NegativeValue ? this.state.NegativeColor : undefined;
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
