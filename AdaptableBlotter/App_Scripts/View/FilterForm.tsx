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
import { LeafExpressionOperator, ColumnType, SortOrder } from '../Core/Enums';
import { Expression } from '../Core/Expression/Expression'
import { IUserFilter } from '../Core/Interface/IExpression'
import { Helper } from '../Core/Helper'
import { SingleListBox } from './SingleListBox'


interface FilterFormProps extends React.ClassAttributes<FilterFormComponent> {
    AdaptableBlotter: IAdaptableBlotter;
    CurrentColumn: IColumn;
    FilterState: FilterState;
    UserFilterState: UserFilterState;
    onDeleteColumnFilter: (columnFilter: IColumnFilter) => FilterRedux.FilterDeleteAction
    onAddEditColumnFilter: (columnFilter: IColumnFilter) => FilterRedux.FilterAddEditAction
}

interface FilterFormState {
    SelectedColumnValues: any[];
}

class FilterFormComponent extends React.Component<FilterFormProps, FilterFormState> {
    constructor() {
        super();
        this.state = { SelectedColumnValues: [] }
    }

    render(): any {

        // get user filter expressions appropriate for this column
        let userFilters: IUserFilter[] = this.props.UserFilterState.UserFilters.filter(u => ExpressionHelper.ShouldShowUserFilterForColumn(u.Uid, this.props.CurrentColumn, this.props.AdaptableBlotter));

        let userFiltersGroupItems = userFilters.map((userFilter: IUserFilter) => {
            return <ListGroupItem key={userFilter.Uid} bsSize="xsmall"
                onClick={() => this.onClickUserFilter(userFilter)} >
                {userFilter.FriendlyName}
            </ListGroupItem>
        })

        // get the values for the column and then sort by raw value
        let columnValues: Array<{ rawValue: any, displayValue: string }> = this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, "rawValue");
        let sortedColumnValues = Helper.sortArrayWithProperty(SortOrder.Ascending, columnValues, "rawValue");

        //   var columnValuesGroupItems = sortedColumnValues.map((columnValue: { rawValue: any, displayValue: string }) => {
        //       return <ListGroupItem key={columnValue.rawValue} bsSize="xsmall"
        //           onClick={() => this.onClickColumValue(columnValue)} >
        //           {columnValue.displayValue}
        //       </ListGroupItem>
        //   })


        // using the Single List Box but only passing in column values for now 
        return <PanelWithButton headerText={"Filter"} style={panelStyle} className="no-padding-panel" bsStyle="info">
            <SingleListBox Values={columnValues} style={divStyle}
                UiSelectedValues={this.state.SelectedColumnValues}
                DisplayMember="displayValue"
                ValueMember="rawValue"
                SortMember="rawValue"
                onSelectedChange={(list) => this.onClickColumValue(list)}
                ValuesDataType={this.props.CurrentColumn.ColumnType}>
            </SingleListBox>
        </PanelWithButton>

        /*<ListGroup style={listGroupStyle}  >
            {userFiltersGroupItems}
            {columnValuesGroupItems}
        </ListGroup>
*/
    }

    onClickUserFilter(userFilter: IUserFilter) {
        // send the user filter - but note at the moment this means that the display value is getting sent
        // but lets send as we should explore Jo's idea of listening to the filter event and providing our own implementation...
        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: userFilter.Expression };
        this.props.onAddEditColumnFilter(columnFilter);
    }

    onClickColumValue(selectedColumnValues: string[]) {
        let predefinedExpressionInfo: IPredefinedExpressionInfo =
            {
                ColumnValues: selectedColumnValues,
                ExpressionRange: null,
                UserFilter: null
            };
        let predefinedExpression: Expression = PredefinedExpressionHelper.CreatePredefinedExpression(this.props.CurrentColumn.ColumnId, predefinedExpressionInfo, this.props.AdaptableBlotter);
        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: predefinedExpression };
        this.props.onAddEditColumnFilter(columnFilter);
        this.setState({ SelectedColumnValues: selectedColumnValues } as FilterFormState)
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
    width: '200px'
}

var listGroupStyle = {
    'overflowY': 'auto',
    'maxHeight': '500px',
    'height': '400px'
};

var listGroupItemStyle = {
    fontSize: "small"
};

let divStyle = {
    'overflowY': 'auto',
    'height': '335px',
    'marginBottom': '0'
}