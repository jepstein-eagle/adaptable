import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { IAlertDefinition } from '../../Utilities/Interface/BlotterObjects/IAlertDefinition';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { MessageType } from '../../Utilities/Enums';
import { FormControl } from 'react-bootstrap';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { AlertHelper } from '../../Utilities/Helpers/AlertHelper';
import { EntityRowItem } from '../Components/EntityRowItem';

export interface AlertEntityRowProps extends SharedEntityExpressionRowProps<AlertEntityRow> {
  Column: IColumn;
  onChangeMessageType: (alertDefinition: IAlertDefinition, Type: MessageType) => void;
}

export class AlertEntityRow extends React.Component<AlertEntityRowProps, {}> {
  render(): any {
    let alertDefinition: IAlertDefinition = this.props.AdaptableBlotterObject as IAlertDefinition;

    let MessageTypes = EnumExtensions.getNames(MessageType).map(type => {
      return (
        <option key={type} value={type}>
          {type}
        </option>
      );
    });

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={this.getColumnandRule(alertDefinition)} />;
    colItems[1].Content = (
      <FormControl
        bsSize={'small'}
        componentClass="select"
        placeholder="select"
        value={alertDefinition.MessageType}
        onChange={event => this.onMessageTypeChanged(alertDefinition, event)}
      >
        {MessageTypes}
      </FormControl>
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

  setExpressionDescription(Alert: IAlertDefinition): string {
    return ExpressionHelper.IsNotNullOrEmptyExpression(Alert.Expression)
      ? ExpressionHelper.ConvertExpressionToString(Alert.Expression, this.props.Columns)
      : 'No Expression';
  }

  private getColumnandRule(Alert: IAlertDefinition): string {
    let columnInfo: string = ColumnHelper.getFriendlyNameFromColumn(
      Alert.ColumnId,
      this.props.Column
    );
    columnInfo += ': ' + AlertHelper.createAlertDescription(Alert, this.props.Columns);
    return columnInfo;
  }

  onMessageTypeChanged(alertDefinition: IAlertDefinition, event: React.FormEvent<any>) {
    let e = event.target as HTMLInputElement;
    let messageType: MessageType;
    if (e.value == 'Info') {
      messageType = MessageType.Info;
    } else if (e.value == 'Warning') {
      messageType = MessageType.Warning;
    } else if (e.value == 'Error') {
      messageType = MessageType.Error;
    }
    this.props.onChangeMessageType(alertDefinition, messageType);
  }
}
