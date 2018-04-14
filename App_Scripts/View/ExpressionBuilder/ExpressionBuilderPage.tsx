import * as React from "react";
import { ExpressionBuilderConditionSelector } from './ExpressionBuilderConditionSelector'
import { IColumn } from '../../Core/Interface/IColumn';
import { Grid, Row, Col } from 'react-bootstrap';
import { AdaptableWizardStep } from '../Wizard/Interface/IAdaptableWizard'
import { Expression } from '../../Core/Expression';
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { ExpressionBuilderPreview } from './ExpressionBuilderPreview'
import { ExpressionMode, DistinctCriteriaPairValue, QueryBuildStatus } from '../../Core/Enums'
import { IUserFilter, ISystemFilter } from '../../Strategy/Interface/IUserFilterStrategy'
import { IRawValueDisplayValuePair } from "../UIInterfaces";
import { IRange } from "../../Core/Interface/IRange";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { ButtonCondition } from "../Components/Buttons/ButtonCondition";
import { ObjectFactory } from "../../Core/ObjectFactory";
import { StringExtensions } from "../../Core/Extensions/StringExtensions";


export interface ExpressionBuilderPageProps extends React.ClassAttributes<ExpressionBuilderPage> {
    Columns: Array<IColumn>
    UserFilters: Array<IUserFilter>
    SystemFilters: Array<ISystemFilter>
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    ExpressionMode?: ExpressionMode
    UpdateGoBackState?(finish?: boolean): void
    StepName?: string
}

export interface ExpressionBuilderPageState {
    Expression: Expression
    SelectedColumnId: string
    // QueryBuildStatus: QueryBuildStatus
}

export class ExpressionBuilderPage extends React.Component<ExpressionBuilderPageProps, ExpressionBuilderPageState> implements AdaptableWizardStep {



    render() {

        let queryBuildStatus: QueryBuildStatus = this.getQueryBuildStatus();


        let newButton = <ButtonCondition onClick={() => this.onSelectedColumnChanged()}
            overrideDisableButton={queryBuildStatus == QueryBuildStatus.SelectColumn}
            overrideTooltip="Add Condition"
            style={{ width: "230px" }}
            DisplayMode="Glyph+Text"
        />

        // (selectedColumnRanges.length > 0 || selectedColumnValues.length > 0 || selectedColumnFilterExpressions.length > 0) ?
        //  QueryBuildStatus.MultiColumnConditionsAdded :
        //  QueryBuildStatus.ColumnSelected


        return <div className="adaptable_blotter_style_wizard_query">
            <PanelWithButton headerText="Query Builder"
                button={newButton}
                bsStyle="primary" style={{ height: '500px' }}>
                <Row>
                    <Col xs={6}>
                        <ExpressionBuilderConditionSelector ColumnsList={this.props.Columns}
                            QueryBuildStatus={queryBuildStatus}
                            UserFilters={this.props.UserFilters}
                            SystemFilters={this.props.SystemFilters}
                            Expression={this.state.Expression}
                            ExpressionMode={(this.props.ExpressionMode != null) ? this.props.ExpressionMode : ExpressionMode.MultiColumn}
                            onExpressionChange={(expression) => this.onChangeExpression(expression)}
                            onSelectedColumnChange={(columnName) => this.onSelectedColumnChange(columnName)}
                            SelectedColumnId={this.state.SelectedColumnId}
                            getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}>
                        </ExpressionBuilderConditionSelector>
                    </Col>
                    <Col xs={6}>
                        <ExpressionBuilderPreview Expression={this.state.Expression}
                            UserFilters={this.props.UserFilters}
                            onSelectedColumnChange={(columnName) => this.onSelectedColumnChange(columnName)}
                            SelectedColumnId={this.state.SelectedColumnId}
                            ColumnsList={this.props.Columns}
                            DeleteColumnValue={(columnId, value) => this.DeleteColumnValue(columnId, value)}
                            DeleteUserFilterExpression={(columnId, index) => this.DeleteUserFilterExpression(columnId, index)}
                            DeleteRange={(columnId, index) => this.DeleteRange(columnId, index)}
                            DeleteAllColumnExpression={(columnId) => this.DeleteAllColumnExpression(columnId)}
                            ShowPanel={true}>
                        </ExpressionBuilderPreview>
                    </Col>
                </Row>
            </PanelWithButton>
        </div>
    }


    getQueryBuildStatus(): QueryBuildStatus {
        // if now expression then assume its new  - fair?
        if (ExpressionHelper.IsExpressionEmpty(this.state.Expression)) {
            if (StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
                return QueryBuildStatus.SelectColumn; // you neeed to select a column
            } else {
                return QueryBuildStatus.ColumnSelected; // column is selected but you need to add some elements
            }
        } else { // we have an expression
            if (StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
                return QueryBuildStatus.SelectColumn; // you neeed to select a column
            } else {
                return QueryBuildStatus.ConditionsAdded; // do we need this status???
            }
        }
    }

    onSelectedColumnChanged() {
        this.setState({ SelectedColumnId: "" } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())

    }

    DeleteColumnValue(columnId: string, value: any) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnValues = this.state.Expression.ColumnDisplayValuesExpressions.find(x => x.ColumnName == columnId)
        let index = columnValues.ColumnDisplayValues.indexOf(value)
        columnValues.ColumnDisplayValues.splice(index, 1)
        if (columnValues.ColumnDisplayValues.length == 0) {
            let columnValuesIndex = this.state.Expression.ColumnDisplayValuesExpressions.findIndex(x => x.ColumnName == columnId)
            this.state.Expression.ColumnDisplayValuesExpressions.splice(columnValuesIndex, 1)
        }
        let newExpression: Expression = Object.assign({}, this.state.Expression)
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())

    }

    DeleteUserFilterExpression(columnId: string, index: number) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnUserFilterExpressions = this.state.Expression.FilterExpressions.find(x => x.ColumnName == columnId)
        columnUserFilterExpressions.Filters.splice(index, 1)
        if (columnUserFilterExpressions.Filters.length == 0) {
            let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(x => x.ColumnName == columnId)
            this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1)
        }
        let newExpression: Expression = Object.assign({}, this.state.Expression)
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())
    }

    DeleteRange(columnId: string, index: number) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnRanges = this.state.Expression.RangeExpressions.find(x => x.ColumnName == columnId)
        columnRanges.Ranges.splice(index, 1)
        if (columnRanges.Ranges.length == 0) {
            let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(x => x.ColumnName == columnId)
            this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1)
        }
        let newExpression: Expression = Object.assign({}, this.state.Expression)
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())
    }

    DeleteAllColumnExpression(columnId: string) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnValuesIndex: number = this.state.Expression.ColumnDisplayValuesExpressions.findIndex(x => x.ColumnName == columnId)
        if (columnValuesIndex >= 0) {
            this.state.Expression.ColumnDisplayValuesExpressions.splice(columnValuesIndex, 1)
        }

        let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(x => x.ColumnName == columnId)
        if (columnUserFilterExpressionIndex >= 0) {
            this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1)
        }

        let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(x => x.ColumnName == columnId)
        if (columnRangesIndex >= 0) {
            this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1)
        }

        let newExpression: Expression = Object.assign({}, this.state.Expression)
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())

    }

    onChangeExpression(newExpression: Expression) {
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())
    }

    onSelectedColumnChange(columnName: string) {
        this.setState({ SelectedColumnId: columnName } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return !ExpressionHelper.IsExpressionEmpty(this.state.Expression)
            && ExpressionHelper.IsExpressionValid(this.state.Expression)
    }
    public canBack(): boolean { return true; /*return !this.state.IsEdit; */ }
    public Next(): void { /*this.props.Data.Values = this.state.SelectedValues*/ }
    public Back(): void {
        // todo
    }
    public GetIndexStepIncrement() {
        return 1;
    }
    public GetIndexStepDecrement() {
        return 1;
    }
    public StepName = "Build Expression"
}
