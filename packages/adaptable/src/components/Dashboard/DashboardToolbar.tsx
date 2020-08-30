import { ReactNode } from 'react';
import * as React from 'react';
import SimpleButton from '../SimpleButton';
import join from '../utils/join';

export type DashboardToolbarProps = {
  className?: string;
  title: string;
  tooltip?: string;
  onClose?: () => void;
  onConfigure?: () => void;
  children: ReactNode;
  showConfigure: boolean;
};

export function DashboardToolbar(props: DashboardToolbarProps) {
  return (
    <div className={join('ab-Dashboard__toolbar', props.className)}>
      <div className="ab-Dashboard__toolbar-content">{props.children}</div>
      <div className="ab-Dashboard__toolbar-title">
        <span>{props.title}</span>
        {props.showConfigure && (
          <SimpleButton
            icon="build"
            variant="text"
            tone="none"
            iconSize={16}
            marginLeft={1}
            tooltip={props.tooltip || `Configure ${props.title}`}
            onClick={() => props.onConfigure()}
          />
        )}{' '}
        {/** 
        <SimpleButton
        
          icon="clear"
          variant="text"
          tone="none"
          iconSize={16}
          marginLeft={1}
        
          tooltip={props.tooltip || `Close ${props.title}`}
          onClick={() => props.onClose()}
        />*/}
      </div>
    </div>
  );
}
