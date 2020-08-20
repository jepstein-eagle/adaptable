import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { PercentBar } from '../../PredefinedConfig/PercentBarState';
import { ColorPicker } from '../ColorPicker';
import { StringExtensions } from '../../Utilities/Extensions/StringExtensions';
import { EntityRowItem } from '../Components/EntityRowItem';
import Input from '../../components/Input';

export interface PercentBarEntityRowProps extends SharedEntityRowProps<PercentBarEntityRow> {
  Column: AdaptableColumn;
}

export class PercentBarEntityRow extends React.Component<PercentBarEntityRowProps, {}> {
  render(): any {
    let PercentBar: PercentBar = this.props.AdaptableObject as PercentBar;

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={this.props.api.columnApi.getFriendlyNameFromColumn(
          PercentBar.ColumnId,
          this.props.Column
        )}
      />
    );

    colItems[1].Content = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(PercentBar)}
        shareClick={(description: string) => this.props.onShare(description)}
        overrideDisableEdit={!this.props.Column}
        EntityType={StrategyConstants.PercentBarStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }
}
