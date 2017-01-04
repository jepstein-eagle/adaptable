/// <reference path="../../typings/index.d.ts" />
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import * as FilterRedux from '../Redux/ActionsReducers/FilterRedux'
import { FilterState, NamedExpressionState } from '../Redux/ActionsReducers/Interface/IState';
import { ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, ListGroupItem, Row, Modal, MenuItem, SplitButton, Checkbox } from 'react-bootstrap';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { PanelWithRow } from './PanelWithRow';
import { PanelWithButton } from './PanelWithButton';
import { IColumnFilter, IFilterContext } from '../Core/Interface/IFilterStrategy';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo, } from '../Core/Expression/PredefinedExpressionHelper';
import { LeafExpressionOperator, ColumnType } from '../Core/Enums';
import { Expression } from '../Core/Expression/Expression'


interface FilterFormProps extends React.ClassAttributes<FilterFormComponent> {
    AdaptableBlotter: IAdaptableBlotter;
    CurrentColumn: IColumn;
    FilterState: FilterState;
    NamedExpressionState: NamedExpressionState;
    onDeleteColumnFilter: (columnFilter: IColumnFilter) => FilterRedux.FilterDeleteAction
    onAddEditColumnFilter: (columnFilter: IColumnFilter) => FilterRedux.FilterAddEditAction

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


// get namedexpressions for the columnValue


// get the values for the column

        let columnValues: Array<any> = Array.from(new Set(this.props.AdaptableBlotter.getColumnValueString(this.props.CurrentColumn.ColumnId)));

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

        let values: any[] = [];
        values.push(columnValue);

        let predefinedExpressionInfo: IPredefinedExpressionInfo =
            {
                ColumnValues: values,
                ExpressionRange: null,
                NamedExpression: null
            };
        let predefinedExpression: Expression = PredefinedExpressionHelper.CreatePredefinedExpression(this.props.CurrentColumn.ColumnId, predefinedExpressionInfo, this.props.AdaptableBlotter);

        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: predefinedExpression };
        this.props.onAddEditColumnFilter(columnFilter);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdaptableBlotter: ownProps.Blotter,
        CurrentColumn: ownProps.CurrentColumn,
        FilterState: state.Filter,
    };
}

// Which action creators does it want to receive by props?
function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteColumnFilter: (columnFilter: IColumnFilter) => dispatch(FilterRedux.DeleteFilter(columnFilter)),
        onAddEditColumnFilter: (columnFilter: IColumnFilter) => dispatch(FilterRedux.AddEditFilter(columnFilter))

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