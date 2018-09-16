import * as DeepDiff from 'deep-diff'
import * as React from "react";
import * as Redux from "redux";
import * as FilterRedux from '../../../Redux/ActionsReducers/FilterRedux'
import { Provider, connect } from 'react-redux';
import { AdaptableBlotterState } from '../../../Redux/Store/Interface/IAdaptableStore';
import { IColumnFilterContext } from '../../../Strategy/Interface/IColumnFilterStrategy';
import { StrategyViewPopupProps } from "../SharedProps/StrategyViewPopupProps";
import { FormControl } from "react-bootstrap";
import { StringExtensions } from "../../../Core/Extensions/StringExtensions";
import { IColumnFilter, IUserFilter, IRange } from "../../../Core/Api/Interface/AdaptableBlotterObjects";
import { Expression } from "../../../Core/Api/Expression";
import { ExpressionHelper } from "../../../Core/Helpers/ExpressionHelper";
import { IColumn } from "../../../Core/Interface/IColumn";
import { IAdaptableBlotter } from "../../../Core/Interface/IAdaptableBlotter";
import { DataType, LeafExpressionOperator } from '../../../Core/Enums';
import { KeyValuePair } from '../../UIInterfaces';


interface FloatingFilterFormProps extends StrategyViewPopupProps<FloatingFilterFormComponent> {
    CurrentColumn: IColumn;
    Blotter: IAdaptableBlotter;
    Columns: IColumn[];
    UserFilters: IUserFilter[];
    SystemFilters: string[];
    ColumnFilters: IColumnFilter[];
    onAddEditColumnFilter: (columnFilter: IColumnFilter) => FilterRedux.ColumnFilterAddUpdateAction
    onClearColumnFilter: (columnId: string) => FilterRedux.ColumnFilterClearAction,
}

export interface FloatingFilterFormState {
    floatingFilterFormText: string
    filterExpression: Expression
    numberOperatorPairs: KeyValuePair[]
    stringOperatorPairs: KeyValuePair[]
    placeholder: string
}

class FloatingFilterFormComponent extends React.Component<FloatingFilterFormProps, FloatingFilterFormState> {

    constructor(props: FloatingFilterFormProps) {
        super(props);
        this.state = {
            floatingFilterFormText: "",
            filterExpression: ExpressionHelper.CreateEmptyExpression(),
            numberOperatorPairs: [
                { Key: "<>", Value: LeafExpressionOperator.NotEquals },
                { Key: ">=", Value: LeafExpressionOperator.GreaterThanOrEqual },
                { Key: "<=", Value: LeafExpressionOperator.LessThanOrEqual },
                { Key: ">", Value: LeafExpressionOperator.GreaterThan },
                { Key: "<", Value: LeafExpressionOperator.LessThan },
                { Key: "=", Value: LeafExpressionOperator.Equals },
                { Key: ":", Value: LeafExpressionOperator.Between },
            ],
            stringOperatorPairs: [
                { Key: "%", Value: LeafExpressionOperator.StartsWith },
                { Key: "*", Value: LeafExpressionOperator.Contains },
                { Key: "!", Value: LeafExpressionOperator.NotContains },
                { Key: "=", Value: LeafExpressionOperator.Equals },
            ],
            placeholder: ""
        }

    }

    componentDidUpdate() {
        this.reconcileFilters();
    }


    componentDidMount() {
        this.reconcileFilters();
    }

    reconcileFilters(): void {
        let existingColumnFilter: IColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId)
        if (existingColumnFilter) {
            // first check to see if we have an expression
            if (ExpressionHelper.IsEmptyExpression(this.state.filterExpression)) {
                // if we have no placeholder then set one - together with the placeholder
                let expressionDescription = ExpressionHelper.ConvertExpressionToString(existingColumnFilter.Filter, this.props.Columns, false)
                this.setState({ filterExpression: existingColumnFilter.Filter, placeholder: expressionDescription })
            } else {
                // we have an expression also - but if its not the same as the new one then update it to the new one
                let diff = DeepDiff.diff(existingColumnFilter.Filter, this.state.filterExpression)
                if (diff) {
                    let expressionDescription = ExpressionHelper.ConvertExpressionToString(existingColumnFilter.Filter, this.props.Columns, false)
                    this.setState({ filterExpression: existingColumnFilter.Filter, placeholder: expressionDescription, floatingFilterFormText: "" })
                }
            }
        } else {
            // no filter so make sure our stuff is clear
            this.clearState()
        }
    }

    render(): any {
        let cssClassName: string = this.props.cssClassName + "__floatingFilterForm";

        return <span>
            <FormControl
                style={{ marginTop: '5px', minHeight: '22px' }}
                className={cssClassName}
                autoFocus={false}
                bsSize={"sm"}
                type="text"
                placeholder={this.state.placeholder}
                value={this.state.floatingFilterFormText}
                onChange={(x) => this.OnTextChange((x.target as HTMLInputElement).value)} />
        </span>
    }


    OnTextChange(searchText: string) {
        // as soon as anything changes clear existing column filter
        if (searchText.trim() != this.state.floatingFilterFormText.trim()) {
            console.log("clearingfor column: " + this.props.CurrentColumn.ColumnId)
            this.clearExistingColumnFilter();
        }

        // if text is empty then clear our state
        if (StringExtensions.IsNullOrEmpty(searchText.trim())) {
            this.clearState()
            return;
        }

        // otherwise handle the change
        this.handleFilterChange(searchText);
    }

    clearExistingColumnFilter(): void {
        let existingColumnFilter: IColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId)
        if (existingColumnFilter) {
            console.log("in method clearing for: " + this.props.CurrentColumn.ColumnId)
            this.props.onClearColumnFilter(this.props.CurrentColumn.ColumnId)
        }
    }

    createColumnFilter(expression: Expression, searchText: string): void {
        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: expression, IsReadOnly: false };
        this.setState({ floatingFilterFormText: searchText, filterExpression: expression, placeholder: "" })
        this.props.onAddEditColumnFilter(columnFilter)
    }

    createRangeExpression(operatorKVP: KeyValuePair, searchText: string): void {
        if (searchText.trim() == operatorKVP.Key) {
            // its operator only so do nothing (but set placeholder to ensure not wiped)
            this.clearExpressionState(searchText)
        } else {
            let operand1 = searchText.replace(operatorKVP.Key, '')
            let operand2 = null
            if (operatorKVP.Value == LeafExpressionOperator.Between) {
                let values: any[] = searchText.trim().split(operatorKVP.Key)
                if (!this.isValidBetweenValues(values)) {
                    this.clearExpressionState(searchText)
                    return;
                }
                operand1 = values[0];
                operand2 = values[1];
            }
            let range: IRange = {
                Operator: operatorKVP.Value,
                Operand1: operand1 == null ? null : operand1.trim(),
                Operand2: operand2 == null ? null : operand2.trim(),
                Operand1Type: "Value",
                Operand2Type: "Value"
            }
            let expression: Expression = ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, [], [], [], [range])
            this.createColumnFilter(expression, searchText)
        }
    }

    handleFilterChange(searchText: string): void {
        // first check for existing operators and handle those
        let isRangeExpression: boolean = false

        let operators: KeyValuePair[];
        switch (this.props.CurrentColumn.DataType) {
            case DataType.Number:
                operators = this.state.numberOperatorPairs;
                break;
            case DataType.String:
                operators = this.state.stringOperatorPairs;
                break;
        }


        operators.forEach(op => {
            if (!isRangeExpression) {
                if (searchText.includes(op.Key)) {
                    this.createRangeExpression(op, searchText);
                    isRangeExpression = true; // set to true so dont do >= and then later >
                }
            }
        })

        if (!isRangeExpression) {
            // next check to see if it has a ';' - if so then create an "In" for all values; not sure if raw or display...
            if (searchText.includes(";")) {
                let values: string[] = searchText.split(';').map(v => v.trim());
                let expression: Expression = ExpressionHelper.CreateSingleColumnExpression(this.props.CurrentColumn.ColumnId, values, [], [], [])
                this.createColumnFilter(expression, searchText)
            } else {
                // if just a single, non-operator, value then do an "Equals" range
                let equalOperatorPair: KeyValuePair = this.state.numberOperatorPairs.find(op => op.Value == LeafExpressionOperator.Equals)
                this.createRangeExpression(equalOperatorPair, searchText);
            }
        }
    }

    clearState(): void {
        if (this.state.placeholder != "TEMP") {
            if (ExpressionHelper.IsNotEmptyExpression(this.state.filterExpression) || StringExtensions.IsNotNullOrEmpty(this.state.placeholder) || StringExtensions.IsNotNullOrEmpty(this.state.floatingFilterFormText)) {
                this.setState({ floatingFilterFormText: "", filterExpression: ExpressionHelper.CreateEmptyExpression(), placeholder: "" })
            }
        }
    }

    clearExpressionState(searchText: string): void {
        this.setState({ floatingFilterFormText: searchText, filterExpression: ExpressionHelper.CreateEmptyExpression(), placeholder: "TEMP" })
    }

    isValidBetweenValues(values: any[]): boolean {
        if (values.length != 2) {
            return false;
        }
        if (StringExtensions.IsNullOrEmpty(values[0]) || StringExtensions.IsNullOrEmpty(values[1])) {
            return false;
        }
        return true;
    }

}

function mapStateToProps(state: AdaptableBlotterState, ownProps: any) {
    return {
        CurrentColumn: ownProps.CurrentColumn,
        Blotter: ownProps.Blotter,
        Columns: state.Grid.Columns,
        ColumnFilters: state.Filter.ColumnFilters,
        UserFilters: state.Filter.UserFilters,
        SystemFilters: state.Filter.SystemFilters,
    };
}

function mapDispatchToProps(dispatch: Redux.Dispatch<AdaptableBlotterState>) {
    return {
        onAddEditColumnFilter: (columnFilter: IColumnFilter) => dispatch(FilterRedux.ColumnFilterAddUpdate(columnFilter)),
        onClearColumnFilter: (columnId: string) => dispatch(FilterRedux.ColumnFilterClear(columnId)),

    };
}

export let FloatingFilterForm = connect(mapStateToProps, mapDispatchToProps)(FloatingFilterFormComponent);

export const FloatingFilterFormReact = (FilterContext: IColumnFilterContext) => <Provider store={FilterContext.Blotter.AdaptableBlotterStore.TheStore}>
    <FloatingFilterForm
        Blotter={FilterContext.Blotter}
        CurrentColumn={FilterContext.Column}
        TeamSharingActivated={false}
        EmbedColumnMenu={FilterContext.Blotter.EmbedColumnMenu} />
</Provider>;