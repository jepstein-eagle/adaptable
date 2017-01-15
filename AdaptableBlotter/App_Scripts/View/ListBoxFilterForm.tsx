/// <reference path="../../typings/index.d.ts" />

import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { SortOrder, ColumnType } from '../Core/Enums'
import { ListBoxFilterSortComponent } from './ListBoxFilterSortComponent'
import { ListGroupItem, FormControl, Row, Glyphicon, ListGroup, Col, Button, ListGroupItemProps, Panel, Grid, ButtonGroup, ListGroupProps, Form, FormGroup, InputGroup } from 'react-bootstrap';
import { StringExtensions } from '../Core/Extensions';


interface ListBoxFilterFormProps extends ListGroupProps {
    ColumnValues: Array<{ rawValue: any, displayValue: string }>
    UserFilters: Array<{ rawValue: any, displayValue: string }>
    UiSelectedColumnValues: Array<String>
    UiSelectedUserFilters: Array<String>
    onColumnValueSelectedChange: (SelectedValues: Array<any>) => void
    onUserFilterSelectedChange: (SelectedValues: Array<any>) => void
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
            isActive = this.state.UiSelectedUserFilters.indexOf(x.rawValue) >= 0;
            let display: string = x.displayValue;
            let value = x.rawValue;
            if (StringExtensions.IsNotEmpty(this.state.FilterValue) && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return <ListGroupItem key={y} style={userFilterItemStyle}
                    onClick={() => this.onClickItemUserFilter(x)}
                    active={isActive}
                    value={value} >{display}</ListGroupItem>
            }
        })

let userFiltersItemsElementsCount: number = userFiltersItemsElements.length;

        let columnValuesItemsElements = this.props.ColumnValues.map((x,y) => {
            let isActive: boolean
            isActive = this.state.UiSelectedColumnValues.indexOf(x.rawValue) >= 0;
            let display: string = x.displayValue;
            let value = x.rawValue;
            if (StringExtensions.IsNotEmpty(this.state.FilterValue) && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return <ListGroupItem key={y + userFiltersItemsElementsCount} style={columnVItemStyle}
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
                    <Button onClick={() => this.clearFilter()}><Glyphicon glyph="remove" /></Button>
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

    onClickItemColumnValue(item: { rawValue: any, displayValue: string }) {
        let index = this.state.UiSelectedColumnValues.indexOf(item.rawValue);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedColumnValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeColumnValues())
        }
        else {
            let newArray = [...this.state.UiSelectedColumnValues];
            newArray.push(item.rawValue)
            this.setState({ UiSelectedColumnValues: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeColumnValues())
        }
    }

    onClickItemUserFilter(item: { rawValue: any, displayValue: string }) {
        let index = this.state.UiSelectedUserFilters.indexOf(item.rawValue);
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedUserFilters];
            newArray.splice(index, 1);
            this.setState({ UiSelectedUserFilters: newArray } as ListBoxFilterFormState, () => this.raiseOnChangeUserFilter())
        }
        else {
            let newArray = [...this.state.UiSelectedUserFilters];
            newArray.push(item.rawValue)
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