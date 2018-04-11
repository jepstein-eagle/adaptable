import * as React from "react";
import { ILayout } from '../../Strategy/Interface/ILayoutStrategy';
import { Radio } from 'react-bootstrap';
import { EntityListActionButtons } from '../Components/Buttons/EntityListActionButtons';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import * as StrategyNames from '../../Core/Constants/StrategyNames'
import { IColItem } from "../UIInterfaces";
import { DEFAULT_LAYOUT } from "../../Core/Constants/GeneralConstants";
import { IGridSort } from "../../Core/Interface/Interfaces";
import { IColumn } from "../../Core/Interface/IColumn";
import * as GeneralConstants from '../../Core/Constants/GeneralConstants'


export interface LayoutEntityRowProps<LayoutEntityRow> extends SharedEntityExpressionRowProps<LayoutEntityRow> {
    IsCurrentLayout: boolean;
    onSelect: (Layout: ILayout) => void;
}

export class LayoutEntityRow extends React.Component<LayoutEntityRowProps<LayoutEntityRow>, {}> {

    render(): any {
        let layout: ILayout = this.props.AdaptableBlotterObject as ILayout;

        let colItems: IColItem[] = [].concat(this.props.ColItems);

        colItems[0].Content = <Radio style={{ padding: "0px", margin: "0px" }} onChange={() => this.props.onSelect(layout)} checked={this.props.IsCurrentLayout} />
        colItems[1].Content = layout.Name;
        colItems[2].Content = this.getLayoutDescription(layout)

        let buttons: any = <EntityListActionButtons
            ConfirmDeleteAction={this.props.onDeleteConfirm}
            showShare={this.props.TeamSharingActivated}
            editClick={null}
            shareClick={() => this.props.onShare()}
            overrideDisableEdit={true}
            overrideDisableDelete={layout.Name == DEFAULT_LAYOUT}
            ConfigEntity={layout}
            EntityName={StrategyNames.LayoutStrategyName} />

        colItems[3].Content = buttons;

        return <AdaptableObjectRow ColItems={colItems} />
    }

    private getLayoutDescription(layout: ILayout): string {
        let returnString: string = "";
        let gridSorts: IGridSort[] = layout.GridSorts;
        returnString += layout.Columns.length + " Columns; ";
        returnString += (gridSorts.length > 0) ?
            "Sort: " + this.getColumnDescription(gridSorts[0].Column) + " (" + gridSorts[0].SortOrder + ")" :
            "No Sort";
        return returnString;
    }

    private getColumnDescription(columnId: string): string {
        let column: IColumn = this.props.Columns.find(c => c.ColumnId == columnId);
        return (column)? column.FriendlyName : GeneralConstants. MISSING_COLUMN;
    }

}
