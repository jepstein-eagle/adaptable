import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
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
    let userFilter: UserFilter = this.props.adaptableObject as UserFilter;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={'TO DO'} />;
    colItems[1].Content = <EntityRowItem Content={'TO DO'} />;
    colItems[2].Content = <EntityRowItem Content={'TO DO'} />;
    colItems[3].Content = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(userFilter)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.teamSharingActivated}
        overrideDisableEdit={false}
        confirmDeleteAction={this.props.onDeleteConfirm}
        entityType={StrategyConstants.UserFilterStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
