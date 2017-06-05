import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { StringExtensions } from '../Core/Extensions'
import { Typeahead } from 'react-bootstrap-typeahead'
import { IColumn } from '../Core/Interface/IAdaptableBlotter';
import { SortOrder } from '../Core/Enums';

export interface ColumnSelectorProps extends React.HTMLProps<ColumnSelector> {
    ColumnList: IColumn[]
    SelectedColumnId: string
    onColumnChange: (SelectedColumn: IColumn) => void
}
export class ColumnSelector extends React.Component<ColumnSelectorProps, {}> {
    componentWillReceiveProps(nextProps: ColumnSelectorProps, nextContext: any) {
        //if there was a selected column and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected column text
        if (StringExtensions.IsNullOrEmpty(nextProps.SelectedColumnId) && StringExtensions.IsNotNullOrEmpty(this.props.SelectedColumnId)) {
            (this.refs.typeahead as any).getInstance().clear()
        }
    }
    render() {
        let sortedColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.ColumnList, "FriendlyName")
        let selectedColum = this.props.ColumnList.find(x => x.ColumnId == this.props.SelectedColumnId)
        return <Typeahead ref="typeahead" emptyLabel={"No Column found with that search"}
            placeholder={"Select a column"}
            labelKey={"FriendlyName"}
            filterBy={["FriendlyName", "ColumnId"]}
            clearButton={true}
            selected={selectedColum ? [selectedColum] : []}
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