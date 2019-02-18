import * as React from "react";
import { Typeahead } from 'react-bootstrap-typeahead'
import { StringExtensions } from "../../../Utilities/Extensions/StringExtensions";
import { SelectionMode, SortOrder } from "../../../Utilities/Enums";
import { IColumn } from "../../../Utilities/Interface/IColumn";
import { Helper } from "../../../Utilities/Helpers/Helper";
import { Sizes, InputGroup } from "react-bootstrap";
import { CSSProperties } from "react";
import * as StyleConstants from '../../../Utilities/Constants/StyleConstants';
import { ButtonClear } from "../Buttons/ButtonClear";
import { ArrayExtensions } from "../../../Utilities/Extensions/ArrayExtensions";

export interface ColumnSelectorProps extends React.HTMLProps<ColumnSelector> {
    ColumnList: IColumn[]
    SelectedColumnIds: string[]
    onColumnChange: (SelectedColumns: IColumn[]) => void
    SelectionMode: SelectionMode
    className?: string,
    bsSize?: 'large' | 'lg' | 'small' | 'sm';
    cssClassName: string
}

export class ColumnSelector extends React.Component<ColumnSelectorProps, {}> {
   // _typeahead: any;

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
        let cssClassName: string = this.props.cssClassName + StyleConstants.COLUMN_SELECTOR;
        let sortedColumns = ArrayExtensions.sortArrayWithProperty(SortOrder.Ascending, this.props.ColumnList, "FriendlyName")
        let selectedColumnIds = this.props.SelectedColumnIds.filter(x => StringExtensions.IsNotNullOrEmpty(x))
        let selectedColums: IColumn[] = this.props.ColumnList.filter(x => selectedColumnIds.find(c => c == x.ColumnId))
        let placeHolder: string = (this.props.SelectionMode == SelectionMode.Single) ? "Select a column" : "Select columns"

        // let size: any = (this.props.bsSize) ? this.props.bsSize : 'large';

        let isEmptySelectedColumnIds: boolean = this.props.SelectedColumnIds.filter(x => StringExtensions.IsNotNullOrEmpty(x)).length == 0;

        return <div className={cssClassName}>
            <InputGroup>
                <Typeahead ref={"typeahead"}
                    emptyLabel={"No Column"}
                    placeholder={placeHolder}
                    labelKey={"FriendlyName"}
                    filterBy={["FriendlyName", "ColumnId"]}
                    multiple={this.props.SelectionMode == SelectionMode.Multi}
                    selected={selectedColums}
                    onChange={(selected) => { this.onColumnChange(selected, isEmptySelectedColumnIds) }}
                    options={sortedColumns}
                    disabled={this.props.disabled}
                />
                <InputGroup.Button>
                    <ButtonClear
                        bsStyle={"default"}
                        cssClassName={cssClassName}
                        onClick={() => this.onClearButton()}
                        overrideTooltip="Clear Column"
                        overrideDisableButton={isEmptySelectedColumnIds}
                         DisplayMode="Glyph" />
                </InputGroup.Button>
            </InputGroup>


        </div>
    }

    onClearButton() {
        this.props.onColumnChange([]);
       // if (this._typeahead != null) {
            (this.refs.typeahead as any).getInstance().clear()
      //  }
    }

    onColumnChange(selected: IColumn[], isEmptySelection: boolean) {
        if (selected.length == 0 && isEmptySelection) {
            return; // must be a nicer way but we want to avoid ridiculous amounts of prop calls
        }
        this.props.onColumnChange(selected)
    }

}