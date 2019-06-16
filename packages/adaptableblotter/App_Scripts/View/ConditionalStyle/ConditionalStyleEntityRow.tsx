import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ConditionalStyleScope } from '../../PredefinedConfig/Common Objects/Enums';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { IConditionalStyle } from '../../PredefinedConfig/IUserState Interfaces/ConditionalStyleState';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { EntityRowItem } from '../Components/EntityRowItem';
import { IColumn } from '../../Utilities/Interface/IColumn';

export class ConditionalStyleEntityRow extends React.Component<
  SharedEntityExpressionRowProps<ConditionalStyleEntityRow>,
  {}
> {
  render(): any {
    let conditionalStyle: IConditionalStyle = this.props
      .AdaptableBlotterObject as IConditionalStyle;

    let column: IColumn | undefined =
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
        cssClassName={this.props.cssClassName}
        editClick={() => this.props.onEdit(conditionalStyle)}
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        overrideDisableEdit={
          !column && conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Column
        }
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.ConditionalStyleStrategyName}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }

  private getScope(conditionalStyle: IConditionalStyle): string {
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
