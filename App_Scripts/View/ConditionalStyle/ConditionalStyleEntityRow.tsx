import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { ConditionalStyleScope } from '../../Core/Enums';
import { IConditionalStyleCondition } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { Helper } from '../../Core/Helpers/Helper';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { ConfigEntityRowItem, } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';
import { IColItem } from "../UIInterfaces";

export class ConditionalStyleEntityRow extends React.Component<SharedEntityExpressionRowProps<ConditionalStyleEntityRow>, {}> {

    render(): any {
        let conditionalStyleCondition: IConditionalStyleCondition = this.props.AdaptableBlotterObject as IConditionalStyleCondition;

        // let isDisabled = conditionalStyleCondition.IsPredefined
        let column = this.props.Columns.find(x => x.ColumnId == conditionalStyleCondition.ColumnId)

        let colItems: IColItem[] = [].concat(this.props.ColItems);

        colItems[0].Content =
            conditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column ?
                column ? column.FriendlyName : conditionalStyleCondition.ColumnId + GeneralConstants.MISSING_COLUMN :
                "Whole Row"

        colItems[1].Content = <StyleVisualItem Style={conditionalStyleCondition.Style} />
        colItems[2].Content = ExpressionHelper.ConvertExpressionToString(conditionalStyleCondition.Expression, this.props.Columns, this.props.UserFilters)
        let buttons: any = <EntityListActionButtons
            editClick={() => this.props.onEdit(this.props.Index, conditionalStyleCondition)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            ConfigEntity={conditionalStyleCondition}
            overrideDisableEdit={(!column && conditionalStyleCondition.ConditionalStyleScope == ConditionalStyleScope.Column)}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyNames.ConditionalStyleStrategyName} />
        colItems[3].Content = buttons;

        return <ConfigEntityRowItem ColItems={colItems} />
    }
}
