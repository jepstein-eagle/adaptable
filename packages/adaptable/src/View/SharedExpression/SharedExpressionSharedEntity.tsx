import * as React from 'react';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { SharedExpression } from '../../PredefinedConfig/SharedExpressionState';
import { Flex } from 'rebass';

export class SharedExpressionSharedEntity extends React.Component<
  SharedEntityComponent<SharedExpressionSharedEntity>,
  {}
> {
  render(): any {
    let calcCol: SharedExpression = this.props.Entity as SharedExpression;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{calcCol.ColumnId}</Flex>
        <Flex flex={8}>{calcCol.ColumnExpression}</Flex>
      </Flex>
    );
  }
}
