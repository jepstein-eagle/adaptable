import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ArrayExtensions } from '../../../Utilities/Extensions/ArrayExtensions';
import { SharedQuery } from '../../../PredefinedConfig/SharedQueryState';
import Input from '../../../components/Input';
import WizardPanel from '../../../components/WizardPanel';
import ErrorBox from '../../../components/ErrorBox';
import FormLayout, { FormRow } from '../../../components/FormLayout';
import Dropdown from '../../../components/Dropdown';
import { DataType } from '../../../PredefinedConfig/Common/Enums';
import CheckBox from '../../../components/CheckBox';

export interface SharedQuerySettingsWizardProps extends AdaptableWizardStepProps<SharedQuery> {}

export interface SharedQuerySettingsWizardState {
  Name: string;
}

export class SharedQuerySettingsWizard
  extends React.Component<SharedQuerySettingsWizardProps, SharedQuerySettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: SharedQuerySettingsWizardProps) {
    super(props);
    this.state = {
      Name: this.props.Data.Name,
    };
  }
  render(): any {
    return (
      <WizardPanel>
        <FormLayout>
          <FormRow label="Name">
            <Input
              value={this.state.Name}
              autoFocus
              width={300}
              type="text"
              placeholder="Enter column name"
              onChange={(e: React.SyntheticEvent) => this.handleColumnNameChange(e)}
            />
          </FormRow>
        </FormLayout>
      </WizardPanel>
    );
  }

  handleColumnNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    // TODO: check name is unique
    this.setState(
      {
        Name: e.value,
      },
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.Name);
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Name = this.state.Name;
  }
  public Back(): void {
    //
  }
  public GetIndexStepIncrement() {
    return 1;
  }
  public GetIndexStepDecrement() {
    return 1;
  }
}
