import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { Report } from '../../PredefinedConfig/ExportState';
import { Flex } from 'rebass';

export class ExportSharedEntity extends React.Component<
  SharedEntityComponent<ExportSharedEntity>,
  {}
> {
  render(): any {
    let report = this.props.entity as Report;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{report.Name}</Flex>
        <Flex flex={8}>{this.props.api.queryApi.QueryObjectToString(report)}</Flex>
      </Flex>
    );
  }
}
