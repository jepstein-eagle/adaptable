import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { FormatColumn } from '../../PredefinedConfig/FormatColumnState';
import { EntityRowItem } from '../Components/EntityRowItem';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { UIHelper } from '../UIHelper';
import FormatHelper from '../../Utilities/Helpers/FormatHelper';

export class FormatColumnEntityRow extends React.Component<
  SharedEntityRowProps<FormatColumnEntityRow>,
  {}
> {
  render(): any {
    let formatColumn = this.props.AdaptableObject as FormatColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);
    let adaptableColumn: AdaptableColumn = this.props.api.columnApi.getColumnFromId(
      formatColumn.ColumnId
    );
    if (adaptableColumn) {
      colItems[0].Content = <EntityRowItem Content={adaptableColumn.FriendlyName} />;
      colItems[1].Content = (
        <EntityRowItem
          Content={
            formatColumn.Style == null || UIHelper.IsEmptyStyle(formatColumn.Style) ? (
              '[None]'
            ) : (
              <StyleVisualItem Style={formatColumn.Style} />
            )
          }
        />
      );
      colItems[2].Content = (
        <EntityRowItem Content={this.showFormatExample(formatColumn, adaptableColumn)} />
      );
      colItems[3].Content = (
        <EntityListActionButtons
          editClick={() => this.props.onEdit(formatColumn)}
          showShare={this.props.TeamSharingActivated}
          shareClick={(description: string) => this.props.onShare(description)}
          ConfirmDeleteAction={this.props.onDeleteConfirm}
          EntityType={StrategyConstants.FormatColumnStrategyFriendlyName}
          AccessLevel={this.props.AccessLevel}
        />
      );

      return <AdaptableObjectRow colItems={colItems} />;
    } else {
      colItems[0].Content = formatColumn.ColumnId;
      colItems[1].Content = 'Column Not Found';
      colItems[2].Content = 'Column Not Found';
      colItems[3].Content = '';
      return <AdaptableObjectRow colItems={colItems} />;
    }
  }

  private showFormatExample(
    formatColumn: FormatColumn,
    adaptableColumn: AdaptableColumn
  ): string | undefined {
    if (!formatColumn.DisplayFormat) {
      return undefined;
    }
    if (formatColumn.DisplayFormat.Formatter === 'DateFormatter') {
      return FormatHelper.DateFormatter(new Date(), formatColumn.DisplayFormat.Options);
    }
    if (formatColumn.DisplayFormat.Formatter === 'NumberFormatter') {
      return FormatHelper.NumberFormatter(12345.6789, formatColumn.DisplayFormat.Options);
    }
  }
}
