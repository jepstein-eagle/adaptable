import * as React from "react";
import { Helper } from '../../../Utilities/Helpers/Helper'
import { StringExtensions } from '../../../Utilities/Extensions/StringExtensions'
import { Typeahead } from 'react-bootstrap-typeahead'
import { IColumn } from '../../../Utilities/Interface/IColumn';
import { SortOrder, SelectionMode, DistinctCriteriaPairValue, DataType } from '../../../Utilities/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { IAdaptableBlotter } from "../../../Utilities/Interface/IAdaptableBlotter";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";

export interface ColumnValueSelectorProps extends React.HTMLProps<ColumnValueSelector> {
    SelectedColumn: IColumn
    SelectedColumnValue: string
    onColumnValueChange: (columnvalue: any) => void
    Blotter: IAdaptableBlotter
    AllowNew?: boolean // defaults to true if not provided
    bsSize?: 'large' | 'lg' | 'small' | 'sm';
    cssClassName: string
}
export class    ColumnValueSelector extends React.Component<ColumnValueSelectorProps, {}> {

      componentWillReceiveProps(nextProps: ColumnValueSelectorProps, nextContext: any) {
        if (StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue) && StringExtensions.IsNullOrEmpty(nextProps.SelectedColumnValue)) {
            let typeahed: any = (this.refs.typeahead as any);
            if (typeahed) {
                typeahed.getInstance().clear()
            }
        }
    }
    render() {
        let cssClassName: string = this.props.cssClassName + StyleConstants.COLUMN_VALUE_SELECTOR;
        let sortedColumnValues: IRawValueDisplayValuePair[] = []
        let selectedValue: string = ""
        let placeholderText = "Select column value"
        let allowNew = (this.props.AllowNew != null) ? this.props.AllowNew : true;
        if (allowNew) {
            placeholderText += " or enter free text"
        }

        if (this.props.SelectedColumn != null && this.props.Blotter !=null && this.props.Blotter.getColumnValueDisplayValuePairDistinctList!= null) {
            let columnDisplayValuePairs: IRawValueDisplayValuePair[] = this.props.Blotter.getColumnValueDisplayValuePairDistinctList(this.props.SelectedColumn.ColumnId, DistinctCriteriaPairValue.DisplayValue)

            if (StringExtensions.IsNullOrEmpty(this.props.SelectedColumnValue)) {
                selectedValue = "";
            } else {
                let existingPair: IRawValueDisplayValuePair = columnDisplayValuePairs.find(cdv => cdv.RawValue == this.props.SelectedColumnValue);
                selectedValue = (existingPair) ? existingPair.DisplayValue : this.props.SelectedColumnValue
            }
            sortedColumnValues = Helper.sortArrayWithProperty(SortOrder.Ascending, columnDisplayValuePairs, "RawValue")
        }

        return <Typeahead ref="typeahead"
            bsSize={this.props.bsSize}
            emptyLabel={""}
            placeholder={placeholderText}
            labelKey={"DisplayValue"}
            multiple={false}
            selected={[selectedValue]}
            onChange={(selected) => { this.onColumnChange(selected) }}
            options={sortedColumnValues}
            disabled={this.props.disabled}
            allowNew={allowNew}
            newSelectionPrefix={"new value: "}
            filterBy={["DisplayValue"]}
          />

    }

    onColumnChange(selected: any[]) {
        if (ArrayExtensions.IsEmpty(selected) && StringExtensions.IsNullOrEmpty (this.props.SelectedColumnValue)) {
            return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
        }
        if (ArrayExtensions.IsEmpty(selected)) {
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