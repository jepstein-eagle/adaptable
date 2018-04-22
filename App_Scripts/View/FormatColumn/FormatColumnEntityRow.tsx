import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { IFormatColumn } from '../../Strategy/Interface/IFormatColumnStrategy';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";

export class FormatColumnEntityRow extends React.Component<SharedEntityExpressionRowProps<FormatColumnEntityRow>, {}> {

    render(): any {
        let formatColumn = this.props.AdaptableBlotterObject as IFormatColumn;

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = this.props.Columns.find(c => c.ColumnId == formatColumn.ColumnId).FriendlyName
        colItems[1].Content = <StyleVisualItem Style={formatColumn.Style} />
        colItems[2].Content = <EntityListActionButtons
        cssClassName={this.props.cssClassName}
         editClick={() => this.props.onEdit(this.props.Index, formatColumn)}
            showShare={this.props.TeamSharingActivated}
            shareClick={() => this.props.onShare()}
            ConfigEntity={formatColumn}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyNames.FormatColumnStrategyName} />

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }
}
