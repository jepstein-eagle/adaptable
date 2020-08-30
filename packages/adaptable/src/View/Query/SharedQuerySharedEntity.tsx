import * as React from 'react';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { SharedQuery } from '../../PredefinedConfig/QueryState';
import { Flex } from 'rebass';

export class SharedQuerySharedEntity extends React.Component<
  SharedEntityComponent<SharedQuerySharedEntity>,
  {}
> {
  render(): any {
    let sharedQuery: SharedQuery = this.props.entity as SharedQuery;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{sharedQuery.Name}</Flex>
        <Flex flex={8}>{sharedQuery.Expression}</Flex>
      </Flex>
    );
  }
}
