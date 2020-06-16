import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { Flex } from 'rebass';
import { UserFilter } from '../../PredefinedConfig/UserFilterState';

export class UserFilterSharedEntity extends React.Component<
  SharedEntityComponent<UserFilterSharedEntity>,
  {}
> {
  render(): any {
    let filter = this.props.Entity as UserFilter;
    let expressionString = ExpressionHelper.ConvertExpressionToString(
      filter.Expression,
      this.props.Api.gridApi.getColumns(),
      this.props.Api
    );

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{filter.Name}</Flex>
        <Flex flex={8}>{expressionString}</Flex>
      </Flex>
    );
  }
}
