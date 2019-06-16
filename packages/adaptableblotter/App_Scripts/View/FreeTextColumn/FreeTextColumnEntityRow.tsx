import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { IFreeTextColumn } from '../../PredefinedConfig/IUserState/FreeTextColumnState';
import { ArrayExtensions } from '../../Utilities/Extensions/ArrayExtensions';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { EntityRowItem } from '../Components/EntityRowItem';

export class FreeTextColumnEntityRow extends React.Component<
  SharedEntityExpressionRowProps<FreeTextColumnEntityRow>,
  {}
> {
  render(): any {
    let FreeTextColumn = this.props.AdaptableBlotterObject as IFreeTextColumn;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={FreeTextColumn.ColumnId} />;
    colItems[1].Content = (
      <EntityRowItem
        Content={
          StringExtensions.IsNullOrEmpty(FreeTextColumn.DefaultValue)
            ? '[None]'
            : FreeTextColumn.DefaultValue
        }
      />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={
          ArrayExtensions.IsNullOrEmpty(FreeTextColumn.FreeTextStoredValues)
            ? 0
            : FreeTextColumn.FreeTextStoredValues.length
        }
      />
    );
    colItems[3].Content = (
      <EntityListActionButtons
        cssClassName={this.props.cssClassName}
        editClick={() => this.props.onEdit(FreeTextColumn)}
        showShare={this.props.TeamSharingActivated}
        shareClick={() => this.props.onShare()}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.FreeTextColumnStrategyName}
      />
    );

    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }
}
