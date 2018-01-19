import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import * as Redux from "redux";
import { Col, Row } from 'react-bootstrap';
import { ButtonNew } from './Buttons/ButtonNew';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { IConfigEntity } from '../../Core/Interface/IAdaptableBlotter';
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';


export interface StrategyDetailRowProps extends React.ClassAttributes<StrategyDetailRow> {
    key: string
    Item1: any
    Item2: any
    ConfigEnity: IConfigEntity
    EntityName: string
    onEdit: () => void
    onDelete: Redux.Action
    showBold?: boolean
}

export class StrategyDetailRow extends React.Component<StrategyDetailRowProps, {}> {
    render(): any {

        let myCols: IColItem[] = []
        this.props.showBold ?
            myCols.push({ size: 3, content: <b>{this.props.Item1}</b> }) :
            myCols.push({ size: 3, content: <i>{this.props.Item1}</i> })

        myCols.push({
            size: 6, content: <i>{this.props.Item2}</i>
        });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDelete}
            editClick={() => this.props.onEdit()}
            overrideDisableEdit={false}
            ConfigEntity={this.props.ConfigEnity}
            EntityName={this.props.EntityName} />
        myCols.push({ size: 3, content: buttons });

        return <ConfigEntityRow items={myCols} />
    }

}
