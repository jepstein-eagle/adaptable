import * as React from 'react';
import { Row, Col } from 'react-bootstrap';
import { AdaptablePopover } from '../../AdaptablePopover';

import { AdaptableBlotterForm } from '../Forms/AdaptableBlotterForm';

import { PanelProps } from '../../../components/Panel';
import WizardPanel from '../../../components/WizardPanel';
import { Flex, Box } from 'rebass';

export interface PanelWithInfoProps extends PanelProps {
  infoBody: any[];
  cssClassName?: string;
}

export class PanelWithInfo extends React.Component<PanelWithInfoProps, {}> {
  render() {
    let className = 'panel-with-info';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }

    let headerRow = (
      <Flex flexDirection="row">
        {this.props.header}

        <Box marginLeft={2}>
          <AdaptablePopover
            cssClassName={this.props.cssClassName || ''}
            headerText=""
            bodyText={this.props.infoBody}
          />
        </Box>
      </Flex>
    );
    return (
      <WizardPanel header={headerRow} className={className} bodyScroll style={this.props.style}>
        {this.props.children}
      </WizardPanel>
    );
  }
}
