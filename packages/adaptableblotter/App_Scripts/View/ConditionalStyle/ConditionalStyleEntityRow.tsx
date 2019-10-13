import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ConditionalStyleScope } from '../../PredefinedConfig/Common/Enums';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { ConditionalStyle } from '../../PredefinedConfig/RunTimeState/ConditionalStyleState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { EntityRowItem } from '../Components/EntityRowItem';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';

export class ConditionalStyleEntityRow extends React.Component<
  SharedEntityExpressionRowProps<ConditionalStyleEntityRow>,
  {}
> {
  render(): any {
    let conditionalStyle: ConditionalStyle = this.props.AdaptableBlotterObject as ConditionalStyle;

    let column: AdaptableBlotterColumn | undefined =
      conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Column
        ? ColumnHelper.getColumnFromId(conditionalStyle.ColumnId!, this.props.Columns)
        : undefined;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={this.getScope(conditionalStyle)} />;
    colItems[1].Content = (
      <EntityRowItem Content={<StyleVisualItem Style={conditionalStyle.Style} />} />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={ExpressionHelper.ConvertExpressionToString(
          conditionalStyle.Expression,
          this.props.Columns
        )}
      />
    );
    let buttons: any = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(conditionalStyle)}
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        overrideDisableEdit={
          !column && conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Column
        }
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.ConditionalStyleStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }

  private getScope(conditionalStyle: ConditionalStyle): string {
    switch (conditionalStyle.ConditionalStyleScope) {
      case ConditionalStyleScope.Row:
        return 'Row';
      case ConditionalStyleScope.Column:
        return ColumnHelper.getFriendlyNameFromColumnId(
          conditionalStyle.ColumnId,
          this.props.Columns
        );
      case ConditionalStyleScope.ColumnCategory:
        return 'Category: ' + conditionalStyle.ColumnCategoryId;
    }
  }
}
