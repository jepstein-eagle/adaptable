/// <reference path="../../../typings/index.d.ts" />

import * as React from "react";
import { ExpressionBuilderConditionSelector } from './ExpressionBuilderConditionSelector'
import { IColumn, IAdaptableBlotter } from '../../Core/Interface/IAdaptableBlotter';
import { ListGroupItem, ListGroup, Panel, Grid, Row, Col } from 'react-bootstrap';
import { AdaptableWizardStep, AdaptableWizardStepProps } from '../Wizard/Interface/IAdaptableWizard'
import { Expression } from '../../Core/Expression/Expression';
import { ExpressionHelper } from '../../Core/Expression/ExpressionHelper';
import { ExpressionBuilderPreview } from './ExpressionBuilderPreview'
import { ExpressionMode } from '../../Core/Enums'

interface ExpressionBuilderPageProps extends React.ClassAttributes<ExpressionBuilderPage> {
    ColumnList: Array<IColumn>
    Blotter: IAdaptableBlotter
    SelectedColumnId: string
    ExpressionMode?: ExpressionMode
    UpdateGoBackState?(finish?: boolean): void
}

export interface ExpressionBuilderPageState {
    Expression: Expression
    SelectedColumnId: string
}

export class ExpressionBuilderPage extends React.Component<ExpressionBuilderPageProps, ExpressionBuilderPageState> implements AdaptableWizardStep {

    render() {

        return <Grid>
            <Row>
                <Col xs={9}>
                    <ExpressionBuilderConditionSelector ColumnsList={this.props.ColumnList}
                        Blotter={this.props.Blotter}
                        Expression={this.state.Expression}
                        ExpressionMode={ (this.props.ExpressionMode != null) ? this.props.ExpressionMode : ExpressionMode.MultiColumn}
                        onExpressionChange={(expression) => this.onChangeExpression(expression)}
                        onSelectedColumnChange={(columnName) => this.onSelectedColumnChange(columnName)}
                        SelectedColumnId={this.state.SelectedColumnId}>
                    </ExpressionBuilderConditionSelector>
                </Col>
                <Col xs={3}>
                    <ExpressionBuilderPreview Expression={this.state.Expression}
                        Blotter={this.props.Blotter}
                        onSelectedColumnChange={(columnName) => this.onSelectedColumnChange(columnName)}
                        SelectedColumnId={this.state.SelectedColumnId}
                        ColumnsList={this.props.ColumnList}
                        DeleteColumnValue={(columnId, value) => this.DeleteColumnValue(columnId, value)}
                        DeleteUserFilterExpression={(columnId, index) => this.DeleteUserFilterExpression(columnId, index)}
                        DeleteRange={(columnId, index) => this.DeleteRange(columnId, index)}
                        ShowPanel={true}>
                    </ExpressionBuilderPreview>
                </Col>
            </Row>
        </Grid>
    }

    DeleteColumnValue(columnId: string, value: any) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnValues = this.state.Expression.ColumnDisplayValuesExpressions.find(x => x.ColumnName == columnId)
        let index = columnValues.ColumnValues.indexOf(value)
        columnValues.ColumnValues.splice(index, 1)
        if (columnValues.ColumnValues.length == 0) {
            let columnValuesIndex = this.state.Expression.ColumnDisplayValuesExpressions.findIndex(x => x.ColumnName == columnId)
            this.state.Expression.ColumnDisplayValuesExpressions.splice(columnValuesIndex, 1)
        }
        let newExpression: Expression = Object.assign({}, this.state.Expression)
        this.setState({ Expression: newExpression } as ExpressionBuilderPageState, () => this.props.UpdateGoBackState())

    }

    DeleteUserFilterExpression(columnId: string, index: number) {
        //we assume that we manipulate a cloned object. i.e we are not mutating the state
        let columnUserFilterExpressions = this.state.Expression.UserFilters.find(x => x.ColumnName == columnId)
        columnUserFilterExpressions.UserFilterUids.splice(index, 1)
        if (columnUserFilterExpressions.UserFilterUids.length == 0) {
            let columnUserFilterExpressionIndex = this.state.Expression.UserFilters.findIndex(x => x.ColumnName == columnId)
            this.state.Expression.UserFilters.splice(columnUserFilterExpressionIndex, 1)
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
    public Next(): void { /*this.props.Data.CustomSortItems = this.state.SelectedValues*/ }
    public Back(): void { }
    public StepName = "Build Expression"
}
