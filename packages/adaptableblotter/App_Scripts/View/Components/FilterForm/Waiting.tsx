import * as React from 'react';
import { Flex, FlexProps } from 'rebass';
/// <reference path="../../typings/.d.ts" />

export type WaitingProps = React.ClassAttributes<Waiting> & {
  WaitingMessage: string;
} & FlexProps;

import IconRefresh from '../../../components/icons/refresh';

export class Waiting extends React.Component<WaitingProps, {}> {
  render(): any {
    const { WaitingMessage, ...props } = this.props;
    return (
      <Flex flexDirection="column" marginTop={2} marginBottom={2} {...props}>
        <Flex flexDirection="row" justifyContent="center">
          <IconRefresh />
        </Flex>

        <Flex flexDirection="row" justifyContent="center">
          <h5>{WaitingMessage}</h5>
        </Flex>
      </Flex>
    );
  }
}
