import * as React from 'react';

import { Flex, Text } from 'rebass';
import { IColItem } from '../../UIInterfaces';
import Panel, { PanelProps } from '../../../components/Panel';

export interface PanelWithRowProps extends PanelProps {
  // CellInfo: [string, number][]
  colItems: IColItem[];
}

// We cannot destructure this.props using the react way in typescript which is a real pain as you
// need to transfer props individually as a consequence
// let { buttonContent, ...other } = this.props
export class PanelWithRow extends React.Component<PanelWithRowProps, {}> {
  render() {
    const headerItems = this.props.colItems.map((colItem: IColItem, index) => (
      <Text
        key={colItem.key || colItem.Content || index}
        fontWeight="bold"
        fontSize={'var(--ab-font-size-3)'}
        paddingLeft={1}
        paddingRight={1}
        style={{
          flex: colItem.Size,
        }}
      >
        {colItem.Content}
      </Text>
    ));

    const header = (
      <Flex alignItems="center" style={{ width: '100%' }}>
        {headerItems}
      </Flex>
    );

    return (
      <div style={this.props.style}>
        <Panel
          bodyScroll
          header={header}
          border={this.props.border}
          bodyProps={this.props.bodyProps}
        >
          {this.props.children}
        </Panel>
      </div>
    );
  }
}
