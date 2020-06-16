import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import { Flex } from 'rebass';

export class PlusMinusSharedEntity extends React.Component<
  SharedEntityComponent<PlusMinusSharedEntity>,
  {}
> {
  render(): any {
    let plusMinusRule: PlusMinusRule = this.props.Entity as PlusMinusRule;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>
          {this.props.Api.gridApi.getFriendlyNameFromColumnId(plusMinusRule.ColumnId)}
        </Flex>
        <Flex flex={3}>{plusMinusRule.NudgeValue.toString()}</Flex>
        <Flex flex={5}>
          {ExpressionHelper.ConvertExpressionToString(plusMinusRule.Expression, this.props.Api)}
        </Flex>
      </Flex>
    );
  }
}
