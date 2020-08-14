import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { ActionMode } from '../../PredefinedConfig/Common/Enums';
import { EntityRowItem } from '../Components/EntityRowItem';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import Dropdown from '../../components/Dropdown';
import { IValidationService } from '../../Utilities/Services/Interface/IValidationService';
import cellValidation from '../../components/icons/cell-validation';

export interface CellValidationEntityRowProps
  extends SharedEntityRowProps<CellValidationEntityRow> {
  Column: AdaptableColumn;
  ValidationService: IValidationService;
  onChangeActionMode: (cellValidationRule: CellValidationRule, ActionMode: ActionMode) => void;
}

export class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
  render(): any {
    let cellValidationRule: CellValidationRule = this.props.AdaptableObject as CellValidationRule;

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
        shareClick={(description: string) => this.props.onShare(description)}
        overrideDisableEdit={!this.props.Column}
        EntityType={StrategyConstants.CellValidationStrategyFriendlyName}
        AccessLevel={this.props.AccessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  setExpressionDescription(cellValidation: CellValidationRule): string {
    let expression = this.props.api.sharedQueryApi.getExpressionForQueryObject(cellValidation);
    return expression ? expression : 'No Expression';
  }

  private getColumnandRule(cellValidation: CellValidationRule): string {
    let columnInfo: string = this.props.api.gridApi.getFriendlyNameFromColumn(
      cellValidation.ColumnId,
      this.props.Column
    );
    columnInfo +=
      ': ' +
      this.props.ValidationService.createCellValidationDescription(
        cellValidation,
        this.props.api.gridApi.getColumns()
      );
    return columnInfo;
  }

  onActionModeChanged(cellValidationRule: CellValidationRule, value: string) {
    let returnValue: any = value == 'Stop Edit' ? 'Stop Edit' : 'Warn User';
    this.props.onChangeActionMode(cellValidationRule, returnValue);
  }
}
