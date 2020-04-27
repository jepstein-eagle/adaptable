import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { Layout } from '../../PredefinedConfig/LayoutState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { Flex } from 'rebass';

export class LayoutSharedEntity extends React.Component<
  SharedEntityComponent<LayoutSharedEntity>,
  {}
> {
  render(): any {
    let layout: Layout = this.props.Entity as Layout;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{layout.Name}</Flex>
        <Flex flex={8}>{layout.Columns.join(', ')}</Flex>
      </Flex>
    );
  }
}
