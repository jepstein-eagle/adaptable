import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableState } from '../../PredefinedConfig/AdaptableState';
import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as ToolPanelRedux from '../../Redux/ActionsReducers/ToolPanelRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptablePopover } from '../AdaptablePopover';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { AlertsPanel } from './AlertsPanel';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { Flex } from 'rebass';
import UIHelper from '../UIHelper';
import { ToolPanelStrategyViewPopupProps } from '../Components/SharedProps/ToolPanelStrategyViewPopupProps';
import { PanelToolPanel } from '../Components/Panels/PanelToolPanel';
import { AdaptableToolPanel } from '../../PredefinedConfig/Common/Types';

interface AlertToolPanelProps extends ToolPanelStrategyViewPopupProps<AlertToolPanelComponent> {
  AlertDefinitions: AlertDefinition[];
  AdaptableAlerts: AdaptableAlert[];

  onDeleteAlert: (alert: AdaptableAlert) => SystemRedux.SystemAlertDeleteAction;
  onDeleteAllAlert: (alerts: AdaptableAlert[]) => SystemRedux.SystemAlertDeleteAllAction;
}

interface AlertToolbarState {
  ShowMessage: boolean;
  Alerts: AdaptableAlert[];
  IsMinimised: boolean;
}

class AlertToolPanelComponent extends React.Component<AlertToolPanelProps, AlertToolbarState> {
  constructor(props: AlertToolPanelProps) {
    super(props);
    this.state = {
      ShowMessage: false,
      Alerts: this.props.AdaptableAlerts,
      IsMinimised: true,
    };
  }

  componentDidUpdate() {
    if (this.state.Alerts.length != this.props.AdaptableAlerts.length) {
      this.setState({ ShowMessage: true, Alerts: this.props.AdaptableAlerts });
    }
  }

  render() {
    let messageType: MessageType = UIHelper.getMessageTypeFromAdaptableAlerts(
      this.props.AdaptableAlerts
    );

    let messageTypeColor: string = UIHelper.getColorByMessageType(messageType);

    let alertsPanel = (
      <AlertsPanel
        Alerts={this.props.AdaptableAlerts}
        ShowPanel={true}
        ShowHeader={false}
        onClearAlert={this.props.onDeleteAlert}
        onRender={() => this.setState({ ShowMessage: false })}
        onClearAllAlerts={this.props.onDeleteAllAlert}
      />
    );

    let collapsedText =
      this.props.AdaptableAlerts.length == 0
        ? '0 Alerts'
        : this.props.AdaptableAlerts.length == 1
        ? '1 Alert'
        : this.props.AdaptableAlerts.length + ' Alerts';

    let buttonColor: string = UIHelper.getButtonColourForAdaptableAlerts(
      this.props.AdaptableAlerts,
      messageTypeColor
    );

    let buttonTextColor: string = UIHelper.getButtonTextColourForArrayandMessageType(
      this.props.AdaptableAlerts,
      messageType
    );

    let content = (
      <Flex alignItems="stretch" className="ab-ToolPanel__Alert__wrap">
        <Flex
          style={{ borderRadius: 'var(--ab__border-radius)' }}
          className="ab-ToolPanel__Alert__text"
          marginRight={2}
          padding={2}
          color={buttonTextColor}
          backgroundColor={buttonColor}
          fontSize={'var( --ab-font-size-2)'}
          alignItems="center"
        >
          {collapsedText}
        </Flex>

        {this.props.AdaptableAlerts.length > 0 && (
          <Flex alignItems="center">
            <AdaptablePopover
              className="ab-ToolPanel__Alert__info"
              headerText=""
              bodyText={[alertsPanel]}
              MessageType={messageType}
              useButton={true}
              showEvent={'focus'}
              hideEvent="blur"
            />
          </Flex>
        )}
      </Flex>
    );

    return (
      <PanelToolPanel
        className="ab-ToolPanel__Alert"
        headerText={StrategyConstants.AlertStrategyName}
        onConfigure={() => this.props.onConfigure()}
        onMinimiseChanged={() => this.setState({ IsMinimised: !this.state.IsMinimised })}
        isMinimised={this.state.IsMinimised}
        onClose={() => this.props.onClose('Alert')}
      >
        {this.state.IsMinimised ? null : content}
      </PanelToolPanel>
    );
  }
}

function mapStateToProps(state: AdaptableState, ownProps: any) {
  return {
    AlertDefinitions: state.Alert.AlertDefinitions,
    AdaptableAlerts: state.System.AdaptableAlerts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableState>>) {
  return {
    onDeleteAlert: (alert: AdaptableAlert) => dispatch(SystemRedux.SystemAlertDelete(alert)),
    onDeleteAllAlert: (alerts: AdaptableAlert[]) =>
      dispatch(SystemRedux.SystemAlertDeleteAll(alerts)),
    onClose: (toolPanel: AdaptableToolPanel) =>
      dispatch(ToolPanelRedux.ToolPanelHideToolPanel(toolPanel)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.AlertStrategyId, ScreenPopups.AlertPopup)
      ),
  };
}

export let AlertToolPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertToolPanelComponent);
