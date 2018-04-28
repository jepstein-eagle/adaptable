import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IUserFilter } from "../../Core/Api/AdaptableBlotterObjects";

export class UserFilterEntityRow extends React.Component<SharedEntityExpressionRowProps<UserFilterEntityRow>, {}> {

    render(): any {
        let userFilter: IUserFilter = this.props.AdaptableBlotterObject as IUserFilter;

        let colItems: IColItem[] = [].concat(this.props.colItems);

       colItems[0].Content= userFilter.Name
       colItems[1].Content= this.props.Columns.find(c=> c.ColumnId== userFilter.ColumnId).FriendlyName
       colItems[2].Content= ExpressionHelper.ConvertExpressionToString(userFilter.Expression, this.props.Columns, this.props.UserFilters)
       colItems[3].Content= <EntityListActionButtons
       cssClassName={this.props.cssClassName}
         editClick={() => this.props.onEdit(this.props.Index, userFilter)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            ConfigEntity={userFilter}
            overrideDisableEdit={false}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyNames.UserFilterStrategyName} />
      
        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }
}
