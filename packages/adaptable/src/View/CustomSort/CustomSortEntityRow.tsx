import * as React from 'react';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColItem } from '../UIInterfaces';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { CustomSort } from '../../PredefinedConfig/CustomSortState';
import { EntityRowItem } from '../Components/EntityRowItem';
import ArrayExtensions from '../../Utilities/Extensions/ArrayExtensions';

export interface CustomSortEntityRowProps extends SharedEntityRowProps<CustomSortEntityRow> {
  ColumnLabel: string;
}

export class CustomSortEntityRow extends React.Component<CustomSortEntityRowProps, {}> {
  render(): any {
    let customSort: CustomSort = this.props.adaptableObject as CustomSort;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={this.props.ColumnLabel} />;
    colItems[1].Content = <EntityRowItem Content={this.getCustomSortedValues(customSort)} />;
    colItems[2].Content = (
      <EntityListActionButtons
        confirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(customSort)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.teamSharingActivated}
        overrideDisableEdit={
          customSort.CustomSortComparerFunction != undefined ||
          this.props.ColumnLabel.includes(GeneralConstants.MISSING_COLUMN)
        }
        entityType={StrategyConstants.CustomSortStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  private getCustomSortedValues(customSort: CustomSort): any {
    if (ArrayExtensions.IsNotNullOrEmpty(customSort.SortedValues)) {
      return customSort.SortedValues.join(', ');
    } else {
      return '[Has bespoke Custom Sort implementing using bespoke function]';
    }
  }
}
