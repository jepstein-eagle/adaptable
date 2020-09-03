import * as React from 'react';
import {
  AdaptableWizardStepProps,
  AdaptableWizardStep,
} from '@adaptabletools/adaptable/src/View/Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '@adaptabletools/adaptable/src/Utilities/Extensions/ArrayExtensions';
import { CategoryChartDefinition } from '@adaptabletools/adaptable/src/PredefinedConfig/ChartState';
import WizardPanel from '@adaptabletools/adaptable/src/components/WizardPanel';
import { Flex, Text } from 'rebass';
import Radio from '@adaptabletools/adaptable/src/components/Radio';
import Input from '@adaptabletools/adaptable/src/components/Input';
import ErrorBox from '@adaptabletools/adaptable/src/components/ErrorBox';

export interface CategoryChartSettingsWizardProps
  extends AdaptableWizardStepProps<CategoryChartDefinition> {
  ChartNames: string[];
}

export interface CategoryChartSettingsWizardState {
  Name: string;
  Description: string;
  ErrorMessage: string;
  VisibleRowsOnly: boolean;
}

export class CategoryChartSettingsWizard
  extends React.Component<CategoryChartSettingsWizardProps, CategoryChartSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: CategoryChartSettingsWizardProps) {
    super(props);
    this.state = {
      Name: props.data.Name,
      Description: props.data.Description,
      VisibleRowsOnly: props.data.VisibleRowsOnly,
      ErrorMessage: null,
    };
  }
  render(): any {
    return (
      <WizardPanel>
        <Flex flexDirection="row" alignItems="center">
          <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
            Name:
          </Text>

          <Input
            style={{ flex: 7 }}
            value={this.state.Name}
            type="string"
            placeholder="Enter chart name"
            onChange={(e: React.SyntheticEvent) => this.onChartNameChange(e)}
          />
        </Flex>
        {this.state.ErrorMessage ? (
          <ErrorBox marginTop={3}>{this.state.ErrorMessage}</ErrorBox>
        ) : null}
        <Flex flexDirection="row" alignItems="center" marginTop={3}>
          <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
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
          <Text style={{ flex: 3 }} textAlign="end" marginRight={2}>
            Rows In Chart:
          </Text>
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
      } as CategoryChartSettingsWizardState,
      () => this.props.updateGoBackState()
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
    // todo
  }

  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return StringExtensions.IsNullOrEmpty(this.props.data.XAxisExpression) ? 2 : 1;
  }
}
