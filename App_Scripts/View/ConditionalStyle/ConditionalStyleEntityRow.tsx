import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { ConditionalStyleScope } from '../../Core/Enums';
import { IConditionalStyle } from '../../Strategy/Interface/IConditionalStyleStrategy';
import { Helper } from '../../Core/Helpers/Helper';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { AdaptableObjectRow, } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as GeneralConstants from '../../Core/Constants/GeneralConstants';
import { IColItem } from "../UIInterfaces";

export class ConditionalStyleEntityRow extends React.Component<SharedEntityExpressionRowProps<ConditionalStyleEntityRow>, {}> {

    render(): any {
        let conditionalStyle: IConditionalStyle = this.props.AdaptableBlotterObject as IConditionalStyle;

        let column = this.props.Columns.find(x => x.ColumnId == conditionalStyle.ColumnId)

        let colItems: IColItem[] = [].concat(this.props.ColItems);

        colItems[0].Content =
        conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Column ?
                column ? column.FriendlyName : conditionalStyle.ColumnId + GeneralConstants.MISSING_COLUMN :
                "Whole Row"

        colItems[1].Content = <StyleVisualItem Style={conditionalStyle.Style} />
        colItems[2].Content = ExpressionHelper.ConvertExpressionToString(conditionalStyle.Expression, this.props.Columns, this.props.UserFilters)
        let buttons: any = <EntityListActionButtons
            editClick={() => this.props.onEdit(this.props.Index, conditionalStyle)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            ConfigEntity={conditionalStyle}
            overrideDisableEdit={(!column && conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Column)}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyNames.ConditionalStyleStrategyName} />
        colItems[3].Content = buttons;

        return <AdaptableObjectRow ColItems={colItems} />
    }
}
