import * as React from "react";
import * as Redux from "redux";
import { Helper } from '../Core/Helper'
import { SortOrder, SelectionMode } from '../Core/Enums'
import { ListBoxFilterSortComponent } from './ListBoxFilterSortComponent'
import { ListGroupItem, Row, ListGroup, Col, Button, ListGroupItemProps, Panel, Grid, ButtonGroup, ListGroupProps, Form, InputGroup } from 'react-bootstrap';
import { StringExtensions } from '../Core/Extensions';

interface SingleListBoxProps extends ListGroupProps {
    Values: Array<any>
    UiSelectedValues: Array<any>
    onSelectedChange: (SelectedValues: Array<any>) => void
    //if not primitive objects all DisplayMember and ValueMember and SortMember need to be used
    DisplayMember?: string
    ValueMember?: string
    SortMember?: string
    SelectionMode : SelectionMode
}

interface SingleListBoxState extends React.ClassAttributes<SingleListBox> {
    Values: Array<any>
    UiSelectedValues: Array<any>
    FilterValue: string
    SortOrder: SortOrder
}

export class SingleListBox extends React.Component<SingleListBoxProps, SingleListBoxState> {
    constructor(props: SingleListBoxProps) {
        super(props);
        this.state = {
            Values: Helper.sortArrayWithProperty(SortOrder.Ascending, this.props.Values, this.props.SortMember),
            UiSelectedValues: this.props.UiSelectedValues,
            FilterValue: "",
            SortOrder: SortOrder.Ascending
        };
    }
    componentWillReceiveProps(nextProps: SingleListBoxProps, nextContext: any) {
        this.setState({
            Values: Helper.sortArrayWithProperty(this.state.SortOrder, nextProps.Values, this.props.SortMember),
            UiSelectedValues: nextProps.UiSelectedValues,
            FilterValue: this.state.FilterValue,
            SortOrder: this.state.SortOrder
        });
    }
    render() {
        let itemsElements = this.state.Values.map(x => {
            let isActive: boolean
            if (this.props.ValueMember) {
                isActive = this.state.UiSelectedValues.indexOf(x[this.props.ValueMember]) >= 0;
            }
            else {
                isActive = this.state.UiSelectedValues.indexOf(x) >= 0;
            }

            let display: string = this.props.DisplayMember ? x[this.props.DisplayMember] : x;
            let value = this.props.ValueMember ? x[this.props.ValueMember] : x;
            if (StringExtensions.IsNotEmpty(this.state.FilterValue) && display.toLocaleLowerCase().indexOf(this.state.FilterValue.toLocaleLowerCase()) < 0) {
                return null;
            }
            else {
                return <ListGroupItem key={value}
                    onClick={() => this.onClickItem(x)}
                    active={isActive}
                    value={value} >{display}</ListGroupItem>
            }
        })

        let header = <ListBoxFilterSortComponent FilterValue={this.state.FilterValue} sortColumnValues={() => this.sortColumnValues()}
            SortOrder={this.state.SortOrder} handleChangeFilterValue={(e) => this.handleChangeFilterValue(e)}></ListBoxFilterSortComponent>

        return <div>
            {header}
            <ListGroup fill style={this.props.style}>
                {itemsElements}
            </ListGroup>
        </div>;
    }

    handleChangeFilterValue(x: string) {
        this.setState({
            FilterValue: x
        } as SingleListBoxState);
    }

    sortColumnValues() {
        if (this.state.SortOrder == SortOrder.Ascending) {
            this.setState({
                Values: Helper.sortArrayWithProperty(SortOrder.Descending, this.state.Values, this.props.SortMember),
                SortOrder: SortOrder.Descending
            } as SingleListBoxState);
        }
        else {
            this.setState({
                Values: Helper.sortArrayWithProperty(SortOrder.Ascending, this.state.Values, this.props.SortMember),
                SortOrder: SortOrder.Ascending
            } as SingleListBoxState);
        }
    }

    raiseOnChange() {
        this.props.onSelectedChange(this.state.UiSelectedValues);
    }

    onClickItem(item: any) {
        let index: number
        if (this.props.ValueMember) {
            index = this.state.UiSelectedValues.indexOf(item[this.props.ValueMember]);
        }
        else {
            index = this.state.UiSelectedValues.indexOf(item);
        }
        if (index >= 0) {
            let newArray = [...this.state.UiSelectedValues];
            newArray.splice(index, 1);
            this.setState({ UiSelectedValues: newArray } as SingleListBoxState, () => this.raiseOnChange())
        }
        else {
            let newArray = [...this.state.UiSelectedValues];
            if(this.props.SelectionMode == SelectionMode.Single)
            {
                newArray = []
            }
            if (this.props.ValueMember) {
                newArray.push(item[this.props.ValueMember])
            }
            else {
                newArray.push(item)
            }
            this.setState({ UiSelectedValues: newArray } as SingleListBoxState, () => this.raiseOnChange())
        }
    }
}