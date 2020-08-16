import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { EntityRowItem } from '../Components/EntityRowItem';
import { UserFilter } from '../../PredefinedConfig/FilterState';

export class UserFilterEntityRow extends React.Component<
  SharedEntityRowProps<UserFilterEntityRow>,
  {}
> {
  render(): any {
    let userFilter: UserFilter = this.props.AdaptableObject as UserFilter;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={'TO DO'} />;
    colItems[1].Content = <EntityRowItem Content={'TO DO'} />;
    colItems[2].Content = <EntityRowItem Content={'TO DO'} />;
    colItems[3].Content = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(userFilter)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.TeamSharingActivated}
        overrideDisableEdit={false}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.UserFilterStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
