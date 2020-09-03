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
    let formatColumn = this.props.adaptableObject as FormatColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem Content={this.props.api.scopeApi.getScopeDescription(formatColumn.Scope)} />
    );
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
    colItems[2].Content = <EntityRowItem Content={this.showFormatExample(formatColumn)} />;
    colItems[3].Content = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(formatColumn)}
        showShare={this.props.teamSharingActivated}
        shareClick={(description: string) => this.props.onShare(description)}
        confirmDeleteAction={this.props.onDeleteConfirm}
        entityType={StrategyConstants.FormatColumnStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  private showFormatExample(formatColumn: FormatColumn): string | undefined {
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
