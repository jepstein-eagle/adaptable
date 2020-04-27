import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { SharedEntityComponent } from '../Components/SharedProps/ConfigEntityRowProps';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { Flex } from 'rebass';
import { Shortcut } from '../../PredefinedConfig/ShortcutState';

export class ShortcutSharedEntity extends React.Component<
  SharedEntityComponent<ShortcutSharedEntity>,
  {}
> {
  render(): any {
    let shortcut: Shortcut = this.props.Entity as Shortcut;

    return (
      <Flex flexDirection="row" alignItems="center">
        <Flex flex={4}>{shortcut.ColumnType}</Flex>
        <Flex flex={4}>{shortcut.ShortcutKey}</Flex>
        <Flex flex={4}>{shortcut.ShortcutResult}</Flex>
      </Flex>
    );
  }
}
