import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import * as Redux from 'redux';
import { EntityListActionButtons } from '../Buttons/EntityListActionButtons';
import { SummaryRowItem } from './SummaryRowItem';
import { AdaptableObject } from '../../../PredefinedConfig/Common/AdaptableObject';

export interface StrategyDetailProps extends React.ClassAttributes<StrategyDetail> {
  key: string;
  item1: any;
  item2: any;
  configEnity: AdaptableObject;
  entityType: string;
  onEdit: () => void;
  onShare: (description: string) => void;
  onDelete: Redux.Action;
  showBold?: boolean;
  showEdit?: boolean;
  showShare?: boolean;
}

export class StrategyDetail extends React.Component<StrategyDetailProps, {}> {
  render(): any {
    let summaryItems: any[] = [];
    this.props.showBold
      ? summaryItems.push(<b>{this.props.item1}</b>)
      : summaryItems.push(<i>{this.props.item1}</i>);

    summaryItems.push(<i>{this.props.item2}</i>);
    summaryItems.push(
      <EntityListActionButtons
        justifyContent="start"
        confirmDeleteAction={this.props.onDelete}
        showEdit={this.props.showEdit}
        editClick={() => this.props.onEdit()}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.showShare}
        entityType={this.props.entityType}
      />
    );

    return <SummaryRowItem SummaryItems={summaryItems} />;
  }
}
