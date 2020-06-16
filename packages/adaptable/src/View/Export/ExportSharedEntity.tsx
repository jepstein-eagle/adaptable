import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { Report } from '../../PredefinedConfig/ExportState';
import { Flex } from 'rebass';

export class ExportSharedEntity extends React.Component<
  SharedEntityComponent<ExportSharedEntity>,
  {}
> {
  render(): any {
    let report = this.props.Entity as Report;
    let expressionString = ExpressionHelper.ConvertExpressionToString(
      report.Expression,
      this.props.Api
    );

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{report.Name}</Flex>
        <Flex flex={8}>{expressionString}</Flex>
      </Flex>
    );
  }
}
