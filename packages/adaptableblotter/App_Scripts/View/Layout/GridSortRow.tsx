import * as React from "react";
import { FormControl } from 'react-bootstrap';
import { AdaptableObjectRow } from '../Components/AdaptableObjectRow';
import { SharedEntityExpressionRowProps } from '../Components/SharedProps/ConfigEntityRowProps';
import { IColItem } from "../UIInterfaces";
import { IColumn } from "../../Utilities/Interface/IColumn";
import { SelectionMode, SortOrder, AccessLevel } from "../../Utilities/Enums";
import { ColumnSelector } from "../Components/Selectors/ColumnSelector";
import { EnumExtensions } from "../../Utilities/Extensions/EnumExtensions";
import { ButtonDelete } from '../Components/Buttons/ButtonDelete';
import { IGridSort } from "../../Utilities/Interface/IAdaptableBlotterObjects";

export interface GridSortRowProps<GridSortRow> extends SharedEntityExpressionRowProps<GridSortRow> {
    GridSort: IGridSort
    onGridSortColumnChanged: (column: IColumn) => void;
    onGridSortOrderChanged: (sortOrder: SortOrder) => void;
    onDeleteGridSort: () => void;
}

export class GridSortRow extends React.Component<GridSortRowProps<GridSortRow>, {}> {

    render(): any {

        let colItems: IColItem[] = [].concat(this.props.colItems);

        let sortOrders = EnumExtensions.getNames(SortOrder).map((enumName) => {
            return <option key={enumName} value={enumName}>{enumName}</option>
        })

        colItems[0].Content = <ColumnSelector cssClassName={this.props.cssClassName} SelectedColumnIds={[this.props.GridSort.Column]}
            ColumnList={this.props.Columns.filter(c=>c.Sortable)}
            onColumnChange={columns => this.onColumnSelectedChanged(columns)}
            SelectionMode={SelectionMode.Single} />

        colItems[1].Content = <FormControl componentClass="select" placeholder="select"
            value={this.props.GridSort.SortOrder}
            onChange={(x: any) => this.onSortOrderChanged(x)} >
            {sortOrders}

        </FormControl>

        let deleteButton = <ButtonDelete
            cssClassName={this.props.cssClassName}
            style={{ marginLeft: "1px", marginTop: "2px", marginBottom: "2px", marginRight: "1px" }}
            overrideDisableButton={false}
             overrideTooltip={"Delete Sort"}
            DisplayMode="Glyph"
            ConfirmAction={null}
            ConfirmationMsg={""}
            ConfirmationTitle={""}
            onClickAction={() => this.props.onDeleteGridSort()}
            size="small" 
            AccessLevel={AccessLevel.Full} // only here if in wizard...
            />

        colItems[2].Content = deleteButton;

        return <AdaptableObjectRow cssClassName={this.props.cssClassName} colItems={colItems} />
    }

    private onColumnSelectedChanged(columns: IColumn[]): any {
        let column: IColumn = columns[0];

        this.props.onGridSortColumnChanged(column);
    }

    private onSortOrderChanged(event: React.FormEvent<any>) {
        let e = event.target as HTMLInputElement;
        this.props.onGridSortOrderChanged(e.value as SortOrder);
    }

}
