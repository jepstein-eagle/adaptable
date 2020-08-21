import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { EntityRowItem } from '../Components/EntityRowItem';
import { AlertDefinition } from '../../PredefinedConfig/AlertState';
import Dropdown from '../../components/Dropdown';
import { IStrategyService } from '../../Utilities/Services/StrategyService';

export interface AlertEntityRowProps extends SharedEntityRowProps<AlertEntityRow> {
  Column: AdaptableColumn;
  onChangeMessageType: (alertDefinition: AlertDefinition, Type: MessageType) => void;
}

export class AlertEntityRow extends React.Component<AlertEntityRowProps, {}> {
  render(): any {
    let alertDefinition: AlertDefinition = this.props.AdaptableObject as AlertDefinition;

    let MessageTypes = EnumExtensions.getNames(MessageType).map(type => {
      return {
        value: type,
        label: type,
      };
    });

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={this.getColumnandRule(alertDefinition)} />;
    colItems[1].Content = (
      <Dropdown
        placeholder="select"
        showEmptyItem={false}
        showClearButton={false}
        value={alertDefinition.MessageType}
        onChange={(value: any) => this.onMessageTypeChanged(alertDefinition, value)}
        options={MessageTypes}
      ></Dropdown>
    );
    colItems[2].Content = (
      <EntityRowItem Content={this.setExpressionDescription(alertDefinition)} />
    );
    colItems[3].Content = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(alertDefinition)}
        shareClick={(description: string) => this.props.onShare(description)}
        overrideDisableEdit={!this.props.Column}
        EntityType={StrategyConstants.AlertStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  setExpressionDescription(alert: AlertDefinition): string {
    let expression = this.props.api.sharedQueryApi.getExpressionForQueryObject(alert);
    return expression ? expression : 'No Expression';
  }

  private getColumnandRule(Alert: AlertDefinition): string {
    let columnInfo: string = this.props.api.columnApi.getFriendlyNameFromColumn(
      Alert.ColumnId,
      this.props.Column
    );
    columnInfo +=
      ': ' +
      this.props.api.internalApi
        .getStrategyService()
        .createAlertDescription(Alert, this.props.api.columnApi.getColumns());
    return columnInfo;
  }

  onMessageTypeChanged(alertDefinition: AlertDefinition, value: MessageType) {
    this.props.onChangeMessageType(alertDefinition, value);
  }
}
