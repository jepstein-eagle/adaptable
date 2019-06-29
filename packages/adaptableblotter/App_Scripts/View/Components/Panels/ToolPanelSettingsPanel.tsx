import * as React from 'react';
import { PanelProps, Panel, Row, Col, Button, Glyphicon } from 'react-bootstrap';
import { AdaptablePopover } from '../../AdaptablePopover';
import { MessageType } from '../../../PredefinedConfig/Common/Enums';
import { AdaptableBlotterForm } from '../Forms/AdaptableBlotterForm';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';

export interface ToolPanelSettingsPanelProps extends PanelProps {
  button: React.ReactElement<any>;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class ToolPanelSettingsPanel extends React.Component<ToolPanelSettingsPanelProps, {}> {
  render() {
    let header = (
      <span style={{ verticalAlign: 'middle' }}>
        {' '}
        <Glyphicon glyph={'wrench'} /> <span>Settings</span>
        {this.props.button &&
          React.cloneElement(this.props.button, {
            style: {
              float: 'right',
              border: '0px',
              background: 'none',
              borderRadius: '0px',
              boxShadow: 'none',
            },
          })}
      </span>
    );

    return (
      <Panel
        className="ab_small-padding-panel ab-panel-header-toolbar-settings"
        header={header}
        style={{ margin: '0px', padding: '0px' }}
        bsStyle={this.props.bsStyle}
        bsSize={'xsmall'}
      >
        {this.props.children}
      </Panel>
    );
  }
}
