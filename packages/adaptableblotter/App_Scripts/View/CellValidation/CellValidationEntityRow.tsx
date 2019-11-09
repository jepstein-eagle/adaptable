import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { AdaptableBlotterColumn } from '../../Utilities/Interface/AdaptableBlotterColumn';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { ActionMode } from '../../PredefinedConfig/Common/Enums';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { CellValidationHelper } from '../../Utilities/Helpers/CellValidationHelper';
import { EntityRowItem } from '../Components/EntityRowItem';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import Dropdown from '../../components/Dropdown';

export interface CellValidationEntityRowProps
  extends SharedEntityExpressionRowProps<CellValidationEntityRow> {
  Column: AdaptableBlotterColumn;
  onChangeActionMode: (cellValidationRule: CellValidationRule, ActionMode: ActionMode) => void;
}

export class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
  render(): any {
    let cellValidationRule: CellValidationRule = this.props
      .AdaptableBlotterObject as CellValidationRule;

    let ActionModeTypes = EnumExtensions.getNames(ActionMode).map(type => {
      return {
        value: type,
        label: type,
      };
    });

    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = <EntityRowItem Content={this.getColumnandRule(cellValidationRule)} />;
    colItems[1].Content = (
      <EntityRowItem Content={this.setExpressionDescription(cellValidationRule)} />
    );
    colItems[2].Content = (
      <Dropdown
        placeholder="select"
        showEmptyItem={false}
        showClearButton={false}
        value={cellValidationRule.ActionMode}
        onChange={(value: any) => this.onActionModeChanged(cellValidationRule, value)}
        options={ActionModeTypes}
      ></Dropdown>
    );
    colItems[3].Content = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.TeamSharingActivated}
        editClick={() => this.props.onEdit(cellValidationRule)}
        shareClick={() => this.props.onShare()}
        overrideDisableEdit={!this.props.Column}
        EntityType={StrategyConstants.CellValidationStrategyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  setExpressionDescription(CellValidation: CellValidationRule): string {
    return ExpressionHelper.IsNotNullOrEmptyExpression(CellValidation.Expression)
      ? ExpressionHelper.ConvertExpressionToString(CellValidation.Expression, this.props.Columns)
      : 'No Expression';
  }

  private getColumnandRule(cellValidation: CellValidationRule): string {
    let columnInfo: string = ColumnHelper.getFriendlyNameFromColumn(
      cellValidation.ColumnId,
      this.props.Column
    );
    columnInfo +=
      ': ' +
      CellValidationHelper.createCellValidationDescription(cellValidation, this.props.Columns);
    return columnInfo;
  }

  onActionModeChanged(cellValidationRule: CellValidationRule, value: string) {
    let returnValue: any = value == 'Stop Edit' ? 'Stop Edit' : 'Warn User';
    this.props.onChangeActionMode(cellValidationRule, returnValue);
  }
}
