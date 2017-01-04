/// <reference path="../../typings/index.d.ts" />
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import { NamedExpressionState, GridState } from '../Redux/ActionsReducers/Interface/IState';
import { ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, ListGroupItem, Row, Modal, MenuItem, SplitButton, Checkbox } from 'react-bootstrap';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { PanelWithRow } from './PanelWithRow';
import { PanelWithButton } from './PanelWithButton';
import { IColumnFilter, IFilterContext } from '../Core/Interface/INamedExpressionStrategy';





interface FilterFormProps extends React.ClassAttributes<FilterFormComponent> {
    AdaptableBlotter: IAdaptableBlotter;
    CurrentColumn: IColumn;
    NamedExpressionState: NamedExpressionState;
    GridState: GridState;
}

interface FilterFormState {
    isEditing: boolean;
}

class FilterFormComponent extends React.Component<FilterFormProps, FilterFormState> {
    constructor() {
        super();
        this.state = { isEditing: false }
    }

    render(): any {


 let  columnValues: Array<any> = Array.from(new Set(this.props.AdaptableBlotter.getColumnValueString(this.props.CurrentColumn.ColumnId)));
               
        var columnValuesGroupItems = columnValues.map((columnValue: any, index: number) => {
            return <ListGroupItem key={index} bsSize="xsmall"
                onClick={() => this.onClickColumValue(columnValue)}
                >
                {columnValue}
            </ListGroupItem>
        })

        return <ListGroup style={listGroupStyle}  >
            {columnValuesGroupItems}
        </ListGroup>
    }

    onClickColumValue(columnValue: any) {
       alert("you filtered on " + columnValue)
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdaptableBlotter: ownProps.Blotter,
        CurrentColumn : ownProps.CurrentColumn,
        NamedExpressionState: state.NamedExpression,
        GridState: state.Grid,
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {

    };
}

export let FilterForm = connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);

export const FilterFormReact = (FilterContext: IFilterContext) => <Provider store={FilterContext.Blotter.AdaptableBlotterStore.TheStore}>
    <FilterForm Blotter={FilterContext.Blotter} CurrentColumn={FilterContext.Column} />
</Provider>;

let panelStyle = {
    width: '800px'
}

var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '500px',
    'height': '400px'
};

var listGroupItemStyle = {
    fontSize: "small"
};