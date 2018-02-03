import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { IUserFilter } from '../../Core/Interface/IExpression';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyNames from '../../Core/StrategyNames'
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';

export class UserFilterEntityRow extends React.Component<SharedEntityExpressionRowProps<UserFilterEntityRow>, {}> {

    render(): any {
        let userFilter: IUserFilter = this.props.ConfigEntity as IUserFilter;

        let isDisabled = userFilter.IsPredefined

        let myCols: IColItem[] = []

        myCols.push({
            size: this.props.EntityRowInfo[0].Width,
            content: userFilter.FriendlyName
        });
        myCols.push({
            size: this.props.EntityRowInfo[1].Width,
            content: ExpressionHelper.ConvertExpressionToString(userFilter.Expression, this.props.Columns, this.props.UserFilters)
        });
        let buttons: any = <EntityListActionButtons
            editClick={() => this.props.onEdit(this.props.Index, userFilter)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            ConfigEntity={userFilter}
            overrideDisableEdit={false}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyNames.UserFilterStrategyName} />
        myCols.push({ size: this.props.EntityRowInfo[2].Width, content: buttons });

        return <ConfigEntityRowItem items={myCols} />
    }
}
