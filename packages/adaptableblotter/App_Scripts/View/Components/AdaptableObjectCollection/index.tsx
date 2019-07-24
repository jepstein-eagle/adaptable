import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { PanelWithRow } from '../Panels/PanelWithRow';

import { IColItem } from '../../UIInterfaces';
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import join from '../../../components/utils/join';

export interface AdaptableObjectCollectionProps
  extends React.ClassAttributes<AdaptableObjectCollection> {
  colItems: IColItem[];
  items: any[];
  bsStyle?: string;
  reducedPanel?: boolean;
  allowOverflow?: boolean;
  cssClassName: string;
  style?: React.CSSProperties;
  bsSize?: string;
}

export class AdaptableObjectCollection extends React.Component<AdaptableObjectCollectionProps, {}> {
  render(): any {
    const allowOverflow: any = this.props.allowOverflow ? 'visible' : 'auto';

    return (
      <div
        className={join(
          this.props.cssClassName + StyleConstants.ITEMS_TABLE,
          'ab-ObjectCollection'
        )}
        style={{ ...this.props.style }}
      >
        <PanelWithRow
          cssClassName={this.props.cssClassName}
          border="none"
          colItems={this.props.colItems}
        />
        <div
          className={join(
            this.props.cssClassName + StyleConstants.ITEMS_TABLE_BODY,
            'ab-ObjectCollection__list'
          )}
          style={{ overflowY: allowOverflow, boxShadow: 'none' }}
        >
          {this.props.items}
        </div>
      </div>
    );
  }
}
