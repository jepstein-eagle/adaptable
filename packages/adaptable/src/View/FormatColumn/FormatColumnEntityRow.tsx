import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { EntityRowItem } from '../Components/EntityRowItem';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';

export class FormatColumnEntityRow extends React.Component<
  SharedEntityExpressionRowProps<FormatColumnEntityRow>,
  {}
> {
  render(): any {
    let formatColumn = this.props.AdaptableObject as FormatColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);
    let adaptableColumn: AdaptableColumn = ColumnHelper.getColumnFromId(
      formatColumn.ColumnId,
      this.props.Columns
    );

    colItems[0].Content = <EntityRowItem Content={adaptableColumn.FriendlyName} />;
    colItems[1].Content = (
      <EntityRowItem
        Content={formatColumn.Style ? <StyleVisualItem Style={formatColumn.Style} /> : 'None'}
      />
    );
    colItems[2].Content = (
      <EntityRowItem Content={this.showFormatExample(formatColumn, adaptableColumn)} />
    );
    colItems[3].Content = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(formatColumn)}
        showShare={this.props.TeamSharingActivated}
        shareClick={() => this.props.onShare()}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.FormatColumnStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  private showFormatExample(
    formatColumn: FormatColumn,
    adaptableColumn: AdaptableColumn
  ): string | undefined {
    if (!formatColumn.Format) {
      return undefined;
    }
    return formatColumn.Format;
  }
}
