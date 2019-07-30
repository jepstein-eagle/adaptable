import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { ColumnHelper } from '../../../Utilities/Helpers/ColumnHelper';
import { UserFilter } from '../../../PredefinedConfig/RunTimeState/UserFilterState';
import ErrorBox from '../../../components/ErrorBox';
import WizardPanel from '../../../components/WizardPanel';
import { Flex, Text } from 'rebass';
import Input from '../../../components/Input';
import HelpBlock from '../../../components/HelpBlock';

export interface UserFilterSettingsWizardProps extends AdaptableWizardStepProps<UserFilter> {
  UserFilters: UserFilter[];
}
export interface UserFilterSettingsWizardState {
  FilterName: string;
  ErrorMessage: string;
}

export class UserFilterSettingsWizard
  extends React.Component<UserFilterSettingsWizardProps, UserFilterSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: UserFilterSettingsWizardProps) {
    super(props);
    this.state = {
      FilterName: this.props.Data.Name,
      ErrorMessage: null,
    };
  }
  render() {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
      ? null
      : 'error';

    return (
      <WizardPanel>
        <HelpBlock marginBottom={2}>
          Select a name for the User Filter - this is the name that will appear in Query Builder and
          Column Filter dropdowns.
        </HelpBlock>

        <Flex flexDirection="row" alignItems="center">
          <Text textAlign="end" marginRight={2}>
            Filter Name:
          </Text>

          <Input
            style={{ flex: 1 }}
            value={this.state.FilterName}
            type="string"
            placeholder="Enter filter name"
            onChange={(e: any) => this.onFilterNameChange(e)}
          />
        </Flex>

        {this.state.ErrorMessage ? (
          <ErrorBox marginTop={3}>{this.state.ErrorMessage}</ErrorBox>
        ) : null}
      </WizardPanel>
    );
  }

  onFilterNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        FilterName: e.value,
        ErrorMessage:
          this.props.UserFilters.findIndex(
            x => x.Name == e.value && x.ColumnId == this.props.Data.ColumnId
          ) > -1
            ? 'A User Filter already exists with that name for column: ' +
              ColumnHelper.getFriendlyNameFromColumnId(this.props.Data.ColumnId, this.props.Columns)
            : null,
      } as UserFilterSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotEmpty(this.state.FilterName) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }

  public canBack(): boolean {
    return true;
  }

  public Next(): void {
    this.props.Data.Name = this.state.FilterName;
  }
  public Back(): void {
    /* no implementation */
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
