import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { MessageType, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Text, Flex } from 'rebass';
import SimpleButton from '../../components/SimpleButton';
import UIHelper from '../UIHelper';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

interface SystemStatusPopupProps extends StrategyViewPopupProps<SystemStatusPopupComponent> {
  StatusMessage: string;
  StatusFurtherInformation: string;
  StatusType: MessageType;
  ShowAlert: boolean;
  onSetSystemStatusShowAlert: (
    showAlert: boolean
  ) => SystemStatusRedux.SystemStatusSetShowAlertAction;
  onClearSystemStatus: () => SystemStatusRedux.SystemStatusClearAction;
}

interface SystemStatusPopupState {}

class SystemStatusPopupComponent extends React.Component<
  SystemStatusPopupProps,
  SystemStatusPopupState
> {
  constructor(props: SystemStatusPopupProps) {
    super(props);
    // this.state = { EditedSystemStatusText: '', EditedStyle: null };
  }

  onSystemStatusShowAlertChanged(showAlert: boolean) {
    this.props.onSetSystemStatusShowAlert(showAlert);
  }
  onSystemStatusClear() {
    this.props.onClearSystemStatus();
  }

  render() {
    let infoBody: any[] = [
      'See any System Status messgages that have been set.',
      <br />,
      <br />,
      'Clear them if you have read them.',
    ];

    let messageTypeColor: string = UIHelper.getColorByMessageType(
      this.props.StatusType as MessageType
    );

    let clearButton = (
      <SimpleButton
        onClick={() => this.onSystemStatusClear()}
        tooltip="Clear User Data"
        tone="neutral"
        variant="raised"
        marginTop={3}
        AccessLevel={AccessLevel.Full}
      >
        Clear System Status
      </SimpleButton>
    );

    let content = (
      <div>
        {' '}
        <Flex
          style={{ borderRadius: 'var(--ab__border-radius)', fontWeight: 'bold' }}
          className="ab-DashboardToolbar__SystemStatus__text"
          marginRight={2}
          marginBottom={3}
          padding={2}
          color={'text-on-secondary'}
          backgroundColor={messageTypeColor}
          fontSize={'var( --ab-font-size-2)'}
          alignItems="center"
        >
          System Status Message
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Text style={{ flex: 2 }} marginRight={2}>
            {this.props.StatusMessage}
          </Text>
        </Flex>
        <Flex flexDirection="row" alignItems="center">
          <Text style={{ flex: 2 }} marginRight={2} marginTop={2}>
            {this.props.StatusFurtherInformation}
          </Text>
        </Flex>
        {clearButton}
      </div>
    );

    return (
      <PanelWithImage
        variant="primary"
        header={StrategyConstants.SystemStatusStrategyFriendlyName}
        glyphicon={StrategyConstants.SystemStatusGlyph}
        infoBody={infoBody}
        bodyProps={{ padding: 2 }}
      >
        {StringExtensions.IsNotNullOrEmpty(this.props.StatusMessage) ? (
          { content }
        ) : (
          <Text fontSize={2}>No Status Message</Text>
        )}
      </PanelWithImage>
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    StatusMessage: state.SystemStatus.StatusMessage,
    StatusType: state.SystemStatus.StatusType,
    StatusFurtherInformation: state.SystemStatus.StatusFurtherInformation,
    ShowAlert: state.SystemStatus.ShowAlert,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onSetSystemStatusShowAlert: (showAlert: boolean) =>
      dispatch(SystemStatusRedux.SystemStatusSetShowAlert(showAlert)),
    onClearSystemStatus: () => dispatch(SystemStatusRedux.SystemStatusClear()),
  };
}

export let SystemStatusPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemStatusPopupComponent);
