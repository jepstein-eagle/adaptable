import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { IFormatColumn } from '../../Strategy/Interface/IFormatColumnStrategy';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { ConfigEntityRowItem, IColItem } from '../Components/ConfigEntityRowItem';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';

export class FormatColumnEntityRow extends React.Component<SharedEntityExpressionRowProps<FormatColumnEntityRow>, {}> {

    render(): any {
        let formatColumn = this.props.ConfigEntity as IFormatColumn;

        let myCols: IColItem[] = []
        myCols.push({ size: this.props.EntityRowInfo[0].Width, content: this.props.Columns.find(c => c.ColumnId == formatColumn.ColumnId).FriendlyName });
        myCols.push({ size: this.props.EntityRowInfo[1].Width, content: <StyleVisualItem Style={formatColumn.Style} /> });
        let buttons: any = <EntityListActionButtons
            editClick={() => this.props.onEdit(this.props.Index, formatColumn)}
            shareClick={() => this.props.onShare()}
            ConfigEntity={formatColumn}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyNames.FormatColumnStrategyName} />
        myCols.push({ size: this.props.EntityRowInfo[2].Width, content: buttons });

        return <ConfigEntityRowItem
            items={myCols}
        />
    }
}
