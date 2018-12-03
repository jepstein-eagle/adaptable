import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { ConditionalStyleScope } from '../../Utilities/Enums';
import { Helper } from '../../Utilities/Helpers/Helper';
import { ExpressionHelper } from '../../Utilities/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { AdaptableObjectRow, } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as GeneralConstants from '../../Utilities/Constants/GeneralConstants';
import { IColItem } from "../UIInterfaces";
import { IConditionalStyle } from "../../api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";

export class ConditionalStyleEntityRow extends React.Component<SharedEntityExpressionRowProps<ConditionalStyleEntityRow>, {}> {

    render(): any {
        let conditionalStyle: IConditionalStyle = this.props.AdaptableBlotterObject as IConditionalStyle;

        let column = ColumnHelper.getColumnFromId(conditionalStyle.ColumnId, this.props.Columns);
         
        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content =this.getScope(conditionalStyle);
        colItems[1].Content = <StyleVisualItem Style={conditionalStyle.Style} />
        colItems[2].Content = ExpressionHelper.ConvertExpressionToString(conditionalStyle.Expression, this.props.Columns)
        let buttons: any = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            editClick={() => this.props.onEdit(this.props.Index, conditionalStyle)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            overrideDisableEdit={(!column && conditionalStyle.ConditionalStyleScope == ConditionalStyleScope.Column)}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyConstants.ConditionalStyleStrategyName} />
        colItems[3].Content = buttons;

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }

    private getScope(conditionalStyle: IConditionalStyle): string {
        switch (conditionalStyle.ConditionalStyleScope) {
            case ConditionalStyleScope.Row:
                return "Row";
            case ConditionalStyleScope.Column:
                return ColumnHelper.getFriendlyNameFromColumnId(conditionalStyle.ColumnId, this.props.Columns);
            case ConditionalStyleScope.ColumnCategory:
                return "Category: " + conditionalStyle.ColumnCategoryId

        }
    }
}
