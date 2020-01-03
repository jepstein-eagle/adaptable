import * as React from 'react';
import { UIHelper } from '../UIHelper';
import ButtonPreviewDelete from '../Components/Buttons/ButtonPreviewDelete';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AccessLevel, MessageType } from '../../PredefinedConfig/Common/Enums';
import { AdaptableAlert } from '../../Utilities/Interface/IMessage';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { Flex, Text } from 'rebass';
import icons from '../../components/icons';
import { ReactComponentLike } from 'prop-types';
import ListGroupItem from '../../components/List/ListGroupItem';
import ListGroup from '../../components/List/ListGroup';
import SimpleButton from '../../components/SimpleButton';

export interface AlertsPanelProps extends React.ClassAttributes<AlertsPanel> {
  Alerts: AdaptableAlert[];
  ShowPanel: boolean;

  ShowHeader: boolean;
  onClearAlert: (alert: AdaptableAlert) => void;
  onClearAllAlerts: (alerts: AdaptableAlert[]) => void;
  onRender: () => void;
}

export class AlertsPanel extends React.Component<AlertsPanelProps, {}> {
  componentWillUnmount() {
    this.props.onRender();
  }

  render(): any {
    let alerts = this.props.Alerts.map((alert: AdaptableAlert, index: number) => {
      let alertHasheader: boolean = StringExtensions.IsNotNullOrEmpty(alert.Header);

      const textColor = UIHelper.getColorByMessageType(alert.AlertDefinition
        .MessageType as MessageType);
      const textStyle = {
        color: textColor,
        fill: textColor,
      };
      const iconName = UIHelper.getGlyphByMessageType(alert.AlertDefinition
        .MessageType as MessageType);
      const IconCmp = icons[iconName] as ReactComponentLike;
      const icon = IconCmp ? <IconCmp /> : null;

      let alertText = (
        <div key={alert.Uuid} style={{ maxWidth: '600px', width: '100%' }}>
          <Flex alignItems="center" width="100%">
            <Text style={textStyle}>{icon}</Text>

            {alertHasheader ? (
              <b style={{ flex: 1 }}>{alert.Header}</b>
            ) : (
              <div style={{ fontSize: 10, flex: 1, display: 'inline-block' }}>{alert.Msg}</div>
            )}

            <ButtonPreviewDelete
              onClick={() => this.props.onClearAlert(alert)}
              tooltip="Clear Alert"
              disabled={false}
              style={{ float: 'left' }}
              AccessLevel={AccessLevel.Full}
            />
          </Flex>

          <div>{alertHasheader && <span style={{ fontSize: 10 }}>{alert.Msg}</span>}</div>
        </div>
      );

      return <ListGroupItem key={index}>{alertText}</ListGroupItem>;
    });

    let clearAllButton = (
      <SimpleButton
        onClick={() => this.props.onClearAllAlerts(this.props.Alerts)}
        variant="raised"
        tone="neutral"
        AccessLevel={AccessLevel.Full}
      >
        Clear All
      </SimpleButton>
    );

    return (
      <PanelWithButton
        variant="default"
        bodyProps={{ padding: 0 }}
        headerText={'Alerts'}
        button={clearAllButton}
      >
        <ListGroup>{alerts}</ListGroup>
      </PanelWithButton>
    );
  }
}
