import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { GradientColumn } from '../../../PredefinedConfig/GradientColumnState';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import WizardPanel from '../../../components/WizardPanel';
import Panel from '../../../components/Panel';
import { Flex } from 'rebass';
import Input from '../../../components/Input';
import HelpBlock from '../../../components/HelpBlock';

export interface GradientColumnBaseValuesWizardProps
  extends AdaptableWizardStepProps<GradientColumn> {}

export interface GradientColumnBaseValuesWizardState {
  BaseValue: number;
}

export class GradientColumnBaseValuesWizard
  extends React.Component<GradientColumnBaseValuesWizardProps, GradientColumnBaseValuesWizardState>
  implements AdaptableWizardStep {
  constructor(props: GradientColumnBaseValuesWizardProps) {
    super(props);
    this.state = {
      BaseValue: this.props.Data.BaseValue,
    };
  }

  render(): any {
    return (
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
      </WizardPanel>
    );
  }

  private onBaseValueChanged = (e: any) => {
    this.setState({ BaseValue: e.target.value } as GradientColumnBaseValuesWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  public canNext(): boolean {
    if (StringExtensions.IsNullOrEmpty(this.props.Data.ColumnId)) {
      return false;
    }

    return true;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.BaseValue = this.state.BaseValue;
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
