import * as React from 'react';
import { Glyphicon, Label, ListGroupItem, ListGroup, InputGroup } from 'react-bootstrap';
import * as StyleConstants from '../../Utilities/Constants/StyleConstants';
import { UIHelper } from '../UIHelper';
import { ButtonClear } from '../Components/Buttons/ButtonClear';
import { ButtonPreviewDelete } from '../Components/Buttons/ButtonPreviewDelete';
import { PanelWithButton } from '../Components/Panels/PanelWithButton';
import { AccessLevel } from '../../Utilities/Enums';
import { IAdaptableAlert } from '../../Utilities/Interface/IMessage';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';

export interface AlertsPanelProps extends React.ClassAttributes<AlertsPanel> {
  Alerts: IAdaptableAlert[];
  ShowPanel: boolean;
  cssClassName: string;
  ShowHeader: boolean;
  onClearAlert: (index: number) => void;
  onClearAllAlerts: () => void;
  onRender: () => void;
}

export class AlertsPanel extends React.Component<AlertsPanelProps, {}> {
  componentWillUnmount() {
    this.props.onRender();
  }

  render(): any {
    let cssClassName: string = this.props.cssClassName + StyleConstants.ALERTS;
    let panelHeader: string = this.props.ShowHeader && this.props.Alerts != null ? 'Alerts: ' : '';

    let alerts = this.props.Alerts.map((alert: IAdaptableAlert, index: number) => {
      let alertHasheader: boolean = StringExtensions.IsNotNullOrEmpty(alert.Header);

      let alertText = (
        <div style={{ maxWidth: '600px' }}>
          <div>
            <InputGroup>
              <span>
                <Label
                  bsSize="xsmall"
                  bsStyle={UIHelper.getStyleNameByMessageType(alert.MessageType)}
                  className="ab_medium_padding"
                >
                  <Glyphicon glyph={UIHelper.getGlyphByMessageType(alert.MessageType)} />
                </Label>{' '}
                {alertHasheader ? (
                  <b>{alert.Header}</b>
                ) : (
                  <span style={{ fontSize: 'xsmall' }}>{alert.Msg}</span>
                )}
              </span>
              <InputGroup.Button>
                <ButtonPreviewDelete
                  cssClassName={this.props.cssClassName}
                  onClick={() => this.props.onClearAlert(index)}
                  overrideTooltip="Clear Alert"
                  bsStyle={'default'}
                  DisplayMode="Glyph"
                  size={'xsmall'}
                  overrideDisableButton={false}
                  style={{ float: 'left' }}
                  AccessLevel={AccessLevel.Full}
                />
              </InputGroup.Button>
            </InputGroup>
          </div>
          <div>{alertHasheader && <span style={{ fontSize: 'xsmall' }}>{alert.Msg}</span>}</div>
        </div>
      );

      return <ListGroupItem key={index}>{alertText}</ListGroupItem>;
    });

    let clearAllButton = (
      <ButtonClear
        cssClassName={this.props.cssClassName + ' pull-right '}
        onClick={() => this.props.onClearAllAlerts()}
        bsStyle={'default'}
        style={{ margin: '5px' }}
        size={'xsmall'}
        overrideText={'Clear All'}
        DisplayMode="Text"
        hideToolTip={true}
        AccessLevel={AccessLevel.Full}
      />
    );

    return (
      <PanelWithButton
        cssClassName={cssClassName}
        headerText={'Alerts'}
        className="ab_no-padding-except-top-panel ab_small-padding-panel"
        bsStyle="default"
        button={clearAllButton}
      >
        <ListGroup style={{ overflowY: 'hidden' }}>{alerts}</ListGroup>
      </PanelWithButton>
    );
  }
}
