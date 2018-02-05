import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { SummaryRowItem } from '../Components/SummaryRowItem';
    

export interface StrategyDetailRowProps extends React.ClassAttributes<StrategyDetailRow> {
    key: string
    Item1: any
    Item2: any
    ConfigEnity: IConfigEntity
    EntityName: string
    onEdit: () => void
    onShare: () => void
    onDelete: Redux.Action
    showBold?: boolean
    showShare?: boolean
    
}

export class StrategyDetailRow extends React.Component<StrategyDetailRowProps, {}> {
    render(): any {

        let summaryItems: any[] = []
        this.props.showBold ?
        summaryItems.push(<b>{this.props.Item1}</b> ) :
        summaryItems.push(<i>{this.props.Item1}</i> )

        summaryItems.push( <i>{this.props.Item2}</i>);
        summaryItems.push(<EntityListActionButtons
            ConfirmDeleteAction={this.props.onDelete}
            editClick={() => this.props.onEdit()}
            shareClick={() => this.props.onShare()}
            showShare={this.props.showShare}
            overrideDisableEdit={false}
            ConfigEntity={this.props.ConfigEnity}
            EntityName={this.props.EntityName} />)
         

        return <SummaryRowItem SummaryItems={summaryItems} />
    }

}
