/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { SortOrder, DistinctCriteriaPairValue } from '../Core/Enums'
import { ListBoxFilterSortComponent } from './ListBoxFilterSortComponent'
import { ListGroupItem, FormControl, Row, Glyphicon, ListGroup, Col, Button, ListGroupItemProps, Panel, Grid, ButtonGroup, ListGroupProps, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { StringExtensions } from '../Core/Extensions';
import { IRawValueDisplayValuePair } from '../Core/Interface/IAdaptableBlotter';
import { ButtonClear } from './Components/Buttons/ButtonClear';


interface ListBoxFilterFormProps extends ListGroupProps {
    ColumnValues: Array<IRawValueDisplayValuePair>
    UserFilters: Array<IRawValueDisplayValuePair>
    UiSelectedColumnValues: Array<String>
    UiSelectedUserFilters: Array<String>
    onColumnValueSelectedChange: (SelectedValues: Array<any>) => void
    onUserFilterSelectedChange: (SelectedValues: Array<any>) => void
    ColumnValueType: DistinctCriteriaPairValue
}

interface ListBoxFilterFormState extends React.ClassAttributes<ListBoxFilterForm> {
    UiSelectedColumnValues: Array<String>
    UiSelectedUserFilters: Array<String>
    FilterValue: string
}

export class ListBoxFilterForm extends React.Component<ListBoxFilterFormProps, ListBoxFilterFormState> {
    constructor(props: ListBoxFilterFormProps) {
        super(props);
        this.state = {
            UiSelectedColumnValues: this.props.UiSelectedColumnValues,
            UiSelectedUserFilters: this.props.UiSelectedUserFilters,
            FilterValue: ""
        };
    }
    componentWillReceiveProps(nextProps: ListBoxFilterFormProps, nextContext: any) {
        this.setState({
            UiSelectedColumnValues: nextProps.UiSelectedColumnValues,
            UiSelectedUserFilters: nextProps.UiSelectedUserFilters,
            FilterValue: this.state.FilterValue
        });
    }

    render() {

        let showAllElement: boolean = this.state.UiSelectedUserFilters.length == 0 && this.state.UiSelectedColumnValues.length == 0;

        let allElement = <ListGroupItem key={"all"} style={userFilterItemStyle}
            onClick={() => this.onClickAllItem()}
            active={showAllElement}
            value={"all"} >{"(All)"}</ListGroupItem>

        let userFiltersItemsElements = this.props.UserFilters.map((x, y) => {
            let isActive: boolean
            isActive = this.state.UiSelectedUserFilters.indexOf(x.RawValue) >= 0;
            let display: string = x.DisplayValue;
            let value = x.RawValue;
            if (StringExtensions.IsNotEmpty(this.state.FilterValue) && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return <ListGroupItem key={"userFilter" + y} style={userFilterItemStyle}
                    onClick={() => this.onClickItemUserFilter(x)}
                    active={isActive}
                    value={value} >{display}</ListGroupItem>
            }
        })

        let columnValuesItemsElements = this.props.ColumnValues.map((x, y) => {
            let isActive: boolean
            let value: any
            if (this.props.ColumnValueType == DistinctCriteriaPairValue.RawValue) {
                isActive = this.state.UiSelectedColumnValues.indexOf(x.RawValue) >= 0;
                value = x.RawValue;
            }
            else if (this.props.ColumnValueType == DistinctCriteriaPairValue.DisplayValue) {
                isActive = this.state.UiSelectedColumnValues.indexOf(x.DisplayValue) >= 0;
                value = x.DisplayValue;
            }

            let display: string = x.DisplayValue;
            if (StringExtensions.IsNotEmpty(this.state.FilterValue) && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return <ListGroupItem key={"columnValue" + y} style={columnVItemStyle}
                    onClick={() => this.onClickItemColumnValue(x)}
                    active={isActive}
                    value={value} >{display}</ListGroupItem>
            }
        })

        let header = <FormGroup style={{ margin: 0 }}>
            <InputGroup>
                <FormControl
                    type="text"
                    value={this.state.FilterValue}
                    placeholder="Search"
                    onChange={(e) => this.handleChangeFilterValue(e)}
                    />
                <InputGroup.Button>
                  <ButtonClear onClick={() => this.clearFilter()}
                                    overrideTooltip="Clear Filter"
                                    overrideDisableButton={StringExtensions.IsNullOrEmpty(this.state.FilterValue)}
                                    DisplayMode="Glyph" />
                  
                 </InputGroup.Button>
            </InputGroup>
        </FormGroup>

        return <div>
            {header}
            <ListGroup fill style={divStyle} >
                {allElement}
                {userFiltersItemsElements}
                {columnValuesItemsElements}
            </ListGroup>
        </div>;
    }

    handleChangeFilterValue(x: React.FormEvent) {
        let e = x.target as HTMLInputElement;
        this.setState({
            FilterValue: e.value
        } as ListBoxFilterFormState);
    }

    clearFilter() {
        this.setState({
            FilterValue: ""
        } as ListBoxFilterFormState);
    }



    raiseOnChangeColumnValues() {
        this.props.onColumnValueSelectedChange(this.state.UiSelectedColumnValues);
    }

    raiseOnChangeUserFilter() {
        this.props.onUserFilterSelectedChange(this.state.UiSelectedUserFilters);
    }

    onClickItemColumnValue(item: IRawValueDisplayValuePair) {
        let index: number
        if (this.props.ColumnValueType == DistinctCriteriaPairValue.RawValue) {
            index = this.state.UiSelectedColumnValues.indexOf(item.RawValue);
        }
        else if (this.props.ColumnValueType == DistinctCriteriaPairValue.DisplayValue) {
            index = this.state.UiSelectedColumnValues.indexOf(item.DisplayValue);
        }

        if (index >= 0) {
            let newArray = [...this.state.UiSelectedColumnValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeColumnValues())
        }
        else {
            let newArray = [...this.state.UiSelectedColumnValues];
            if (this.props.ColumnValueType == DistinctCriteriaPairValue.RawValue) {
                newArray.push(item.RawValue)
            }
            else if (this.props.ColumnValueType == DistinctCriteriaPairValue.DisplayValue) {
                newArray.push(item.DisplayValue)
            }
            this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeColumnValues())
        }
    }

    onClickItemUserFilter(item: IRawValueDisplayValuePair) {
        let index = this.state.UiSelectedUserFilters.indexOf(item.RawValue);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedUserFilters];
            newArray.splice(index, 1);
            this.setState({ UiSelectedUserFilters: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeUserFilter())
        }
        else {
            let newArray = [...this.state.UiSelectedUserFilters];
            newArray.push(item.RawValue)
            this.setState({ UiSelectedUserFilters: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeUserFilter())
        }
    }

    onClickAllItem() {
        // just set it to nothing...
        let allArray: string[] = ["All"];
        this.setState({ UiSelectedUserFilters: allArray, UiSelectedColumnValues: this.state.UiSelectedUserFilters, FilterValue: this.state.FilterValue } as ListBoxFilterFormState, () => this.raiseOnChangeUserFilter())
    }
}

let divStyle = {
    'overflowY': 'auto',
    'height': '335px',
    'marginBottom': '0'
}

let userFilterItemStyle = {
    'width': '87%',
    'fontStyle': 'italic',
    'fontSize': 'small',
    'padding': '5%',
    'margin': 0
}

let columnVItemStyle = {
    'width': '87%',
    'fontSize': 'small',
    'padding': '5%',
    'margin': 0
}