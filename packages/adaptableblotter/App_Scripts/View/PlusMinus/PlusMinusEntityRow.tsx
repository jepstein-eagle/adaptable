import * as React from 'react';
import { FormControl } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Utilities/Interface/IColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { Helper } from '../../Utilities/Helpers/Helper';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IColItem } from '../UIInterfaces';
import { IPlusMinusRule } from '../../Utilities/Interface/BlotterObjects/IPlusMinusRule';
import { ColumnHelper } from '../../Utilities/Helpers/ColumnHelper';
import { EntityRowItem } from '../Components/EntityRowItem';

export interface PlusMinusEntityRowProps
  extends SharedEntityExpressionRowProps<PlusMinusEntityRow> {
  Column: IColumn;
  onColumnDefaultNudgeValueChange: (
    plusMinusRule: IPlusMinusRule,
    event: React.FormEvent<any>
  ) => void;
}

export class PlusMinusEntityRow extends React.Component<PlusMinusEntityRowProps, {}> {
  render(): any {
    let plusMinusRule: IPlusMinusRule = this.props.AdaptableBlotterObject as IPlusMinusRule;
    let colItems: IColItem[] = [].concat(this.props.colItems);

    colItems[0].Content = (
      <EntityRowItem
        Content={ColumnHelper.getFriendlyNameFromColumn(plusMinusRule.ColumnId, this.props.Column)}
      />
    );
    colItems[1].Content = (
      <EntityRowItem
        Content={
          <FormControl
            value={plusMinusRule.NudgeValue.toString()}
            bsSize={'small'}
            type="number"
            placeholder="Enter a Number"
            onChange={e => this.props.onColumnDefaultNudgeValueChange(plusMinusRule, e)}
          />
        }
      />
    );
    colItems[2].Content = <EntityRowItem Content={this.wrapExpressionDescription(plusMinusRule)} />;

    let buttons: any = (
      <EntityListActionButtons
        cssClassName={this.props.cssClassName}
        ConfirmDeleteAction={this.props.onDeleteConfirm}
        editClick={() => this.props.onEdit(plusMinusRule)}
        shareClick={() => this.props.onShare()}
        showShare={this.props.TeamSharingActivated}
        overrideDisableEdit={false}
        EntityType={StrategyConstants.PlusMinusStrategyName + ' Rule '}
      />
    );
    colItems[3].Content = buttons;

    return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />;
  }

  private wrapExpressionDescription(PlusMinusRule: IPlusMinusRule): string {
    return PlusMinusRule.IsDefaultNudge
      ? '[Default Column Nudge Value]'
      : ExpressionHelper.ConvertExpressionToString(PlusMinusRule.Expression, this.props.Columns);
  }
}
