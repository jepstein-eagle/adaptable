import * as React from 'react';
import { Radio, Col, Panel, Checkbox, FormControl, ControlLabel, Row } from 'react-bootstrap';
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
      return (
        <option key={type} value={type}>
          {type}
        </option>
      );
    });

    return (
      <div className={cssClassName}>
        <Panel header="Alert Settings" bsStyle="primary">
          <AdaptableBlotterForm inline>
            <Row style={{ marginTop: '15px' }}>
              <Col xs={3}>
                <ControlLabel>Header:</ControlLabel>
              </Col>
              <Col xs={8}>
                <FormControl
                  value={this.state.Header}
                  style={{ width: '100%' }}
                  type="string"
                  placeholder="Enter Reminder Header (optional)"
                  onChange={e => this.onHeaderChanged(e)}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: '15px' }}>
              <Col xs={3}>
                <ControlLabel>Message:</ControlLabel>
              </Col>
              <Col xs={8}>
                <FormControl
                  value={this.state.Msg}
                  style={{ width: '100%' }}
                  type="string"
                  placeholder="Enter Reminder Message"
                  onChange={e => this.onMessageChanged(e)}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: '15px' }}>
              <Col xs={3}>
                <ControlLabel>Message Type:</ControlLabel>
              </Col>
              <Col xs={6}>
                <FormControl
                  componentClass="select"
                  placeholder="select"
                  value={this.state.MessageType}
                  onChange={x => this.onMessageTypeChanged(x)}
                >
                  {messageTypes}
                </FormControl>
              </Col>
            </Row>
            <Row style={{ marginTop: '15px' }}>
              <Col xs={3} />
              <Col xs={6}>
                <Checkbox
                  className={cssClassName + '__checkbox'}
                  inline
                  checked={this.state.ShowAsPopup == true}
                  onChange={e => this.onShowAsPopupChanged(e)}
                >
                  Show as Popup
                </Checkbox>{' '}
                <AdaptablePopover
                  cssClassName={cssClassName}
                  headerText={'Reminder Details'}
                  bodyText={['A popup is displayed when the Reminder is triggered.']}
                />
              </Col>
            </Row>
          </AdaptableBlotterForm>
        </Panel>
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

  private onMessageTypeChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ MessageType: e.value } as ReminderAlertWizardState, () =>
      this.props.UpdateGoBackState()
    );
  }

  private onShowAsPopupChanged(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.setState({ ShowAsPopup: e.checked } as ReminderAlertWizardState, () =>
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
