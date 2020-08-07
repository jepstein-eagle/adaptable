import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';

import WizardPanel from '../../../components/WizardPanel';
import Input from '../../../components/Input';
import { Text } from 'rebass';
import ErrorBox from '../../../components/ErrorBox';
import FormLayout, { FormRow } from '../../../components/FormLayout';

export interface ReportSettingsWizardProps extends AdaptableWizardStepProps<Report> {
  Reports: Report[];
}
export interface ReportSettingsWizardState {
  ReportName: string;
  ErrorMessage: string;
}

export class ReportSettingsWizard
  extends React.Component<ReportSettingsWizardProps, ReportSettingsWizardState>
  implements AdaptableWizardStep {
  constructor(props: ReportSettingsWizardProps) {
    super(props);
    this.state = {
      ReportName: this.props.Data.Name,
      ErrorMessage: null,
    };
  }
  render(): any {
    let validationState: 'error' | null = StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
      ? null
      : 'error';

    return (
      <WizardPanel>
        <FormLayout columns={[1, 2]}>
          <FormRow>
            <Text marginRight={2}>Enter Report Name:</Text>

            <Input
              width="100%"
              type="text"
              placeholder="Name"
              value={this.state.ReportName}
              onChange={(e: any) => this.onReportNameChanged(e)}
            />
          </FormRow>
          <FormRow>
            <></>
            {this.state.ErrorMessage ? <ErrorBox>{this.state.ErrorMessage}</ErrorBox> : null}
          </FormRow>
        </FormLayout>
      </WizardPanel>
    );
  }

  private onReportNameChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        ReportName: e.value,
        ErrorMessage:
          this.props.Reports.findIndex(x => x.Name == e.value) > -1
            ? 'A Report already exists with that name'
            : null,
      } as ReportSettingsWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.ReportName) &&
      StringExtensions.IsNullOrEmpty(this.state.ErrorMessage)
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Name = this.state.ReportName;
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
