import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { Flex, Text, Box } from 'rebass';
import { IColItem } from '../../UIInterfaces';

export interface AdaptableObjectRowProps extends React.ClassAttributes<AdaptableObjectRow> {
  colItems: IColItem[];
  fontSize?: string;
  onClick?: (e: React.SyntheticEvent) => void;
  style?: React.CSSProperties;
}

export class AdaptableObjectRow extends React.Component<AdaptableObjectRowProps, {}> {
  render(): any {
    const colItems = this.props.colItems.map((colItem: IColItem, index: number) => (
      <Text
        key={index}
        fontSize={'var(--ab-font-size-3)'}
        title={typeof colItem.Content === 'string' ? colItem.Content : undefined}
        style={{
          flex: colItem.Size,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
        data-name="list-group-cell"
        paddingLeft={1}
        paddingRight={1}
      >
        {colItem.Content}
      </Text>
    ));

    return (
      <div className="ab-AdaptableObjectRow" onClick={this.props.onClick} style={this.props.style}>
        <Flex
          data-name="list-group-item"
          className="list-group-item"
          alignItems="center"
          padding={2}
          margin={0}
          style={{
            overflowY: 'visible',
          }}
        >
          {colItems}
        </Flex>
      </div>
    );
  }
}
