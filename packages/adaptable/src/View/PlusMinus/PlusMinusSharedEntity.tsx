import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
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
          {this.props.Api.columnApi.getFriendlyNameFromColumnId(plusMinusRule.ColumnId)}
        </Flex>
        <Flex flex={3}>{plusMinusRule.NudgeValue.toString()}</Flex>
        <Flex flex={5}>{this.props.Api.queryApi.getExpressionForQueryObject(plusMinusRule)}</Flex>
      </Flex>
    );
  }
}
