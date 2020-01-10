import { Report } from '../../../PredefinedConfig/ExportState';
import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import { ReportRowScope } from '../../../PredefinedConfig/Common/Enums';
import WizardPanel from '../../../components/WizardPanel';
import HelpBlock from '../../../components/HelpBlock';
import Input from '../../../components/Input';
import { Flex, Text } from 'rebass';
import ErrorBox from '../../../components/ErrorBox';
import { IPushPullReport } from '../../../PredefinedConfig/IPushPullState';

export interface IPushPullLoginWizardProps extends AdaptableWizardStepProps<IPushPullReport> {
  Username: string | undefined;
  Password: string | undefined;
}
export interface IPushPullLoginWizardState {
  Username: string | undefined;
  Password: string | undefined;
}

export class IPushPullLoginWizard
  extends React.Component<IPushPullLoginWizardProps, IPushPullLoginWizardState>
  implements AdaptableWizardStep {
  constructor(props: IPushPullLoginWizardProps) {
    super(props);
    this.state = {
      Username: props.Username || '',
      Password: props.Password || '',
    };
  }
  render(): any {
    return (
      <WizardPanel>
        <Flex flexDirection="row" alignItems="center">
          <Text marginRight={2}>iPushPull User Name:</Text>

          <Input
            style={{ flex: 1 }}
            type="email"
            placeholder="Email address"
            value={this.state.Username}
            onChange={(e: any) => this.onUsernameChanged(e)}
          />
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Text marginRight={2}>iPushPull Password:</Text>

          <Input
            width="100%"
            type="password"
            placeholder="Password"
            value={this.state.Password}
            onChange={(e: any) => this.onPasswordChanged(e)}
          />
        </Flex>
      </WizardPanel>
    );
  }

  private onUsernameChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        Username: e.value,
      } as IPushPullLoginWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  private onPasswordChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState(
      {
        Password: e.value,
      } as IPushPullLoginWizardState,
      () => this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return (
      StringExtensions.IsNotNullOrEmpty(this.state.Username) &&
      StringExtensions.IsNullOrEmpty(this.state.Password)
    );
  }
  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    // do we need to log in?
    // this.props.Data.Name = this.state.ReportName;
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
