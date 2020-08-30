import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityRowItem } from '../Components/EntityRowItem';
import { SharedQuery } from '../../PredefinedConfig/QueryState';

interface SharedQueryEntityRowProps<SharedQueryEntityRow>
  extends SharedEntityRowProps<SharedQueryEntityRow> {}

export class SharedQueryEntityRow extends React.Component<
  SharedQueryEntityRowProps<SharedQueryEntityRow>,
  {}
> {
  render(): any {
    let sharedQuery: SharedQuery = this.props.AdaptableObject as SharedQuery;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={sharedQuery.Name} />;
    colItems[1].Content = <EntityRowItem Content={sharedQuery.Expression} />;

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(sharedQuery)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.teamSharingActivated}
        EntityType={StrategyConstants.QueryStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );
    colItems[2].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
