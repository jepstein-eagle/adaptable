import { ICalculatedColumn } from '../../Core/Interface/ICalculatedColumnStrategy';
import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../../Core/Helper';
import { Button, Col, Row, ButtonGroup, Panel } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityRowProps } from '../Components/ConfigEntityRowProps';


export class CalculatedColumnEntityRow extends React.Component<SharedEntityRowProps<CalculatedColumnEntityRow>, {}> {
   
    render(): any {
        let calculatedColumn: ICalculatedColumn = this.props.ConfigEntity as ICalculatedColumn;

        let myCols: IColItem[] = []
        myCols.push({ size: 3, content: calculatedColumn.ColumnId });
        myCols.push({ size: 6, content: calculatedColumn.GetValueFunc });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, calculatedColumn)}
            shareClick={() => this.props.onShare()}
            ConfigEntity={calculatedColumn}
            EntityName="Calculated Column">
        </EntityListActionButtons>
        myCols.push({ size: 3, content: buttons });

        return <ConfigEntityRowItem items={myCols} />


    }

}