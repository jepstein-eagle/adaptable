import * as React from 'react';

import {
  AdaptableWizardStep,
  AdaptableWizardStepProps,
} from '../../Wizard/Interface/IAdaptableWizard';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { AdaptablePopover } from '../../AdaptablePopover';
import { AdaptableBlotterForm } from '../../Components/Forms/AdaptableBlotterForm';
import { Reminder } from '../../../PredefinedConfig/RunTimeState/ReminderState';
import { EnumExtensions } from '../../../Utilities/Extensions/EnumExtensions';
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions';
import Dropdown from '../../../components/Dropdown';
import { Flex, Box, Text } from 'rebass';
import WizardPanel from '../../../components/WizardPanel';
import Input from '../../../components/Input';
import Checkbox from '../../../components/CheckBox';

export interface ReminderAlertWizardProps extends AdaptableWizardStepProps<Reminder> {}

export interface ReminderAlertWizardState {
  Header: string;
  Msg: string;
  MessageType: MessageType;
  ShowAsPopup: boolean;
}

export class ReminderAlertWizard
  extends React.Component<ReminderAlertWizardProps, ReminderAlertWizardState>
  implements AdaptableWizardStep {
  constructor(props: ReminderAlertWizardProps) {
    super(props);
    this.state = {
      Header: this.props.Data.Alert.Header,
      Msg: this.props.Data.Alert.Msg,
      MessageType: this.props.Data.Alert.MessageType as MessageType,
      ShowAsPopup: this.props.Data.Alert.ShowAsPopup,
    };
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + '-scope';

    let messageTypes = EnumExtensions.getNames(MessageType).map(type => {
      return {
        label: type,
        value: type,
      };
    });

    return (
      <div className={cssClassName} style={{ height: '100%' }}>
        <WizardPanel header="Alert Settings">
          <Flex flexDirection="column">
            <Flex marginTop={2} alignItems="center">
              <Text style={{ flex: 3 }}>Header:</Text>

              <Input
                style={{ flex: 8, maxWidth: 500 }}
                value={this.state.Header}
                type="string"
                placeholder="Enter Reminder Header (optional)"
                onChange={(e: React.SyntheticEvent) => this.onHeaderChanged(e)}
              />
            </Flex>
            <Flex marginTop={2} alignItems="center">
              <Text style={{ flex: 3 }}>Message:</Text>

              <Input
                value={this.state.Msg}
                style={{ flex: 8, maxWidth: 500 }}
                type="string"
                placeholder="Enter Reminder Message"
                onChange={(e: React.SyntheticEvent) => this.onMessageChanged(e)}
              />
            </Flex>
            <Flex marginTop={2} alignItems="center">
              <Text style={{ flex: 3 }}>Message Type:</Text>

              <Box style={{ flex: 8 }}>
                <Dropdown
                  style={{ maxWidth: 500 }}
                  placeholder="select"
                  value={this.state.MessageType}
                  onChange={(value: any) => this.onMessageTypeChanged(value)}
                  options={messageTypes}
                >
                  {messageTypes}
                </Dropdown>
              </Box>
            </Flex>
            <Flex marginTop={2}>
              <div style={{ flex: 3 }} />
              <Box style={{ flex: 8 }}>
                <Checkbox
                  className={cssClassName + '__checkbox'}
                  checked={this.state.ShowAsPopup == true}
                  onChange={(checked: boolean) => this.onShowAsPopupChanged(checked)}
                >
                  Show as Popup
                </Checkbox>{' '}
                <AdaptablePopover
                  cssClassName={cssClassName}
                  headerText={'Reminder Details'}
                  bodyText={['A popup is displayed when the Reminder is triggered.']}
                />
              </Box>
            </Flex>
          </Flex>
        </WizardPanel>
      </div>
    );
  }

  private onHeaderChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Header: e.value } as ReminderAlertWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMessageChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ Msg: e.value } as ReminderAlertWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onMessageTypeChanged(value: any) {
    this.setState({ MessageType: value } as ReminderAlertWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onShowAsPopupChanged(checked: boolean) {
    this.setState({ ShowAsPopup: checked } as ReminderAlertWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  public canNext(): boolean {
    return this.state.MessageType != null && StringExtensions.IsNotNullOrEmpty(this.state.Msg);
  }

  public canBack(): boolean {
    return true;
  }
  public Next(): void {
    this.props.Data.Alert.Header = this.state.Header;
    this.props.Data.Alert.Msg = this.state.Msg;
    this.props.Data.Alert.MessageType = this.state.MessageType;
    this.props.Data.Alert.ShowAsPopup = this.state.ShowAsPopup;
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
