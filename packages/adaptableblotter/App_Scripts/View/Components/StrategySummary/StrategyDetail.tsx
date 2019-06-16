import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import * as Redux from 'redux';
import { EntityListActionButtons } from '../Buttons/EntityListActionButtons';
import { SummaryRowItem } from './SummaryRowItem';
import { IAdaptableBlotterObject } from '../../../PredefinedConfig/IAdaptableBlotterObject';

export interface StrategyDetailProps extends React.ClassAttributes<StrategyDetail> {
  key: string;
  Item1: any;
  Item2: any;
  ConfigEnity: IAdaptableBlotterObject;
  EntityType: string;
  onEdit: () => void;
  onShare: () => void;
  onDelete: Redux.Action;
  showBold?: boolean;
  showEdit?: boolean;
  showShare?: boolean;
  cssClassName: string;
}

export class StrategyDetail extends React.Component<StrategyDetailProps, {}> {
  render(): any {
    let summaryItems: any[] = [];
    this.props.showBold
      ? summaryItems.push(<b>{this.props.Item1}</b>)
      : summaryItems.push(<i>{this.props.Item1}</i>);

    summaryItems.push(<i>{this.props.Item2}</i>);
    summaryItems.push(
      <EntityListActionButtons
        cssClassName={this.props.cssClassName}
        ConfirmDeleteAction={this.props.onDelete}
        showEdit={this.props.showEdit}
        editClick={() => this.props.onEdit()}
        shareClick={() => this.props.onShare()}
        showShare={this.props.showShare}
        EntityType={this.props.EntityType}
        editSize={'xs'}
        deleteSize={'xs'}
        shareSize={'xs'}
      />
    );

    return <SummaryRowItem cssClassName={this.props.cssClassName} SummaryItems={summaryItems} />;
  }
}
