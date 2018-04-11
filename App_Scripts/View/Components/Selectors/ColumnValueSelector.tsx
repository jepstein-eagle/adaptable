import * as React from "react";
import { Helper } from '../../../Core/Helpers/Helper'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions'
import { Typeahead } from 'react-bootstrap-typeahead'
import { IColumn } from '../../../Core/Interface/IColumn';
import { SortOrder, SelectionMode, DistinctCriteriaPairValue, DataType } from '../../../Core/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";

export interface ColumnValueSelectorProps extends React.HTMLProps<ColumnValueSelector> {
    SelectedColumn: IColumn
    SelectedColumnValue: string
    onColumnValueChange: (columnvalue: any) => void
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    AllowNew?: boolean // defaults to true if not provided
    bsSize?: 'large' | 'lg' | 'small' | 'sm';
}
export class ColumnValueSelector extends React.Component<ColumnValueSelectorProps, {}> {

    componentWillReceiveProps(nextProps: ColumnValueSelectorProps, nextContext: any) {
        if (StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue) && StringExtensions.IsNullOrEmpty(nextProps.SelectedColumnValue)) {
            let typeahed: any = (this.refs.typeahead as any);
            if (typeahed) {
                typeahed.getInstance().clear()
            }
        }
    }
    render() {
        let sortedColumnValues: string[] = []
        let selectedValue: string = ""
        let placeholderText = "Select existing column value"
        let allowNew = (this.props.AllowNew != null) ? this.props.AllowNew : true;
        if (allowNew) {
            placeholderText += " or enter free text"
        }

        if (this.props.SelectedColumn != null) {
            let columnDisplayValuePairs: IRawValueDisplayValuePair[] = this.props.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumn.ColumnId, DistinctCriteriaPairValue.DisplayValue)

            if (StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue)) {
                selectedValue = "";
            } else {
                let existingPair: IRawValueDisplayValuePair = columnDisplayValuePairs.find(cdv => cdv.RawValue == this.props.SelectedColumnValue);
                selectedValue = (existingPair) ? existingPair.DisplayValue : this.props.SelectedColumnValue
            }
            sortedColumnValues = Helper.sortArrayWithProperty(SortOrder.Ascending, columnDisplayValuePairs, "RawValue")
        }

        return <Typeahead ref="typeahead"
            emptyLabel={""}
            placeholder={placeholderText}
            bsSize={this.props.bsSize}
            labelKey={"DisplayValue"}
            filterBy={["DisplayValue"]}
            multiple={false}
            clearButton={true}
            selected={[selectedValue]}
            onChange={(selected) => { this.onColumnChange(selected) }}
            options={sortedColumnValues}
            disabled={this.props.disabled}
            allowNew={allowNew}
            newSelectionPrefix={"new value: "}
        />

    }

    onColumnChange(selected: any[]) {
        if (selected.length == 0 && this.props.SelectedColumnValue == "") {
            return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
        }
        if (selected.length == 0) {
            this.props.onColumnValueChange("")
        } else {
            if (selected[0].customOption) {
                this.props.onColumnValueChange(selected[0].DisplayValue)
            } else {
                let pair: IRawValueDisplayValuePair = selected[0];
                this.props.onColumnValueChange(pair.RawValue)
            }
        }
    }

}