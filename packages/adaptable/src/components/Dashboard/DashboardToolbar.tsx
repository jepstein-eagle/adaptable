import React, { ReactNode } from 'react';
import { Flex } from 'rebass';
import { ButtonConfigure } from '../../View/Components/Buttons/ButtonConfigure';

export type DashboardToolbarProps = {
  title: string;
  onConfigure?: () => void;
  children: ReactNode;
};

export function DashboardToolbar(props: DashboardToolbarProps) {
  return (
    <div className="ab-Dashboard__toolbar">
      <div className="ab-Dashboard__toolbar-content">{props.children}</div>
      <Flex>
        <div className="ab-Dashboard__toolbar-title">{props.title}</div>
        <ButtonConfigure
          iconSize={16}
          marginLeft={2}
          className="ab-DashboardPanel__header-configure-button"
          tooltip={'Configure ' + props.title}
          onClick={() => props.onConfigure()}
        />
      </Flex>
    </div>
  );
}
