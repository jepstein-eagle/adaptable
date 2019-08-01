import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { IColItem } from '../UIInterfaces';
import { Flex, Text, Box } from 'rebass';
import styled from 'styled-components';

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
    let colItems = this.props.colItems.map((colItem: IColItem, index: number) => {
      return (
        <Text
          key={index}
          fontSize={'var(--ab-font-size-2)'}
          style={{ flex: colItem.Size }}
          paddingLeft={1}
          paddingRight={1}
        >
          {colItem.Content}
        </Text>
      );
    });

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
