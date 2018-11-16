import * as React from "react";
import { FormControl } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import { EnumExtensions } from '../../Core/Extensions/EnumExtensions';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { ICellRenderer } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ActionMode } from "../../Core/Enums";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";


export interface CellRendererEntityRowProps extends SharedEntityExpressionRowProps<CellRendererEntityRow> {
    Column: IColumn
 }

export class CellRendererEntityRow extends React.Component<CellRendererEntityRowProps, {}> {
    render(): any {
        let cellRenderer: ICellRenderer = this.props.AdaptableBlotterObject as ICellRenderer;

      let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = ColumnHelper.getFriendlyNameFromColumn(cellRenderer.ColumnId, this.props.Column)
          colItems[1].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, cellRenderer)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={!this.props.Column}
             EntityName={StrategyConstants.CellRendererStrategyName} />


        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }






}

