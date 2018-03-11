import * as React from "react";
import { Helper } from '../Core/Helpers/Helper'
import { StringExtensions } from '../Core/Extensions/StringExtensions'
import { Typeahead } from 'react-bootstrap-typeahead'
import { IColumn } from '../Core/Interface/IColumn';
import { SortOrder, SelectionMode, DistinctCriteriaPairValue, DataType } from '../Core/Enums';
import { IRawValueDisplayValuePair } from "./UIInterfaces";

export interface ColumnValueSelectorProps extends React.HTMLProps<ColumnValueSelector> {
    SelectedColumn: IColumn
    SelectedColumnValue: string
    onColumnValueChange: (columnvalue: any) => void
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>

}
export class ColumnValueSelector extends React.Component<ColumnValueSelectorProps, {}> {

    componentWillReceiveProps(nextProps: ColumnValueSelectorProps, nextContext: any) {
        if (StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue) && StringExtensions.IsNullOrEmpty(nextProps.SelectedColumnValue)) {
            (this.refs.typeahead as any).getInstance().clear()
        }
    }

    render() {
        let columnDisplayValuePairs = this.props.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumn.ColumnId, DistinctCriteriaPairValue.DisplayValue)
        let columnValues: any[] = []
        if(this.props.SelectedColumn.DataType == DataType.Number || this.props.SelectedColumn.DataType == DataType.Date){
            columnDisplayValuePairs.forEach(c => {
                columnValues.push(c.RawValue)
            })
        }else{
            columnDisplayValuePairs.forEach(c => {
                columnValues.push(c.DisplayValue)
            })
        }
        let sortedColumnValues = Helper.sortArray(columnValues)

        return <Typeahead ref="typeahead"
            emptyLabel={"Value not found in column"}
            placeholder={"Select a column value"}
            labelKey={"ColumnValue"}
            clearButton={true}
            selected={[this.props.SelectedColumnValue]}
            onChange={(selected) => { this.onColumnChange(selected) }}
            options={sortedColumnValues}
            disabled={this.props.disabled}
        />
    }

    onColumnChange(selected: any) {
        if (selected.length == 0 && this.props.SelectedColumnValue=="") {
            return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
        }
        this.props.onColumnValueChange(selected)
    }

}