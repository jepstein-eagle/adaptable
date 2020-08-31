import * as React from 'react';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { EnumExtensions } from '../../Utilities/Extensions/EnumExtensions';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from '../UIInterfaces';
import { ActionMode } from '../../PredefinedConfig/Common/Enums';
import { EntityRowItem } from '../Components/EntityRowItem';
import { CellValidationRule } from '../../PredefinedConfig/CellValidationState';
import Dropdown from '../../components/Dropdown';
import { IValidationService } from '../../Utilities/Services/Interface/IValidationService';

export interface CellValidationEntityRowProps
  extends SharedEntityRowProps<CellValidationEntityRow> {
  ValidationService: IValidationService;
  onChangeActionMode: (cellValidationRule: CellValidationRule, ActionMode: ActionMode) => void;
}

export class CellValidationEntityRow extends React.Component<CellValidationEntityRowProps, {}> {
  render(): any {
    let cellValidationRule: CellValidationRule = this.props.adaptableObject as CellValidationRule;

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
        confirmDeleteAction={this.props.onDeleteConfirm}
        showShare={this.props.teamSharingActivated}
        editClick={() => this.props.onEdit(cellValidationRule)}
        shareClick={(description: string) => this.props.onShare(description)}
        //  overrideDisableEdit={!this.props.Column}
        entityType={StrategyConstants.CellValidationStrategyFriendlyName}
        accessLevel={this.props.accessLevel}
      />
    );

    return <AdaptableObjectRow colItems={colItems} />;
  }

  setExpressionDescription(cellValidation: CellValidationRule): string {
    let expression = this.props.api.queryApi.getExpressionForQueryObject(cellValidation);
    return expression ? expression : 'No Expression';
  }

  private getColumnandRule(cellValidation: CellValidationRule): string {
    return this.props.ValidationService.createCellValidationDescription(cellValidation);
  }

  onActionModeChanged(cellValidationRule: CellValidationRule, value: string) {
    let returnValue: any = value == 'Stop Edit' ? 'Stop Edit' : 'Warn User';
    this.props.onChangeActionMode(cellValidationRule, returnValue);
  }
}
