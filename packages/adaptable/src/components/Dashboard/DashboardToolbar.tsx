import React, { ReactNode } from 'react';
import SimpleButton from '../SimpleButton';

export type DashboardToolbarProps = {
  title: string;
  onConfigure?: () => void;
  children: ReactNode;
};

export function DashboardToolbar(props: DashboardToolbarProps) {
  return (
    <div className="ab-Dashboard__toolbar">
      <div className="ab-Dashboard__toolbar-content">{props.children}</div>
      <div className="ab-Dashboard__toolbar-title">
        <span>{props.title}</span>
        <SimpleButton
          icon="build"
          variant="text"
          iconSize={16}
          marginLeft={1}
          tooltip={'Configure ' + props.title}
          onClick={() => props.onConfigure()}
        />
      </div>
    </div>
  );
}
