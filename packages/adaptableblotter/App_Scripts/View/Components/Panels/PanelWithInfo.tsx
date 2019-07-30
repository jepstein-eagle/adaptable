import * as React from 'react';
import { AdaptablePopover } from '../../AdaptablePopover';

import { PanelProps, HeaderProps } from '../../../components/Panel';
import WizardPanel from '../../../components/WizardPanel';
import { Flex, Box } from 'rebass';

export interface PanelWithInfoProps extends PanelProps {
  infoBody: any[];
  cssClassName?: string;
  headerProps?: HeaderProps;
}

export class PanelWithInfo extends React.Component<PanelWithInfoProps, {}> {
  render() {
    let className = 'panel-with-info';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    const { headerProps } = this.props;

    let headerRow = (
      <Flex flexDirection="row">
        {this.props.header}

        <Box marginLeft={2}>
          <AdaptablePopover headerText="" bodyText={this.props.infoBody} />
        </Box>
      </Flex>
    );
    return (
      <WizardPanel
        headerProps={headerProps}
        header={headerRow}
        className={className}
        bodyScroll
        style={this.props.style}
      >
        {this.props.children}
      </WizardPanel>
    );
  }
}
