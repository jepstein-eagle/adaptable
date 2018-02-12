import * as React from "react";
import { Helper } from '../Core/Helpers/Helper'
import { StringExtensions } from '../Core/Extensions/StringExtensions'
import { Typeahead } from 'react-bootstrap-typeahead'
import { IColumn } from '../Core/Interface/IAdaptableBlotter';
import { SortOrder, SelectionMode } from '../Core/Enums';

export interface ColumnSelectorProps extends React.HTMLProps<ColumnSelector> {
    ColumnList: IColumn[]
    SelectedColumnIds: string[]
    onColumnChange: (SelectedColumns: IColumn[]) => void
    SelectionMode: SelectionMode
}
export class ColumnSelector extends React.Component<ColumnSelectorProps, {}> {
    componentWillReceiveProps(nextProps: ColumnSelectorProps, nextContext: any) {
        //if there was a selected column and parent unset the column we then clear the component 
        // otherwise it's correctly unselected but the input still have the previsous selected column text
        let propsSelectedColumnIds: string[] = this.props.SelectedColumnIds.filter(x => StringExtensions.IsNotNullOrEmpty(x))
        let nextPropsSelectedColumnIds: string[] = nextProps.SelectedColumnIds.filter(x => StringExtensions.IsNotNullOrEmpty(x))

        if (propsSelectedColumnIds.length == 0 && nextPropsSelectedColumnIds.length == 0) {
            (this.refs.typeahead as any).getInstance().clear()
        }
    }
    render() {
        let sortedColumns = Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.ColumnList, "FriendlyName")
        let selectedColumnIds = this.props.SelectedColumnIds.filter(x => StringExtensions.IsNotNullOrEmpty(x))
        let selectedColums: IColumn[] = this.props.ColumnList.filter(x => selectedColumnIds.find(c => c == x.ColumnId))
        let placeHolder: string = (this.props.SelectionMode == SelectionMode.Single) ? "Select a column" : "Select columns"

        return <Typeahead ref="typeahead" emptyLabel={"No Column found with that search"}
            placeholder={placeHolder}
            labelKey={"FriendlyName"}
            filterBy={["FriendlyName", "ColumnId"]}
            multiple={this.props.SelectionMode == SelectionMode.Multi}
            clearButton={true}
            selected={selectedColums}
            onChange={(selected) => { this.onColumnChange(selected) }}
            options={sortedColumns}
            disabled={this.props.disabled}
        />
    }

    onColumnChange(selected: IColumn[]) {
        if (selected.length == 0 && this.props.SelectedColumnIds.filter(x => StringExtensions.IsNotNullOrEmpty(x)).length == 0) {
            return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
        }
        this.props.onColumnChange(selected)
    }

}