import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';

import { ColumnCategory } from '../../../PredefinedConfig/RunTimeState/ColumnCategoryState';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import { Flex, Box, Text } from 'rebass';
import Input from '../../../components/Input';
import ErrorBox from '../../../components/ErrorBox';

export interface ColumnCategorySettingsWizardProps
  extends AdaptableWizardStepProps<ColumnCategory> {
  ColumnCategorys: ColumnCategory[];
}

export interface ColumnCategorySettingsWizardState {
  ColumnCategoryId: string;
  ErrorMessage: string;
}

export class ColumnCategorySettingsWizard
  extends React.Component<ColumnCategorySettingsWizardProps, ColumnCategorySettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: ColumnCategorySettingsWizardProps) {
    super(props);
    this.state = {
      ColumnCategoryId: props.Data.ColumnCategoryId,
      ErrorMessage: null,
    };
  }
  render(): any {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
      ? null
      : 'error';

    return (
      <WizardPanel header="Column Category Settings">
        <Flex flexDirection="row" alignItems="center">
          <Text marginRight={3}>Name: </Text>

          <Input
            value={this.state.ColumnCategoryId}
            style={{ flex: 1 }}
            type="string"
            placeholder="Enter name for Column Category"
            onChange={(e: React.SyntheticEvent) => this.onColumnCategoryNameChange(e)}
          />
        </Flex>
        {this.state.ErrorMessage ? (
          <ErrorBox marginTop={3}>{this.state.ErrorMessage}</ErrorBox>
        ) : null}
      </WizardPanel>
    );
  }

  onColumnCategoryNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ColumnCategoryId: e.value,
        ErrorMessage: ArrayExtensions.ContainsItem(
          this.props.ColumnCategorys.map(s => s.ColumnCategoryId),
          e.value
        )
          ? 'A Column Category already exists with that name'
          : null,
      } as ColumnCategorySettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotEmpty(this.state.ColumnCategoryId) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.ColumnCategoryId = this.state.ColumnCategoryId;
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
