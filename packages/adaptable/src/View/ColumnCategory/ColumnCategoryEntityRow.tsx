import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { IColItem } from '../UIInterfaces';
import { ColumnCategory } from '../../PredefinedConfig/ColumnCategoryState';
import { EntityRowItem } from '../Components/EntityRowItem';

export interface ColumnCategoryEntityRowProps<ColumnCategoryEntityRow>
  extends SharedEntityRowProps<ColumnCategoryEntityRow> {}

export class ColumnCategoryEntityRow extends React.Component<
  ColumnCategoryEntityRowProps<ColumnCategoryEntityRow>,
  {}
> {
  render(): any {
    let ColumnCategory: ColumnCategory = this.props.AdaptableObject as ColumnCategory;

    let colItems: IColItem[] = [].concat(this.props.colItems);
    let columnNames: string[] = ColumnCategory.ColumnIds.map(ci => {
      return this.props.api.gridApi.getFriendlyNameFromColumnId(ci);
    });

    colItems[0].Content = <EntityRowItem Content={ColumnCategory.ColumnCategoryId} />;
    colItems[1].Content = <EntityRowItem Content={columnNames.join(', ')} />;

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(ColumnCategory)}
        shareClick={(description: string) => this.props.onShare(description)}
        overrideDisableEdit={false}
        EntityType={StrategyConstants.ColumnCategoryStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    colItems[2].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
