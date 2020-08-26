import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { Flex } from 'rebass';
import { UserFilter } from '../../PredefinedConfig/FilterState';

export class UserFilterSharedEntity extends React.Component<
  SharedEntityComponent<UserFilterSharedEntity>,
  {}
> {
  render(): any {
    let filter = this.props.Entity as UserFilter;
    let expressionString = 'Need a way to convert filter to string';

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{filter.Name}</Flex>
        <Flex flex={8}>{expressionString}</Flex>
      </Flex>
    );
  }
}
