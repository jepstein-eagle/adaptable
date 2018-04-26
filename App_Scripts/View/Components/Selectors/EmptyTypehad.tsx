import * as React from "react";
import { Helper } from '../../../Core/Helpers/Helper'
import { StringExtensions } from '../../../Core/Extensions/StringExtensions'
import { Typeahead } from 'react-bootstrap-typeahead'
import { IColumn } from '../../../Core/Interface/IColumn';
import { SortOrder, SelectionMode, DistinctCriteriaPairValue, DataType } from '../../../Core/Enums';
import { IRawValueDisplayValuePair } from "../../UIInterfaces";

export interface ColumnValueSelectorProps extends React.HTMLProps<Empty> {
   
}
export class Empty extends React.Component<ColumnValueSelectorProps, {}> {

  
    render() {
       

        return <Typeahead ref="typeahead"
            emptyLabel={""}
            placeholder={"hello"}
            labelKey={"DisplayValue"}
            filterBy={["DisplayValue"]}
            multiple={false}
            clearButton={true}
            selected={[]}
            onChange={null }
            options={[]}
            disabled={this.props.disabled}
            allowNew={false}
            newSelectionPrefix={"new value: "}
        />

    }

  

}