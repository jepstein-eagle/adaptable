import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Utilities/Constants/StrategyConstants'
import { StyleVisualItem } from '../Components/StyleVisualItem'
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IFormatColumn } from "../../Utilities/Interface/BlotterObjects/IFormatColumn";
import { ColumnHelper } from "../../Utilities/Helpers/ColumnHelper";

export class FormatColumnEntityRow extends React.Component<SharedEntityExpressionRowProps<FormatColumnEntityRow>, {}> {

    render(): any {
        let formatColumn = this.props.AdaptableBlotterObject as IFormatColumn;

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = ColumnHelper.getFriendlyNameFromColumnId(formatColumn.ColumnId, this.props.Columns)
        colItems[1].Content = <StyleVisualItem Style={formatColumn.Style} />
        colItems[2].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            editClick={() => this.props.onEdit(this.props.Index, formatColumn)}
            showShare={this.props.TeamSharingActivated}
            shareClick={() => this.props.onShare()}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityType={StrategyConstants.FormatColumnStrategyName} />

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }
}
