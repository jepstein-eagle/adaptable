import * as React from 'react';

import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { AdaptableColumn } from '../../PredefinedConfig/Common/AdaptableColumn';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { Helper } from '../../Utilities/Helpers/Helper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IColItem } from '../UIInterfaces';
import { PlusMinusRule } from '../../PredefinedConfig/PlusMinusState';
import { EntityRowItem } from '../Components/EntityRowItem';
import Input from '../../components/Input';

export interface PlusMinusEntityRowProps extends SharedEntityRowProps<PlusMinusEntityRow> {
  Column: AdaptableColumn;
  onColumnDefaultNudgeValueChange: (
    plusMinusRule: PlusMinusRule,
    event: React.FormEvent<any>
  ) => void;
}

export class PlusMinusEntityRow extends React.Component<PlusMinusEntityRowProps, {}> {
  render(): any {
    let plusMinusRule: PlusMinusRule = this.props.AdaptableObject as PlusMinusRule;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={this.props.api.gridApi.getFriendlyNameFromColumn(
          plusMinusRule.ColumnId,
          this.props.Column
        )}
      />
    );
    colItems[1].Content = (
      <EntityRowItem
        Content={
          <Input
            value={plusMinusRule.NudgeValue.toString()}
            style={{ width: '100%' }}
            type="number"
            placeholder="Enter a Number"
            onChange={(e: any) => this.props.onColumnDefaultNudgeValueChange(plusMinusRule, e)}
          />
        }
      />
    );
    colItems[2].Content = <EntityRowItem Content={this.wrapExpressionDescription(plusMinusRule)} />;

    let buttons: any = (
      <EntityListActionButtons
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(plusMinusRule)}
        shareClick={(description: string) => this.props.onShare(description)}
        showShare={this.props.TeamSharingActivated}
        overrideDisableEdit={false}
        EntityType={StrategyConstants.PlusMinusStrategyFriendlyName + ' Rule '}
        AccessLevel={this.props.AccessLevel}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow colItems={colItems} />;
  }

  private wrapExpressionDescription(plusMinusRule: PlusMinusRule): string {
    return plusMinusRule.IsDefaultNudge
      ? '[Default Column Nudge Value]'
      : this.props.api.sharedQueryApi.getExpressionForQueryObject(plusMinusRule);
  }
}
