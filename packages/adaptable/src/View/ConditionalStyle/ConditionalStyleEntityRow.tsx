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
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

export class ConditionalStyleEntityRow extends React.Component<
  SharedEntityRowProps<ConditionalStyleEntityRow>,
  {}
> {
  render(): any {
    let conditionalStyle: ConditionalStyle = this.props.adaptableObject as ConditionalStyle;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem Content={this.props.api.scopeApi.getScopeToString(conditionalStyle.Scope)} />
    );
    colItems[1].Content = (
      <EntityRowItem Content={<StyleVisualItem Style={conditionalStyle.Style} />} />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={
          StringExtensions.IsNotNullOrEmpty(conditionalStyle.Expression) ||
          StringExtensions.IsNotNullOrEmpty(conditionalStyle.SharedQueryId)
            ? this.props.api.queryApi.QueryObjectToString(conditionalStyle)
            : this.props.api.predicateApi.predicateToString(conditionalStyle.Predicate)
        }
      />
    );
    let buttons: any = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(conditionalStyle)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.teamSharingActivated}
        confirmDeleteAction={this.props.onDeleteConfirm}
        entityType={StrategyConstants.ConditionalStyleStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
