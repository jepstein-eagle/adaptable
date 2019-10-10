import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { Flex, Text, Box } from 'rebass';
import styled from 'styled-components';
import { IColItem } from '../UIInterfaces';

export interface AdaptableObjectRowProps extends React.ClassAttributes<AdaptableObjectRow> {
  colItems: IColItem[];
  fontSize?: string;
  onClick?: (e: React.SyntheticEvent) => void;
  style?: React.CSSProperties;
}

const Row = styled.div`
  background: var(--ab-cmp-listgroupitem__background);
  color: var(--ab-cmp-listgroupitem__color);
  border-radius: var(--ab-cmp-listgroupitem__border-radius);

  &:nth-child(2n + 1) {
    background: var(--ab-cmp-listgroupitem--odd__background);
    color: var(--ab-cmp-listgroupitem--odd__color);
  }
`;

export class AdaptableObjectRow extends React.Component<AdaptableObjectRowProps, {}> {
  render(): any {
    const colItems = this.props.colItems.map((colItem: IColItem, index: number) => (
      <Text
        key={index}
        fontSize={'var(--ab-font-size-3)'}
        title={typeof colItem.Content === 'string' ? colItem.Content : null}
        style={{
          flex: colItem.Size,
          whiteSpace: 'nowrap',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
        }}
        paddingLeft={1}
        paddingRight={1}
      >
        {colItem.Content}
      </Text>
    ));

    return (
      <Row onClick={this.props.onClick} style={this.props.style}>
        <Box padding={2} className="list-group-item">
          <Flex
            alignItems="center"
            padding={0}
            margin={0}
            style={{
              overflowY: 'visible',
            }}
          >
            {colItems}
          </Flex>
        </Box>
      </Row>
    );
  }
}
