import * as React from "react";
import { ExpressionBuilderConditionSelector } from './ExpressionBuilderConditionSelector'
import { IColumn } from '../../Core/Interface/IColumn';
import { Grid, Row, Col } from 'react-bootstrap';
import { AdaptableWizardStep } from '../Wizard/Interface/IAdaptableWizard'
import { ExpressionHelper } from '../../Core/Helpers/ExpressionHelper';
import { ExpressionBuilderPreview } from './ExpressionBuilderPreview'
import { ExpressionMode, DistinctCriteriaPairValue, QueryBuildStatus } from '../../Core/Enums'
import { IRawValueDisplayValuePair } from "../UIInterfaces";
import { PanelWithButton } from "../Components/Panels/PanelWithButton";
import { ButtonCondition } from "../Components/Buttons/ButtonCondition";
import { ObjectFactory } from "../../Core/ObjectFactory";
import { StringExtensions } from "../../Core/Extensions/StringExtensions";
import { IUserFilter } from "../../Core/Api/Interface/AdaptableBlotterObjects";
import { Expression } from "../../Core/Api/Expression";


export interface ExpressionBuilderPageProps extends React.ClassAttributes<ExpressionBuilderPage> {
    Columns: Array<IColumn>
    UserFilters: Array<IUserFilter>
    SystemFilters: Array<string>
    SelectedColumnId: string
    getColumnValueDisplayValuePairDistinctList: (columnId: string, distinctCriteria: DistinctCriteriaPairValue) => Array<IRawValueDisplayValuePair>
    ExpressionMode?: ExpressionMode
    UpdateGoBackState?(finish?: boolean): void
    StepName?: string
    cssClassName: string
}

export interface ExpressionBuilderPageState {
    Expression: Expression
    SelectedColumnId: string
}

export class ExpressionBuilderPage extends React.Component<ExpressionBuilderPageProps, ExpressionBuilderPageState> implements AdaptableWizardStep {

    render() {

        let cssClassName: string = this.props.cssClassName + "__querybuilder"
        let queryBuildStatus: QueryBuildStatus = this.getQueryBuildStatus();


        let newButton = <ButtonCondition cssClassName={cssClassName} onClick={() => this.onSelectedColumnChanged()}
            overrideDisableButton={queryBuildStatus == QueryBuildStatus.SelectFirstColumn || queryBuildStatus == QueryBuildStatus.SelectFurtherColumn || queryBuildStatus == QueryBuildStatus.SingleConditionsAdded}
            overrideTooltip="Add Condition"
            style={{ width: "230px" }}
            DisplayMode="Glyph+Text"
        />

        // (selectedColumnRanges.length > 0 || selectedColumnValues.length > 0 || selectedColumnFilterExpressions.length > 0) ?
        //  QueryBuildStatus.MultiColumnConditionsAdded :
        //  QueryBuildStatus.ColumnSelected


        return <div className={cssClassName}>
            <PanelWithButton  cssClassName={cssClassName} headerText="Query Builder"
                button={newButton}
                bsStyle="primary" style={{ height: '500px' }}>
                <Row>
                    <Col xs={6}>
                        <ExpressionBuilderConditionSelector ColumnsList={this.props.Columns}
                          cssClassName={cssClassName} 
                            QueryBuildStatus={queryBuildStatus}
                            UserFilters={this.props.UserFilters}
                            SystemFilters={this.props.SystemFilters}
                            Expression={this.state.Expression}
                            ExpressionMode={(this.props.ExpressionMode != null) ? this.props.ExpressionMode : ExpressionMode.MultiColumn}
                            onExpressionChange={(expression) => this.onChangeExpression(expression)}
                            onSelectedColumnChange={(columnId) => this.onSelectedColumnChange(columnId)}
                            SelectedColumnId={this.state.SelectedColumnId}
                            getColumnValueDisplayValuePairDistinctList={this.props.getColumnValueDisplayValuePairDistinctList}>
                        </ExpressionBuilderConditionSelector>
                    </Col>
                    <Col xs={6}>
                        <ExpressionBuilderPreview Expression={this.state.Expression}
                          cssClassName={cssClassName} 
                          UserFilters={this.props.UserFilters}
                            onSelectedColumnChange={(columnId) => this.onSelectedColumnChange(columnId)}
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
        if (ExpressionHelper.IsEmptyExpression(this.state.Expression)) {
            if (StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
                return QueryBuildStatus.SelectFirstColumn; // you neeed to select a column
            } else {
                return QueryBuildStatus.ColumnSelected; // column is selected but you need to add some elements
            }
        } else { // we have an expression
            if (StringExtensions.IsNullOrEmpty(this.state.SelectedColumnId)) {
                return QueryBuildStatus.SelectFurtherColumn; // you neeed to select another column
            } else {
                return (this.props.ExpressionMode == ExpressionMode.SingleColumn) ? QueryBuildStatus.SingleConditionsAdded : QueryBuildStatus.MultipleConditionsAdded; // do we need this status???
            }
        }
    }

    onSelectedColumnChanged() {
        this.setState({ SelectedColumnId: "" } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())

    }

    DeleteColumnValue(columnId: string, value: any) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnValues = this.state.Expression.DisplayValueExpressions.find(x => x.ColumnId == columnId)
        let index = columnValues.DisplayValues.indexOf(value)
        columnValues.DisplayValues.splice(index, 1)
        if (columnValues.DisplayValues  .length == 0) {
            let columnValuesIndex = this.state.Expression.DisplayValueExpressions.findIndex(x => x.ColumnId == columnId)
            this.state.Expression.DisplayValueExpressions.splice(columnValuesIndex, 1)
        }
        let newExpression: Expression = Object.assign({}, this.state.Expression)
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())

    }

    DeleteUserFilterExpression(columnId: string, index: number) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnUserFilterExpressions = this.state.Expression.FilterExpressions.find(x => x.ColumnId == columnId)
        columnUserFilterExpressions.Filters.splice(index, 1)
        if (columnUserFilterExpressions.Filters.length == 0) {
            let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(x => x.ColumnId == columnId)
            this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1)
        }
        let newExpression: Expression = Object.assign({}, this.state.Expression)
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())
    }

    DeleteRange(columnId: string, index: number) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnRanges = this.state.Expression.RangeExpressions.find(x => x.ColumnId == columnId)
        columnRanges.Ranges.splice(index, 1)
        if (columnRanges.Ranges.length == 0) {
            let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(x => x.ColumnId == columnId)
            this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1)
        }
        let newExpression: Expression = Object.assign({}, this.state.Expression)
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())
    }

    DeleteAllColumnExpression(columnId: string) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnValuesIndex: number = this.state.Expression.DisplayValueExpressions.findIndex(x => x.ColumnId == columnId)
        if (columnValuesIndex >= 0) {
            this.state.Expression.DisplayValueExpressions.splice(columnValuesIndex, 1)
        }

        let columnUserFilterExpressionIndex = this.state.Expression.FilterExpressions.findIndex(x => x.ColumnId == columnId)
        if (columnUserFilterExpressionIndex >= 0) {
            this.state.Expression.FilterExpressions.splice(columnUserFilterExpressionIndex, 1)
        }

        let columnRangesIndex = this.state.Expression.RangeExpressions.findIndex(x => x.ColumnId == columnId)
        if (columnRangesIndex >= 0) {
            this.state.Expression.RangeExpressions.splice(columnRangesIndex, 1)
        }

        let newExpression: Expression = Object.assign({}, this.state.Expression)
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())

    }

    onChangeExpression(newExpression: Expression) {
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())
    }

    onSelectedColumnChange(columnId: string) {
        this.setState({ SelectedColumnId: columnId } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())
    }

    public canNext(): boolean {
        return ExpressionHelper.IsNotEmptyOrInvalidExpression(this.state.Expression)
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
