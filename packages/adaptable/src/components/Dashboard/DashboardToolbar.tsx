import React, { ReactNode } from 'react';

export type DashboardToolbarProps = {
  title: string;
  children: ReactNode;
};

export function DashboardToolbar(props: DashboardToolbarProps) {
  return (
    <div className="ab-Dashboard__toolbar">
      <div className="ab-Dashboard__toolbar-content">{props.children}</div>
      <div className="ab-Dashboard__toolbar-title">{props.title}</div>
    </div>
  );
}
