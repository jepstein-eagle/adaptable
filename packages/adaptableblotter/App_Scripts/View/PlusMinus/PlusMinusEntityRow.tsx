import * as React from "react";
import { FormControl } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { Helper } from '../../Utilities/Helpers/Helper';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { IColItem } from "../UIInterfaces";
import { IPlusMinusRule } from "../../Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";

export interface PlusMinusEntityRowProps extends SharedEntityExpressionRowProps<PlusMinusEntityRow> {
    Column: IColumn
    onColumnDefaultNudgeValueChange: (index: number, event: React.FormEvent<any>) => void;
}

export class PlusMinusEntityRow extends React.Component<PlusMinusEntityRowProps, {}> {
    render(): any {
        let x: IPlusMinusRule = this.props.AdaptableBlotterObject as IPlusMinusRule
        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = ColumnHelper.getFriendlyNameFromColumn(x.ColumnId, this.props.Column)
        colItems[1].Content = <FormControl value={x.NudgeValue.toString()} type="number" placeholder="Enter a Number" onChange={(e) => this.props.onColumnDefaultNudgeValueChange(this.props.Index, e)} />
        colItems[2].Content = this.wrapExpressionDescription(x)

        let buttons: any = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, x)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={false}
             EntityName="Plus/Minus">
        </EntityListActionButtons>
        colItems[3].Content = buttons

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />

    }


    private wrapExpressionDescription(PlusMinusRule: IPlusMinusRule): string {
        return (PlusMinusRule.IsDefaultNudge) ? "[Default Column Nudge Value]" : ExpressionHelper.ConvertExpressionToString(PlusMinusRule.Expression, this.props.Columns);
    }
}

