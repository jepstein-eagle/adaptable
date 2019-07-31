import * as React from 'react';
import { Icon } from '../../../components/icons';
import Panel, { PanelProps } from '../../../components/Panel';

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
        <Icon name={'build'} /> <span>Settings</span>
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
      <Panel header={header} style={{ margin: '0px', padding: '0px' }}>
        {this.props.children}
      </Panel>
    );
  }
}
