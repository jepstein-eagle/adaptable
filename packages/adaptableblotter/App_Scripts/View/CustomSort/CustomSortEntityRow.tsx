import * as React from 'react';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from '../UIInterfaces';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { CustomSort } from '../../PredefinedConfig/RunTimeState/CustomSortState';
import { EntityRowItem } from '../Components/EntityRowItem';

export interface CustomSortEntityRowProps extends SharedEntityRowProps<CustomSortEntityRow> {
  ColumnLabel: string;
}

export class CustomSortEntityRow extends React.Component<CustomSortEntityRowProps, {}> {
  render(): any {
    let customSort: CustomSort = this.props.AdaptableBlotterObject as CustomSort;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={this.props.ColumnLabel} />;
    colItems[1].Content = <EntityRowItem Content={customSort.SortedValues.join(', ')} />;
    colItems[2].Content = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(customSort)}
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        overrideDisableEdit={this.props.ColumnLabel.includes(GeneralConstants.MISSING_COLUMN)}
        EntityType={StrategyConstants.CustomSortStrategyName}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
