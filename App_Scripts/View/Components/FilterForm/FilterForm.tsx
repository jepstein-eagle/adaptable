import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import * as ColumnFilterRedux from '../../../Redux/ActionsReducers/ColumnFilterRedux'
import { ColumnFilterState, UserFilterState, SystemFilterState } from '../../../Redux/ActionsReducers/Interface/IState';
import { IColumn } from '../../../Core/Interface/IColumn';
import { IColumnFilter, IColumnFilterContext } from '../../../Strategy/Interface/IColumnFilterStrategy';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper';
import { FilterHelper } from '../../../Core/Helpers/FilterHelper';
import { DataType, SortOrder, DistinctCriteriaPairValue, LeafExpressionOperator } from '../../../Core/Enums';
import { IUserFilter, ISystemFilter } from '../../../Strategy/Interface/IUserFilterStrategy';
import { Helper } from '../../../Core/Helpers/Helper'
import { ListBoxFilterForm } from './ListBoxFilterForm'
import { IRange } from '../../../Core/Interface/IRange'
import { StrategyViewPopupProps } from "../SharedProps/StrategyViewPopupProps";
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { PanelWithButton } from "../Panels/PanelWithButton";
import { ButtonClear } from "../Buttons/ButtonClear";
import { Expression } from "../../../Core/Expression";

interface FilterFormProps extends StrategyViewPopupProps<FilterFormComponent> {
    CurrentColumn: IColumn;
    Columns: IColumn[],
    UserFilters: IUserFilter[],
   SystemFilters: ISystemFilter[],
   ColumnFilters: IColumnFilter[],
    onDeleteColumnFilter: (columnFilter: IColumnFilter) => ColumnFilterRedux.ColumnFilterDeleteAction
    onAddEditColumnFilter: (columnFilter: IColumnFilter) => ColumnFilterRedux.ColumnFilterAddUpdateAction
    ColumnValueType: DistinctCriteriaPairValue,
}

class FilterFormComponent extends React.Component<FilterFormProps, {}> {

    render(): any {

        // get user filter expressions appropriate for this column
        let appropriateFilters: string[] = FilterHelper.GetUserFiltersForColumn(this.props.CurrentColumn,  this.props.UserFilters).map(uf=>uf.Name).concat(FilterHelper.GetSystemFiltersForColumn(this.props.CurrentColumn, this.props.SystemFilters).map(sf=>sf.Name))
        ;//.filter(u => FilterHelper.ShowUserFilterForColumn(this.props.UserFilterState.UserFilters, u.Name, this.props.CurrentColumn));
        let appropriateFilterItems: IRawValueDisplayValuePair[] = appropriateFilters.map((uf, index) => { return { RawValue: uf, DisplayValue: uf } })

        let columnValuePairs: Array<IRawValueDisplayValuePair>
        // get the values for the column and then sort by raw value
        columnValuePairs = this.props.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, this.props.ColumnValueType);
        columnValuePairs = Helper.sortArrayWithProperty(SortOrder.Ascending, columnValuePairs, DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue])

        // for boolean columns dont show any column values as we already have true/false from user filters
        if (this.props.CurrentColumn.DataType == DataType.Boolean) {
            columnValuePairs = [];
        }

        let existingColumnFilter: IColumnFilter = this.props.CurrentColumn.DataType != DataType.Boolean && this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let uiSelectedColumnValues: string[]
        if (this.props.ColumnValueType == DistinctCriteriaPairValue.RawValue) {
            uiSelectedColumnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnRawValuesExpressions.length > 0 ?
                existingColumnFilter.Filter.ColumnRawValuesExpressions[0].ColumnRawValues : []
        }
        else if (this.props.ColumnValueType == DistinctCriteriaPairValue.DisplayValue) {
            uiSelectedColumnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnDisplayValuesExpressions.length > 0 ?
                existingColumnFilter.Filter.ColumnDisplayValuesExpressions[0].ColumnDisplayValues : []
        }

        let uiSelectedUserFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : []

        let UiSelectedRangeExpression: IRange = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges[0] : ExpressionHelper.CreateEmptyRangeExpression();

        let leafExpressionOperators = this.getLeafExpressionOperatorsForDataType(this.props.CurrentColumn.DataType);

        let clearButton = <ButtonClear onClick={() => this.onClearFilter()}
            size={"xsmall"}
            overrideDisableButton={existingColumnFilter == null}
            overrideTooltip="Clear Filter"
            DisplayMode="Glyph+Text" />

        return <PanelWithButton headerText={"Filter"} style={panelStyle} className="no-padding-panel small-padding-panel" bsStyle="info" button={clearButton}>
            <ListBoxFilterForm ColumnValues={columnValuePairs}
                DataType={this.props.CurrentColumn.DataType}
                UiSelectedColumnValues={uiSelectedColumnValues}
                UiSelectedUserFilters={uiSelectedUserFilters}
                UiSelectedRange={UiSelectedRangeExpression}
                UserFilters={appropriateFilterItems}
                onColumnValueSelectedChange={(list) => this.onClickColumValue(list)}
                onUserFilterSelectedChange={(list) => this.onClickUserFilter(list)}
                ColumnValueType={this.props.ColumnValueType}
                Operators={leafExpressionOperators}
                onCustomRangeExpressionChange={(range) => this.onSetCustomExpression(range)}   >
            </ListBoxFilterForm>
        </PanelWithButton>
    }

    getLeafExpressionOperatorsForDataType(dataType: DataType): LeafExpressionOperator[] {
        return ExpressionHelper.GetOperatorsForDataType(dataType);
    }

    onClickColumValue(columnValues: string[]) {
        let existingColumnFilter: IColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);

        let userFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : []

        let rangeExpressions = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges : []

        this.persistFilter(columnValues, userFilters, rangeExpressions);
    }

    onClickUserFilter(userFilters: string[]) {
        let existingColumnFilter: IColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);

        let columnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnDisplayValuesExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnDisplayValuesExpressions[0].ColumnDisplayValues : []

        let rangeExpressions = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges : []

        this.persistFilter(columnValues, userFilters, rangeExpressions);
    }

    onSetCustomExpression(rangeExpression: IRange) {
        let existingColumnFilter: IColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);

        let userFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : []

        let columnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnDisplayValuesExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnDisplayValuesExpressions[0].ColumnDisplayValues : []

        this.persistFilter(columnValues, userFilters, [rangeExpression]);
    }

    persistFilter(columnValues: string[], userFilters: string[], rangeExpressions: IRange[]): void {
        let expression: Expression
        if (this.props.ColumnValueType == DistinctCriteriaPairValue.RawValue) {
            expression = ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, [], columnValues, userFilters, rangeExpressions)
        }
        else if (this.props.ColumnValueType == DistinctCriteriaPairValue.DisplayValue) {
            expression = ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, columnValues, [], userFilters, rangeExpressions)
        }
        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: expression };

        //delete if empty
        if (columnValues.length == 0 && userFilters.length == 0 && rangeExpressions.length == 0) {
            this.props.onDeleteColumnFilter(columnFilter);
        } else {
            this.props.onAddEditColumnFilter(columnFilter);
        }
    }

    onClearFilter() {
        this.persistFilter([], [], [])
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentColumn: ownProps.CurrentColumn,
        ColumnFilters: state.ColumnFilter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.UserFilter.UserFilters,
        SystemFilters: state.SystemFilter.SystemFilters
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteColumnFilter: (columnFilter: IColumnFilter) => dispatch(ColumnFilterRedux.ColumnFilterDelete(columnFilter)),
        onAddEditColumnFilter: (columnFilter: IColumnFilter) => dispatch(ColumnFilterRedux.ColumnFilterAddUpdate(columnFilter)),
    };
}

export let FilterForm = connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);

export const FilterFormReact = (FilterContext: IColumnFilterContext) => <Provider store={FilterContext.Blotter.AdaptableBlotterStore.TheStore}>
    <FilterForm
        getColumnValueDisplayValuePairDistinctList={(columnId: string, distinctCriteria: DistinctCriteriaPairValue) => FilterContext.Blotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria)}
        Blotter={FilterContext.Blotter} CurrentColumn={FilterContext.Column} ColumnValueType={FilterContext.ColumnValueType}
        TeamSharingActivated={false} />
</Provider>;

let panelStyle = {
    width: '235px'
}
