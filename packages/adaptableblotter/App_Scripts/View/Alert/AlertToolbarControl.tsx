import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux';
import { Label, Overlay, Fade, FormControl } from 'react-bootstrap';
import { AdaptableBlotterState } from '../../Redux/Store/Interface/IAdaptableStore';
import * as AlertRedux from '../../Redux/ActionsReducers/AlertRedux';
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
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { AlertDefinition } from '../../PredefinedConfig/RunTimeState/AlertState';

interface AlertToolbarControlProps
  extends ToolbarStrategyViewPopupProps<AlertToolbarControlComponent> {
  AlertDefinitions: AlertDefinition[];
  Alerts: IAdaptableAlert[];

  onDeleteAlert: (index: number) => SystemRedux.SystemAlertDeleteAction;
  onDeleteAllAlert: () => SystemRedux.SystemAlertDeleteAllAction;
}

interface AlertToolbarState {
  ShowMessage: boolean;
  Alerts: IAdaptableAlert[];
}

class AlertToolbarControlComponent extends React.Component<
  AlertToolbarControlProps,
  AlertToolbarState
> {
  constructor(props: AlertToolbarControlProps) {
    super(props);
    this.state = {
      ShowMessage: false,
      Alerts: this.props.Alerts,
    };
  }

  componentDidUpdate() {
    if (this.state.Alerts.length != this.props.Alerts.length) {
      this.setState({ ShowMessage: true, Alerts: this.props.Alerts });
    }
  }

  render() {
    let cssClassName: string = this.props.cssClassName + '__Alert';

    let alertsPanel = (
      <AlertsPanel
        cssClassName={cssClassName}
        Alerts={this.props.Alerts}
        ShowPanel={true}
        ShowHeader={false}
        onClearAlert={this.props.onDeleteAlert}
        onRender={() => this.setState({ ShowMessage: false })}
        onClearAllAlerts={this.props.onDeleteAllAlert}
      />
    );

    let collapsedText =
      this.props.Alerts.length == 0
        ? '0 Alerts'
        : this.props.Alerts.length == 1
        ? '1 Alert'
        : this.props.Alerts.length + ' Alerts';

    let formControlStyle: any =
      this.props.DashboardSize == 'xsmall' ? smallFormControlStyle : standardFormControlStyle;

    let labelStyle = this.props.UseSingleColourForButtons ? 'default' : 'success';

    let content = (
      <span>
        <FormControl
          bsSize={this.props.DashboardSize}
          style={formControlStyle}
          value={collapsedText}
          disabled={true}
          type="string"
        />{' '}
        {this.state.ShowMessage && <Label bsStyle={labelStyle}>New</Label>}{' '}
        {this.props.Alerts.length > 0 && (
          <span style={{ marginLeft: '3px' }}>
            <AdaptablePopover
              showDefaultStyle={this.props.UseSingleColourForButtons}
              size={this.props.DashboardSize}
              cssClassName={cssClassName}
              headerText=""
              tooltipText="Alerts"
              bodyText={[alertsPanel]}
              MessageType={this.getMessageType()}
              useButton={true}
              triggerAction={'click'}
            />
          </span>
        )}
      </span>
    );

    return (
      <PanelDashboard
        cssClassName={cssClassName}
        useDefaultPanelStyle={this.props.UseSingleColourForButtons}
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
    if (this.props.Alerts.find(a => a.MessageType == MessageType.Error) != null) {
      return MessageType.Error;
    }
    if (this.props.Alerts.find(a => a.MessageType == MessageType.Warning) != null) {
      return MessageType.Warning;
    }
    return MessageType.Info;
  }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
  return {
    AlertDefinitions: state.Alert.AlertDefinitions,
    Alerts: state.System.Alerts,
  };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
  return {
    onDeleteAlert: (index: number) => dispatch(SystemRedux.SystemAlertDelete(index)),
    onDeleteAllAlert: () => dispatch(SystemRedux.SystemAlertDeleteAll()),
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

let smallFormControlStyle: React.CSSProperties = {
  fontSize: 'xsmall',
  height: '22px',
  width: '80px',
};

let standardFormControlStyle: React.CSSProperties = {
  width: '80px',
};
