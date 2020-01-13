import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { MessageType, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex, Text } from 'rebass';
import UIHelper from '../UIHelper';
import SimpleButton from '../../components/SimpleButton';
import { AdaptableDashboardToolbar } from '../../PredefinedConfig/Common/Types';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

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
    let messageTypeColor: string | undefined = StringExtensions.IsNotNullOrEmpty(
      this.props.StatusMessage
    )
      ? UIHelper.getColorByMessageType(this.props.StatusType as MessageType)
      : undefined;

    let buttonTextColor: string = UIHelper.getButtonTextColourForMessageType(
      this.props.StatusType as MessageType
    );

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

    let message: string = StringExtensions.IsNotNullOrEmpty(this.props.StatusMessage)
      ? this.props.StatusMessage
      : 'No Status Message';

    let content = (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__SystemStatus__wrap">
        <Flex
          style={{ borderRadius: 'var(--ab__border-radius)' }}
          className="ab-DashboardToolbar__SystemStatus__text"
          marginRight={2}
          padding={2}
          color={buttonTextColor}
          backgroundColor={messageTypeColor}
          fontSize={'var( --ab-font-size-2)'}
          alignItems="center"
        >
          {message}
        </Flex>
        {StringExtensions.IsNotNullOrEmpty(this.props.StatusMessage) && (
          <Flex alignItems="center">{clearButton}</Flex>
        )}
      </Flex>
    );

    return (
      <PanelDashboard
        className="ab-DashboardToolbar__SystemStatus"
        headerText={StrategyConstants.SystemStatusStrategyFriendlyName}
        glyphicon={StrategyConstants.SystemStatusGlyph}
        onClose={() => this.props.onClose(StrategyConstants.SystemStatusStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }
}

function mapStateToProps(state: AdaptableState) {
  return {
    StatusMessage: state.SystemStatus.StatusMessage,
    StatusType: state.SystemStatus.StatusType,
    DefaultStatusMessage: state.SystemStatus.DefaultStatusMessage,
    DefaultStatusType: state.SystemStatus.DefaultStatusType,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onClearSystemStatus: () => dispatch(SystemStatusRedux.SystemStatusClear()),
    onClose: (toolbar: AdaptableDashboardToolbar) =>
      dispatch(DashboardRedux.DashboardHideToolbar(toolbar)),
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
