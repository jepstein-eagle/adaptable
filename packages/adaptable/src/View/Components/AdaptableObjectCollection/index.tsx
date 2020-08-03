import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { PanelWithRow } from '../Panels/PanelWithRow';

import { IColItem } from '../../UIInterfaces';

export interface AdaptableObjectCollectionProps
  extends React.ClassAttributes<AdaptableObjectCollection> {
  colItems: IColItem[];
  items: any[];
  reducedPanel?: boolean;
  allowOverflow?: boolean;
  style?: React.CSSProperties;
  headerAlign?: string;
}

export class AdaptableObjectCollection extends React.Component<AdaptableObjectCollectionProps, {}> {
  render(): any {
    const allowOverflow: any = this.props.allowOverflow ? 'visible' : 'auto';

    return (
      <div style={{ ...this.props.style }} className="ab-ObjectCollection">
        <PanelWithRow
          border="none"
          colItems={this.props.colItems}
          headerAlign={this.props.headerAlign}
        />
        <div style={{ overflowY: allowOverflow, boxShadow: 'none' }}>{this.props.items}</div>
      </div>
    );
  }
}
