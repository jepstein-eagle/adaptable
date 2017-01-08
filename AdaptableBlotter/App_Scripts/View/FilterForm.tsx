/// <reference path="../../typings/index.d.ts" />
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import * as ColumnFilterRedux from '../Redux/ActionsReducers/ColumnFilterRedux'
import { ColumnFilterState, UserFilterState } from '../Redux/ActionsReducers/Interface/IState';
import { ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, ListGroupItem, Row, Modal, MenuItem, SplitButton, Checkbox } from 'react-bootstrap';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { PanelWithRow } from './PanelWithRow';
import { PanelWithButton } from './PanelWithButton';
import { IColumnFilter, IColumnFilterContext, IColumnFilterItem } from '../Core/Interface/IColumnFilterStrategy';
import { PredefinedExpressionHelper, IPredefinedExpressionInfo, } from '../Core/Expression/PredefinedExpressionHelper';
import { ExpressionHelper } from '../Core/Expression/ExpressionHelper';
import { UserFilterHelper } from '../Core/Expression/UserFilterHelper';
import { LeafExpressionOperator, ColumnType, SortOrder } from '../Core/Enums';
import { Expression } from '../Core/Expression/Expression'
import { IUserFilter } from '../Core/Interface/IExpression'
import { Helper } from '../Core/Helper'
import { ListBoxFilterForm } from './ListBoxFilterForm'

interface FilterFormProps extends React.ClassAttributes<FilterFormComponent> {
    AdaptableBlotter: IAdaptableBlotter;
    CurrentColumn: IColumn;
    UserFilterState: UserFilterState;
    ColumnFilterState: ColumnFilterState;
    onDeleteColumnFilter: (columnFilter: IColumnFilter) => ColumnFilterRedux.ColumnFilterDeleteAction
    onAddEditColumnFilter: (columnFilter: IColumnFilter) => ColumnFilterRedux.ColumnFilterAddEditAction
}

class FilterFormComponent extends React.Component<FilterFormProps, {}> {

    render(): any {

        // get user filter expressions appropriate for this column
        let userFilters: IUserFilter[] = this.props.UserFilterState.UserFilters.filter(u => UserFilterHelper.ShouldShowUserFilterForColumn(u.Uid, this.props.CurrentColumn, this.props.AdaptableBlotter));
        let userFilterItems: { rawValue: any, displayValue: string }[] = userFilters.map((uf, index) => { return { rawValue: uf.Uid, displayValue: uf.FriendlyName } })

        // get the values for the column and then sort by raw value
        let columnValuePairs: Array<{ rawValue: any, displayValue: string }> = this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, "rawValue");
        Helper.sortArrayWithProperty(SortOrder.Ascending, columnValuePairs, "rawValue")

        let existingColumnFilter: IColumnFilter = this.props.ColumnFilterState.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);

        // using the Single List Box but only passing in column values for now 
        return <PanelWithButton headerText={"Filter"} style={panelStyle} className="no-padding-panel" bsStyle="info">
            <ListBoxFilterForm ColumnValues={columnValuePairs}
                UiSelectedColumnValues={existingColumnFilter ? existingColumnFilter.Filter.ColumnValuesExpressions[0].ColumnValues : []}
                UiSelectedUserFilters={existingColumnFilter ? existingColumnFilter.Filter.UserFilters[0].UserFilterUids : []}
                UserFilters={userFilterItems}
                onColumnValueSelectedChange={(list) => this.onClickColumValue(list)}
                onUserFilterSelectedChange={(list) => this.onClickUserFilter(list)}>
            </ListBoxFilterForm>
        </PanelWithButton>
    }

    onClickColumValue(columnValues: string[]) {
        let existingColumnFilter: IColumnFilter = this.props.ColumnFilterState.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let predefinedExpressionInfo: IPredefinedExpressionInfo =
            {
                ColumnValues: columnValues,
                ExpressionRange: null,
                UserFilterUids: existingColumnFilter ? existingColumnFilter.Filter.UserFilters[0].UserFilterUids : []
            };
        let predefinedExpression: Expression = PredefinedExpressionHelper.CreateExpression(this.props.CurrentColumn.ColumnId, predefinedExpressionInfo, this.props.AdaptableBlotter);
        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: predefinedExpression };
        this.props.onAddEditColumnFilter(columnFilter);
    }

    onClickUserFilter(selectedFilterDisplayValues: string[]) {
        let existingColumnFilter: IColumnFilter = this.props.ColumnFilterState.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);

        let predefinedExpressionInfo: IPredefinedExpressionInfo =
            {
                ColumnValues: existingColumnFilter ? existingColumnFilter.Filter.ColumnValuesExpressions[0].ColumnValues : [],
                ExpressionRange: null,
                UserFilterUids: selectedFilterDisplayValues
            };
        let predefinedExpression: Expression = PredefinedExpressionHelper.CreateExpression(this.props.CurrentColumn.ColumnId, predefinedExpressionInfo, this.props.AdaptableBlotter);
        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: predefinedExpression };
        this.props.onAddEditColumnFilter(columnFilter);
    }
}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        AdaptableBlotter: ownProps.Blotter,
        CurrentColumn: ownProps.CurrentColumn,
        ColumnFilterState: state.ColumnFilter,
        UserFilterState: state.UserFilter
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteColumnFilter: (columnFilter: IColumnFilter) => dispatch(ColumnFilterRedux.DeleteColumnFilter(columnFilter)),
        onAddEditColumnFilter: (columnFilter: IColumnFilter) => dispatch(ColumnFilterRedux.AddEditColumnFilter(columnFilter))
    };
}

export let FilterForm = connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);

export const FilterFormReact = (FilterContext: IColumnFilterContext) => <Provider store={FilterContext.Blotter.AdaptableBlotterStore.TheStore}>
    <FilterForm Blotter={FilterContext.Blotter} CurrentColumn={FilterContext.Column} />
</Provider>;

let panelStyle = {
    width: '200px'
}

