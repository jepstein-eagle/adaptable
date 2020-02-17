import React, { ReactNode } from 'react';
import { Flex } from 'rebass';

export type DashboardToolbarProps = {
  title: string;
  children: ReactNode;
};

export function DashboardToolbar(props: DashboardToolbarProps) {
  return (
    <Flex flexDirection="column" mr={4}>
      {props.children}
      <b>{props.title}</b>
    </Flex>
  );
}
