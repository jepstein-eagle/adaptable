import * as React from 'react';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';
import { Flex } from 'rebass';

export class CalculatedColumnSharedEntity extends React.Component<
  SharedEntityComponent<CalculatedColumnSharedEntity>,
  {}
> {
  render(): any {
    let calcCol: CalculatedColumn = this.props.entity as CalculatedColumn;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{calcCol.ColumnId}</Flex>
        <Flex flex={8}>{calcCol.ColumnExpression}</Flex>
      </Flex>
    );
  }
}
