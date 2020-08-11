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

    let expression: string = StringExtensions.IsNotNullOrEmpty(conditionalStyle.Expression)
      ? conditionalStyle.Expression
      : this.props.Api.sharedQueryApi.getExpressionForQuery(conditionalStyle.SharedQueryId);

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>
          {conditionalStyle.ConditionalStyleScope == 'Column'
            ? this.props.Api.gridApi.getFriendlyNameFromColumnId(conditionalStyle.ColumnId)
            : 'Whole Row'}
        </Flex>
        <Flex flex={3}>
          <StyleVisualItem Style={conditionalStyle.Style} />
        </Flex>
        <Flex flex={5}>{expression}</Flex>
      </Flex>
    );
  }
}
