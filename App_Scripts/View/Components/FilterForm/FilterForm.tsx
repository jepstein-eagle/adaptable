import * as React from "react";
import * as Redux from "redux";
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import * as FilterRedux from '../../../Redux/ActionsReducers/FilterRedux'
import { IColumn } from '../../../Core/Interface/IColumn';
import { IColumnFilterContext } from '../../../Strategy/Interface/IColumnFilterStrategy';
import { ExpressionHelper } from '../../../Core/Helpers/ExpressionHelper';
import { FilterHelper } from '../../../Core/Helpers/FilterHelper';
import { DataType, SortOrder, DistinctCriteriaPairValue, LeafExpressionOperator } from '../../../Core/Enums';
import { IUserFilter, IColumnFilter, IRange } from '../../../Core/Api/Interface/AdaptableBlotterObjects';
import { Helper } from '../../../Core/Helpers/Helper'
import { ListBoxFilterForm } from './ListBoxFilterForm'
import { StrategyViewPopupProps } from "../SharedProps/StrategyViewPopupProps";
import { IRawValueDisplayValuePair } from "../../UIInterfaces";
import { ButtonClose } from "../Buttons/ButtonClose";
import * as StyleConstants from '../../../Core/Constants/StyleConstants';
import { Expression } from "../../../Core/Api/Expression";
import { PanelWithTwoButtons } from "../Panels/PanelWithTwoButtons";
import { ButtonClear } from "../Buttons/ButtonClear";
import { IAdaptableBlotterOptions } from "../../../Core/Api/Interface/IAdaptableBlotterOptions";
import { Waiting } from "./Waiting";
import { ArrayExtensions } from "../../../Core/Extensions/ArrayExtensions";
import { IBlotterApi } from "../../../Core/Api/Interface/IBlotterApi";

interface FilterFormProps extends StrategyViewPopupProps<FilterFormComponent> {
    CurrentColumn: IColumn;
    Columns: IColumn[];
    UserFilters: IUserFilter[];
    SystemFilters: string[];
    ColumnFilters: IColumnFilter[];
    BlotterOptions: IAdaptableBlotterOptions
    BlotterApi:IBlotterApi
    onDeleteColumnFilter: (columnFilter: IColumnFilter) => FilterRedux.ColumnFilterDeleteAction
    onAddEditColumnFilter: (columnFilter: IColumnFilter) => FilterRedux.ColumnFilterAddUpdateAction
    onHideFilterForm: () => FilterRedux.HideFilterFormAction
}

export interface FilterFormState extends React.ClassAttributes<ListBoxFilterForm> {
    ColumnValuePairs: Array<IRawValueDisplayValuePair>
    ShowWaitingMessage: boolean
}

class FilterFormComponent extends React.Component<FilterFormProps, FilterFormState> {
    constructor(props: FilterFormProps) {
        super(props);

        this.state = {
            ColumnValuePairs: [],
            ShowWaitingMessage: false
        };
    }
    componentWillMount() {
        if (this.props.CurrentColumn.DataType != DataType.Boolean) {
            let columnValuePairs: IRawValueDisplayValuePair[] = [];
            if (this.props.BlotterOptions.getColumnValues != null) {
                this.setState({ ShowWaitingMessage: true });
                this.props.BlotterOptions.getColumnValues(this.props.CurrentColumn.ColumnId).
                    then(result => {
                        if (result == null) { // if nothing returned then default to normal
                            columnValuePairs = this.props.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, DistinctCriteriaPairValue.DisplayValue)
                            columnValuePairs = Helper.sortArrayWithProperty(SortOrder.Ascending, columnValuePairs, DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue])
                            this.setState({ ColumnValuePairs: columnValuePairs, ShowWaitingMessage: false });
                        } else { // get the distinct items and make sure within max items that can be displayed
                            let distinctItems = ArrayExtensions.RetrieveDistinct(result).slice(0, this.props.BlotterOptions.maxColumnValueItemsDisplayed);
                            distinctItems.forEach(di => {
                                columnValuePairs.push({ RawValue: di, DisplayValue: di });
                            })
                            this.setState({ ColumnValuePairs: columnValuePairs, ShowWaitingMessage: false });
                            // set the UIPermittedValues for this column to what has been sent
                            this.props.BlotterApi.uiSetColumnPermittedValues(this.props.CurrentColumn.ColumnId, distinctItems)
                        }
                    }, function (error) {
                        //    this.setState({ name: error });
                    });
            }
            else {
                columnValuePairs = this.props.getColumnValueDisplayValuePairDistinctList(this.props.CurrentColumn.ColumnId, DistinctCriteriaPairValue.DisplayValue)
                columnValuePairs = Helper.sortArrayWithProperty(SortOrder.Ascending, columnValuePairs, DistinctCriteriaPairValue[DistinctCriteriaPairValue.RawValue])
                this.setState({ ColumnValuePairs: columnValuePairs, ShowWaitingMessage: false });
            }
        }
    }

    render(): any {
        let cssClassName: string = StyleConstants.FILTER_FORM

        // get user filter expressions appropriate for this column
        let appropriateFilters: string[] = FilterHelper.GetUserFiltersForColumn(this.props.CurrentColumn, this.props.UserFilters).map(uf => uf.Name).concat(FilterHelper.GetSystemFiltersForColumn(this.props.CurrentColumn, this.props.SystemFilters).map(sf => sf))
            ;//.filter(u => FilterHelper.ShowUserFilterForColumn(this.props.UserFilterState.UserFilters, u.Name, this.props.CurrentColumn));
        let appropriateFilterItems: IRawValueDisplayValuePair[] = appropriateFilters.map((uf, index) => { return { RawValue: uf, DisplayValue: uf } })

        let existingColumnFilter: IColumnFilter = this.props.CurrentColumn.DataType != DataType.Boolean && this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);
        let uiSelectedColumnValues: string[] = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnValues : []

        let uiSelectedUserFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : []

        let uiSelectedRangeExpression: IRange = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges[0] : ExpressionHelper.CreateEmptyRangeExpression();

        let leafExpressionOperators = this.getLeafExpressionOperatorsForDataType(this.props.CurrentColumn.DataType);

        let isEmptyFilter: boolean = uiSelectedColumnValues.length == 0 && uiSelectedUserFilters.length == 0 && ExpressionHelper.IsEmptyRange(uiSelectedRangeExpression);
        // let isEmptyFilter: boolean = uiSelectedColumnValues.length == 0 && uiSelectedUserFilters.length == 0 && ;

        let closeButton = <ButtonClose cssClassName={cssClassName} onClick={() => this.onCloseForm()}
            bsStyle={"default"}
            size={"xsmall"}
            DisplayMode="Glyph"
            hideToolTip={true}
        />

        let clearButton = <ButtonClear cssClassName={this.props.cssClassName + " pull-right "} onClick={() => this.onClearFilter()}
            bsStyle={"default"}
            style={{ margin: "5px" }}
            size={"xsmall"}
            overrideDisableButton={isEmptyFilter}
            overrideText={"Clear Filter"}
            DisplayMode="Text"
            hideToolTip={true}
        />


        return <div>
            <PanelWithTwoButtons cssClassName={cssClassName} headerText={"Filter"} style={panelStyle} className="ab_no-padding-except-top-panel ab_small-padding-panel" bsStyle="default" buttonOne={clearButton} buttonTwo={closeButton}>
                {this.state.ShowWaitingMessage ?
                    <Waiting WaitingMessage="Retrieving Column Values..." />
                    :
                    <ListBoxFilterForm cssClassName={cssClassName}
                        CurrentColumn={this.props.CurrentColumn}
                        Columns={this.props.Columns}
                        ColumnValues={this.state.ColumnValuePairs}
                        DataType={this.props.CurrentColumn.DataType}
                        UiSelectedColumnValues={uiSelectedColumnValues}
                        UiSelectedUserFilters={uiSelectedUserFilters}
                        UiSelectedRange={uiSelectedRangeExpression}
                        UserFilters={appropriateFilterItems}
                        onColumnValueSelectedChange={(list) => this.onClickColumValue(list)}
                        onUserFilterSelectedChange={(list) => this.onClickUserFilter(list)}
                        Operators={leafExpressionOperators}
                        onCustomRangeExpressionChange={(range) => this.onSetCustomExpression(range)}   >
                    </ListBoxFilterForm>
                }
            </PanelWithTwoButtons>
        </div>
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

        let columnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnValues : []

        let rangeExpressions = existingColumnFilter && existingColumnFilter.Filter.RangeExpressions.length > 0 ?
            existingColumnFilter.Filter.RangeExpressions[0].Ranges : []

        this.persistFilter(columnValues, userFilters, rangeExpressions);
    }

    onSetCustomExpression(rangeExpression: IRange) {
        let existingColumnFilter: IColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId);

        let userFilters = existingColumnFilter && existingColumnFilter.Filter.FilterExpressions.length > 0 ?
            existingColumnFilter.Filter.FilterExpressions[0].Filters : []

        let columnValues = existingColumnFilter && existingColumnFilter.Filter.ColumnValueExpressions.length > 0 ?
            existingColumnFilter.Filter.ColumnValueExpressions[0].ColumnValues : []

        this.persistFilter(columnValues, userFilters, [rangeExpression]);
    }

    persistFilter(columnValues: string[], userFilters: string[], rangeExpressions: IRange[]): void {
        let expression: Expression
        expression = ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, columnValues, userFilters, rangeExpressions)

        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: expression, IsReadOnly: false };

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

    onCloseForm() {
        this.props.onHideFilterForm()
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentColumn: ownProps.CurrentColumn,
        ColumnFilters: state.Filter.ColumnFilters,
        Columns: state.Grid.Columns,
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters,
        BlotterOptions: ownProps.Blotter.BlotterOptions,
        BlotterApi: ownProps.Blotter.api,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onDeleteColumnFilter: (columnFilter: IColumnFilter) => dispatch(FilterRedux.ColumnFilterDelete(columnFilter)),
        onAddEditColumnFilter: (columnFilter: IColumnFilter) => dispatch(FilterRedux.ColumnFilterAddUpdate(columnFilter)),
        onHideFilterForm: () => dispatch(FilterRedux.HideFilterForm()),
    };
}

export let FilterForm = connect(mapStateToProps, mapDispatchToProps)(FilterFormComponent);

export const FilterFormReact = (FilterContext: IColumnFilterContext) => <Provider store={FilterContext.Blotter.AdaptableBlotterStore.TheStore}>
    <FilterForm
        getColumnValueDisplayValuePairDistinctList={(columnId: string, distinctCriteria: DistinctCriteriaPairValue) => FilterContext.Blotter.getColumnValueDisplayValuePairDistinctList(columnId, distinctCriteria)}
        Blotter={FilterContext.Blotter} CurrentColumn={FilterContext.Column}
        TeamSharingActivated={false} />
</Provider>;

let panelStyle = {
    width: '235px'
}
