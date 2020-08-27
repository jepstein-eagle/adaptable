import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { EntityRowItem } from '../Components/EntityRowItem';

export class ConditionalStyleEntityRow extends React.Component<
  SharedEntityRowProps<ConditionalStyleEntityRow>,
  {}
> {
  render(): any {
    let conditionalStyle: ConditionalStyle = this.props.AdaptableObject as ConditionalStyle;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem Content={this.props.api.scopeApi.getScopeToString(conditionalStyle.Scope)} />
    );
    colItems[1].Content = (
      <EntityRowItem Content={<StyleVisualItem Style={conditionalStyle.Style} />} />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={this.props.api.queryApi.getExpressionForQueryObject(conditionalStyle)}
      />
    );
    let buttons: any = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(conditionalStyle)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.TeamSharingActivated}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.ConditionalStyleStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
