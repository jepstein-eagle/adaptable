import * as React from "react";
/// <reference path="../../typings/.d.ts" />
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IFreeTextColumn } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ArrayExtensions } from "../../Core/Extensions/ArrayExtensions";
import { StringExtensions } from "../../Core/Extensions/StringExtensions";

export class FreeTextColumnEntityRow extends React.Component<SharedEntityExpressionRowProps<FreeTextColumnEntityRow>, {}> {

    render(): any {
        let FreeTextColumn = this.props.AdaptableBlotterObject as IFreeTextColumn;

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = FreeTextColumn.ColumnId
        colItems[1].Content = StringExtensions.IsNullOrEmpty( FreeTextColumn.DefaultValue)? "[None]":FreeTextColumn.DefaultValue;          
        colItems[2].Content = ArrayExtensions.IsNullOrEmpty(FreeTextColumn.FreeTextStoredValues) ? 0 : FreeTextColumn.FreeTextStoredValues.length
        colItems[3].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            editClick={() => this.props.onEdit(this.props.Index, FreeTextColumn)}
            showShare={this.props.TeamSharingActivated}
            shareClick={() => this.props.onShare()}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            EntityName={StrategyConstants.FreeTextColumnStrategyName} />

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }
}
