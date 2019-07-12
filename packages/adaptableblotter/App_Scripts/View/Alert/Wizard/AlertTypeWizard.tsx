import * as React from 'react';
import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';

import { AlertDefinition } from '../../../PredefinedConfig/RunTimeState/AlertState';
import Panel from '../../../components/Panel';
import { Box } from 'rebass';
import Radio from '../../../components/Radio';
import Checkbox from '../../../components/CheckBox';
import WizardPanel from '../../../components/WizardPanel';

export interface AlertTypeWizardProps extends AdaptableWizardStepProps<AlertDefinition> {}

export interface AlertTypeWizardState {
  MessageType: MessageType;
  ShowAsPopup: boolean;
}

export class AlertTypeWizard extends React.Component<AlertTypeWizardProps, AlertTypeWizardState>
  implements AdaptableWizardStep {
  constructor(props: AlertTypeWizardProps) {
    super(props);
    this.state = {
      MessageType: this.props.Data.MessageType as MessageType,
      ShowAsPopup: this.props.Data.ShowAsPopup,
    };
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + '-scope';

    return (
      <div className={cssClassName}>
        <WizardPanel header="Select The Type of the Alert" border="none">
          <Box className="ab_large_margin">
            <Radio
              className={cssClassName + '__radiobutton'}
              value="Info"
              name="type"
              checked={this.state.MessageType == MessageType.Info}
              onChange={(x: any, e: React.SyntheticEvent) => this.onMessageTypeSelectChanged(e)}
            >
              Info
            </Radio>{' '}
            <AdaptablePopover
              cssClassName={cssClassName}
              headerText={'Alert Type: Info'}
              bodyText={['Sends the alert as a message.']}
            />
          </Box>
          <Box className="ab_large_margin">
            <Radio
              className={cssClassName + '__radiobutton'}
              value="Success"
              name="type"
              checked={this.state.MessageType == MessageType.Success}
              onChange={(x: any, e: React.SyntheticEvent) => this.onMessageTypeSelectChanged(e)}
            >
              Success
            </Radio>{' '}
            <AdaptablePopover
              cssClassName={cssClassName}
              headerText={'Alert Type: Success'}
              bodyText={['Sends the alert as a sucess message.']}
            />
          </Box>
          <Box className="ab_large_margin">
            <Radio
              className={cssClassName + '__radiobutton'}
              name="type"
              value="Warning"
              checked={this.state.MessageType == MessageType.Warning}
              onChange={(x: any, e: React.SyntheticEvent) => this.onMessageTypeSelectChanged(e)}
            >
              Warning
            </Radio>{' '}
            <AdaptablePopover
              cssClassName={cssClassName}
              headerText={'Alert Type: Warning'}
              bodyText={['Sends the alert as a warning.']}
            />
          </Box>
          <Box className="ab_large_margin">
            <Radio
              className={cssClassName + '__radiobutton'}
              value="Error"
              name="type"
              checked={this.state.MessageType == MessageType.Error}
              onChange={(x: any, e: React.SyntheticEvent) => this.onMessageTypeSelectChanged(e)}
            >
              Error
            </Radio>{' '}
            <AdaptablePopover
              cssClassName={cssClassName}
              headerText={'Alert Type: Error'}
              bodyText={['Sends the alert as an error.']}
            />
          </Box>
        </WizardPanel>
        <WizardPanel header="Alert Details" border="none">
          <Box className="ab_large_margin">
            <Checkbox
              className={cssClassName + '__checkbox'}
              checked={this.state.ShowAsPopup == true}
              onChange={this.onShowAsPopupChanged}
            >
              Show as Popup
            </Checkbox>{' '}
            <AdaptablePopover
              cssClassName={cssClassName}
              headerText={'Alert Details'}
              bodyText={['A popup is displayed when the Alert is triggered.']}
            />
          </Box>
        </WizardPanel>
      </div>
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

  private onShowAsPopupChanged = (checked: boolean) => {
    this.setState({ ShowAsPopup: checked } as AlertTypeWizardState, () =>
      this.props.UpdateGoBackState()
    );
  };

  public canNext(): boolean {
    return this.state.MessageType != null;
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.MessageType = this.state.MessageType;
    this.props.Data.ShowAsPopup = this.state.ShowAsPopup;
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
