import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
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
        <Flex flex={4}>
          {conditionalStyle.ConditionalStyleScope == 'Column'
            ? this.props.Api.gridApi.getFriendlyNameFromColumnId(conditionalStyle.ColumnId)
            : 'Whole Row'}
        </Flex>
        <Flex flex={3}>
          <StyleVisualItem Style={conditionalStyle.Style} />
        </Flex>
        <Flex flex={5}>
          {ExpressionHelper.ConvertExpressionToString(
            conditionalStyle.Expression,
            this.props.Api.gridApi.getColumns(),
            this.props.Api
          )}
        </Flex>
      </Flex>
    );
  }
}
