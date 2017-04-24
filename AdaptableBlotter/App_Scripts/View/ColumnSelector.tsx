import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { Typeahead } from 'react-bootstrap-typeahead'
import { IColumn } from '../Core/Interface/IAdaptableBlotter';
import { SortOrder } from '../Core/Enums';

interface ColumnSelectorProps extends React.HTMLProps<ColumnSelector> {
    ColumnList: IColumn[]
    SelectedColumnId: string
    onColumnChange: (SelectedColumn: IColumn) => void
}
export class ColumnSelector extends React.Component<ColumnSelectorProps, {}> {
    render() {
        let sortedColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.ColumnList, "FriendlyName")
        let selectedColum = this.props.ColumnList.find(x=>x.ColumnId == this.props.SelectedColumnId)
        return <Typeahead emptyLabel={"No Column found with that search"}
            placeholder={"Select a column"}
            labelKey={"FriendlyName"}
            filterBy={["FriendlyName", "ColumnId"]}
            clearButton={true}
            selected={[selectedColum]}
            onChange={(selected) => { this.onColumnChange(selected) }}
            options={sortedColumns}
            disabled={this.props.disabled}
        />
    }
    // For now this control can select only one ColumnSelector. If needed it can be extended and it's quite well done'
    onColumnChange(selected: IColumn[]) {
        this.props.onColumnChange(selected.length > 0 ? selected[0] : null)
    }
}