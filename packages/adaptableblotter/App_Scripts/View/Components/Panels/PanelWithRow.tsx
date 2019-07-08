import * as React from 'react';

import { IColItem } from '../../UIInterfaces';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import Panel, { PanelProps } from '../../../components/Panel';
import { Flex, Text } from 'rebass';

export interface PanelWithRowProps extends PanelProps {
  // CellInfo: [string, number][]
  colItems: IColItem[];
  cssClassName: string;
}

//We cannot destructure this.props using the react way in typescript which is a real pain as you
//need to transfer props individually as a consequence
//let { buttonContent, ...other } = this.props
export class PanelWithRow extends React.Component<PanelWithRowProps, {}> {
  render() {
    let cssClassName = this.props.cssClassName + StyleConstants.ITEMS_TABLE_HEADER;

    let headerItems = this.props.colItems.map((colItem: IColItem, index) => {
      return (
        <Text
          key={colItem.Content || index}
          fontSize={1}
          paddingLeft={1}
          paddingRight={1}
          style={{
            flex: colItem.Size,
          }}
        >
          {colItem.Content}
        </Text>
      );
    });

    let header = (
      <Flex alignItems="center" style={{ width: '100%' }}>
        {headerItems}
      </Flex>
    );

    return (
      <div className={cssClassName}>
        <Panel header={header} border={this.props.border} bodyProps={this.props.bodyProps}>
          {this.props.children}
        </Panel>
      </div>
    );
  }
}
