import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { DataSource } from '../../../PredefinedConfig/DataSourceState';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import WizardPanel from '../../../components/WizardPanel';
import { Flex, Text } from 'rebass';
import Input from '../../../components/Input';
import HelpBlock from '../../../components/HelpBlock';
import ErrorBox from '../../../components/ErrorBox';

export interface DataSourceSettingsWizardProps extends AdaptableWizardStepProps<DataSource> {
  DataSourceNames: string[];
}
export interface DataSourceSettingsWizardState {
  Name: string;
  Description: any;
  ErrorMessage: string;
}

export class DataSourceSettingsWizard
  extends React.Component<DataSourceSettingsWizardProps, DataSourceSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: DataSourceSettingsWizardProps) {
    super(props);

    this.state = {
      Name: this.props.data.Name,
      Description: this.props.data.Description,
      ErrorMessage: null,
    };
  }

  render() {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
      ? null
      : 'error';

    return (
      <WizardPanel>
        <Flex alignItems="center" flexDirection="row">
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Name:
          </Text>

          <Input
            style={{ flex: 7 }}
            value={this.state.Name}
            type="string"
            placeholder="Enter DataSource name"
            onChange={(e: React.SyntheticEvent) => this.onDataSourceNameChange(e)}
          />
        </Flex>

        {this.state.ErrorMessage ? (
          <ErrorBox marginTop={3}>{this.state.ErrorMessage}</ErrorBox>
        ) : null}

        <Flex alignItems="center" flexDirection="row" marginTop={2}>
          <Text style={{ flex: 2 }} textAlign="end" marginRight={2}>
            Description:
          </Text>

          <Input
            style={{ flex: 7 }}
            type="string"
            placeholder="Enter description"
            onChange={(e: React.SyntheticEvent) => this.onDataSourceDescriptionChange(e)}
          />
        </Flex>
      </WizardPanel>
    );
  }

  onDataSourceNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        Name: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(this.props.DataSourceNames, e.value)
          ? 'A data source already exists with that name'
          : null,
      } as DataSourceSettingsWizardState,
      () => this.props.updateGoBackState()
    );
  }

  onDataSourceDescriptionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Description: e.value } as DataSourceSettingsWizardState, () =>
      this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.Name) &&
      StringExtensions.IsNotNullOrEmpty(this.state.Description)
    );
  }

  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data.Name = this.state.Name;
    this.props.data.Description = this.state.Description;
  }
  public back(): void {
    /* no implementation required   */
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
