import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { Flex } from 'rebass';

export class ConditionalStyleSharedEntity extends React.Component<
  SharedEntityComponent<ConditionalStyleSharedEntity>,
  {}
> {
  render(): any {
    let conditionalStyle: ConditionalStyle = this.props.Entity as ConditionalStyle;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{this.props.Api.scopeApi.getScopeToString(conditionalStyle.Scope)}</Flex>
        <Flex flex={3}>
          <StyleVisualItem Style={conditionalStyle.Style} />
        </Flex>
        <Flex flex={5}>
          {this.props.Api.queryApi.getExpressionForQueryObject(conditionalStyle)}
        </Flex>
      </Flex>
    );
  }
}
