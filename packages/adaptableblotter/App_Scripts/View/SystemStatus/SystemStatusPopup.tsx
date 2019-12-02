import * as React from 'react';
import * as Redux from 'redux';
import * as _ from 'lodash';
import { connect } from 'react-redux';

import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StrategyViewPopupProps } from '../Components/SharedProps/StrategyViewPopupProps';
import { PanelWithImage } from '../Components/Panels/PanelWithImage';
import { ColorPicker } from '../ColorPicker';

import { AdaptableBlotterFormControlTextClear } from '../Components/Forms/AdaptableBlotterFormControlTextClear';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';

import {
  QUICK_SEARCH_DEFAULT_BACK_COLOR,
  QUICK_SEARCH_DEFAULT_FORE_COLOR,
} from '../../Utilities/Constants/GeneralConstants';
import {
  DisplayAction,
  LeafExpressionOperator,
  MessageType,
  AccessLevel,
} from '../../PredefinedConfig/Common/Enums';
import { IStyle } from '../../PredefinedConfig/Common/IStyle';
import { AdaptablePopover } from '../AdaptablePopover';

import WizardPanel from '../../components/WizardPanel';
import Dropdown from '../../components/Dropdown';
import Checkbox from '../../components/CheckBox';
import { Text, Flex, Box } from 'rebass';
import Panel from '../../components/Panel';
import FormLayout, { FormRow } from '../../components/FormLayout';
import HelpBlock from '../../components/HelpBlock';
import Radio from '../../components/Radio';
import SimpleButton from '../../components/SimpleButton';
import UIHelper from '../UIHelper';
import { fontWeight } from 'styled-system';

interface SystemStatusPopupProps extends StrategyViewPopupProps<SystemStatusPopupComponent> {
  StatusMessage: string;
  StatusType: MessageType;
  ShowAlert: boolean;
  onSetSystemStatusMessage: (
    systemStatusMessage: string
  ) => SystemStatusRedux.SystemStatusSetMessageAction;
  onSetSystemStatusType: (
    systemStatusType: string
  ) => SystemStatusRedux.SystemStatusSetStatusTypeAction;
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

  onSystemStatusMessageChanged(systemStatusMessage: string) {
    this.props.onSetSystemStatusMessage(systemStatusMessage);
  }
  onSystemStatusTypeChanged(systemStatusType: string) {
    this.props.onSetSystemStatusType(systemStatusType);
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

    let messageTypeColor: string = UIHelper.getColorByMessageType(this.props
      .StatusType as MessageType);

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

    return (
      <PanelWithImage
        variant="primary"
        header={StrategyConstants.SystemStatusStrategyName}
        glyphicon={StrategyConstants.SystemStatusGlyph}
        infoBody={infoBody}
        bodyProps={{ padding: 2 }}
      >
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
        {clearButton}
      </PanelWithImage>
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    StatusMessage: state.SystemStatus.StatusMessage,
    StatusType: state.SystemStatus.StatusType,
    ShowAlert: state.SystemStatus.ShowAlert,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onSetSystemStatusMessage: (systemStatusMessage: string) =>
      dispatch(SystemStatusRedux.SystemStatusSetMessage(systemStatusMessage)),
    onSetSystemStatusType: (systemStatusType: string) =>
      dispatch(SystemStatusRedux.SystemStatusSetStatusType(systemStatusType)),
    onSetSystemStatusShowAlert: (showAlert: boolean) =>
      dispatch(SystemStatusRedux.SystemStatusSetShowAlert(showAlert)),
    onClearSystemStatus: () => dispatch(SystemStatusRedux.SystemStatusClear()),
  };
}

export let SystemStatusPopup = connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemStatusPopupComponent);
