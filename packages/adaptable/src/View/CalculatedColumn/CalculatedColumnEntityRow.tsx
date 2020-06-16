import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityRowItem } from '../Components/EntityRowItem';
import { CalculatedColumn } from '../../PredefinedConfig/CalculatedColumnState';

interface CalculatedColumnEntityRowProps<CalculatedColumnEntityRow>
  extends SharedEntityRowProps<CalculatedColumnEntityRow> {}

export class CalculatedColumnEntityRow extends React.Component<
  CalculatedColumnEntityRowProps<CalculatedColumnEntityRow>,
  {}
> {
  render(): any {
    let calculatedColumn: CalculatedColumn = this.props.AdaptableObject as CalculatedColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={calculatedColumn.ColumnId} />;
    colItems[1].Content = (
      <EntityRowItem
        Content={this.props.api.internalApi
          .getCalculatedColumnExpressionService()
          .GetExpressionString(
            calculatedColumn.ColumnExpression,
            this.props.api.gridApi.getColumns()
          )}
      />
    );

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(calculatedColumn)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.TeamSharingActivated}
        EntityType={StrategyConstants.CalculatedColumnStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    colItems[2].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
