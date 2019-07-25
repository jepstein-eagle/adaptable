import * as React from 'react';
import Panel, { PanelProps } from '../../../components/Panel';
import { Flex } from 'rebass';

export interface PanelWithTwoButtonsProps extends PanelProps {
  firstButtonContent?: React.ReactNode;
  firstButton?: React.ReactElement<any>;

  secondButtonContent?: React.ReactNode;
  secondButton?: React.ReactElement<any>;

  cssClassName?: string;

  headerText: string;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithTwoButtons extends React.Component<PanelWithTwoButtonsProps, {}> {
  render() {
    let header = (
      <Flex alignItems="center" width="100%">
        <Flex flex={1}>{this.props.headerText}</Flex>

        {this.props.secondButton}
        {this.props.firstButton}
      </Flex>
    );

    return (
      <Panel {...this.props} header={header}>
        {this.props.children}
      </Panel>
    );
  }
}
