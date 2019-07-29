import * as React from 'react';

import { AdaptablePopover } from '../../AdaptablePopover';

import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
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
  cssClassName: string;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithImageTwoButtons extends React.Component<PanelWithImageTwoButtonsProps, {}> {
  render() {
    let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_PANEL;

    let className = 'ab_panel-with-button';
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    className += ' ' + 'ab_panel-with-button-reduce-header-padding';
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
                  <AdaptablePopover
                    cssClassName={cssClassName}
                    headerText=""
                    bodyText={this.props.infoBody}
                  />
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
      <Panel
        header={header}
        className={className}
        style={this.props.style}
        bsStyle={this.props.bsStyle}
      >
        {this.props.children}
      </Panel>
    );
  }
}
