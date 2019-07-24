import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '../../../Wizard/Interface/IAdaptableWizard';
import { PieChartDefinition } from '../../../../PredefinedConfig/RunTimeState/ChartState';
import { StringExtensions } from '../../../../Utilities/Extensions/StringExtensions';

import { ArrayExtensions } from '../../../../Utilities/Extensions/ArrayExtensions';
import WizardPanel from '../../../../components/WizardPanel';
import { Flex, Text, Box } from 'rebass';
import Input from '../../../../components/Input';
import Radio from '../../../../components/Radio';

import ErrorBox from '../../../../components/ErrorBox';

export interface PieChartSettingsWizardProps extends AdaptableWizardStepProps<PieChartDefinition> {
  ChartNames: string[];
}

export interface PieChartSettingsWizardState {
  Name: string;
  Description: string;
  VisibleRowsOnly: boolean;
  ErrorMessage: string;
}

export class PieChartSettingsWizard
  extends React.Component<PieChartSettingsWizardProps, PieChartSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: PieChartSettingsWizardProps) {
    super(props);
    this.state = {
      Name: props.Data.Name,
      Description: props.Data.Description,
      VisibleRowsOnly: props.Data.VisibleRowsOnly,
      ErrorMessage: null,
    };
  }
  render(): any {
    return (
      <WizardPanel header="Chart Definition Settings">
        <Flex flexDirection="row" alignItems="center">
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Name:
          </Text>
          <Input
            style={{ flex: 7 }}
            value={this.state.Name}
            type="string"
            placeholder="Enter chart name"
            onChange={(e: any) => this.onChartNameChange(e)}
          />
        </Flex>
        {this.state.ErrorMessage ? (
          <ErrorBox marginTop={3}>{this.state.ErrorMessage}</ErrorBox>
        ) : null}
        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Description:
          </Text>

          <Input
            style={{ flex: 7 }}
            value={this.state.Description}
            type="string"
            placeholder="Enter description (optional)"
            onChange={(e: any) => this.onChartDescriptionChange(e)}
          />
        </Flex>
        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Rows In Chart:
          </Text>
          <Flex flexDirection="row" alignItems="center" flex={7}>
            <Radio
              marginRight={2}
              value="Visible"
              checked={this.state.VisibleRowsOnly == true}
              onChange={(_, e: any) => this.onVisibleRowsChanged(e)}
            >
              Visible Rows Only
            </Radio>
            <Radio
              value="All"
              checked={this.state.VisibleRowsOnly == false}
              onChange={(_, e: any) => this.onVisibleRowsChanged(e)}
            >
              All Rows In Grid
            </Radio>
          </Flex>
        </Flex>
      </WizardPanel>
    );
  }

  onChartNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        Name: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(this.props.ChartNames, e.value)
          ? 'A Chart Definition already exists with that name'
          : null,
      } as PieChartSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  onChartDescriptionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Description: e.value } as PieChartSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onVisibleRowsChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ VisibleRowsOnly: e.value == 'Visible' } as PieChartSettingsWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotEmpty(this.state.Name) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.Name = this.state.Name;
    this.props.Data.Description = this.state.Description;
    this.props.Data.VisibleRowsOnly = this.state.VisibleRowsOnly;
  }
  public Back(): void {
    // todo
  }

  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
