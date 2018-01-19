import { ICalculatedColumn } from '../../Core/Interface/ICalculatedColumnStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../Core/Helper';
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRow, IColItem } from '../Components/ConfigEntityRow';

export interface CalculatedColumnConfigItemProps extends React.ClassAttributes<CalculatedColumnConfigItem> {
    CalculatedColumn: ICalculatedColumn
    onEdit: (CalculatedColumn: ICalculatedColumn) => void;
    onDeleteConfirm: Redux.Action;
}


export class CalculatedColumnConfigItem extends React.Component<CalculatedColumnConfigItemProps, {}> {
    render(): any {
        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: this.props.CalculatedColumn.ColumnId });
        myCols.push({ size: 6, content: this.props.CalculatedColumn.GetValueFunc });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.CalculatedColumn)}
            ConfigEntity={this.props.CalculatedColumn}
            EntityName="Calculated Column">
        </EntityListActionButtons>
        myCols.push({ size: 3, content: buttons });

        return <ConfigEntityRow items={myCols} />


    }

}