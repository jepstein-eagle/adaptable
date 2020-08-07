import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityRowItem } from '../Components/EntityRowItem';
import { SharedExpression } from '../../PredefinedConfig/SharedExpressionState';

interface SharedExpressionEntityRowProps<SharedExpressionEntityRow>
  extends SharedEntityRowProps<SharedExpressionEntityRow> {}

export class SharedExpressionEntityRow extends React.Component<
  SharedExpressionEntityRowProps<SharedExpressionEntityRow>,
  {}
> {
  render(): any {
    let sharedExpression: SharedExpression = this.props.AdaptableObject as SharedExpression;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={sharedExpression.Name} />;
    colItems[1].Content = <EntityRowItem Content={sharedExpression.Expression} />;

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(sharedExpression)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.TeamSharingActivated}
        EntityType={StrategyConstants.SharedExpressionStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    colItems[2].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
