import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { IColItem } from '../UIInterfaces';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { EntityRowItem } from '../Components/EntityRowItem';

export interface ColumnCategoryEntityRowProps<ColumnCategoryEntityRow>
  extends SharedEntityExpressionRowProps<ColumnCategoryEntityRow> {}

export class ColumnCategoryEntityRow extends React.Component<
  ColumnCategoryEntityRowProps<ColumnCategoryEntityRow>,
  {}
> {
  render(): any {
    let ColumnCategory: ColumnCategory = this.props.AdaptableObject as ColumnCategory;

    let colItems: IColItem[] = [].concat(this.props.colItems);
    let columnNames: string[] = ColumnCategory.ColumnIds.map(ci => {
      return ColumnHelper.getFriendlyNameFromColumnId(ci, this.props.Columns);
    });

    colItems[0].Content = <EntityRowItem Content={ColumnCategory.ColumnCategoryId} />;
    colItems[1].Content = <EntityRowItem Content={columnNames.join(', ')} />;

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(ColumnCategory)}
        shareClick={() => this.props.onShare()}
        overrideDisableEdit={false}
        EntityType={StrategyConstants.ColumnCategoryStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    colItems[2].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
