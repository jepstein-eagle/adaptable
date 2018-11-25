import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { IColItem } from "../UIInterfaces";
import { ILinkedColumn } from "../../Core/Interface/Interfaces";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";


export interface LinkedColumnEntityRowProps<LinkedColumnEntityRow> extends SharedEntityExpressionRowProps<LinkedColumnEntityRow> {
}

export class LinkedColumnEntityRow extends React.Component<LinkedColumnEntityRowProps<LinkedColumnEntityRow>, {}> {

    render(): any {
        let LinkedColumn: ILinkedColumn = this.props.AdaptableBlotterObject as ILinkedColumn;

        let colItems: IColItem[] = [].concat(this.props.colItems);
        let columnNames: string[] = LinkedColumn.ColumnIds.map(ci => { return ColumnHelper.getFriendlyNameFromColumnId(ci, this.props.Columns) });

        colItems[0].Content = LinkedColumn.LinkedColumnId;
        colItems[1].Content = columnNames.join(', ')

        let buttons: any = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, LinkedColumn)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={false}
            EntityName={StrategyConstants.LinkedColumnStrategyName} />

        colItems[2].Content = buttons;

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }



}
