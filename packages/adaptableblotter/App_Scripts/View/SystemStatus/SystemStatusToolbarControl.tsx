﻿import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { MessageType, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import UIHelper from '../UIHelper';
import SimpleButton from '../../components/SimpleButton';

interface SystemStatusToolbarControlProps
  extends ToolbarStrategyViewPopupProps<SystemStatusToolbarControlComponent> {
  StatusMessage: string;
  StatusType: string;
  DefaultStatusMessage: string;
  DefaultStatusType: string;
  onClearSystemStatus: () => SystemStatusRedux.SystemStatusClearAction;
}

interface SystemStatusToolbarState {}

class SystemStatusToolbarControlComponent extends React.Component<
  SystemStatusToolbarControlProps,
  SystemStatusToolbarState
> {
  constructor(props: SystemStatusToolbarControlProps) {
    super(props);
  }

  render() {
    let messageTypeColor: string = UIHelper.getColorByMessageType(this.props
      .StatusType as MessageType);

    let isDefaultMessage: boolean =
      this.props.DefaultStatusMessage === this.props.StatusMessage &&
      this.props.DefaultStatusType === this.props.StatusType;
    let clearButton = (
      <SimpleButton
        onClick={() => this.props.onClearSystemStatus()}
        tooltip="Clear Message"
        tone="neutral"
        variant="text"
        disabled={isDefaultMessage}
        marginTop={1}
        AccessLevel={AccessLevel.Full}
      >
        Clear
      </SimpleButton>
    );

    let content = (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__SystemStatus__wrap">
        <Flex
          style={{ borderRadius: 'var(--ab__border-radius)' }}
          className="ab-DashboardToolbar__SystemStatus__text"
          marginRight={2}
          padding={2}
          color={'text-on-secondary'}
          backgroundColor={messageTypeColor}
          fontSize={'var( --ab-font-size-2)'}
          alignItems="center"
        >
          {this.props.StatusMessage}
        </Flex>
        <Flex alignItems="center">{clearButton}</Flex>
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__SystemStatus"
        headerText={StrategyConstants.SystemStatusStrategyName}
        glyphicon={StrategyConstants.SystemStatusGlyph}
        onClose={() => this.props.onClose(StrategyConstants.SystemStatusStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }
}

function mapStateToProps(state: AdaptableBlotterState) {
  return {
    StatusMessage: state.SystemStatus.StatusMessage,
    StatusType: state.SystemStatus.StatusType,
    DefaultStatusMessage: state.SystemStatus.DefaultStatusMessage,
    DefaultStatusType: state.SystemStatus.DefaultStatusType,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onClearSystemStatus: () => dispatch(SystemStatusRedux.SystemStatusClear()),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.SystemStatusStrategyId,
          ScreenPopups.SystemStatusPopup
        )
      ),
  };
}

export let SystemStatusToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemStatusToolbarControlComponent);
