import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { AlertDefinition } from '../../../PredefinedConfig/RunTimeState/AlertState';
import { Box } from 'rebass';
import Radio from '../../../components/Radio';
import WizardPanel from '../../../components/WizardPanel';

export interface AlertTypeWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}

export interface AlertTypeWizardState {
  MessageType: MessageType;
}

export class AlertTypeWizard extends React.Component<AlertTypeWizardProps, AlertTypeWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertTypeWizardProps) {
    super(props);
    this.state = {
      MessageType: this.props.Data!.MessageType as MessageType,
    };
  }

  render(): any {
    return (
      <>
        <WizardPanel border="none">
          <Box>
            <Radio
              value="Info"
              name="type"
              checked={this.state.MessageType == MessageType.Info}
              onChange={(x: any, e: React.SyntheticEvent) => this.onMessageTypeSelectChanged(e)}
            >
              Info
            </Radio>
          </Box>
          <Box>
            <Radio
              value="Success"
              name="type"
              checked={this.state.MessageType == MessageType.Success}
              onChange={(x: any, e: React.SyntheticEvent) => this.onMessageTypeSelectChanged(e)}
            >
              Success
            </Radio>{' '}
          </Box>
          <Box>
            <Radio
              name="type"
              value="Warning"
              checked={this.state.MessageType == MessageType.Warning}
              onChange={(x: any, e: React.SyntheticEvent) => this.onMessageTypeSelectChanged(e)}
            >
              Warning
            </Radio>{' '}
          </Box>
          <Box>
            <Radio
              value="Error"
              name="type"
              checked={this.state.MessageType == MessageType.Error}
              onChange={(x: any, e: React.SyntheticEvent) => this.onMessageTypeSelectChanged(e)}
            >
              Error
            </Radio>
          </Box>
        </WizardPanel>
      </>
    );
  }

  private onMessageTypeSelectChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    if (e.value == 'Info') {
      this.setState({ MessageType: MessageType.Info } as AlertTypeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else if (e.value == 'Success') {
      this.setState({ MessageType: MessageType.Success } as AlertTypeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else if (e.value == 'Warning') {
      this.setState({ MessageType: MessageType.Warning } as AlertTypeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    } else if (e.value == 'Error') {
      this.setState({ MessageType: MessageType.Error } as AlertTypeWizardState, () =>
        this.props.UpdateGoBackState()
      );
    }
  }

  public canNext(): boolean {
    return this.state.MessageType != null;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data!.MessageType = this.state.MessageType;
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
