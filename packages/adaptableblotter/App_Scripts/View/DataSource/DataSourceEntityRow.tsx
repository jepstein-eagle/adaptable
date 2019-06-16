import * as React from 'react';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { IDataSource } from '../../PredefinedConfig/IUserState/DataSourceState';
import { EntityRowItem } from '../Components/EntityRowItem';

export interface DataSourceEntityRowProps extends SharedEntityRowProps<DataSourceEntityRow> {
  onChangeName: (DataSource: IDataSource, Name: string) => void;
  onChangeDescription: (DataSource: IDataSource, Description: string) => void;
}

export class DataSourceEntityRow extends React.Component<DataSourceEntityRowProps, {}> {
  render(): any {
    let dataSource: IDataSource = this.props.AdaptableBlotterObject as IDataSource;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    // put in the ability to change name / description later...
    colItems[0].Content = <EntityRowItem Content={dataSource.Name} />;
    colItems[1].Content = <EntityRowItem Content={dataSource.Description} />;

    colItems[2].Content = (
      <EntityListActionButtons
        cssClassName={this.props.cssClassName}
        editClick={() => this.props.onEdit(dataSource)}
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        EntityType={StrategyConstants.DataSourceStrategyName}
      />
    );

    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }

  onDescriptionChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeDescription(this.props.AdaptableBlotterObject as IDataSource, e.value);
  }

  onNameChange(event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    this.props.onChangeName(this.props.AdaptableBlotterObject as IDataSource, e.value);
  }
}
