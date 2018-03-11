import { ICalculatedColumn } from '../../Strategy/Interface/ICalculatedColumnStrategy';
import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { ConfigEntityRowItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import * as StrategyNames from '../../Core/Constants/StrategyNames'


export class CalculatedColumnEntityRow extends React.Component<SharedEntityRowProps<CalculatedColumnEntityRow>, {}> {
   
    render(): any {
        let calculatedColumn: ICalculatedColumn = this.props.AdaptableBlotterObject as ICalculatedColumn;

        let colItems: IColItem[] = [].concat(this.props.ColItems);

        colItems[0].Content = calculatedColumn.ColumnId
        colItems[1].Content = calculatedColumn.GetValueFunc
      
        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            editClick={() => this.props.onEdit(this.props.Index, calculatedColumn)}
            shareClick={() => this.props.onShare()}
            showShare={this.props.TeamSharingActivated}
            ConfigEntity={calculatedColumn}
            EntityName={StrategyNames.CalculatedColumnStrategyName}>
        </EntityListActionButtons>
         colItems[2].Content = buttons
      

        return <ConfigEntityRowItem ColItems={colItems} />


    }

}