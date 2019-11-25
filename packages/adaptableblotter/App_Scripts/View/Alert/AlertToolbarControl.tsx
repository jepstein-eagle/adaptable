import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { AdaptableBlotterState } from '../../PredefinedConfig/AdaptableBlotterState';

import * as SystemRedux from '../../Redux/ActionsReducers/SystemRedux';
import * as DashboardRedux from '../../Redux/ActionsReducers/DashboardRedux';
import * as PopupRedux from '../../Redux/ActionsReducers/PopupRedux';
import { ToolbarStrategyViewPopupProps } from '../Components/SharedProps/ToolbarStrategyViewPopupProps';
import { PanelDashboard } from '../Components/Panels/PanelDashboard';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as ScreenPopups from '../../Utilities/Constants/ScreenPopups';
import { AdaptablePopover } from '../AdaptablePopover';
import { MessageType, AccessLevel, DashboardSize } from '../../PredefinedConfig/Common/Enums';
import { AlertsPanel } from './AlertsPanel';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import { Flex } from 'rebass';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';
import UIHelper from '../UIHelper';

interface AlertToolbarControlProps
  extends ToolbarStrategyViewPopupProps<AlertToolbarControlComponent> {
  AlertDefinitions: AlertDefinition[];
  AdaptableAlerts: AdaptableAlert[];

  onDeleteAlert: (alert: AdaptableAlert) => SystemRedux.SystemAlertDeleteAction;
  onDeleteAllAlert: (alerts: AdaptableAlert[]) => SystemRedux.SystemAlertDeleteAllAction;
}

interface AlertToolbarState {
  ShowMessage: boolean;
  Alerts: AdaptableAlert[];
}

class AlertToolbarControlComponent extends React.Component<
  AlertToolbarControlProps,
  AlertToolbarState
> {
  constructor(props: AlertToolbarControlProps) {
    super(props);
    this.state = {
      ShowMessage: false,
      Alerts: this.props.AdaptableAlerts,
    };
  }

  componentDidUpdate() {
    if (this.state.Alerts.length != this.props.AdaptableAlerts.length) {
      this.setState({ ShowMessage: true, Alerts: this.props.AdaptableAlerts });
    }
  }

  render() {
    let messageType: MessageType = this.getMessageType();

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

    let buttonColor: string = ArrayExtensions.IsNotNullOrEmpty(this.props.AdaptableAlerts)
      ? messageTypeColor
      : 'primary';
    let buttonTextColor: string = ArrayExtensions.IsNotNullOrEmpty(this.props.AdaptableAlerts)
      ? 'text-on-secondary'
      : 'text-on-primary';

    let content = (
      <Flex alignItems="stretch" className="ab-DashboardToolbar__Alert__wrap">
        <Flex
          style={{ borderRadius: 'var(--ab__border-radius)' }}
          className="ab-DashboardToolbar__Alert__text"
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
              className="ab-DashboardToolbar__Alert__info"
              headerText=""
              // tooltipText="Alerts"
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
      <PanelDashboard
        className="ab-DashboardToolbar__Alert"
        headerText={StrategyConstants.AlertStrategyName}
        glyphicon={StrategyConstants.AlertGlyph}
        onClose={() => this.props.onClose(StrategyConstants.AlertStrategyId)}
        onConfigure={() => this.props.onConfigure()}
      >
        {content}
      </PanelDashboard>
    );
  }

  private getMessageType(): MessageType {
    if (
      this.props.AdaptableAlerts.find(a => a.AlertDefinition.MessageType == MessageType.Error) !=
      null
    ) {
      return MessageType.Error;
    }
    if (
      this.props.AdaptableAlerts.find(a => a.AlertDefinition.MessageType == MessageType.Warning) !=
      null
    ) {
      return MessageType.Warning;
    }
    if (
      this.props.AdaptableAlerts.find(a => a.AlertDefinition.MessageType == MessageType.Success) !=
      null
    ) {
      return MessageType.Success;
    }
    return MessageType.Info;
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    AlertDefinitions: state.Alert.AlertDefinitions,
    AdaptableAlerts: state.System.AdaptableAlerts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<Redux.Action<AdaptableBlotterState>>) {
  return {
    onDeleteAlert: (alert: AdaptableAlert) => dispatch(SystemRedux.SystemAlertDelete(alert)),
    onDeleteAllAlert: (alerts: AdaptableAlert[]) =>
      dispatch(SystemRedux.SystemAlertDeleteAll(alerts)),
    onClose: (dashboardControl: string) =>
      dispatch(DashboardRedux.DashboardHideToolbar(dashboardControl)),
    onConfigure: () =>
      dispatch(
        PopupRedux.PopupShowScreen(StrategyConstants.AlertStrategyId, ScreenPopups.AlertPopup)
      ),
  };
}

export let AlertToolbarControl = connect(
  mapStateToProps,
  mapDispatchToProps
)(AlertToolbarControlComponent);
