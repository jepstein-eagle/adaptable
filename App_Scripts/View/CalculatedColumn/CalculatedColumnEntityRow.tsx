import { ICalculatedColumn } from '../../Strategy/Interface/ICalculatedColumnStrategy';
import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';

export class CalculatedColumnEntityRow extends React.Component<SharedEntityRowProps<CalculatedColumnEntityRow>, {}> {
   
    render(): any {
        let calculatedColumn: ICalculatedColumn = this.props.ConfigEntity as ICalculatedColumn;

        let myCols: IColItem[] = []
        myCols.push({ size: this.props.EntityRowInfo[0].Width, content: calculatedColumn.ColumnId });
        myCols.push({ size: this.props.EntityRowInfo[1].Width, content: calculatedColumn.GetValueFunc });
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, calculatedColumn)}
            shareClick={() => this.props.onShare()}
            ConfigEntity={calculatedColumn}
            EntityName="Calculated Column">
        </EntityListActionButtons>
        myCols.push({ size: this.props.EntityRowInfo[2].Width, content: buttons });

        return <ConfigEntityRowItem items={myCols} />


    }

}