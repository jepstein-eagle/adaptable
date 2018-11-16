import * as React from "react";
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { IColumn } from '../../Core/Interface/IColumn';
import * as StrategyConstants from '../../Core/Constants/StrategyConstants'
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IPercentCellRenderer } from "../../Core/Api/Interface/IAdaptableBlotterObjects";
import { ColumnHelper } from "../../Core/Helpers/ColumnHelper";
import { ColorPicker } from "../ColorPicker";


export interface CellRendererEntityRowProps extends SharedEntityExpressionRowProps<CellRendererEntityRow> {
    Column: IColumn
    ColorPalette: string[]
    onPositiveColorChanged: (percentCellRenderer: IPercentCellRenderer, positiveColor: string) => void;
    onNegativeColorChanged: (percentCellRenderer: IPercentCellRenderer, negativeColor: string) => void;
}

export class CellRendererEntityRow extends React.Component<CellRendererEntityRowProps, {}> {
    render(): any {
        let cellRenderer: IPercentCellRenderer = this.props.AdaptableBlotterObject as IPercentCellRenderer;

        let colItems: IColItem[] = [].concat(this.props.colItems);

        colItems[0].Content = ColumnHelper.getFriendlyNameFromColumn(cellRenderer.ColumnId, this.props.Column)
        colItems[1].Content = cellRenderer.MinValue
        colItems[2].Content = cellRenderer.MaxValue
        colItems[3].Content = cellRenderer.PositiveColor
        colItems[4].Content = cellRenderer.NegativeColor
        colItems[3].Content = <ColorPicker ColorPalette={this.props.ColorPalette} value={cellRenderer.PositiveColor} onChange={(x) => this.onPositiveColorChanged(x)} />
        colItems[4].Content = <ColorPicker ColorPalette={this.props.ColorPalette} value={cellRenderer.NegativeColor} onChange={(x) => this.onNegativeColorChanged(x)} />


        colItems[5].Content = <EntityListActionButtons
            cssClassName={this.props.cssClassName}
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={() => this.props.onEdit(this.props.Index, cellRenderer)}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={!this.props.Column}
            EntityName={StrategyConstants.CellRendererStrategyName} />


        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }


    onPositiveColorChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onPositiveColorChanged(this.props.AdaptableBlotterObject as IPercentCellRenderer, e.value);
    }

    onNegativeColorChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onNegativeColorChanged(this.props.AdaptableBlotterObject as IPercentCellRenderer, e.value);
    }




}

