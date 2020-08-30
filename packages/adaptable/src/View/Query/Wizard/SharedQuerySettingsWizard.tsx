import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { SharedQuery } from '../../../PredefinedConfig/QueryState';
import Input from '../../../components/Input';
import WizardPanel from '../../../components/WizardPanel';
import FormLayout, { FormRow } from '../../../components/FormLayout';

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
      Name: this.props.data.Name,
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
              placeholder="Enter Shared Query Name"
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
      () => this.props.updateGoBackState()
    );
  }

  public canNext(): boolean {
    return StringExtensions.IsNotNullOrEmpty(this.state.Name);
  }
  public canBack(): boolean {
    return true;
  }
  public next(): void {
    this.props.data.Name = this.state.Name;
  }
  public back(): void {
    //
  }
  public getIndexStepIncrement() {
    return 1;
  }
  public getIndexStepDecrement() {
    return 1;
  }
}
