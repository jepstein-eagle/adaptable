import * as React from 'react';

import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { SparklinesChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import WizardPanel from '@adaptabletools/adaptable/src/components/WizardPanel';
import FormLayout, { FormRow } from '@adaptabletools/adaptable/src/components/FormLayout';
import Input from '@adaptabletools/adaptable/src/components/Input';
import ErrorBox from '@adaptabletools/adaptable/src/components/ErrorBox';
import { Flex } from 'rebass';
import Radio from '@adaptabletools/adaptable/src/components/Radio';
import ArrayExtensions from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';
import { CategoryChartSettingsWizardState } from '../../CategoryChart/Wizard/CategoryChartSettingsWizard';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';

export interface SparklinesChartSettingsWizardProps
  extends AdaptableWizardStepProps<SparklinesChartDefinition> {
  ChartNames: string[];
}

export interface SparklinesChartSettingsWizardState {
  Name: string;
  Description: string;
  ErrorMessage: string;
  VisibleRowsOnly: boolean;
}

export class SparklinesChartSettingsWizard
  extends React.Component<SparklinesChartSettingsWizardProps, SparklinesChartSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: SparklinesChartSettingsWizardProps) {
    super(props);
    this.state = {
      Name: props.data.Name,
      Description: props.data.Description,
      VisibleRowsOnly: props.data.VisibleRowsOnly,
      ErrorMessage: null,
    };
  }
  onChartNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        Name: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(this.props.ChartNames, e.value)
          ? 'A Chart Definition already exists with that name'
          : null,
      } as SparklinesChartSettingsWizardState,
      () => this.props.updateGoBackState()
    );
  }

  render(): any {
    return (
      <WizardPanel>
        <FormLayout>
          <FormRow label="Name">
            <Input
              width="100%"
              value={this.state.Name}
              type="string"
              placeholder="Enter chart name"
              onChange={(e: React.SyntheticEvent) => this.onChartNameChange(e)}
            />
          </FormRow>
          {this.state.ErrorMessage ? (
            <FormRow label=" ">
              <ErrorBox>{this.state.ErrorMessage}</ErrorBox>
            </FormRow>
          ) : null}

          <FormRow label="Description:">
            <Input
              width="100%"
              value={this.state.Description}
              type="string"
              placeholder="Enter description (optional)"
              onChange={(e: any) => this.onChartDescriptionChange(e)}
            />
          </FormRow>

          <FormRow label="Rows In Chart:">
            <Flex flexDirection="row" alignItems="center" flex={7}>
              <Radio
                value="Visible"
                marginRight={2}
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
          </FormRow>
        </FormLayout>
      </WizardPanel>
    );
  }

  onChartDescriptionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Description: e.value } as CategoryChartSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  private onVisibleRowsChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      { VisibleRowsOnly: e.value == 'Visible' } as CategoryChartSettingsWizardState,
      () => this.props.updateGoBackState()
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
  public next(): void {
    this.props.data.Name = this.state.Name;
    this.props.data.Description = this.state.Description;
    this.props.data.VisibleRowsOnly = this.state.VisibleRowsOnly;
  }
  public back(): void {
    //
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return StringExtensions.IsNullOrEmpty(this.props.data.Expression) ? 2 : 1;
  }
}
