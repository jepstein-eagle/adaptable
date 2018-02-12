import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { IUserFilter } from '../../Strategy/Interface/IUserFilterStrategy';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../Interfaces";

export class UserFilterEntityRow extends React.Component<SharedEntityExpressionRowProps<UserFilterEntityRow>, {}> {

    render(): any {
        let userFilter: IUserFilter = this.props.ConfigEntity as IUserFilter;

       // let isDisabled = userFilter.IsPredefined

       let colItems: IColItem[] = [].concat(this.props.ColItems);

       colItems[0].Content= userFilter.Name
       colItems[1].Content= ExpressionHelper.ConvertExpressionToString(userFilter.Expression, this.props.Columns, this.props.UserFilters)
       colItems[2].Content= <EntityListActionButtons
            editClick={() => this.props.onEdit(this.props.Index, userFilter)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            ConfigEntity={userFilter}
            overrideDisableEdit={false}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyNames.UserFilterStrategyName} />
      
        return <ConfigEntityRowItem ColItems={colItems} />
    }
}
