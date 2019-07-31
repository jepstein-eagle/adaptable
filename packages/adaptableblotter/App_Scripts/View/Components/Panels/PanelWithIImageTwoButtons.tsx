import * as React from 'react';

import { AdaptablePopover } from '../../AdaptablePopover';

import { Flex, Box } from 'rebass';
import { Icon } from '../../../components/icons';
import Panel, { PanelProps } from '../../../components/Panel';

export interface PanelWithImageTwoButtonsProps extends PanelProps {
  firstButtonContent?: React.ReactNode;
  firstButton?: React.ReactElement<any>;

  secondButtonContent?: React.ReactNode;
  secondButton?: React.ReactElement<any>;

  glyphicon?: string;
  infoBody?: any[];
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithImageTwoButtons extends React.Component<PanelWithImageTwoButtonsProps, {}> {
  render() {
    let header = (
      <Flex flexDirection="column">
        <Flex flexDirection="row" alignItems="center">
          <Flex flex={9}>
            <Icon name={this.props.glyphicon} />
            {this.props.header}
            {this.props.infoBody != null && (
              <span>
                <label> </label>
                <span>
                  {' '}
                  <AdaptablePopover headerText="" bodyText={this.props.infoBody} />
                </span>
              </span>
            )}
          </Flex>

          <Flex flex={1} />
          <Box>
            {this.props.secondButton}
            {this.props.firstButton}
          </Box>
        </Flex>
      </Flex>
    );
    return (
      <Panel header={header} style={this.props.style}>
        {this.props.children}
      </Panel>
    );
  }
}
