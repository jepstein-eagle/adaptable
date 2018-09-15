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
            ]
        }

    }

    componentDidUpdate() {
        // for now we are going to say that ANY change to the filter outside of the floating form will clear it
        // and we are NOT going to match them up.  
        // if we need to do that, then we can do it in Phase 2; for Phase 1 they are not synced up.

        if (ExpressionHelper.IsNotEmptyExpression(this.state.filterExpression)) {
            let test: IColumnFilter = this.props.ColumnFilters.find(cf => cf.ColumnId == this.props.CurrentColumn.ColumnId)

            if (test) {
                let diff = DeepDiff.diff(test.Filter, this.state.filterExpression)
                if (diff) {
                    this.clearState()
                }
            } else {
                this.clearState()
            }
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
                placeholder={""}
                value={this.state.floatingFilterFormText}
                onChange={(x) => this.OnTextChange((x.target as HTMLInputElement).value)} />
        </span>
    }


    OnTextChange(searchText: string) {
        if (StringExtensions.IsNullOrEmpty(searchText.trim())) {
            this.clearState()
            this.clearExistingColumnFilter();
            return;
        }
        this.handleNumberFilter(searchText);
    }

    clearExistingColumnFilter(): void {
        this.props.onClearColumnFilter(this.props.CurrentColumn.ColumnId)
    }

    createColumnFilter(expression: Expression, searchText: string): void {
        let columnFilter: IColumnFilter = { ColumnId: this.props.CurrentColumn.ColumnId, Filter: expression, IsReadOnly: false };
        this.setState({ floatingFilterFormText: searchText, filterExpression: expression })
        this.props.onAddEditColumnFilter(columnFilter)
    }

    createRangeExpression(operatorKVP: KeyValuePair, searchText: string): void {
        if (searchText.trim() == operatorKVP.Key) {
            // its operator only so do nothing
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

    handleNumberFilter(searchText: string): void {
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

    handleStringFilter(searchText: string): void {
        let isRangeExpression: boolean = false
        this.state.stringOperatorPairs.forEach(op => {
            if (!isRangeExpression) {
                if (searchText.includes(op.Key)) {
                    this.createRangeExpression(op, searchText);
                    isRangeExpression = true;
                }
            }
        })

        if (!isRangeExpression) {
            let equalOperatorPair: KeyValuePair = this.state.numberOperatorPairs.find(op => op.Value == LeafExpressionOperator.Equals)
            this.createRangeExpression(equalOperatorPair, searchText);
        }
    }

    clearState(): void {
        this.setState({ floatingFilterFormText: "", filterExpression: ExpressionHelper.CreateEmptyExpression() })
    }

    clearExpressionState(searchText: string): void {
        this.setState({ floatingFilterFormText: searchText, filterExpression: ExpressionHelper.CreateEmptyExpression() })
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