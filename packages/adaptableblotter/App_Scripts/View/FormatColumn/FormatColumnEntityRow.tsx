import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { FormatColumn } from '../../PredefinedConfig/RunTimeState/FormatColumnState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { EntityRowItem } from '../Components/EntityRowItem';

export class FormatColumnEntityRow extends React.Component<
  SharedEntityExpressionRowProps<FormatColumnEntityRow>,
  {}
> {
  render(): any {
    let formatColumn = this.props.AdaptableBlotterObject as FormatColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={ColumnHelper.getFriendlyNameFromColumnId(
          formatColumn.ColumnId,
          this.props.Columns
        )}
      />
    );
    colItems[1].Content = (
      <EntityRowItem Content={<StyleVisualItem Style={formatColumn.Style} />} />
    );
    colItems[2].Content = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(formatColumn)}
        showShare={this.props.TeamSharingActivated}
        shareClick={() => this.props.onShare()}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.FormatColumnStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
