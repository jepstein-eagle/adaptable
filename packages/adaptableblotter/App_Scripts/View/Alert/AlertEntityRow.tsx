import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { MessageType } from '../../PredefinedConfig/Common/Enums';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AlertHelper } from '../../Utilities/Helpers/AlertHelper';
import { EntityRowItem } from '../Components/EntityRowItem';
import { AlertDefinition } from '../../PredefinedConfig/RunTimeState/AlertState';
import Dropdown from '../../components/Dropdown';

export interface AlertEntityRowProps extends SharedEntityExpressionRowProps<AlertEntityRow> {
  Column: IColumn;
  onChangeMessageType: (alertDefinition: AlertDefinition, Type: MessageType) => void;
}

export class AlertEntityRow extends React.Component<AlertEntityRowProps, {}> {
  render(): any {
    let alertDefinition: AlertDefinition = this.props.AdaptableBlotterObject as AlertDefinition;

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
        cssClassName={this.props.cssClassName}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(alertDefinition)}
        shareClick={() => this.props.onShare()}
        overrideDisableEdit={!this.props.Column}
        EntityType={StrategyConstants.AlertStrategyName}
      />
    );

    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }

  setExpressionDescription(Alert: AlertDefinition): string {
    return ExpressionHelper.IsNotNullOrEmptyExpression(Alert.Expression)
      ? ExpressionHelper.ConvertExpressionToString(Alert.Expression, this.props.Columns)
      : 'No Expression';
  }

  private getColumnandRule(Alert: AlertDefinition): string {
    let columnInfo: string = ColumnHelper.getFriendlyNameFromColumn(
      Alert.ColumnId,
      this.props.Column
    );
    columnInfo += ': ' + AlertHelper.createAlertDescription(Alert, this.props.Columns);
    return columnInfo;
  }

  onMessageTypeChanged(alertDefinition: AlertDefinition, value: MessageType) {
    this.props.onChangeMessageType(alertDefinition, value);
  }
}
