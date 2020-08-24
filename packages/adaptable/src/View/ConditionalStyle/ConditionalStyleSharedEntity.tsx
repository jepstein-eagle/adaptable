import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { Flex } from 'rebass';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

export class ConditionalStyleSharedEntity extends React.Component<
  SharedEntityComponent<ConditionalStyleSharedEntity>,
  {}
> {
  render(): any {
    let conditionalStyle: ConditionalStyle = this.props.Entity as ConditionalStyle;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>
          {conditionalStyle.StyleApplied == 'Column'
            ? this.props.Api.columnApi.getFriendlyNameFromColumnId(conditionalStyle.ColumnId)
            : 'Whole Row'}
        </Flex>
        <Flex flex={3}>
          <StyleVisualItem Style={conditionalStyle.Style} />
        </Flex>
        <Flex flex={5}>
          {this.props.Api.sharedQueryApi.getExpressionForQueryObject(conditionalStyle)}
        </Flex>
      </Flex>
    );
  }
}
