import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { Flex } from 'rebass';

export class FormatColumnSharedEntity extends React.Component<
  SharedEntityComponent<FormatColumnSharedEntity>,
  {}
> {
  render(): any {
    let fc: FormatColumn = this.props.Entity as FormatColumn;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>
          {ColumnHelper.getFriendlyNameFromColumnId(fc.ColumnId, this.props.Columns)}
        </Flex>
        <Flex flex={8}>
          <StyleVisualItem Style={fc.Style} />
        </Flex>
      </Flex>
    );
  }
}
