import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';
import * as SystemStatusRedux from '../../Redux/ActionsReducers/SystemStatusRedux';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { MessageType, AccessLevel } from '../../PredefinedConfig/Common/Enums';
import { Flex } from 'rebass';
import UIHelper from '../UIHelper';
import SimpleButton from '../../components/SimpleButton';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';

interface SystemStatusToolPanelProps
  extends ToolPanelStrategyViewPopupProps<SystemStatusToolPanelComponent> {
  StatusMessage: string;
  StatusType: string;
  DefaultStatusMessage: string;
  DefaultStatusType: string;
  onClearSystemStatus: () => SystemStatusRedux.SystemStatusClearAction;
}

interface SystemStatusToolbarState {
  IsMinimised: boolean;
}

class SystemStatusToolPanelComponent extends React.Component<
  SystemStatusToolPanelProps,
  SystemStatusToolbarState
> {
  constructor(props: SystemStatusToolPanelProps) {
    super(props);
    this.state = { IsMinimised: true };
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
      <Flex
        flexDirection="column"
        alignItems="stretch"
        className="ab-ToolPanel__SystemStatus__wrap"
      >
        <Flex
          flexDirection="row"
          alignItems="stretch"
          className="ab-ToolPanel__SystemStatus__text"
          style={{ borderRadius: 'var(--ab__border-radius)' }}
          marginRight={2}
          padding={2}
          color={'text-on-secondary'}
          backgroundColor={messageTypeColor}
          fontSize={'var( --ab-font-size-2)'}
        >
          {this.props.StatusMessage}
        </Flex>
        <Flex
          flexDirection="column"
          alignItems="stretch"
          className="ab-ToolPanel__SystemStatus__wrap"
        >
          {clearButton}
        </Flex>
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel_SystemStatus"
        headerText={StrategyConstants.SystemStatusStrategyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose(StrategyConstants.SystemStatusStrategyId)}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
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
    onClose: (toolPanel: string) => dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(
          StrategyConstants.SystemStatusStrategyId,
          ScreenPopups.SystemStatusPopup
        )
      ),
  };
}

export let SystemStatusToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(SystemStatusToolPanelComponent);
