/// <reference path="../../typings/index.d.ts" />
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import * as FilterRedux from '../Redux/ActionsReducers/FilterRedux'
import { FilterState, UserFilterState } from '../Redux/ActionsReducers/Interface/IState';
import { ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, ListGroupItem, Row, Modal, MenuItem, SplitButton, Checkbox } from 'react-bootstrap';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { PanelWithRow } from './PanelWithRow';
import { PanelWithButton } from './PanelWithButton';
import { IColumnFilter, IFilterContext } from '../Core/Interface/IFilterStrategy';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo, } from '../Core/Expression/PredefinedExpressionHelper';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { LeafExpressionOperator, ColumnType } from '../Core/Enums';
import { Expression } from '../Core/Expression/Expression'
import { IUserFilter } from '../Core/Interface/IExpression'


interface FilterFormProps extends React.ClassAttributes<FilterFormComponent> {
    AdaptableBlotter: IAdaptableBlotter;
    CurrentColumn: IColumn;
    FilterState: FilterState;
    UserFilterState: UserFilterState;
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

        // TODO:  We need to highlight existing filter(s) 

        // get user filter expressions for the columnValue
        let userFilters: IUserFilter[] = this.props.UserFilterState.UserFilters.filter(u => ExpressionHelper.ShouldShowUserFilterForColumn(u.Uid, this.props.CurrentColumn, this.props.AdaptableBlotter));

        let userFiltersGroupItems = userFilters.map((userFilter: IUserFilter, index: number) => {
            return <ListGroupItem key={userFilter.Uid} bsSize="xsmall"
                onClick={() => this.onClickUserFilter(userFilter)} >
                {userFilter.FriendlyName}
            </ListGroupItem>
        })

        // get the values for the column

        let columnValues: Array<any> = this.props.AdaptableBlotter.getColumnValueStringDistinct(this.props.CurrentColumn.ColumnId);

        var columnValuesGroupItems = columnValues.map((columnValue: any, index: number) => {
            return <ListGroupItem key={index} bsSize="xsmall"
                onClick={() => this.onClickColumValue(columnValue)}
                >
                {columnValue}
            </ListGroupItem>
        })

        return <ListGroup style={listGroupStyle}  >
            {userFiltersGroupItems}
            {columnValuesGroupItems}
        </ListGroup>


    }

    onClickUserFilter(userFilter: IUserFilter) {
        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: userFilter.Expression };
        this.props.onAddEditColumnFilter(columnFilter);
    }


    // TODO:  Fix this so it works with multiple values...
    onClickColumValue(columnValue: any) {

        let values: any[] = [];
        values.push(columnValue);

        let predefinedExpressionInfo: IPredefinedExpressionInfo =
            {
                ColumnValues: values,
                ExpressionRange: null,
                UserFilter: null
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
        UserFilterState: state.UserFilter
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