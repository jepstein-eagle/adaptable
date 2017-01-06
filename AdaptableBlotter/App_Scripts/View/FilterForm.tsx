/// <reference path="../../typings/index.d.ts" />
import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../Redux/Store/Interface/IAdaptableStore';
import * as FilterRedux from '../Redux/ActionsReducers/FilterRedux'
import { ColumnFilterState, UserFilterState } from '../Redux/ActionsReducers/Interface/IState';
import { ControlLabel, FormGroup, Button, Form, Col, Panel, ListGroup, ListGroupItem, Row, Modal, MenuItem, SplitButton, Checkbox } from 'react-bootstrap';
import { IAdaptableBlotter, IColumn } from '../Core/Interface/IAdaptableBlotter';
import { PanelWithRow } from './PanelWithRow';
import { PanelWithButton } from './PanelWithButton';
import { IColumnFilter, IFilterContext, IFilterUIItem } from '../Core/Interface/IFilterStrategy';
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
    UserFilterState: UserFilterState;
    ColumnFilterState: ColumnFilterState;
    onDeleteColumnFilter: (columnFilter: IColumnFilter) => FilterRedux.FilterDeleteAction
    onAddEditColumnFilter: (columnFilter: IColumnFilter) => FilterRedux.FilterAddEditAction
}

interface FilterFormState {
    SelectedFilterDisplayValues: string[];
}

class FilterFormComponent extends React.Component<FilterFormProps, FilterFormState> {
    constructor(props: FilterFormProps) {
        super(props);
        this.state = this.buildState(this.props)
    }


    private buildState(theProps: FilterFormProps): FilterFormState {
        let existingColumnFilter: IColumnFilter = theProps.ColumnFilterState.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);

        if (existingColumnFilter == null || existingColumnFilter.Filter.ColumnValuesExpressions == null || existingColumnFilter.Filter.ColumnValuesExpressions.length == 0) {
            return {
                SelectedFilterDisplayValues: [],
            };
        }
        else {

            return {
                // this is not completely correct as there might be some user filters selected as well which we are not displaying...
                SelectedFilterDisplayValues: existingColumnFilter.Filter.ColumnValuesExpressions[0].ColumnValues,
            };
        }
    }

    render(): any {

        let filterUIItems: IFilterUIItem[] = [];

        // get the values for the column and then sort by raw value
        let columnValuePairs: Array<{ rawValue: any, displayValue: string }> = this.props.AdaptableBlotter.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, "rawValue");
        Helper.sortArrayWithProperty(SortOrder.Ascending, columnValuePairs, "rawValue")
        filterUIItems = columnValuePairs.map((cvp) => {
            return { RawValue: cvp.rawValue, DisplayValue: cvp.displayValue, FilterUIType: "Value" }
        });

        // get user filter expressions appropriate for this column
        let userFilters: IUserFilter[] = this.props.UserFilterState.UserFilters.filter(u => ExpressionHelper.ShouldShowUserFilterForColumn(u.Uid, this.props.CurrentColumn, this.props.AdaptableBlotter));
        userFilters.forEach(uf => {
            filterUIItems.push({ RawValue: uf.Uid, DisplayValue: uf.FriendlyName, FilterUIType: "UserFilter" })
        })

        // using the Single List Box but only passing in column values for now 
        return <PanelWithButton headerText={"Filter"} style={panelStyle} className="no-padding-panel" bsStyle="info">
            <SingleListBox Values={filterUIItems} style={divStyle}
                UiSelectedValues={this.state.SelectedFilterDisplayValues}
                DisplayMember="DisplayValue"
                ValueMember="RawValue"
                SortMember="FilterUIType"
                onSelectedChange={(list) => this.onClickColumValue(list)}
                ValuesDataType={this.props.CurrentColumn.ColumnType}>
            </SingleListBox>
        </PanelWithButton>

    }

    //  onClickUserFilter(userFilter: IUserFilter) {
    // send the user filter - but note at the moment this means that the display value is getting sent
    // but lets send as we should explore Jo's idea of listening to the filter event and providing our own implementation...
    //      let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: userFilter.Expression };
    //      this.props.onAddEditColumnFilter(columnFilter);
    //    }

    onClickColumValue(selectedFilterDisplayValues: string[]) {
        // Create an expression with 2 sets of values - though currently nothing is being done with the user filters...
        let selectedUserFilters: string[] = [];
        let selectedColumnDisplayValues: string[] = [];

        selectedFilterDisplayValues.forEach(sfdv => {
            if (this.props.UserFilterState.UserFilters.find(uf => uf.Uid == sfdv) != null) {
                selectedUserFilters.push(sfdv);
            } else {
                selectedColumnDisplayValues.push(sfdv);
            }
        })

        let predefinedExpressionInfo: IPredefinedExpressionInfo =
            {
                ColumnValues: selectedColumnDisplayValues,
                ExpressionRange: null,
                UserFilters: selectedUserFilters
            };

        let predefinedExpression: Expression = PredefinedExpressionHelper.CreatePredefinedExpression(this.props.CurrentColumn.ColumnId, predefinedExpressionInfo, this.props.AdaptableBlotter);
        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: predefinedExpression };
        this.props.onAddEditColumnFilter(columnFilter);
        this.setState({ SelectedFilterDisplayValues: selectedFilterDisplayValues } as FilterFormState)
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