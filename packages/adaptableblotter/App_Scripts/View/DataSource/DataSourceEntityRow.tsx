import * as React from 'react';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { DataSource } from '../../PredefinedConfig/DataSourceState';
import { EntityRowItem } from '../Components/EntityRowItem';

export interface DataSourceEntityRowProps extends SharedEntityRowProps<DataSourceEntityRow> {
  onChangeName: (DataSource: DataSource, Name: string) => void;
  onChangeDescription: (DataSource: DataSource, Description: string) => void;
}

export class DataSourceEntityRow extends React.Component<DataSourceEntityRowProps, {}> {
  render(): any {
    let dataSource: DataSource = this.props.AdaptableObject as DataSource;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    // put in the ability to change name / description later...
    colItems[0].Content = <EntityRowItem Content={dataSource.Name} />;
    colItems[1].Content = <EntityRowItem Content={dataSource.Description} />;

    colItems[2].Content = (
      <EntityListActionButtons
        editClick={() => this.props.onEdit(dataSource)}
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.DataSourceStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  onDescriptionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeDescription(this.props.AdaptableObject as DataSource, e.value);
  }

  onNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeName(this.props.AdaptableObject as DataSource, e.value);
  }
}
