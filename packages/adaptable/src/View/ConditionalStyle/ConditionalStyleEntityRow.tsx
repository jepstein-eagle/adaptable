import * as React from 'react';
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { StyleVisualItem } from '../Components/StyleVisualItem';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { ConditionalStyle } from '../../PredefinedConfig/ConditionalStyleState';
import { EntityRowItem } from '../Components/EntityRowItem';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import StringExtensions from '../../Utilities/Extensions/StringExtensions';

export class ConditionalStyleEntityRow extends React.Component<
  SharedEntityRowProps<ConditionalStyleEntityRow>,
  {}
> {
  render(): any {
    let conditionalStyle: ConditionalStyle = this.props.AdaptableObject as ConditionalStyle;

    let column: AdaptableColumn | undefined =
      conditionalStyle.ConditionalStyleScope == 'Column'
        ? this.props.api.columnApi.getColumnFromId(conditionalStyle.ColumnId!)
        : undefined;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={this.getScope(conditionalStyle)} />;
    colItems[1].Content = (
      <EntityRowItem Content={<StyleVisualItem Style={conditionalStyle.Style} />} />
    );
    colItems[2].Content = (
      <EntityRowItem
        Content={this.props.api.sharedQueryApi.getExpressionForQueryObject(conditionalStyle)}
      />
    );
    let buttons: any = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(conditionalStyle)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.TeamSharingActivated}
        overrideDisableEdit={!column && conditionalStyle.ConditionalStyleScope == 'Column'}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.ConditionalStyleStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }

  private getScope(conditionalStyle: ConditionalStyle): string {
    switch (conditionalStyle.ConditionalStyleScope) {
      case 'Row':
        return 'Row';
      case 'Column':
        return this.props.api.columnApi.getFriendlyNameFromColumnId(conditionalStyle.ColumnId);
      //   case 'DataType':
      //     return conditionalStyle.DataType + ' Columns';
      case 'ColumnCategory':
        return 'Category: ' + conditionalStyle.ColumnCategoryId;
    }
  }
}
